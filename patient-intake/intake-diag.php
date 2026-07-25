<?php
/**
 * TEMPORARY diagnostic for the Cajee Botes intake form.
 * ------------------------------------------------------
 * Upload next to intake-send.php, then open once in a browser:
 *
 *     https://www.cajeebotes.com/patient-intake/intake-diag.php?key=cajee-intake-check
 *
 * It reports what the SERVER can actually do — PHP version, extensions, whether
 * the PDF builds, and (optionally) sends a real test submission through the live
 * form so you can confirm the PDF lands in care@cajeebotes.com.
 *
 *     ...?key=cajee-intake-check&pdf=1     download the test PDF it generated
 *     ...?key=cajee-intake-check&send=1    send a real test submission to the practice
 *
 * >>> DELETE THIS FILE once the form is confirmed working. <<<
 */

$KEY = 'cajee-intake-check';   // must match the ?key= in the URL

header('X-Robots-Tag: noindex, nofollow');

if (!isset($_GET['key']) || $_GET['key'] !== $KEY) {
    http_response_code(403);
    header('Content-Type: text/plain; charset=utf-8');
    echo "Not authorised. Add ?key=" . $KEY . " to the URL.\n";
    exit;
}

/* ------------------------------------------------------------------ */
/* Sample submission used for every test below                         */
/* ------------------------------------------------------------------ */

function sample_fields() {
    return array(
        'referring_doctor' => 'Dr Test (diagnostic)',
        'member_surname' => 'Test', 'member_full_names' => 'Diagnostic Submission',
        'member_id' => '0000000000000', 'member_age' => '40', 'member_cell' => '0000000000',
        'member_email' => '', 'member_workplace' => 'N/A', 'member_contact_no' => '',
        'member_address' => 'This is an automated test of the intake form.',
        'medical_aid_name' => 'TEST', 'medical_aid_option' => 'TEST', 'medical_aid_number' => '0000',
        'patient_surname' => 'Test', 'patient_full_names' => 'Diagnostic Submission',
        'patient_id' => '0000000000000', 'patient_age' => '40', 'patient_cell' => '0000000000',
        'patient_email' => '', 'patient_workplace' => '', 'patient_contact_no' => '',
        'patient_address' => 'Please ignore and delete this test.',
        'diagnosis' => 'TEST SUBMISSION — not a real patient',
        'date_of_injury' => '', 'allergies' => 'None', 'chronic_conditions' => 'None',
        'emergency_contact' => 'Test', 'emergency_number' => '0000000000',
        'consent_terms' => 'yes', 'consent_popia' => 'yes', 'consent_version' => 'DIAGNOSTIC',
        'sig_full_name' => 'Diagnostic Submission', 'sig_id' => '0000000000000',
        'sig_date' => date('Y-m-d'),
    );
}

/** A small PNG "signature" so the test exercises the same code path as a patient. */
function sample_signature_png() {
    if (!function_exists('imagecreatetruecolor')) return '';
    $im = imagecreatetruecolor(600, 200);
    imagesavealpha($im, true);
    imagefill($im, 0, 0, imagecolorallocatealpha($im, 255, 255, 255, 127));
    $ink = imagecolorallocate($im, 20, 20, 20);
    imageline($im, 40, 150, 240, 60, $ink);
    imageline($im, 240, 60, 380, 150, $ink);
    imageline($im, 380, 150, 560, 70, $ink);
    ob_start(); imagepng($im); $png = ob_get_clean();
    return $png;
}

/* ------------------------------------------------------------------ */
/* Build the PDF right here, on this server                            */
/* ------------------------------------------------------------------ */

@ini_set('memory_limit', '256M');

