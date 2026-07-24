<?php
/**
 * Cajee Botes — Patient Intake Form mailer
 * ----------------------------------------
 * Receives the intake form POST, validates + sanitises it, and emails a
 * formatted copy (with the drawn signature embedded inline) to the practice.
 * Self-hosted: patient/medical data never leaves your Hostinger server except
 * via this one email.
 *
 * Endpoint: /patient-intake/intake-send.php   (POST only)
 * Returns : JSON  {ok:true}  |  {ok:false,error:"..."}  for the AJAX form,
 *           or a friendly HTML page if submitted without JavaScript.
 */

/* ============================ CONFIG ============================ */
$TO_EMAIL   = 'care@cajeebotes.com';                 // where completed forms go
$TO_NAME    = 'Cajee Botes Orthotist & Prosthetist';

// "From" MUST be a mailbox on your own domain (cajeebotes.com) or Hostinger may
// reject it / it lands in spam. Reply-To is set to the patient so staff can
// reply straight back to them.
$FROM_EMAIL = 'care@cajeebotes.com';
$FROM_NAME  = 'Cajee Botes Website';

$SEND_PATIENT_ACK = true;   // short "we received your form" note to the patient (no medical detail)

$RATE_MAX      = 6;         // max submissions per IP ...
$RATE_WINDOW   = 3600;      // ... per this many seconds (1 hour)
$MIN_FILL_SECS = 2;         // reject submissions completed faster than this (bots)
$MAX_SIG_BYTES = 1500000;   // reject signature images larger than ~1.5 MB
/* =============================================================== */

$wantsJson =
    (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest')
    || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);

/** Send the response in whichever format the caller expects, then stop. */
function respond($ok, $message, $wantsJson, $httpCode = 200) {
    http_response_code($httpCode);
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(array('ok' => $ok, 'error' => $ok ? null : $message));
    } else {
        header('Content-Type: text/html; charset=utf-8');
        $title  = $ok ? 'Form received' : 'Something went wrong';
        $colour = $ok ? '#1e7d52' : '#c0392b';
        echo '<!doctype html><html lang="en"><head><meta charset="utf-8">'
           . '<meta name="viewport" content="width=device-width,initial-scale=1">'
           . '<meta name="robots" content="noindex,nofollow">'
           . '<title>' . htmlspecialchars($title, ENT_QUOTES) . '</title>'
           . '<style>body{font-family:"DM Sans",system-ui,sans-serif;background:#f5e8f3;'
           . 'display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;color:#3f2a44}'
           . '.b{background:#fff;max-width:460px;padding:36px;border-radius:16px;text-align:center;'
           . 'box-shadow:0 10px 40px -12px rgba(94,51,98,.3)}h1{color:' . $colour . ';margin:0 0 10px}'
           . 'a{display:inline-block;margin-top:18px;color:#5e3362;font-weight:600}</style></head><body><div class="b">'
           . '<h1>' . htmlspecialchars($title, ENT_QUOTES) . '</h1>'
           . '<p>' . htmlspecialchars($message, ENT_QUOTES) . '</p>'
           . '<a href="/patient-intake">&larr; Back to the form</a>'
           . '</div></body></html>';
    }
    exit;
}

/** Grab a POST value, trimmed, as a plain string (never an array). */
function field($key) {
    if (!isset($_POST[$key])) return '';
    $v = $_POST[$key];
    if (is_array($v)) $v = implode(', ', $v);
    return trim((string) $v);
}

/** Strip CR/LF/NUL so a value can never be smuggled into email headers. */
function headerSafe($v) {
    return trim(str_replace(array("\r", "\n", "%0a", "%0d", "\0"), ' ', $v));
}

/** RFC 2047-encode header TEXT (subjects, etc.) so non-ASCII survives. */
function encodeHeaderText($v) {
    $v = headerSafe($v);
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($v, 'UTF-8', 'B', '');
    }
    return $v;
}

/** Build a safe "Display Name <email>" header value. Neutralises address-significant
 *  characters in the display name so a crafted name can't spoof a second address. */
function addressHeader($name, $email) {
    $email = headerSafe($email);
    $name  = str_replace(array('<', '>', '@', ',', ';', '"', ':', "\r", "\n"), ' ', (string) $name);
    $name  = trim(preg_replace('/\s+/', ' ', $name));
    if ($name === '') return $email;
    if (function_exists('mb_encode_mimeheader')) {
        $name = mb_encode_mimeheader($name, 'UTF-8', 'B', '');
    }
    return $name . ' <' . $email . '>';
}

