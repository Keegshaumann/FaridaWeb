<?php
/**
 * Builds a branded, printable PDF of a submitted patient intake form,
 * laid out to resemble the practice's paper form. Pure FPDF (no dependencies
 * beyond lib/fpdf.php), so it runs on plain Hostinger PHP.
 *
 *   build_intake_pdf(array $f, string $sigImagePath = '') : string   // returns PDF bytes
 *
 * $f   = associative array of field => value (already trimmed strings)
 * $sig = path to a NON-transparent JPG/PNG of the signature (FPDF cannot read
 *        alpha PNGs, so the caller flattens the canvas image first).
 */

require_once __DIR__ . '/lib/fpdf.php';

class IntakePDF extends FPDF {
    public $brand     = array(94, 51, 98);    // #5e3362
    public $brandDark = array(76, 42, 82);    // #4c2a52
    public $muted     = array(120, 95, 128);
    public $ink       = array(38, 38, 38);
    public $line      = array(214, 195, 214);
    public $logoPath  = '';

    /* ---- UTF-8 -> the Latin-1 subset FPDF core fonts expect ---- */
    function t($s) {
        $s = (string) $s;
        if ($s === '') return '';
        if (function_exists('iconv')) {
            $out = @iconv('UTF-8', 'windows-1252//TRANSLIT//IGNORE', $s);
            if ($out !== false) return $out;
        }
        return mb_convert_encoding($s, 'ISO-8859-1', 'UTF-8');
    }

    function Header() {
        if ($this->logoPath && is_file($this->logoPath)) {
            $this->Image($this->logoPath, 12, 9, 21, 21);
        }
        $this->SetXY(37, 10);
        $this->SetTextColor($this->brand[0], $this->brand[1], $this->brand[2]);
        $this->SetFont('Helvetica', 'B', 19);
        $this->Cell(90, 9, $this->t('Farida Cajee-Botes'), 0, 2);
        $this->SetFont('Helvetica', '', 8);
        $this->SetTextColor($this->muted[0], $this->muted[1], $this->muted[2]);
        $this->SetXY(37, 20);
        $this->Cell(90, 5, $this->t('O R T H O T I S T   &   P R O S T H E T I S T'), 0, 0);

        $this->SetXY(132, 9);
        $this->SetFont('Helvetica', '', 8);
        $this->SetTextColor(90, 90, 90);
        $this->MultiCell(66, 5, $this->t("OS 0015148\nPR No 1321412\nReg 2026/136620/21"), 0, 'R');

        $this->SetDrawColor($this->line[0], $this->line[1], $this->line[2]);
        $this->SetLineWidth(0.3);
        $this->Line(12, 31, 198, 31);
        $this->SetY(35);
    }

    function Footer() {
        $this->SetY(-15);
        $this->SetDrawColor($this->line[0], $this->line[1], $this->line[2]);
        $this->SetLineWidth(0.3);
        $this->Line(12, $this->GetY(), 198, $this->GetY());
        $this->SetY(-12);
        $this->SetFont('Helvetica', '', 7.5);
        $this->SetTextColor($this->brand[0], $this->brand[1], $this->brand[2]);
        $this->Cell(0, 5, $this->t('Morningside, Sandton   |   064 652 0684   |   care@cajeebotes.com   |   www.cajeebotes.com'), 0, 1, 'C');
        $this->SetTextColor(150, 150, 150);
        $this->Cell(0, 4, $this->t('Confidential patient document   -   Page ' . $this->PageNo()), 0, 0, 'C');
    }

    function willFit($h) { return ($this->GetY() + $h) <= $this->PageBreakTrigger; }

    function sectionBar($title) {
        if ($this->GetY() > 250) $this->AddPage();
        $this->Ln(3.5);
        $this->SetFillColor($this->brand[0], $this->brand[1], $this->brand[2]);
        $this->SetTextColor(255, 255, 255);
        $this->SetFont('Helvetica', 'B', 10.5);
        $this->Cell(0, 8, '   ' . $this->t($title), 0, 1, 'L', true);
        $this->Ln(1.5);
    }

