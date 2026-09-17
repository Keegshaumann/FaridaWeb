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
// Known limit, read this before trusting a date: the rule above is file-level,
// not sentence-level. A commit that only touches presentation inside a page's
// own source file - width and height attributes on an image, a class name, a
// wrapper div - moves that page's date even though the page says exactly what
// it said before. That is the same kind of change the furniture exclusion above
// is meant to keep out of the dates; it just happens to live in the page's own
// file, where this script cannot see the difference.
//
// So the script prints, for every page, which file and which commit decided its
// date. Read that list when you re-run this before an upload. If a page's date
// was set by a commit that changed nothing a reader would notice, the honest
// lastmod is the earlier one - pass over that page by hand rather than
// publishing a date that says the page changed when it did not. An inflated
// lastmod is the fault this script was written to fix, and it is just as much a
// fault when the script causes it.
//
// Checked on 2026-09-17: of the five pages dated that day, / and /blog were
// touched by ecfffef6, which only added image width and height - but both also
// take their content from src/app/data/blog-posts.ts, which 5ad8dbb6 changed
// the same day for real (the medical aid article's co-payment wording). So
// their dates hold on their own merits; nothing was inflated. /contact
// (3dec423e) and /services/compression (18777a66, ecfffef6) are genuine too.
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

function lastCommit(file) {
  const out = execFileSync("git", ["log", "-1", "--format=%cs%x09%h%x09%s", "--", file], {
    cwd: ROOT,
    encoding: "utf8",
  }).trim();
  const [date, hash, ...subject] = out.split("\t");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`No commit date for ${file} - is it committed? git said: "${out}"`);
  }
  return { date, hash, subject: subject.join("\t"), file };
}

// The newest commit across a page's source files, and which file and commit it
// was - so the person running this before an upload can see what moved a date.
const newestOf = (files) =>
  files.map(lastCommit).sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0)).at(-1);

// Blog articles, straight from the data file so a new one needs no edit here.
const blog = readFileSync(join(ROOT, "src", "app", "data", "blog-posts.ts"), "utf8");
const posts = [...blog.matchAll(
  /"slug":\s*"([^"]+)",\s*\n[\s\S]{0,400}?"date":\s*"(\d{4}-\d{2}-\d{2})",(?:\s*\n\s*"dateUpdated":\s*"(\d{4}-\d{2}-\d{2})",)?/g
)].map((m) => ({ slug: m[1], lastmod: m[3] || m[2] }));

const expectedPosts = [...blog.matchAll(/"slug":\s*"([^"]+)"/g)].length;
if (posts.length !== expectedPosts) {
  throw new Error(`Read ${posts.length} article dates but the data file has ${expectedPosts} articles. Refusing to write a sitemap that would drop an address.`);
}

const why = [];

const entries = [
  ...PAGES.map(([path, changefreq, priority, sources]) => {
    const newest = newestOf(sources);
    why.push({ path, ...newest });
    return {
      loc: `${BASE}${path}`,
      lastmod: newest.date,
      changefreq,
      priority,
    };
  }),
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

// Article dates come from the article's own dateUpdated and need no explaining.
// Every other page's date came from a commit, so say which one. Check the rows
// dated today before you upload: if the commit named only moved presentation,
// the page did not really change and the date should not say it did.
console.log("\nWhere each non-article date came from:\n");
const pad = Math.max(...why.map((w) => w.path.length));
for (const w of why.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))) {
  console.log(`  ${w.date}  ${w.path.padEnd(pad)}  ${w.hash}  ${w.subject}`);
  console.log(`  ${" ".repeat(10)}  ${" ".repeat(pad)}  set by ${w.file}`);
}
