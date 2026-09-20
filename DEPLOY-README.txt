CAJEE BOTES WEBSITE — HOSTINGER DEPLOYMENT GUIDE
================================================

THE SITE DEPLOYS FROM THIS REPOSITORY
-------------------------------------
Hostinger is connected to this GitHub repository and serves the `main` branch.
To publish: commit to `main`, push, then click Deploy in hPanel (Advanced ->
Git). Nobody uploads files by hand.

If you find yourself in the File Manager moving files around, stop. Something is
misconfigured, and the deployment settings are what to fix, not the files.

  CORRECTED 20 SEPTEMBER 2026. This section used to say, in capitals, that
  pushing to GitHub publishes nothing and that the live site only changes when
  someone uploads by hand. That was wrong. It cost an afternoon of uploading,
  deleting and cache-purging that could never have worked.

  It did carry a caveat saying nobody had actually checked hPanel. The lesson:
  a caveat like that is a job to go and do, not a footnote to skip past.


!!! ONE FILE LIVES ONLY ON THE SERVER !!!
-----------------------------------------

A deploy does not touch it, but emptying the folder by hand would:

    public_html/patient-intake/mail-config.php

It holds the care@cajeebotes.com mailbox password, so it is deliberately kept
out of GitHub. A deploy leaves it alone. It only vanishes if someone empties the
patient-intake folder by hand.

If it does get deleted, the intake form still sends, but the emails may start
going to spam. To fix it: open your local patient-intake folder, copy
mail-config.php, and put that one file back in public_html/patient-intake/.

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


WHAT GETS SERVED
----------------
The ROOT of this repository is the site: index.html, 404.html,
assets/, external/, the page folders (about/, blog/, services/, conditions/,
contact/, devices/, anatomy/, privacy-policy/, terms-and-conditions/),
patient-intake/, robots.txt, sitemap.xml, llms.txt, logo.png, og-image.jpg and
the two .htaccess files.

That is the only copy to deploy from. Not served:
  cajee/              the React source and its build folder (see below)
  DEPLOY-README.txt   this file
  .gitignore, .gitattributes

The `deploy` branch in this repository is an ABANDONED older copy of the site
from July 2026. It is a different, pre-prerendering build. Do not deploy from
it and do not merge it.

This is a static site. No Node, no server runtime — Hostinger just serves the
files. The one exception is patient-intake/, which is PHP and runs on the
server; it is not produced by the build and must not be deleted from the root.


HOW TO PUBLISH
--------------
1. Commit to `main` and push.
2. hPanel -> Websites -> cajeebotes.com -> Advanced -> Git, then Deploy.
3. Check the site:
       /                                   loads
       /about                              loads (a prerendered folder)
       /some-address-that-does-not-exist   returns a real 404, not the homepage
       /404.html                           shows the site's own 404 page

TO CHECK A DEPLOY ACTUALLY LANDED, compare the live file against what git
stores, NOT against your local copy. This repository normalises line endings
(.gitattributes sets `* text=auto`), so a local file differs in size from the
served one even when the content is identical:

    git show main:index.html > expected.html
    curl -s https://www.cajeebotes.com/index.html > live.html
    cmp expected.html live.html && echo "live matches main"

IF A DEPLOY REPORTS SUCCESS AND THE SITE DOES NOT CHANGE, check the install
path before anything else. Hostinger will not install a Git deployment into a
folder that already has files in it, so a deployment can end up pointed
somewhere harmless like `/` — quietly publishing to the account root instead of
the website. That exact fault was found on the sister site cognexa.co.za on
20 September 2026, after it had been silently broken for an unknown length of
time. Fixing it meant deleting the repository entry, emptying public_html, and
adding it again with the Directory field left blank.


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