    /* one boxed label/value cell of width $w, single line; advances X (or wraps if $ln) */
    function kv($label, $value, $w, $ln = 0) {
        $H = 10;
        if ($this->GetY() + $H > $this->PageBreakTrigger) $this->AddPage();
        $x = $this->GetX(); $y = $this->GetY();
        $this->SetDrawColor($this->line[0], $this->line[1], $this->line[2]);
        $this->SetLineWidth(0.2);
        $this->Rect($x, $y, $w, $H);
        $this->SetXY($x + 2, $y + 1.4);
        $this->SetFont('Helvetica', 'B', 6.8);
        $this->SetTextColor($this->brand[0], $this->brand[1], $this->brand[2]);
        $this->Cell($w - 4, 3, $this->t(strtoupper($label)), 0, 2);
        // value — shrink the font to fit before ever truncating, so emails etc. stay whole
        $this->SetTextColor($this->ink[0], $this->ink[1], $this->ink[2]);
        $val = $this->t($value);
        $avail = $w - 4;
        $size = 9.5;
        $this->SetFont('Helvetica', '', $size);
        while ($size > 7 && $this->GetStringWidth($val) > $avail) { $size -= 0.5; $this->SetFont('Helvetica', '', $size); }
        if ($this->GetStringWidth($val) > $avail) {
            while (strlen($val) > 1 && $this->GetStringWidth($val . '...') > $avail) $val = substr($val, 0, -1);
            $val .= '...';
        }
        $this->SetX($x + 2);
        $this->Cell($avail, 4.5, $val, 0, 0);
        if ($ln) $this->SetXY($this->lMargin, $y + $H);
        else     $this->SetXY($x + $w, $y);
    }

    /* full-width label/value that wraps the value onto multiple lines */
    function kvFull($label, $value) {
        $w = $this->w - $this->lMargin - $this->rMargin;
        $this->SetFont('Helvetica', '', 9.5);
        $lines = max(1, $this->NbLines($w - 4, $this->t($value)));
        $H = 6.5 + $lines * 4.3;
        if ($this->GetY() + $H > $this->PageBreakTrigger) $this->AddPage();
        $x = $this->GetX(); $y = $this->GetY();
        $this->SetDrawColor($this->line[0], $this->line[1], $this->line[2]);
        $this->SetLineWidth(0.2);
        $this->Rect($x, $y, $w, $H);
        $this->SetXY($x + 2, $y + 1.4);
        $this->SetFont('Helvetica', 'B', 6.8);
        $this->SetTextColor($this->brand[0], $this->brand[1], $this->brand[2]);
        $this->Cell($w - 4, 3, $this->t(strtoupper($label)), 0, 2);
        $this->SetX($x + 2);
        $this->SetFont('Helvetica', '', 9.5);
        $this->SetTextColor($this->ink[0], $this->ink[1], $this->ink[2]);
        $this->MultiCell($w - 4, 4.3, $this->t($value !== '' ? $value : ' '), 0, 'L');
        $this->SetXY($this->lMargin, $y + $H);
    }

    function row2($l1, $v1, $l2, $v2) {
        $w = ($this->w - $this->lMargin - $this->rMargin) / 2;
        $this->kv($l1, $v1, $w, 0);
        $this->kv($l2, $v2, $w, 1);
    }

    /* number of lines a string of width $w will take (standard FPDF helper) */
    function NbLines($w, $txt) {
        $cw = &$this->CurrentFont['cw'];
        if ($w == 0) $w = $this->w - $this->rMargin - $this->x;
        $wmax = ($w - 2 * $this->cMargin) * 1000 / $this->FontSize;
        $s = str_replace("\r", '', (string) $txt);
        $nb = strlen($s);
        if ($nb > 0 && $s[$nb - 1] == "\n") $nb--;
        $sep = -1; $i = 0; $j = 0; $l = 0; $nl = 1;
        while ($i < $nb) {
            $c = $s[$i];
            if ($c == "\n") { $i++; $sep = -1; $j = $i; $l = 0; $nl++; continue; }
            if ($c == ' ') $sep = $i;
            $l += isset($cw[$c]) ? $cw[$c] : 600;
            if ($l > $wmax) {
                if ($sep == -1) { if ($i == $j) $i++; }
                else $i = $sep + 1;
                $sep = -1; $j = $i; $l = 0; $nl++;
            } else $i++;
        }
        return $nl;
    }
}

