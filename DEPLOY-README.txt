CAJEE BOTES WEBSITE — HOSTINGER DEPLOYMENT GUIDE
================================================

PUSHING TO GITHUB DOES NOT PUBLISH ANYTHING
-------------------------------------------
There is no build or deploy action in this repository, on any branch. A push
to GitHub changes GitHub and nothing else. The live site only changes when a
person uploads files to Hostinger by hand.

(If Hostinger's own Git deployment feature has been switched on in hPanel,
that would pull a branch on its own. Nobody here has checked hPanel, so treat
that as unknown rather than as "no".)


!!! BEFORE YOU REDEPLOY — TWO RULES !!!
---------------------------------------

RULE 1 — do NOT delete this file on the server:

    public_html/patient-intake/mail-config.php

It holds the care@cajeebotes.com mailbox password, so it is kept out of GitHub
and is NOT part of any upload. Uploading new files over the top of it is safe —
it is left alone. It only vanishes if you empty the patient-intake folder first.

If it does get deleted, the intake form still sends, but the emails may start
going to spam. To fix it: open your local patient-intake folder, copy
mail-config.php, and upload that one file back to public_html/patient-intake/.

Everything else in patient-intake/ can be overwritten freely.

RULE 2 — 404.html must reach the server before, or in the same upload as,
the .htaccess that points at it.

The .htaccess ends with:

    ErrorDocument 404 /404.html

If that .htaccess is live and /404.html is missing, Apache cannot show the
error page it was told to show, and every mistyped or dead address on a health
practice's site answers with a bare server message reading "additionally, a 404
Not Found error was encountered while trying to use an ErrorDocument". Upload
the whole folder in one go and this cannot happen. Only a partial upload —
.htaccess on its own — can cause it.


WHAT YOU UPLOAD
---------------
The ROOT of this repository is the site, ready to upload: index.html, 404.html,
assets/, external/, the page folders (about/, blog/, services/, conditions/,
contact/, devices/, anatomy/, privacy-policy/, terms-and-conditions/),
patient-intake/, robots.txt, sitemap.xml, llms.txt, logo.png, og-image.jpg and
the two .htaccess files.

That is the only copy to deploy from. Do not upload:
  cajee/              the React source and its build folder (see below)
  DEPLOY-README.txt   this file
  .gitignore, .gitattributes

The `deploy` branch in this repository is an ABANDONED older copy of the site
from July 2026. It is a different, pre-prerendering build. Do not deploy from
it and do not merge it.

This is a static site. No Node, no server runtime — Hostinger just serves the
files. The one exception is patient-intake/, which is PHP and runs on the
server; it is not produced by the build and must not be deleted from the root.


HOW TO PUBLISH (Hostinger File Manager)
---------------------------------------
1. hPanel  ->  Websites  ->  your site  ->  File Manager.
2. Open the public_html folder.
3. Upload the contents of the repository root into public_html. If you zip it
   first, extract into public_html and then delete the zip.
4. You should see index.html, 404.html, assets/, external/ and the page folders
   directly inside public_html (NOT inside a sub-folder).
5. Make sure "Show hidden files (dotfiles)" is ON in File Manager settings so
   you can see the .htaccess file — it must be present.
6. Visit the site and check, at minimum:
       /                                   loads
       /about                              loads (a prerendered folder)
       /some-address-that-does-not-exist   shows the site's own 404 page
       /404.html                           shows the site's own 404 page

IMPORTANT: the files must sit at the ROOT of the site (public_html), not in a
sub-folder. The site loads its assets from "/", so a sub-folder shows a blank
page.


TWO .htaccess FILES — WHICH IS WHICH
------------------------------------
.htaccess              Testing-safe. Does NOT force www/HTTPS, so it works on a
                       temporary Hostinger URL.
.htaccess.production   For the live domain www.cajeebotes.com. Forces HTTPS and
                       the www host, which is what the canonical tags and the
                       sitemap use.

TO GO LIVE on the real domain:
  - First make sure SSL is active for the domain (hPanel -> Security -> SSL).
  - In File Manager: rename .htaccess to .htaccess.testing (keep as backup),
    then rename .htaccess.production to .htaccess.

Both files now end in ErrorDocument 404 /404.html, so Rule 2 above applies to
whichever one is in place.


REBUILDING FROM SOURCE
----------------------
cajee/dist is BUILD OUTPUT. It is not stored in this repository (it is in
.gitignore), so a fresh clone has no cajee/dist at all until you run the build
below. If you do have one on your machine, it is whatever you last built and
may be older than the source - never copy it over the root without rebuilding
first. The copy that is stored, and the copy you upload, is the repository
ROOT.

    cd cajee
    npm install
    node scripts/sitemap.mjs      # refreshes the dates in public/sitemap.xml
    npm run build                 # vite build -> cajee/dist
    npm run prerender             # one real HTML file per route into cajee/dist

Then copy the contents of cajee/dist over the repository root, leaving
patient-intake/, DEPLOY-README.txt, .gitignore and .gitattributes alone, and
delete any old hashed files in assets/ that the new build replaced.
Copy cajee/public/sitemap.xml over the root sitemap.xml as well - the build
does that for you inside cajee/dist, so copying dist over the root covers it.

    scripts/sitemap.mjs     Rewrites public/sitemap.xml: every address it had
                            before plus any new blog article, each with a real
                            last-changed date (an article's own dateUpdated;
                            for other pages, the last commit that touched what
                            that page is built from). It needs git, and it
                            refuses to write a sitemap that would drop an
                            address. Run it before a rebuild so the dates are
                            true on the day the files go up.

    scripts/image-sizes.mjs Rewrites src/app/data/image-sizes.ts, the map of
                            real pixel sizes that puts width and height on
                            every <img>. Run it after adding, replacing or
                            resizing any image in public/ or src/assets/,
                            otherwise the new image ships with no size and the
                            page can jump as it loads. It refuses to run if two
                            images share a file name but are different sizes.

    The prerender step will use Edge, then Chrome, whichever starts first, or
    the browser at PRERENDER_BROWSER if you set it.

There is NO Single Page App catch-all in .htaccess any more. Every public
address is a real prerendered file. That is deliberate: the old catch-all made
every made-up address answer 200 with the homepage, which let junk URLs into
Google's index as if they were real pages.

Because of that: A NEW ROUTE MUST BE ADDED TO THE ROUTES LIST IN
cajee/scripts/prerender.mjs. If it is not, it will work inside the app but 404
on a direct visit or for Google.


STILL EXTERNAL / NOT YET CONFIGURED (optional, for later)
---------------------------------------------------------
- Google Fonts (DM Sans) loads from Google. Normal and fine; can be self-hosted
  later if you want zero third-party requests.
- Google Analytics (gtag) loads from Google. Only matters if GA is set up.
- There is no backend. The /admin panel and its Supabase placeholder keys were
  removed from the site in September 2026, and the current bundle contains no
  Supabase URL or key at all. The public site (pages, services, contact via
  phone, email and WhatsApp, and the patient intake form) needs no backend.


CONTACT DETAILS BAKED INTO THE SITE
-----------------------------------
Phone:    079 998 2203
Email:    care@cajeebotes.com
These come through tel:/mailto:/WhatsApp links and need no backend.
