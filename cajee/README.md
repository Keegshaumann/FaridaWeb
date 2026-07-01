# Cajee Botes Orthotist & Prosthetist — Website

The website for Cajee Botes Orthotist & Prosthetist (https://www.cajeebotes.com).

It is a single-page application: the public marketing site plus a private `/admin`
panel used to manage case studies, enquiry sign-ups, patient notes, and to view
visitor analytics. The admin features are backed by a small Supabase project that
**you set up under your own account** (see "Backend setup" below).

---

## ⚠️ Important — you must set up your own Supabase first

This website's admin panel and data features (case studies, the enquiry sign-up
form, patient notes, and analytics) run on **Supabase**. The project does **not**
come with a working backend — you have to create your own free Supabase project and
connect it.

**Until you complete the Supabase setup in Section 3:**

- The public marketing pages will display fine, but
- the **case studies**, **sign-up form**, and **admin panel will not work**.

So the correct order to go live is:

1. Set up your own Supabase project — **Section 3**.
2. Add your Supabase keys — **Section 3.4**.
3. Set your admin password — **Section 4**.
4. Build the site — `npm run build` (**Section 5**).
5. Upload the freshly built `dist/` folder to Hostinger — **Section 6**.

Do **not** upload an older build to the live site before doing steps 1–3, or the
forms and admin panel will be broken.

---

## 1. What you need

- **Node.js 18 or newer** (20+ recommended) and npm — https://nodejs.org
- A **Supabase** account (free tier is fine) — https://supabase.com
- The **Supabase CLI** (only needed to deploy the backend function) —
  https://supabase.com/docs/guides/cli
- A **Hostinger** account with your domain pointed at it

---

## 2. Run the site locally

```bash
npm install
npm run dev
```

This starts a local server (usually http://localhost:5173). The public pages will
work immediately. The admin panel and any data features will only work once the
backend is configured (next section).

---

## 3. Backend setup (Supabase)

The site talks to one Supabase project. Setting up your own takes about 15 minutes.

### 3.1 Create the project

1. Sign in to https://supabase.com and create a **New project**.
2. Choose a region close to your visitors (e.g. an EU or African region for SA traffic).
3. Wait for it to finish provisioning.

### 3.2 Create the database table

In the Supabase dashboard, open **SQL Editor** and run:

```sql
create table kv_store (
  key text not null primary key,
  value jsonb not null
);

-- Only the backend function (service role) writes to this table.
-- Enabling RLS with no policies blocks all direct public access.
alter table kv_store enable row level security;
```

This single table stores case studies, sign-ups, and patient notes.

### 3.3 Deploy the backend function

The backend is a Supabase **Edge Function** located in `supabase/functions/server`.

```bash
# Install the CLI once (or use: npx supabase ...)
npm install -g supabase

# Log in and connect to your project
supabase login
supabase link --project-ref YOUR_PROJECT_REF

# Deploy the function (its name is "server")
supabase functions deploy server
```

`YOUR_PROJECT_REF` is the value in **Project Settings → General → Reference ID**
(it's also the part before `.supabase.co` in your project URL).

The function automatically receives the `SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` it needs from Supabase — you do **not** set those
manually.

You can confirm it deployed under **Edge Functions** in the dashboard.

### 3.4 Connect the website to your project

Open **`utils/supabase/info.tsx`** and fill in your project's values from
**Project Settings → API**:

```ts
export const projectId = "YOUR_SUPABASE_PROJECT_ID"   // your Reference ID
export const publicAnonKey = "YOUR_SUPABASE_ANON_KEY" // the "anon" / "public" key
```

The anon key is meant to be public — it is safe to ship in the browser.

### 3.5 (Optional) Visitor analytics

The analytics tab in the admin panel can show real Google Analytics 4 data. If you
don't configure it, it simply shows sample numbers — everything else still works.

To enable real data, set two secrets on your Supabase project:

```bash
supabase secrets set GA4_PROPERTY_ID=your-ga4-property-id
supabase secrets set GA4_SERVICE_ACCOUNT_KEY='{...your service account JSON...}'
```

---

## 4. The admin panel

- Visit `/admin` (e.g. https://www.cajeebotes.com/admin).
- **Set your own password first.** Open `src/app/pages/AdminPage.tsx` and change:

  ```ts
  const ADMIN_PASSWORD = "CHANGE_THIS_PASSWORD";
  ```

  to a password of your choice, then rebuild (next section).

From the panel you can add/edit/delete case studies, view and remove enquiry
sign-ups, and manage patient notes.

---

## 5. Build for production

When you've set your Supabase details and admin password:

```bash
npm run build
```

This creates a **`dist/`** folder — that is the website you upload to Hostinger.
Re-run this command any time you change the code or your Supabase keys.

---

## 6. Deploy to Hostinger

1. In Hostinger, open **hPanel → File Manager** (or connect by FTP).
2. Go into **`public_html`** and remove any placeholder files there.
3. Upload **everything inside the `dist/` folder** (not the folder itself) into
   `public_html`. Make sure the hidden **`.htaccess`** file is included — in
   File Manager, enable "show hidden files" (dotfiles).
4. Make sure **SSL is active** for the domain (Hostinger → SSL; it's automatic and
   free). The included `.htaccess` forces HTTPS and the `www` version of the domain.

The `.htaccess` also makes page refreshes work correctly. Without it, opening a link
like `/about` directly would show a "Not Found" error.

### Updating the live site later

Run `npm run build` again and re-upload the contents of `dist/` to `public_html`,
overwriting the old files.

---

## 7. Security notes

Please read this before storing sensitive information.

- The `/admin` password is a **basic client-side gate**. It keeps casual visitors
  out, but a technical user could bypass it. It is fine for managing marketing
  content (case studies, enquiries), but **do not treat it as strong protection for
  confidential patient data.**
- The backend is reached using the public anon key. For genuinely sensitive records
  you should add proper Supabase authentication and row-level security policies, or
  keep that data out of this system. Consider South African POPIA requirements when
  handling patient information.

---

## 8. Project structure

```
index.html              Page shell and base SEO tags
public/                 Static files copied as-is into the build
  robots.txt            Search-engine rules
  sitemap.xml           List of pages for search engines
  .htaccess             Hostinger routing, HTTPS, caching, security headers
  logo.png              Favicon / social image
src/
  app/pages/            One file per page (home, about, services, admin, ...)
  app/components/        Shared UI, including SEO.tsx (per-page meta + schema)
  app/routes.tsx        URL -> page mapping
  assets/               Images (optimised WebP)
  styles/               Global styles and theme
utils/supabase/info.tsx Your Supabase project id + anon key
supabase/functions/server/  The backend Edge Function (deployed to Supabase)
vite.config.ts          Build configuration
```

---

## 9. Updating SEO

- Page titles, descriptions, and structured data live in each page via the
  `SEO` component (`src/app/components/SEO.tsx`).
- If you add a new page, also add its URL to `public/sitemap.xml`.
- The site is set to be indexed by search engines. Submit your `sitemap.xml` in
  Google Search Console (https://search.google.com/search-console) after launch.
