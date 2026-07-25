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

/* ============================ CONFIG ============================
 * Recipient, sender and SMTP credentials live in mail-config.php (so the
 * mailbox password stays out of git). Edit that file on the server to paste
 * the password. The values below are safe fallbacks if the file is missing. */
define('FCB_INTAKE', 1);
$mailcfg = @include __DIR__ . '/mail-config.php';
if (!is_array($mailcfg)) $mailcfg = array();

$TO_EMAIL   = isset($mailcfg['to_email'])   ? $mailcfg['to_email']   : 'care@cajeebotes.com';
$TO_NAME    = isset($mailcfg['to_name'])    ? $mailcfg['to_name']    : 'Cajee Botes Orthotist & Prosthetist';
$FROM_EMAIL = isset($mailcfg['from_email']) ? $mailcfg['from_email'] : 'care@cajeebotes.com';
$FROM_NAME  = isset($mailcfg['from_name'])  ? $mailcfg['from_name']  : 'Cajee Botes Website';

$SEND_PATIENT_ACK = true;   // short "we received your form" note to the patient (no medical detail)

$RATE_MAX      = 6;         // max submissions per IP ...
$RATE_WINDOW   = 3600;      // ... per this many seconds (1 hour)
$MIN_FILL_SECS = 2;         // reject submissions completed faster than this (bots)
$MAX_SIG_BYTES = 1500000;   // reject signature images larger than ~1.5 MB
/* =============================================================== */

// SMTP send is used when a password is present in mail-config.php; otherwise mail().
$SMTP = array(
    'enabled' => isset($mailcfg['smtp_pass']) && trim($mailcfg['smtp_pass']) !== '',
    'host'    => isset($mailcfg['smtp_host'])   ? $mailcfg['smtp_host']   : 'smtp.hostinger.com',
    'port'    => isset($mailcfg['smtp_port'])   ? $mailcfg['smtp_port']   : 465,
    'secure'  => isset($mailcfg['smtp_secure']) ? $mailcfg['smtp_secure'] : 'ssl',
    'user'    => isset($mailcfg['smtp_user'])   ? $mailcfg['smtp_user']   : 'care@cajeebotes.com',
    'pass'    => isset($mailcfg['smtp_pass'])   ? $mailcfg['smtp_pass']   : '',
    'from'    => $FROM_EMAIL,
);

$wantsJson =
    (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest')
    || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);

/** Send the response in whichever format the caller expects, then stop.
 *  $extra adds fields to the JSON body (delivery details the page shows the patient). */
