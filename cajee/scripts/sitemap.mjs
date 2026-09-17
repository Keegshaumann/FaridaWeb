// Regenerates public/sitemap.xml.
//
// Why a script: the sitemap was hand-maintained, so every one of its 28
// addresses carried the same <lastmod> - 2026-09-06 - whether that page had
// changed that day or not. A date that is the same on every page tells a
// search engine nothing, and a wrong one is worse than none. New blog posts
// also had to be remembered by hand, which is how four of them came to be
// missing from other listings.
//
// Where each date comes from:
//   - A blog article uses its own dateUpdated, or its publish date if it has
//     never been updated. That is exactly the dateModified the article
//     publishes in its own structured data, so the two can never disagree.
//   - Every other page uses the date of the last commit that touched the files
//     its content is actually built from - listed in PAGES below. Shared
//     furniture (header, footer, styling) is deliberately not in those lists:
//     restyling a button is not a change to what a page says.
//
// Usage: node scripts/sitemap.mjs   (needs git; run before an upload)
//
// This script never invents an address. The list below is the same 28
// addresses the sitemap has always carried, with their existing changefreq and
// priority; blog articles come from the article data file, so a new article
// appears here on its own.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://www.cajeebotes.com";
const OUT = join(ROOT, "public", "sitemap.xml");

const SERVICE_SOURCES = [
  "src/app/components/ServicePageTemplate.tsx",
  "src/app/data/service-faqs.ts",
  "src/app/data/devices.ts",
];

// path, changefreq, priority, and the source files the page's content comes from.
const PAGES = [
  ["/", "weekly", "1.0", ["src/app/pages/HomePage.tsx", "src/app/components/LatestFromBlog.tsx", "src/app/data/blog-posts.ts"]],
  ["/about", "monthly", "0.8", ["src/app/pages/AboutPage.tsx"]],
  ["/services", "monthly", "0.9", ["src/app/pages/ServicesPage.tsx"]],
  ["/conditions", "monthly", "0.9", ["src/app/pages/ConditionsPage.tsx", "src/app/components/body-map/BodyMap.tsx", "src/app/components/body-map/anatomy-data.ts"]],
  ["/contact", "monthly", "0.9", ["src/app/pages/ContactPage.tsx", "src/app/components/GoogleReviews.tsx"]],
  ["/services/prosthetics", "monthly", "0.9", ["src/app/pages/services/ProstheticsPage.tsx", ...SERVICE_SOURCES]],
  ["/services/custom-orthotics", "monthly", "0.9", ["src/app/pages/services/CustomOrthoticsPage.tsx", ...SERVICE_SOURCES]],
  ["/services/off-the-shelf-orthotics", "monthly", "0.9", ["src/app/pages/services/OffTheShelfOrthoticsPage.tsx", ...SERVICE_SOURCES]],
  ["/services/compression", "monthly", "1.0", ["src/app/pages/services/CompressionPage.tsx", "src/app/components/compression/compression-data.ts", "src/app/components/compression/LegDiagram.tsx", "src/app/components/compression/CompressionClassSelector.tsx", "src/app/components/compression/CompressionLengthSelector.tsx"]],
  ["/services/mobility-aids", "monthly", "0.9", ["src/app/pages/services/MobilityAidsPage.tsx", ...SERVICE_SOURCES]],
  ["/services/breast-prosthetics", "monthly", "0.9", ["src/app/pages/services/BreastProstheticsPage.tsx", ...SERVICE_SOURCES]],
  ["/privacy-policy", "yearly", "0.3", ["src/app/pages/PrivacyPolicyPage.tsx"]],
  ["/terms-and-conditions", "yearly", "0.3", ["src/app/pages/TermsAndConditionsPage.tsx"]],
  ["/blog", "weekly", "0.8", ["src/app/pages/BlogPage.tsx", "src/app/data/blog-posts.ts"]],
];

function lastCommitDate(file) {
  const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
    cwd: ROOT,
    encoding: "utf8",
  }).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(out)) {
    throw new Error(`No commit date for ${file} - is it committed? git said: "${out}"`);
  }
  return out;
}

const newestOf = (files) => files.map(lastCommitDate).sort().at(-1);

// Blog articles, straight from the data file so a new one needs no edit here.
const blog = readFileSync(join(ROOT, "src", "app", "data", "blog-posts.ts"), "utf8");
const posts = [...blog.matchAll(
  /"slug":\s*"([^"]+)",\s*\n[\s\S]{0,400}?"date":\s*"(\d{4}-\d{2}-\d{2})",(?:\s*\n\s*"dateUpdated":\s*"(\d{4}-\d{2}-\d{2})",)?/g
)].map((m) => ({ slug: m[1], lastmod: m[3] || m[2] }));

const expectedPosts = [...blog.matchAll(/"slug":\s*"([^"]+)"/g)].length;
if (posts.length !== expectedPosts) {
  throw new Error(`Read ${posts.length} article dates but the data file has ${expectedPosts} articles. Refusing to write a sitemap that would drop an address.`);
}

const entries = [
  ...PAGES.map(([path, changefreq, priority, sources]) => ({
    loc: `${BASE}${path}`,
    lastmod: newestOf(sources),
    changefreq,
    priority,
  })),
  ...posts.map((p) => ({
    loc: `${BASE}/blog/${p.slug}`,
    lastmod: p.lastmod,
    changefreq: "monthly",
    priority: "0.6",
  })),
];

const body = entries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join("\n\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/sitemap.mjs - do not edit by hand.
     lastmod for an article is its own dateUpdated (or its publish date if it
     has never been updated); for every other page it is the last commit that
     touched the files that page's content comes from. Re-run the script before
     an upload so the dates are true on the day the files go up. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${body}

</urlset>
`;

// Never publish fewer addresses than the sitemap already carried.
const previous = readFileSync(OUT, "utf8");
const previousLocs = [...previous.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const missing = previousLocs.filter((l) => !entries.some((e) => e.loc === l));
if (missing.length) {
  throw new Error(`These addresses are in the current sitemap but not in the new one:\n  ${missing.join("\n  ")}`);
}

writeFileSync(OUT, xml, "utf8");
const dates = new Set(entries.map((e) => e.lastmod));
console.log(`Wrote public/sitemap.xml: ${entries.length} addresses (was ${previousLocs.length}), ${dates.size} distinct dates.`);