$pdfBytes = '';
$pdfError = '';
$pdfTrace = '';
try {
    foreach (array('/intake-pdf.php', '/lib/fpdf.php', '/lib/font/helvetica.php') as $needed) {
        if (!is_readable(__DIR__ . $needed)) throw new RuntimeException('Missing file: patient-intake' . $needed);
    }
    require_once __DIR__ . '/intake-pdf.php';

    $sigPath = '';
    $png = sample_signature_png();
    if ($png !== '' && function_exists('imagecreatefromstring')) {
        $src = @imagecreatefromstring($png);
        if ($src) {
            $dst = imagecreatetruecolor(imagesx($src), imagesy($src));
            imagefilledrectangle($dst, 0, 0, imagesx($src), imagesy($src), imagecolorallocate($dst, 255, 255, 255));
            imagealphablending($dst, true);
            imagecopy($dst, $src, 0, 0, 0, 0, imagesx($src), imagesy($src));
            $tmp = @tempnam(sys_get_temp_dir(), 'fcbdiag');
            if ($tmp) { @imagejpeg($dst, $tmp, 92); $sigPath = $tmp; }
        }
    }

    $pdfBytes = build_intake_pdf(sample_fields(), $sigPath);
    if ($sigPath !== '' && is_file($sigPath)) @unlink($sigPath);
    if (!is_string($pdfBytes) || $pdfBytes === '') { $pdfBytes = ''; $pdfError = 'The builder returned no data.'; }
} catch (Throwable $e) {
    $pdfBytes = '';
    $pdfError = get_class($e) . ': ' . $e->getMessage() . '  (' . $e->getFile() . ' line ' . $e->getLine() . ')';
    $pdfTrace = $e->getTraceAsString();
}

// ?pdf=1 — hand back the generated PDF so you can see what the practice would receive.
if (isset($_GET['pdf']) && $pdfBytes !== '') {
    header('Content-Type: application/pdf');
    header('Content-Disposition: inline; filename="intake-diagnostic.pdf"');
    echo $pdfBytes;
    exit;
}

/* ------------------------------------------------------------------ */
/* Optionally push a REAL submission through the live form             */
/* ------------------------------------------------------------------ */

$sendResult = '';
if (isset($_GET['send'])) {
    $post = sample_fields();
    $post['form_elapsed']    = '120';
    $post['website']         = '';
    $png = sample_signature_png();
    $post['signature_image'] = $png !== '' ? 'data:image/png;base64,' . base64_encode($png) : '';

    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $url    = $scheme . '://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']) . '/intake-send.php';

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, array(
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query($post),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 60,
            CURLOPT_HTTPHEADER => array('X-Requested-With: XMLHttpRequest', 'Accept: application/json'),
        ));
        $resp = curl_exec($ch);
        $sendResult = ($resp === false) ? 'cURL error: ' . curl_error($ch) : $resp;
        curl_close($ch);
    } else {
        $ctx = stream_context_create(array('http' => array(
            'method' => 'POST', 'timeout' => 60,
            'header' => "Content-Type: application/x-www-form-urlencoded\r\nX-Requested-With: XMLHttpRequest\r\nAccept: application/json\r\n",
            'content' => http_build_query($post),
        )));
        $resp = @file_get_contents($url, false, $ctx);
        $sendResult = ($resp === false) ? 'Request failed (allow_url_fopen may be off, and cURL is unavailable).' : $resp;
    }
}

/* ------------------------------------------------------------------ */
/* Report                                                              */
/* ------------------------------------------------------------------ */

$files = array(
    'intake-send.php', 'intake-pdf.php', 'mail-config.php',
    'lib/fpdf.php', 'lib/font/helvetica.php', 'lib/font/helveticab.php', 'lib/logo.jpg',
);

$mailcfgOk = false; $smtpMode = 'PHP mail()';
$cfg = @include __DIR__ . '/mail-config.php';
if (is_array($cfg)) {
    $mailcfgOk = true;
    if (isset($cfg['smtp_pass']) && trim($cfg['smtp_pass']) !== '') {
        $smtpMode = 'SMTP ' . (isset($cfg['smtp_host']) ? $cfg['smtp_host'] : '?') . ':' . (isset($cfg['smtp_port']) ? $cfg['smtp_port'] : '?');
    }
}

$logFile = sys_get_temp_dir() . '/fcb_intake_maillog.txt';
$logTail = is_readable($logFile) ? implode("\n", array_slice(preg_split('/\r?\n/', trim(@file_get_contents($logFile))), -15)) : '(no log entries yet)';

function row($label, $ok, $detail) {
    echo '<tr><td>' . htmlspecialchars($label, ENT_QUOTES) . '</td>'
       . '<td style="color:' . ($ok ? '#1e7d52' : '#c0392b') . ';font-weight:600">' . ($ok ? 'OK' : 'PROBLEM') . '</td>'
       . '<td>' . htmlspecialchars($detail, ENT_QUOTES) . '</td></tr>';
}