function respond($ok, $message, $wantsJson, $httpCode = 200, $extra = array()) {
    http_response_code($httpCode);
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        $payload = array('ok' => $ok, 'error' => $ok ? null : $message);
        foreach ($extra as $k => $v) $payload[$k] = $v;
        echo json_encode($payload);
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

/** Minimal authenticated SMTP sender (implicit SSL on 465, or STARTTLS on 587).
 *  Returns true on a 250 "message accepted", false otherwise (reason in $err). */
function smtp_send($cfg, $to, $subject, $headersStr, $body, &$err) {
    $err = '';
    $transport = ($cfg['secure'] === 'ssl' ? 'ssl://' : '') . $cfg['host'] . ':' . (int) $cfg['port'];
    $ctx = stream_context_create(array('ssl' => array('verify_peer' => true, 'verify_peer_name' => true, 'SNI_enabled' => true)));
    $fp = @stream_socket_client($transport, $errno, $errstr, 20, STREAM_CLIENT_CONNECT, $ctx);
    if (!$fp) { $err = 'connect: ' . $errstr; return false; }
    stream_set_timeout($fp, 20);

    $get = function () use ($fp) {
        $data = '';
        while (($line = fgets($fp, 600)) !== false) {
            $data .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') break;   // last line of a multi-line reply
        }
        return $data;
    };
    $put  = function ($c) use ($fp) { fwrite($fp, $c . "\r\n"); };
    $step = function ($expect, $label) use ($get, &$err, $fp) {
        $r = $get();
        if (strncmp($r, $expect, strlen($expect)) !== 0) { $err = $label . ': ' . trim($r); @fclose($fp); return false; }
        return true;
    };

    if (!$step('220', 'greeting')) return false;
    $put('EHLO cajeebotes.com'); if (!$step('250', 'EHLO')) return false;

    if ($cfg['secure'] === 'tls') {
        $put('STARTTLS'); if (!$step('220', 'STARTTLS')) return false;
        $crypto = STREAM_CRYPTO_METHOD_TLS_CLIENT;
        if (defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')) $crypto |= STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
        if (!@stream_socket_enable_crypto($fp, true, $crypto)) { $err = 'TLS negotiation failed'; @fclose($fp); return false; }
        $put('EHLO cajeebotes.com'); if (!$step('250', 'EHLO-2')) return false;
    }

    $put('AUTH LOGIN');               if (!$step('334', 'AUTH')) return false;
    $put(base64_encode($cfg['user'])); if (!$step('334', 'username')) return false;
    $put(base64_encode($cfg['pass'])); if (!$step('235', 'password/login')) return false;

    $put('MAIL FROM:<' . $cfg['from'] . '>'); if (!$step('250', 'MAIL FROM')) return false;
    $put('RCPT TO:<' . $to . '>');            if (!$step('25',  'RCPT TO')) return false;   // 250/251
    $put('DATA');                             if (!$step('354', 'DATA')) return false;

    // For SMTP we must include To: and Subject: inside the DATA block ourselves.
    $message = 'To: ' . $to . "\r\n" . 'Subject: ' . $subject . "\r\n" . $headersStr . "\r\n" . $body;
    $message = preg_replace('/^\./m', '..', $message);   // dot-stuffing (RFC 5321)
    $message .= "\r\n.\r\n";

    // A single fwrite() can write FEWER bytes than asked on an SSL stream, which
    // silently truncates a message carrying a PDF. Loop until every byte is out.
    $len = strlen($message);
    $off = 0;
    $stalled = 0;
    while ($off < $len) {
        $n = @fwrite($fp, substr($message, $off, 8192));
        if ($n === false) { $err = 'write failed after ' . $off . ' of ' . $len . ' bytes'; @fclose($fp); return false; }
        if ($n === 0) {
            if (++$stalled > 200) { $err = 'write stalled at ' . $off . ' of ' . $len . ' bytes'; @fclose($fp); return false; }
            usleep(20000);
            continue;
        }
        $stalled = 0;
        $off += $n;
    }
    if (!$step('250', 'message accepted')) return false;

    $put('QUIT'); @fclose($fp);
    return true;
}

/** Route an email through SMTP when configured, otherwise PHP mail(). */
function deliver($cfg, $to, $subject, $body, $headersStr, &$err) {
    $err = '';
    if (!empty($cfg['enabled'])) {
        return smtp_send($cfg, $to, $subject, $headersStr, $body, $err);
    }
    $ok = @mail($to, $subject, $body, $headersStr, '-f' . $cfg['from']);
    if (!$ok) $err = 'mail() returned false';
    return $ok;
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

/* --------------------- generate the branded PDF --------------------- */

$patientName = trim(field('patient_full_names') . ' ' . field('patient_surname'));
if ($patientName === '') $patientName = 'Patient';

// Flatten the transparent canvas signature onto white (FPDF cannot read alpha PNGs).
$sigJpgPath = '';
if ($sigBinary !== '' && function_exists('imagecreatefromstring')) {
    $src = @imagecreatefromstring($sigBinary);
    if ($src) {
        $sw = imagesx($src); $sh = imagesy($src);
        $dst = imagecreatetruecolor($sw, $sh);
        $whiteBg = imagecolorallocate($dst, 255, 255, 255);
        imagefilledrectangle($dst, 0, 0, $sw, $sh, $whiteBg);
        imagealphablending($dst, true);
        imagecopy($dst, $src, 0, 0, 0, 0, $sw, $sh);
        $sigJpgPath = tempnam(sys_get_temp_dir(), 'fcbsig');
        @imagejpeg($dst, $sigJpgPath, 92);   // FPDF is told the type is 'JPG', so no extension is needed
    }
}

$pdfFields = array();
foreach (array(
    'referring_doctor', 'member_surname', 'member_full_names', 'member_id', 'member_age', 'member_cell',
    'member_email', 'member_workplace', 'member_contact_no', 'member_address', 'medical_aid_name',
    'medical_aid_option', 'medical_aid_number', 'patient_surname', 'patient_full_names', 'patient_id',
    'patient_age', 'patient_cell', 'patient_email', 'patient_workplace', 'patient_contact_no', 'patient_address',
    'diagnosis', 'date_of_injury', 'allergies', 'chronic_conditions', 'emergency_contact', 'emergency_number',
    'consent_terms', 'consent_popia', 'consent_version', 'sig_full_name', 'sig_id', 'sig_date',
) as $k) $pdfFields[$k] = field($k);

// A full form with a signature needs headroom; the default 128M limit is usually
// fine, but a low shared-hosting limit would kill the request outright.
@ini_set('memory_limit', '256M');

$pdfBytes = '';
$pdfError = '';
try {
    // Loaded here, not at the top of the file: a missing library must degrade to
    // "email without PDF", never to a fatal error that loses the submission.
    foreach (array('/intake-pdf.php', '/lib/fpdf.php', '/lib/font/helvetica.php') as $needed) {
        if (!is_readable(__DIR__ . $needed)) {
            throw new RuntimeException('Missing on the server: patient-intake' . $needed);
        }
    }
    require_once __DIR__ . '/intake-pdf.php';
    $pdfBytes = build_intake_pdf($pdfFields, $sigJpgPath);
    if (!is_string($pdfBytes) || $pdfBytes === '') {
        $pdfBytes = '';
        $pdfError = 'The PDF builder returned no data.';
    }
} catch (Throwable $e) {
    $pdfBytes = '';
    $pdfError = get_class($e) . ': ' . $e->getMessage()
              . ' (' . basename($e->getFile()) . ' line ' . $e->getLine() . ')';
}
if ($pdfError !== '') {
    @file_put_contents(sys_get_temp_dir() . '/fcb_intake_maillog.txt',
        date('c') . '  PDF generation failed -> ' . $pdfError . "\n", FILE_APPEND | LOCK_EX);
}
if ($sigJpgPath !== '' && is_file($sigJpgPath)) @unlink($sigJpgPath);

/** One-line summary of the PHP environment — only ever shown to the practice, and
 *  only when the PDF failed, so a delivery problem can be diagnosed from the email. */
function envSummary() {
    $ext = array();
    foreach (array('gd', 'iconv', 'mbstring', 'openssl') as $e) {
        $ext[] = $e . '=' . (extension_loaded($e) ? 'yes' : 'NO');
    }
    return 'PHP ' . PHP_VERSION . ' | memory_limit=' . ini_get('memory_limit') . ' | ' . implode(' ', $ext);
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

$brand = '#5e3362';

// Full plain-text dump (kept so the mailbox stays searchable); the HTML view is clean.
$submittedAt = date('D, d M Y H:i') . ' (server time)';
$text  = "NEW PATIENT INTAKE FORM\nSubmitted via cajeebotes.com/patient-intake\n" . str_repeat('=', 48) . "\n";
foreach ($sections as $sectionTitle => $rows) {
    $text .= "\n" . strtoupper($sectionTitle) . "\n" . str_repeat('-', 40) . "\n";
    foreach ($rows as $label => $value) {
        $text .= str_pad($label . ':', 24) . ' ' . ($value === '' ? '-' : $value) . "\n";
    }
}
$text .= "\nThe complete signed intake form is attached to this email as a PDF.\n";
$text .= "\n" . str_repeat('=', 48) . "\nSubmitted: " . $submittedAt . "\nFrom IP: " . ($clientIp !== '' ? $clientIp : 'unknown') . "\n";

// Clean HTML summary — the attached PDF is the primary document.
$sm = function ($v) { return htmlspecialchars($v !== '' ? $v : '—', ENT_QUOTES); };
$sigCid = 'sig' . bin2hex(random_bytes(8)) . '@cajeebotes.com';
$html  = '<div style="font-family:Arial,Helvetica,sans-serif;color:#3f2a44;max-width:600px;margin:0 auto;">';
$html .= '<div style="background:' . $brand . ';color:#fff;padding:18px 22px;border-radius:12px 12px 0 0;">';
$html .= '<h2 style="margin:0;font-size:18px;">New Patient Intake Form</h2>';
$html .= '<p style="margin:4px 0 0;font-size:13px;opacity:.9;">Submitted via cajeebotes.com/patient-intake</p></div>';
$html .= '<div style="border:1px solid #e8d4e6;border-top:0;border-radius:0 0 12px 12px;padding:20px 22px;">';
$html .= '<div style="background:#f5e8f3;border:1px solid #e8d4e6;border-radius:10px;padding:14px 16px;margin-bottom:16px;">';
$html .= '<div style="font-size:12px;color:#7c5f80;font-weight:bold;letter-spacing:.05em;">PATIENT</div>';
$html .= '<div style="font-size:17px;color:' . $brand . ';font-weight:bold;margin-top:2px;">' . $sm($patientName) . '</div>';
$html .= '<table style="width:100%;font-size:13px;margin-top:10px;">';
$html .= '<tr><td style="color:#7c5f80;padding:2px 0;width:38%;">ID Number</td><td>' . $sm(field('patient_id')) . '</td></tr>';
$html .= '<tr><td style="color:#7c5f80;padding:2px 0;">Cell</td><td>' . $sm(field('patient_cell')) . '</td></tr>';
$html .= '<tr><td style="color:#7c5f80;padding:2px 0;">Medical Aid</td><td>' . $sm(field('medical_aid_name')) . ' &middot; ' . $sm(field('medical_aid_number')) . '</td></tr>';
$html .= '<tr><td style="color:#7c5f80;padding:2px 0;">Submitted</td><td>' . $sm($submittedAt) . '</td></tr>';
$html .= '</table></div>';
if ($pdfBytes !== '') {
    $html .= '<div style="background:#eef8f1;border:1px solid #bfe3cd;border-radius:10px;padding:14px 16px;color:#1e7d52;font-size:14px;">'
           . '&#128206; <b>The complete signed intake form is attached as a PDF</b> &mdash; ready to print and file.</div>';
} else {
    $html .= '<div style="background:#fdeceb;border:1px solid #f3c6c1;border-radius:10px;padding:14px 16px;color:#c0392b;font-size:13px;">'
           . '<b>The PDF could not be generated for this submission.</b> All the details are still below and in the '
           . 'plain-text part of this email, and the signature is attached as an image.<br><br>'
           . '<span style="font-size:12px;">Reason: ' . htmlspecialchars($pdfError, ENT_QUOTES) . '<br>'
           . 'Server: ' . htmlspecialchars(envSummary(), ENT_QUOTES) . '</span></div>';
}

// The signature always travels with the email, so a PDF problem can never cost you
// the signed proof of consent.
$html .= '<div style="margin-top:16px;border:1px solid #e8d4e6;border-radius:10px;padding:14px 16px;">'
       . '<div style="font-size:12px;color:#7c5f80;font-weight:bold;letter-spacing:.05em;">SIGNATURE</div>'
       . '<img src="cid:' . $sigCid . '" alt="Patient signature" style="max-width:100%;margin-top:8px;">'
       . '<div style="font-size:12px;color:#7c5f80;margin-top:6px;">'
       . $sm(field('sig_full_name')) . ' &middot; ' . $sm(field('sig_id')) . ' &middot; ' . $sm(field('sig_date'))
       . '</div></div>';

// Full field list in the email body too — searchable, and readable without opening the PDF.
foreach ($sections as $sectionTitle => $rows) {
    $html .= '<h3 style="color:' . $brand . ';border-bottom:2px solid #f5e8f3;padding-bottom:6px;margin:22px 0 8px;font-size:15px;">'
           . htmlspecialchars($sectionTitle, ENT_QUOTES) . '</h3><table style="width:100%;font-size:13px;">';
    foreach ($rows as $label => $value) {
        $html .= '<tr><td style="color:#7c5f80;padding:3px 0;width:38%;vertical-align:top;">'
               . htmlspecialchars($label, ENT_QUOTES) . '</td><td style="padding:3px 0;">' . $sm($value) . '</td></tr>';
    }
    $html .= '</table>';
}
$html .= '<p style="margin-top:16px;font-size:12px;color:#9b7a9e;">Reply to this email to contact the patient directly.</p>';
$html .= '</div></div>';

/* ------------------------- MIME assembly -------------------------- */
// multipart/mixed
//   -> multipart/related
//        -> multipart/alternative (text + html)
//        -> signature PNG (inline, referenced by cid: from the HTML)
//   -> PDF attachment

$fromHeader = addressHeader($FROM_NAME, $FROM_EMAIL);
$subject    = encodeHeaderText('New Patient Intake — ' . $patientName
             . ($pdfBytes === '' ? ' [PDF FAILED]' : ''));

$outer = 'mix_' . bin2hex(random_bytes(10));
$rel   = 'rel_' . bin2hex(random_bytes(10));
$inner = 'alt_' . bin2hex(random_bytes(10));

// Date + Message-ID are required by RFC 5322 and their absence is a strong spam signal.
$messageId = '<' . bin2hex(random_bytes(16)) . '@cajeebotes.com>';

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Date: ' . date('r') . "\r\n";
$headers .= 'Message-ID: ' . $messageId . "\r\n";
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
$headers .= 'Content-Type: multipart/mixed; boundary="' . $outer . '"' . "\r\n";

$body  = '--' . $outer . "\r\n";
$body .= 'Content-Type: multipart/related; boundary="' . $rel . '"' . "\r\n\r\n";

$body .= '--' . $rel . "\r\n";
$body .= 'Content-Type: multipart/alternative; boundary="' . $inner . '"' . "\r\n\r\n";

$body .= '--' . $inner . "\r\n";
$body .= 'Content-Type: text/plain; charset=UTF-8' . "\r\n";
$body .= 'Content-Transfer-Encoding: base64' . "\r\n\r\n" . chunk_split(base64_encode($text)) . "\r\n";

$body .= '--' . $inner . "\r\n";
$body .= 'Content-Type: text/html; charset=UTF-8' . "\r\n";
$body .= 'Content-Transfer-Encoding: base64' . "\r\n\r\n" . chunk_split(base64_encode($html)) . "\r\n";
$body .= '--' . $inner . '--' . "\r\n\r\n";

// Inline signature — the practice keeps the signed proof even if the PDF fails.
$body .= '--' . $rel . "\r\n";
$body .= 'Content-Type: image/png; name="signature.png"' . "\r\n";
$body .= 'Content-Transfer-Encoding: base64' . "\r\n";
$body .= 'Content-ID: <' . $sigCid . '>' . "\r\n";
$body .= 'Content-Disposition: inline; filename="signature.png"' . "\r\n\r\n";
$body .= chunk_split(base64_encode($sigBinary)) . "\r\n";
$body .= '--' . $rel . '--' . "\r\n\r\n";

if ($pdfBytes !== '') {
    $pdfName = 'Patient-Intake-' . trim(preg_replace('/[^A-Za-z0-9]+/', '-', $patientName), '-') . '-' . date('Y-m-d') . '.pdf';
    $body .= '--' . $outer . "\r\n";
    $body .= 'Content-Type: application/pdf; name="' . $pdfName . '"' . "\r\n";
    $body .= 'Content-Transfer-Encoding: base64' . "\r\n";
    $body .= 'Content-Disposition: attachment; filename="' . $pdfName . '"' . "\r\n\r\n";
    $body .= chunk_split(base64_encode($pdfBytes)) . "\r\n";
}
$body .= '--' . $outer . '--';

$sendErr = '';
$sent = deliver($SMTP, $TO_EMAIL, $subject, $body, $headers, $sendErr);

if (!$sent) {
    // Record the reason (no patient PII) so delivery problems can be diagnosed.
    @file_put_contents(sys_get_temp_dir() . '/fcb_intake_maillog.txt',
        date('c') . '  ' . ($SMTP['enabled'] ? 'SMTP' : 'mail()') . ' MAIN failed -> ' . $sendErr . "\n",
        FILE_APPEND | LOCK_EX);
    respond(false, "We couldn't send your form just now. Please try again in a moment, or call us on 064 652 0684.", $wantsJson, 500);
}

/* ---- Optional short acknowledgement to the patient (no medical detail) ---- */
$ackSent  = false;
$ackEmail = '';
if ($SEND_PATIENT_ACK && validEmail(field('patient_email'))) {
    $ackEmail = field('patient_email');
    $ackHead = 'MIME-Version: 1.0' . "\r\n"
             . 'Date: ' . date('r') . "\r\n"
             . 'Message-ID: <' . bin2hex(random_bytes(16)) . '@cajeebotes.com>' . "\r\n"
             . 'From: ' . $fromHeader . "\r\n"
             . 'Reply-To: ' . addressHeader($TO_NAME, $TO_EMAIL) . "\r\n"
             . 'Content-Type: text/html; charset=UTF-8' . "\r\n"
             . 'Content-Transfer-Encoding: base64' . "\r\n";
    $ackFirst = htmlspecialchars(field('patient_full_names') !== '' ? field('patient_full_names') : 'there', ENT_QUOTES);
    $ackBody = '<div style="font-family:\'DM Sans\',Arial,sans-serif;color:#3f2a44;max-width:520px;margin:0 auto;">'
             . '<div style="background:' . $brand . ';color:#fff;padding:18px 22px;border-radius:12px 12px 0 0;">'
             . '<h2 style="margin:0;font-size:18px;">Thank you, ' . $ackFirst . '</h2></div>'
             . '<div style="border:1px solid #e8d4e6;border-top:0;border-radius:0 0 12px 12px;padding:18px 22px;">'
             . '<p>Your completed intake form was emailed securely to our practice at '
             . '<strong>care@cajeebotes.com</strong> as a signed PDF. This email is your confirmation that we received it.</p>'
             . '<p>Our team will review it and be in touch to confirm your appointment.</p>'
             . '<p>If you need to reach us in the meantime, call <strong>064 652 0684</strong> or email '
             . '<a href="mailto:care@cajeebotes.com" style="color:' . $brand . ';">care@cajeebotes.com</a>.</p>'
             . '<p style="margin-top:20px;">Warm regards,<br><strong>Cajee Botes Orthotist &amp; Prosthetist</strong></p>'
             . '</div></div>';
    $ackErr  = '';
    $ackSent = deliver($SMTP, $ackEmail, encodeHeaderText('We received your intake form — Cajee Botes'), chunk_split(base64_encode($ackBody)), $ackHead, $ackErr);
    if (!$ackSent) {
        @file_put_contents(sys_get_temp_dir() . '/fcb_intake_maillog.txt',
            date('c') . '  patient ACK failed -> ' . $ackErr . "\n", FILE_APPEND | LOCK_EX);
    }
}

// The page uses these to tell the patient exactly where their form went.
respond(true, 'Thank you — your intake form has been received. Our team will be in touch shortly.', $wantsJson, 200, array(
    'practice_email' => $TO_EMAIL,
    'pdf_attached'   => $pdfBytes !== '',
    'ack_sent'       => (bool) $ackSent,
    'ack_email'      => $ackSent ? $ackEmail : '',
));