/** Basic, defensive email validity check. */
function validEmail($e) {
    return $e !== '' && filter_var($e, FILTER_VALIDATE_EMAIL) && strlen($e) <= 254;
}

/** Lightweight per-IP throttle (fail-open on any filesystem problem). */
function rateLimited($ip, $max, $window) {
    if ($ip === '') return false;
    $file = sys_get_temp_dir() . '/fcb_intake_rl_' . md5($ip);
    $now  = time();
    $times = array();
    if (is_readable($file)) {
        $raw = @file_get_contents($file);
        if ($raw) {
            foreach (explode(',', $raw) as $t) {
                $t = (int) $t;
                if ($t && $t > $now - $window) $times[] = $t;
            }
        }
    }
    if (count($times) >= $max) return true;
    $times[] = $now;
    @file_put_contents($file, implode(',', $times), LOCK_EX);
    return false;
}

/* ----------------------------- guards ----------------------------- */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'This page only accepts submitted forms.', $wantsJson, 405);
}

// Honeypot (array-safe): a filled hidden field = bot. Pretend success, send nothing.
if (field('website') !== '') {
    respond(true, 'Thank you.', $wantsJson);
}

// Anti-bot timing: a genuine person cannot complete this form in under a couple of seconds.
$elapsed = (int) field('form_elapsed');
if ($elapsed > 0 && $elapsed < $MIN_FILL_SECS) {
    respond(true, 'Thank you.', $wantsJson);
}

$clientIp = isset($_SERVER['REMOTE_ADDR']) ? preg_replace('/[^0-9a-f:.]/i', '', $_SERVER['REMOTE_ADDR']) : '';
if (rateLimited($clientIp, $RATE_MAX, $RATE_WINDOW)) {
    respond(false, "You've submitted this form several times recently. Please wait a little while, or call us on 064 652 0684.", $wantsJson, 429);
}

/* --------------------------- validation --------------------------- */

$required = array(
    'member_surname'     => 'Member surname',
    'member_full_names'  => 'Member full names',
    'member_id'          => 'Member ID number',
    'member_cell'        => 'Member cell number',
    'medical_aid_name'   => 'Medical aid name',
    'medical_aid_number' => 'Medical aid number',
    'patient_surname'    => 'Patient surname',
    'patient_full_names' => 'Patient full names',
    'patient_id'         => 'Patient ID number',
    'patient_cell'       => 'Patient cell number',
    'sig_full_name'      => 'Signatory full name',
    'sig_id'             => 'Signatory ID number',
    'sig_date'           => 'Signature date',
);
$missing = array();
foreach ($required as $k => $label) {
    if (field($k) === '') $missing[] = $label;
}
if (field('consent_terms') !== 'yes') $missing[] = 'Agreement to the Consent & Indemnity terms';
if (field('consent_popia') !== 'yes') $missing[] = 'Authorisation for medical-aid claims / POPIA consent';

// Signature image (data URL) -> raw PNG bytes
$sigBinary = '';
$sigRaw = field('signature_image');
if ($sigRaw !== '' && strpos($sigRaw, 'data:image/png;base64,') === 0) {
    $b64 = substr($sigRaw, strlen('data:image/png;base64,'));
    $b64 = str_replace(' ', '+', $b64);
    $decoded = base64_decode($b64, true);
    if ($decoded !== false && strlen($decoded) > 0 && strlen($decoded) <= $MAX_SIG_BYTES) {
        $sigBinary = $decoded;
    }
}
if ($sigBinary === '') $missing[] = 'Signature';

if (!empty($missing)) {
    respond(false, 'Please complete the required field(s): ' . implode(', ', $missing) . '.', $wantsJson, 422);
}

/* --------------------- assemble the email body -------------------- */

