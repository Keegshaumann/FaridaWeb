// Prerenders every public route of the built SPA into static HTML so that
// search engines and AI crawlers reading raw HTML see the full page content
// (title, meta, headings, text, JSON-LD) without executing JavaScript.
// The client bundle still loads afterwards and takes over as a normal SPA.
//
// Usage: node scripts/prerender.mjs   (run AFTER `npm run build`)
// Requires Microsoft Edge (used headless via puppeteer-core; no download).

import { createServer } from "node:http";
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const PORT = 4180;

const EDGE_PATHS = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const executablePath = EDGE_PATHS.find((p) => existsSync(p));
if (!executablePath) throw new Error("Microsoft Edge not found for prerendering");

// Blog slugs come straight from the data file so new posts prerender automatically.
const blogData = readFileSync(join(DIST, "..", "src", "app", "data", "blog-posts.ts"), "utf8");
const blogSlugs = [...blogData.matchAll(/"slug":\s*"([^"]+)"/g)].map((m) => m[1]);

const ROUTES = [
  "/",
  "/about",
  "/services",
  "/conditions",
  "/contact",
  "/case-studies",
  "/blog",
  ...blogSlugs.map((s) => `/blog/${s}`),
  "/services/prosthetics",
  "/services/custom-orthotics",
  "/services/off-the-shelf-orthotics",
  "/services/compression",
  "/services/mobility-aids",
  "/services/breast-prosthetics",
  "/privacy-policy",
  "/terms-and-conditions",
];

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml", ".webp": "image/webp", ".gif": "image/gif",
  ".json": "application/json", ".txt": "text/plain", ".xml": "application/xml",
  ".woff2": "font/woff2", ".ico": "image/x-icon",
};

// Minimal static server over dist with SPA fallback (mirrors the Apache config).
const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname);
  let file = join(DIST, urlPath);
  if (!existsSync(file) || extname(file) === "") file = join(DIST, "index.html");
  try {
    const body = readFileSync(file);
    res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});

await new Promise((resolve) => server.listen(PORT, resolve));

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
// External resources (fonts, analytics) are irrelevant to the snapshot and can
// hang forever against the local server — block everything non-local.
await page.setRequestInterception(true);
page.on("request", (req) => {
  req.url().startsWith(`http://localhost:${PORT}`) ? req.continue() : req.abort();
});

let ok = 0;
for (const route of ROUTES) {
  try {
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForSelector("h1, h2", { timeout: 20000 });
    await new Promise((r) => setTimeout(r, 1200));

    const html = await page.evaluate(() => {
      // Strip ephemeral UI so the snapshot is clean page content; the live
      // bundle re-creates these on load.
      for (const sel of ["#cookie-consent", "#whatsapp-widget"]) {
        document.querySelectorAll(sel).forEach((n) => n.remove());
      }
      // Drop the unused pre-hydration loading-shell CSS from the snapshot.
      document.querySelectorAll("style").forEach((s) => {
        if (s.textContent.includes("#app-shell")) s.remove();
      });
      return "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
    });

    const outDir = route === "/" ? DIST : join(DIST, ...route.split("/").filter(Boolean));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "index.html"), html, "utf8");
    const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    console.log(`ok  ${route}  (${Math.round(html.length / 1024)} KB, ~${words} words raw)`);
    ok++;
  } catch (err) {
    console.error(`FAIL ${route}: ${err.message}`);
  }
}

await browser.close();
server.close();
console.log(`\nPrerendered ${ok}/${ROUTES.length} routes.`);
if (ok !== ROUTES.length) process.exit(1);
