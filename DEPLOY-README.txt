CAJEE BOTES WEBSITE — HOSTINGER DEPLOYMENT GUIDE
================================================

WHAT YOU HAVE
-------------
cajee-hostinger.zip   The website, ready to upload. Contains index.html, the
                      assets/ folder, the local images (external/), and the
                      .htaccess files. This is the ONLY thing you upload.
cajee-site/           The same files unzipped, in case you want to look inside.

This is a static build of the React site. No Node, no server runtime needed —
Hostinger just serves the files.


HOW TO PUBLISH (Hostinger File Manager)
---------------------------------------
1. hPanel  ->  Websites  ->  your site  ->  File Manager.
2. Open the public_html folder. Delete any default index.html / default.php.
3. Upload cajee-hostinger.zip into public_html.
4. Right-click the zip  ->  Extract  ->  extract into public_html.
5. Delete the zip. You should now see index.html, assets/, external/,
   .htaccess directly inside public_html (NOT inside a sub-folder).
6. Make sure "Show hidden files (dotfiles)" is ON in File Manager settings so
   you can see the .htaccess file — it must be present.
7. Visit your URL.

IMPORTANT: the files must sit at the ROOT of the site (public_html), not in a
sub-folder like public_html/cajee-site/. The site loads its assets from "/",
so a sub-folder would show a blank page.


TWO .htaccess FILES — WHICH IS WHICH
------------------------------------
.htaccess              <- ACTIVE now. Testing-safe. Does NOT force www/HTTPS,
                          so it works on a temporary Hostinger URL.
.htaccess.production   <- For when you go LIVE on www.cajeebotes.com. It forces
                          HTTPS + the www domain (matches the SEO/canonical URLs).

TO GO LIVE on the real domain:
  - First make sure SSL is active for the domain (hPanel -> Security -> SSL).
  - In File Manager: rename .htaccess to .htaccess.testing (keep as backup),
    then rename .htaccess.production to .htaccess.
That's it.


WHAT WAS CHANGED FROM YOUR ORIGINAL ARCHIVE
-------------------------------------------
- All 15 Unsplash images were downloaded and are now served from /external/.
  The site no longer depends on Unsplash for any image.
- The active .htaccess was made testing-safe (no forced www/HTTPS redirect).
- The site was rebuilt from source with `vite build` on macOS.


STILL EXTERNAL / NOT YET CONFIGURED (optional, for later)
---------------------------------------------------------
- Google Fonts (DM Sans) loads from Google. Normal and fine; can be self-hosted
  later if you want zero third-party requests.
- Google Analytics (gtag) loads from Google. Only matters if you set up GA.
- Supabase backend is a PLACEHOLDER (your_supabase_project_id.supabase.co).
  Until you create a Supabase project and plug in the real URL/key, these
  features will not work:
      * Case Studies / "Success Stories" (admin panel adds these to Supabase)
      * The /admin panel
      * Visitor analytics dashboard
  The rest of the public site (pages, services, contact via phone/email/
  WhatsApp) works fully without any backend.


CONTACT DETAILS BAKED INTO THE SITE
-----------------------------------
Phone:    064 652 0684
Email:    care@cajeebotes.com
These come through tel:/mailto:/WhatsApp links and need no backend.