$sections = array(
    'Referring Doctor' => array(
        'Referred by' => field('referring_doctor'),
    ),
    'Member Information' => array(
        'Surname'            => field('member_surname'),
        'Full Names'         => field('member_full_names'),
        'ID Number'          => field('member_id'),
        'Age'                => field('member_age'),
        'Cell No.'           => field('member_cell'),
        'Email'              => field('member_email'),
        'Work Place Name'    => field('member_workplace'),
        'Work Contact No.'   => field('member_contact_no'),
        'Home Address'       => field('member_address'),
        'Medical Aid Name'   => field('medical_aid_name'),
        'Option / Plan Name' => field('medical_aid_option'),
        'Medical Aid Number' => field('medical_aid_number'),
    ),
    'Patient Information' => array(
        'Surname'          => field('patient_surname'),
        'Full Names'       => field('patient_full_names'),
        'ID Number'        => field('patient_id'),
        'Age'              => field('patient_age'),
        'Cell No.'         => field('patient_cell'),
        'Email'            => field('patient_email'),
        'Work Place Name'  => field('patient_workplace'),
        'Work Contact No.' => field('patient_contact_no'),
        'Home Address'     => field('patient_address'),
    ),
    'Medical History' => array(
        'Diagnosis'          => field('diagnosis'),
        'Date of Injury'     => field('date_of_injury'),
        'Allergies'          => field('allergies'),
        'Chronic Conditions' => field('chronic_conditions'),
        'Emergency Contact'  => field('emergency_contact'),
        'Emergency Number'   => field('emergency_number'),
    ),
    'Consent & Signature' => array(
        'Agreed to Consent & Indemnity terms'  => (field('consent_terms') === 'yes' ? 'YES' : 'NO'),
        'Authorised medical-aid claim / POPIA' => (field('consent_popia') === 'yes' ? 'YES' : 'NO'),
        'Consent version'       => field('consent_version'),
        'Full Name (Signatory)' => field('sig_full_name'),
        'ID Number'             => field('sig_id'),
        'Date Signed'           => field('sig_date'),
    ),
);

$brand       = '#5e3362';
$patientName = trim(field('patient_full_names') . ' ' . field('patient_surname'));
if ($patientName === '') $patientName = 'Patient';
$sigCid = 'signature@cajeebotes';

$html  = '<div style="font-family:\'DM Sans\',Arial,sans-serif;color:#3f2a44;max-width:640px;margin:0 auto;">';
$html .= '<div style="background:' . $brand . ';color:#fff;padding:18px 22px;border-radius:12px 12px 0 0;">';
$html .= '<h2 style="margin:0;font-size:18px;">New Patient Intake Form</h2>';
$html .= '<p style="margin:4px 0 0;font-size:13px;opacity:.9;">Submitted via cajeebotes.com/patient-intake</p></div>';
$html .= '<div style="border:1px solid #e8d4e6;border-top:0;border-radius:0 0 12px 12px;padding:6px 20px 20px;">';

$text  = "NEW PATIENT INTAKE FORM\nSubmitted via cajeebotes.com/patient-intake\n" . str_repeat('=', 48) . "\n";

foreach ($sections as $sectionTitle => $rows) {
    $html .= '<h3 style="color:' . $brand . ';border-bottom:2px solid #f5e8f3;padding-bottom:6px;margin:22px 0 8px;font-size:15px;">'
           . htmlspecialchars($sectionTitle, ENT_QUOTES) . '</h3>';
    $html .= '<table style="width:100%;border-collapse:collapse;font-size:14px;">';
    $text .= "\n" . strtoupper($sectionTitle) . "\n" . str_repeat('-', 40) . "\n";
    foreach ($rows as $label => $value) {
        $shown = ($value === '') ? '—' : $value;
        $html .= '<tr><td style="padding:5px 10px 5px 0;color:#7c5f80;vertical-align:top;width:42%;">'
               . htmlspecialchars($label, ENT_QUOTES) . '</td>'
               . '<td style="padding:5px 0;vertical-align:top;">' . nl2br(htmlspecialchars($shown, ENT_QUOTES)) . '</td></tr>';
        $text .= str_pad($label . ':', 24) . ' ' . $shown . "\n";
    }
    $html .= '</table>';
}

// Signature image (inline)
$html .= '<h3 style="color:' . $brand . ';border-bottom:2px solid #f5e8f3;padding-bottom:6px;margin:22px 0 8px;font-size:15px;">Signature</h3>';
$html .= '<img src="cid:' . $sigCid . '" alt="Patient signature" style="max-width:360px;border:1px solid #e8d4e6;border-radius:8px;background:#fff;padding:6px;">';
$text .= "\nSIGNATURE\n" . str_repeat('-', 40) . "\n(see attached signature image)\n";

$submittedAt = date('D, d M Y H:i') . ' (server time)';
$html .= '<p style="margin-top:24px;font-size:12px;color:#9b7a9e;border-top:1px solid #f5e8f3;padding-top:12px;">'
       . 'Submitted: ' . htmlspecialchars($submittedAt, ENT_QUOTES) . '<br>'
       . 'From IP: ' . htmlspecialchars($clientIp !== '' ? $clientIp : 'unknown', ENT_QUOTES) . '</p></div></div>';
$text .= "\n" . str_repeat('=', 48) . "\nSubmitted: " . $submittedAt . "\nFrom IP: " . ($clientIp !== '' ? $clientIp : 'unknown') . "\n";