function build_intake_pdf($f, $sigImagePath = '') {
    $g = function ($k) use ($f) { return isset($f[$k]) ? (string) $f[$k] : ''; };

    $pdf = new IntakePDF('P', 'mm', 'A4');
    $pdf->logoPath = is_file(__DIR__ . '/lib/logo.jpg') ? __DIR__ . '/lib/logo.jpg'
                    : (is_file($_SERVER['DOCUMENT_ROOT'] . '/logo.png') ? $_SERVER['DOCUMENT_ROOT'] . '/logo.png' : '');
    $pdf->SetMargins(12, 35, 12);
    $pdf->SetAutoPageBreak(true, 18);
    $pdf->AliasNbPages();
    $pdf->AddPage();

    // Title
    $pdf->SetFont('Helvetica', 'B', 15);
    $pdf->SetTextColor($pdf->brand[0], $pdf->brand[1], $pdf->brand[2]);
    $pdf->Cell(0, 8, $pdf->t('Patient Intake Form'), 0, 1, 'C');
    $pdf->SetFont('Helvetica', '', 8.5);
    $pdf->SetTextColor($pdf->muted[0], $pdf->muted[1], $pdf->muted[2]);
    $sub = 'Submitted ' . date('d M Y, H:i') . '  -  Confidential';
    $pdf->Cell(0, 5, $pdf->t($sub), 0, 1, 'C');

    // Referring Doctor
    $pdf->sectionBar('Referring Doctor');
    $pdf->kvFull('Referred by (if applicable)', $g('referring_doctor'));

    // Member Information
    $pdf->sectionBar('Member Information');
    $pdf->row2('Surname', $g('member_surname'), 'Full Names', $g('member_full_names'));
    $pdf->row2('ID Number', $g('member_id'), 'Age', $g('member_age'));
    $pdf->row2('Cell No.', $g('member_cell'), 'Email', $g('member_email'));
    $pdf->row2('Work Place Name', $g('member_workplace'), 'Work Contact No.', $g('member_contact_no'));
    $pdf->kvFull('Home Address', $g('member_address'));
    $pdf->row2('Medical Aid Name', $g('medical_aid_name'), 'Option / Plan Name', $g('medical_aid_option'));
    $pdf->row2('Medical Aid Number', $g('medical_aid_number'), '', '');

    // Patient Information
    $pdf->sectionBar('Patient Information');
    $pdf->row2('Surname', $g('patient_surname'), 'Full Names', $g('patient_full_names'));
    $pdf->row2('ID Number', $g('patient_id'), 'Age', $g('patient_age'));
    $pdf->row2('Cell No.', $g('patient_cell'), 'Email', $g('patient_email'));
    $pdf->row2('Work Place Name', $g('patient_workplace'), 'Work Contact No.', $g('patient_contact_no'));
    $pdf->kvFull('Home Address', $g('patient_address'));

    // Medical History
    $pdf->sectionBar('Medical History');
    $pdf->kvFull('Diagnosis', $g('diagnosis'));
    $pdf->kvFull('Allergies', $g('allergies'));
    $pdf->kvFull('Chronic Conditions', $g('chronic_conditions'));
    $pdf->row2('Date of Injury', $g('date_of_injury'), 'Emergency Contact', $g('emergency_contact'));
    $pdf->row2('Emergency Contact Number', $g('emergency_number'), '', '');

    // Consent & Indemnity
    $pdf->sectionBar('Disclosure, Consent & Indemnity Agreement');
    $consent = array(
        'I, the undersigned, voluntarily consent to assessment, evaluation, consultation, measurement, casting, scanning, fitting, adjustment, treatment, and/or the supply of orthotic, prosthetic, assistive, or related healthcare services and devices/products as recommended by the practitioner. I understand the nature and purpose of the treatment and acknowledge that not every consultation will result in a device being issued.',
        'Risks, Outcomes & Patient Responsibility: I understand that treatment outcomes may vary and that optimal results may require multiple appointments or adjustments. I acknowledge that discomfort, pressure, skin irritation, skin breakdown, or mechanical wear/failure of a device may occur. I agree to monitor my skin where applicable, report any concerns promptly, and comply with all wearing schedules, care instructions, and follow-up recommendations.',
        'Use, Repairs & Returns: I agree to use any device or product only for its intended purpose and understand that misuse, neglect, or unauthorised alterations may result in injury and void any applicable warranty or responsibility of the practice. I understand that devices are subject to normal wear and tear and that repairs or maintenance may be required and may be chargeable. Custom-made or specially ordered items cannot be returned or refunded once fabrication or ordering has commenced. Non-custom (prefabricated/off-the-shelf) items may be considered for return or exchange within 7 (seven) days of receipt, provided they are unused, in original condition and packaging, and subject to inspection and approval by the practice. The practice reserves the right, at its sole discretion and subject to applicable law, to approve, decline, or apply a handling/restocking fee to any return or exchange request.',
        'Financial Responsibility: I understand that quotations and medical aid benefits are estimates only, that approval does not guarantee payment, and that I remain personally responsible for any shortfalls, co-payments, non-covered items/services, and any outstanding balances. I understand that devices/products supplied by the practice may be billed separately and may not form part of a hospital account.',
        'Claims, POPIA & Communication Consent: I authorise the practice to submit claims to my medical aid where applicable and consent to the collection, storage, and processing of my personal and medical information in accordance with the Protection of Personal Information Act (POPIA) for treatment and administrative purposes. I also consent to communication via phone, SMS, email, and/or WhatsApp regarding appointments, treatment, and accounts.',
        'Final Acknowledgement & Indemnity: I confirm that I have read and understood this document, have had the opportunity to ask questions, and voluntarily agree to the terms and conditions of the practice. I indemnify and hold harmless the practitioner and practice against any injury, loss, or damage arising from misuse, non-compliance, or failure to follow professional advice or instructions.',
    );
    $pdf->SetFont('Helvetica', '', 7.8);
    $pdf->SetTextColor(60, 60, 60);
    foreach ($consent as $para) {
        $pdf->MultiCell(0, 3.6, $pdf->t($para), 0, 'J');
        $pdf->Ln(1.4);
    }

    // Consent confirmations
    $pdf->Ln(1);
    $chk = function ($ok) { return $ok ? '[X] ' : '[  ] '; };
    $pdf->SetFont('Helvetica', 'B', 8.6);
    $pdf->SetTextColor($pdf->brand[0], $pdf->brand[1], $pdf->brand[2]);
    $pdf->MultiCell(0, 4.6, $pdf->t($chk($g('consent_terms') === 'yes') . 'Read, understood and AGREED to the Disclosure, Consent & Indemnity terms above.'), 0, 'L');
    $pdf->MultiCell(0, 4.6, $pdf->t($chk($g('consent_popia') === 'yes') . 'AUTHORISED the practice to submit medical-aid claims and consented to processing of information under POPIA.'), 0, 'L');
    $pdf->Ln(2);

    // Signatory row
    $pdf->row2('Full Name (Signatory)', $g('sig_full_name'), 'ID Number', $g('sig_id'));
    $pdf->row2('Date Signed', $g('sig_date'), 'Consent Version', $g('consent_version'));

    // Signature image
    $pdf->Ln(2);
    if (!$pdf->willFit(34)) $pdf->AddPage();
    $pdf->SetFont('Helvetica', 'B', 6.8);
    $pdf->SetTextColor($pdf->brand[0], $pdf->brand[1], $pdf->brand[2]);
    $pdf->Cell(0, 4, $pdf->t('SIGNATURE'), 0, 1);
    $x = $pdf->GetX(); $y = $pdf->GetY();
    $boxW = 92; $boxH = 28;
    $pdf->SetDrawColor($pdf->line[0], $pdf->line[1], $pdf->line[2]);
    $pdf->Rect($x, $y, $boxW, $boxH);
    if ($sigImagePath !== '' && is_file($sigImagePath)) {
        // fit inside the box with padding, preserving aspect
        $info = @getimagesize($sigImagePath);
        if ($info) {
            $ar = $info[0] / max(1, $info[1]);
            $maxW = $boxW - 6; $maxH = $boxH - 6;
            $iw = $maxW; $ih = $iw / $ar;
            if ($ih > $maxH) { $ih = $maxH; $iw = $ih * $ar; }
            $pdf->Image($sigImagePath, $x + ($boxW - $iw) / 2, $y + ($boxH - $ih) / 2, $iw, $ih, 'JPG');
        }
    }
    $pdf->SetY($y + $boxH + 2);

    return $pdf->Output('S');
}
