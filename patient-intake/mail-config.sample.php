<?php
/**
 * TEMPLATE ONLY — this file does nothing.
 * ---------------------------------------
 * The REAL file is called mail-config.php and it lives ONLY on the server, at
 * public_html/patient-intake/mail-config.php. It is deliberately kept out of
 * GitHub because it holds the care@cajeebotes.com mailbox password, and this
 * repository is public.
 *
 * >>> NEVER DELETE mail-config.php FROM THE SERVER. <<<
 * Uploading new files over the top of it is fine — it is not part of any upload,
 * so a normal redeploy leaves it alone. It only disappears if you empty the
 * patient-intake folder before uploading. If that ever happens, the intake form
 * keeps working but its emails may start landing in spam.
 *
 * TO RESTORE IT: copy this file, rename the copy to mail-config.php, paste the
 * mailbox password into smtp_pass, and upload it to public_html/patient-intake/.
 * (You also have a working copy on your Mac at the same path in this folder —
 * it just doesn't get committed to GitHub.)
 */

return array(
    // Where completed intake forms are delivered:
    'to_email'    => 'care@cajeebotes.com',
    'to_name'     => 'Cajee Botes Orthotist & Prosthetist',

    // The "From" address (must be your own domain mailbox):
    'from_email'  => 'care@cajeebotes.com',
    'from_name'   => 'Cajee Botes Website',

    // SMTP — cajeebotes.com email is on its own mail server (NOT Hostinger).
    'smtp_host'   => 'mail.cajeebotes.com',
    'smtp_port'   => 465,          // 465 = SSL | 587 = STARTTLS
    'smtp_secure' => 'ssl',        // 'ssl' for 465, 'tls' for 587
    'smtp_user'   => 'care@cajeebotes.com',
    'smtp_pass'   => 'PASTE_THE_MAILBOX_PASSWORD_HERE',
);