header('Content-Type: text/html; charset=utf-8');
?>
<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>Intake form diagnostic</title>
<style>
body{font-family:system-ui,-apple-system,sans-serif;background:#f5e8f3;color:#3f2a44;margin:0;padding:28px 16px}
.wrap{max-width:820px;margin:0 auto;background:#fff;border-radius:16px;padding:30px;box-shadow:0 10px 40px -12px rgba(94,51,98,.3)}
h1{margin:0 0 4px;font-size:22px;color:#5e3362}h2{font-size:15px;margin:26px 0 8px;color:#5e3362}
table{width:100%;border-collapse:collapse;font-size:13.5px}td{padding:7px 8px;border-bottom:1px solid #f0e2f0;vertical-align:top}
td:first-child{width:34%;color:#7c5f80}td:nth-child(2){width:14%}
pre{background:#faf3fb;border:1px solid #e8d4e6;border-radius:10px;padding:12px;font-size:12.5px;white-space:pre-wrap;overflow-x:auto}
.btn{display:inline-block;margin:6px 8px 0 0;padding:10px 16px;background:#5e3362;color:#fff;text-decoration:none;border-radius:8px;font-size:14px}
.note{background:#fdeceb;border:1px solid #f3c6c1;border-radius:10px;padding:12px 14px;font-size:13px;color:#c0392b;margin-top:22px}
</style></head><body><div class="wrap">
<h1>Patient intake form — server diagnostic</h1>
<p style="color:#7c5f80;font-size:13.5px;margin:0">Run on <?php echo htmlspecialchars(date('D, d M Y H:i'), ENT_QUOTES); ?> (server time)</p>

<h2>PDF generation</h2>
<table>
<?php
row('Build the intake PDF', $pdfBytes !== '', $pdfBytes !== '' ? number_format(strlen($pdfBytes)) . ' bytes generated' : $pdfError);
if ($pdfTrace !== '') echo '<tr><td>Stack trace</td><td></td><td><pre>' . htmlspecialchars($pdfTrace, ENT_QUOTES) . '</pre></td></tr>';
?>
</table>
<?php if ($pdfBytes !== ''): ?>
<a class="btn" href="?key=<?php echo urlencode($KEY); ?>&amp;pdf=1">Open the generated PDF</a>
<?php endif; ?>

<h2>Live end-to-end test</h2>
<p style="font-size:13.5px;color:#7c5f80;margin:0 0 8px">
Sends a real (clearly marked) test submission through the live form to <b><?php echo htmlspecialchars($mailcfgOk && isset($cfg['to_email']) ? $cfg['to_email'] : 'care@cajeebotes.com', ENT_QUOTES); ?></b>.
</p>
<a class="btn" href="?key=<?php echo urlencode($KEY); ?>&amp;send=1">Send a test submission now</a>
<?php if ($sendResult !== ''): ?>
<pre><?php echo htmlspecialchars($sendResult, ENT_QUOTES); ?></pre>
<p style="font-size:13.5px"><b>"pdf_attached":true</b> means the PDF left this server attached to the email. If it says <b>false</b>, the reason is in the PDF section above.</p>
<?php endif; ?>

<h2>Files on the server</h2>
<table>
<?php
foreach ($files as $f) {
    $p = __DIR__ . '/' . $f;
    row($f, is_readable($p), is_readable($p) ? number_format(filesize($p)) . ' bytes' : 'missing or unreadable');
}
row('mail-config.php loads', $mailcfgOk, $mailcfgOk ? 'delivery mode: ' . $smtpMode : 'not returning a config array');
?>
</table>

<h2>PHP environment</h2>
<table>
<?php
row('PHP version', version_compare(PHP_VERSION, '7.2', '>='), PHP_VERSION);
row('memory_limit', true, ini_get('memory_limit'));
foreach (array('gd', 'iconv', 'mbstring', 'openssl', 'curl') as $e) {
    row('Extension: ' . $e, extension_loaded($e), extension_loaded($e) ? 'loaded' : 'NOT loaded');
}
row('Temp dir writable', is_writable(sys_get_temp_dir()), sys_get_temp_dir());
?>
</table>

<h2>Recent mail log</h2>
<pre><?php echo htmlspecialchars($logTail, ENT_QUOTES); ?></pre>

<div class="note"><b>Delete intake-diag.php from the server</b> once the form is confirmed working — it can send email and reveal server details.</div>
</div></body></html>