/* ------------------------- MIME assembly -------------------------- */
// multipart/related  ->  [ multipart/alternative (text + html) ] + [ inline PNG ]

$fromHeader = addressHeader($FROM_NAME, $FROM_EMAIL);
$subject    = encodeHeaderText('New Patient Intake — ' . $patientName);

$outer = 'rel_' . bin2hex(random_bytes(10));
$inner = 'alt_' . bin2hex(random_bytes(10));

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'From: ' . $fromHeader . "\r\n";

// Reply-To: prefer the patient's email, then the member's.
$replyEmail = '';
foreach (array('patient_email', 'member_email') as $ek) {
    if (validEmail(field($ek))) { $replyEmail = field($ek); break; }
}
if ($replyEmail !== '') {
    $headers .= 'Reply-To: ' . addressHeader(field('patient_full_names') . ' ' . field('patient_surname'), $replyEmail) . "\r\n";
}
$headers .= 'X-Mailer: CajeeBotes-Intake' . "\r\n";
$headers .= 'Content-Type: multipart/related; boundary="' . $outer . '"; type="multipart/alternative"' . "\r\n";

$body  = '--' . $outer . "\r\n";
$body .= 'Content-Type: multipart/alternative; boundary="' . $inner . '"' . "\r\n\r\n";

$body .= '--' . $inner . "\r\n";
$body .= 'Content-Type: text/plain; charset=UTF-8' . "\r\n";
$body .= 'Content-Transfer-Encoding: 8bit' . "\r\n\r\n" . $text . "\r\n";

$body .= '--' . $inner . "\r\n";
$body .= 'Content-Type: text/html; charset=UTF-8' . "\r\n";
$body .= 'Content-Transfer-Encoding: 8bit' . "\r\n\r\n" . $html . "\r\n";
$body .= '--' . $inner . '--' . "\r\n\r\n";

$body .= '--' . $outer . "\r\n";
$body .= 'Content-Type: image/png; name="signature.png"' . "\r\n";
$body .= 'Content-Transfer-Encoding: base64' . "\r\n";
$body .= 'Content-ID: <' . $sigCid . '>' . "\r\n";
$body .= 'Content-Disposition: inline; filename="signature.png"' . "\r\n\r\n";
$body .= chunk_split(base64_encode($sigBinary)) . "\r\n";
$body .= '--' . $outer . '--';

$sent = @mail($TO_EMAIL, $subject, $body, $headers, '-f' . $FROM_EMAIL);

if (!$sent) {
    respond(false, "We couldn't send your form just now. Please try again in a moment, or call us on 064 652 0684.", $wantsJson, 500);
}

/* ---- Optional short acknowledgement to the patient (no medical detail) ---- */
if ($SEND_PATIENT_ACK && validEmail(field('patient_email'))) {
    $ackHead = 'MIME-Version: 1.0' . "\r\n"
             . 'From: ' . $fromHeader . "\r\n"
             . 'Reply-To: ' . addressHeader($TO_NAME, $TO_EMAIL) . "\r\n"
             . 'Content-Type: text/html; charset=UTF-8' . "\r\n";
    $ackFirst = htmlspecialchars(field('patient_full_names') !== '' ? field('patient_full_names') : 'there', ENT_QUOTES);
    $ackBody = '<div style="font-family:\'DM Sans\',Arial,sans-serif;color:#3f2a44;max-width:520px;margin:0 auto;">'
             . '<div style="background:' . $brand . ';color:#fff;padding:18px 22px;border-radius:12px 12px 0 0;">'
             . '<h2 style="margin:0;font-size:18px;">Thank you, ' . $ackFirst . '</h2></div>'
             . '<div style="border:1px solid #e8d4e6;border-top:0;border-radius:0 0 12px 12px;padding:18px 22px;">'
             . '<p>We\'ve received your patient intake form and our team will review it and be in touch to confirm your appointment.</p>'
             . '<p>If you need to reach us in the meantime, call <strong>064 652 0684</strong> or email '
             . '<a href="mailto:care@cajeebotes.com" style="color:' . $brand . ';">care@cajeebotes.com</a>.</p>'
             . '<p style="margin-top:20px;">Warm regards,<br><strong>Cajee Botes Orthotist &amp; Prosthetist</strong></p>'
             . '</div></div>';
    @mail(field('patient_email'), encodeHeaderText('We received your intake form — Cajee Botes'), $ackBody, $ackHead, '-f' . $FROM_EMAIL);
}

respond(true, 'Thank you — your intake form has been received. Our team will be in touch shortly.', $wantsJson);
