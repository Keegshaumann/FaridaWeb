<?php
/**
 * ONE-TIME SMTP diagnostic for the Cajee Botes intake form.
 * ---------------------------------------------------------
 * Uploads alongside intake-send.php + mail-config.php. Open it once in a browser:
 *
 *     https://www.cajeebotes.com/patient-intake/smtp-test.php?key=cajee-smtp-check
 *
 * It reads mail-config.php, tries to authenticate to your SMTP server, and sends
 * a single test email to the practice inbox — then tells you exactly what happened.
 *
 * >>> DELETE THIS FILE once email is confirmed working. <<<
 */

$KEY = 'cajee-smtp-check';   // change if you like; must match the ?key= in the URL
header('Content-Type: text/html; charset=utf-8');
header('X-Robots-Tag: noindex, nofollow');

function out($ok, $title, $lines) {
    $c = $ok ? '#1e7d52' : '#c0392b';
    echo '<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex,nofollow">'
       . '<title>SMTP test</title><body style="font-family:system-ui,sans-serif;background:#f5e8f3;margin:0;'
       . 'display:flex;min-height:100vh;align-items:center;justify-content:center">'
       . '<div style="background:#fff;max-width:620px;padding:34px;border-radius:16px;color:#3f2a44;'
       . 'box-shadow:0 10px 40px -12px rgba(94,51,98,.3)">'
       . '<h1 style="color:' . $c . ';margin:0 0 14px">' . htmlspecialchars($title) . '</h1><pre style="white-space:pre-wrap;'
       . 'background:#faf3fb;border:1px solid #e8d4e6;border-radius:10px;padding:14px;font-size:13px;line-height:1.5">'
       . htmlspecialchars(implode("\n", $lines)) . '</pre>'
       . '<p style="color:#7c5f80;font-size:13px;margin-top:16px">When email is working, <b>delete smtp-test.php</b> from the server.</p>'
       . '</div></body>';
    exit;
}

if (!isset($_GET['key']) || $_GET['key'] !== $KEY) {
    http_response_code(403);
    out(false, 'Not authorised', array('Add ?key=' . $KEY . ' to the URL to run the SMTP test.'));
}

define('FCB_INTAKE', 1);
$cfg = @include __DIR__ . '/mail-config.php';
if (!is_array($cfg)) out(false, 'mail-config.php not found', array('Upload mail-config.php next to this file first.'));

$host   = isset($cfg['smtp_host'])   ? $cfg['smtp_host']   : 'smtp.hostinger.com';
$port   = isset($cfg['smtp_port'])   ? (int) $cfg['smtp_port'] : 465;
$secure = isset($cfg['smtp_secure']) ? $cfg['smtp_secure'] : 'ssl';
$user   = isset($cfg['smtp_user'])   ? $cfg['smtp_user']   : '';
$pass   = isset($cfg['smtp_pass'])   ? $cfg['smtp_pass']   : '';
$from   = isset($cfg['from_email'])  ? $cfg['from_email']  : $user;
$to     = isset($cfg['to_email'])    ? $cfg['to_email']    : $user;

if (trim($pass) === '') {
    out(false, 'No SMTP password set', array(
        'mail-config.php loaded, but smtp_pass is empty.',
        'Paste the ' . $user . ' mailbox password into smtp_pass and reload this page.'));
}

$log = array();
$log[] = 'Host   : ' . $host . ':' . $port . ' (' . $secure . ')';
$log[] = 'User   : ' . $user;
$log[] = 'From/To: ' . $from . '  ->  ' . $to;
$log[] = str_repeat('-', 40);

$transport = ($secure === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
$ctx = stream_context_create(array('ssl' => array('verify_peer' => true, 'verify_peer_name' => true, 'SNI_enabled' => true)));
$fp = @stream_socket_client($transport, $errno, $errstr, 20, STREAM_CLIENT_CONNECT, $ctx);
if (!$fp) out(false, 'Could not connect', array_merge($log, array('Connection failed: ' . $errstr . ' (' . $errno . ')',
    'If this is a timeout, port ' . $port . ' may be blocked — try 587 with smtp_secure = tls.')));
stream_set_timeout($fp, 20);

$get = function () use ($fp) { $d = ''; while (($l = fgets($fp, 600)) !== false) { $d .= $l; if (strlen($l) < 4 || $l[3] === ' ') break; } return $d; };
$put = function ($c) use ($fp) { fwrite($fp, $c . "\r\n"); };

function chk($resp, $expect, $label, $fp, $log) {
    if (strncmp($resp, $expect, strlen($expect)) !== 0) {
        @fclose($fp);
        out(false, 'SMTP failed at: ' . $label, array_merge($log, array('Server said: ' . trim($resp),
            $label === 'password/login' ? 'Most likely: wrong mailbox password, or SMTP auth not enabled for this mailbox.' : '')));
    }
    return trim($resp);
}

$log[] = 'greeting  : ' . chk($get(), '220', 'greeting', $fp, $log);
$put('EHLO cajeebotes.com'); $log[] = 'EHLO      : ok';  chk($get(), '250', 'EHLO', $fp, $log);
if ($secure === 'tls') {
    $put('STARTTLS'); chk($get(), '220', 'STARTTLS', $fp, $log);
    $m = STREAM_CRYPTO_METHOD_TLS_CLIENT; if (defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')) $m |= STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
    if (!@stream_socket_enable_crypto($fp, true, $m)) { @fclose($fp); out(false, 'STARTTLS negotiation failed', $log); }
    $put('EHLO cajeebotes.com'); chk($get(), '250', 'EHLO-2', $fp, $log);
}
$put('AUTH LOGIN');            chk($get(), '334', 'AUTH', $fp, $log);
$put(base64_encode($user));    chk($get(), '334', 'username', $fp, $log);
$put(base64_encode($pass));    chk($get(), '235', 'password/login', $fp, $log);
$log[] = 'auth      : SUCCESS';
$put('MAIL FROM:<' . $from . '>'); chk($get(), '250', 'MAIL FROM', $fp, $log);
$put('RCPT TO:<' . $to . '>');     chk($get(), '25',  'RCPT TO', $fp, $log);
$put('DATA');                      chk($get(), '354', 'DATA', $fp, $log);

$msgId = '<' . bin2hex(random_bytes(12)) . '@cajeebotes.com>';
$msg = 'Date: ' . date('r') . "\r\n"
     . 'Message-ID: ' . $msgId . "\r\n"
     . 'From: Cajee Botes Website <' . $from . ">\r\n"
     . 'To: <' . $to . ">\r\n"
     . 'Subject: SMTP test - intake form' . "\r\n"
     . 'Content-Type: text/plain; charset=UTF-8' . "\r\n\r\n"
     . "This is a test email from smtp-test.php. If you can read this in the care@cajeebotes.com inbox, SMTP works and the intake form will deliver.\r\n";
$msg = preg_replace('/^\./m', '..', $msg);
fwrite($fp, $msg . "\r\n.\r\n");
$final = chk($get(), '250', 'message accepted', $fp, $log);
$put('QUIT'); @fclose($fp);

$log[] = 'send      : ' . $final;
out(true, 'SUCCESS — test email sent', array_merge($log, array('',
    'Now check the ' . $to . ' inbox (and Spam) for "SMTP test - intake form".',
    'If it arrived, the intake form will now deliver reliably. DELETE this file.')));
