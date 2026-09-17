// Regenerates src/app/data/image-sizes.ts: the real pixel width and height of
// every image the site ships, read out of the files themselves.
//
// Why: an <img> with no width and height attributes has no known shape until
// the file arrives, so the browser cannot reserve room for it and the text
// below it jumps down when it loads. Most images on this site sit in a box that
// CSS has already sized, so they do not jump - but several do not, and a
// generated map means a new image is covered without anyone remembering to
// measure it.
//
// Usage: node scripts/image-sizes.mjs   (re-run after adding or replacing an image)
//
// No image library is used - PNG, JPEG and WebP headers are read directly, so
// this adds no dependency to the project.

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, extname, basename, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCES = [join(ROOT, "public"), join(ROOT, "src", "assets")];
const OUT = join(ROOT, "src", "app", "data", "image-sizes.ts");
const EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (EXTS.has(extname(entry).toLowerCase())) out.push(full);
  }
  return out;
}

function pngSize(buf) {
  // 8-byte signature, then the IHDR chunk: length(4) type(4) width(4) height(4)
  if (buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf) {
  if (buf.readUInt16BE(0) !== 0xffd8) return null;
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    // SOF0-SOF15, minus the four markers in that range that are not frame headers.
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc, 0xd8].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2;
      continue;
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

function webpSize(buf) {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") return null;
  const format = buf.toString("ascii", 12, 16);
  if (format === "VP8 ") {
    return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  }
  if (format === "VP8L") {
    const bits = buf.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (format === "VP8X") {
    const read24 = (off) => buf[off] | (buf[off + 1] << 8) | (buf[off + 2] << 16);
    return { width: read24(24) + 1, height: read24(27) + 1 };
  }
  return null;
}

function sizeOf(file) {
  const buf = readFileSync(file);
  const ext = extname(file).toLowerCase();
  const size = ext === ".png" ? pngSize(buf) : ext === ".webp" ? webpSize(buf) : jpegSize(buf);
  if (!size || !size.width || !size.height) throw new Error(`Could not read the size of ${file}`);
  return size;
}

const sizes = new Map();
const collisions = [];
for (const dir of SOURCES) {
  for (const file of walk(dir)) {
    const key = basename(file);
    const size = sizeOf(file);
    const existing = sizes.get(key);
    if (existing && (existing.width !== size.width || existing.height !== size.height)) {
      collisions.push(`${key}: ${existing.from} is ${existing.width}x${existing.height}, ${relative(ROOT, file)} is ${size.width}x${size.height}`);
      continue;
    }
    sizes.set(key, { ...size, from: relative(ROOT, file).replace(/\\/g, "/") });
  }
}

if (collisions.length) {
  // Two different images sharing a file name would make the map ambiguous and
  // could hand the browser the wrong shape. Refuse rather than guess.
  throw new Error(`Two images share a file name but are different sizes:\n  ${collisions.join("\n  ")}`);
}

const entries = [...sizes.entries()].sort(([a], [b]) => a.localeCompare(b));
const body = entries.map(([k, v]) => `  ${JSON.stringify(k)}: [${v.width}, ${v.height}],`).join("\n");

const file = `// GENERATED FILE - do not edit by hand.
// Run \`node scripts/image-sizes.mjs\` from cajee/ to regenerate it.
//
// The real pixel size of every image in public/ and src/assets/, keyed by file
// name, so an <img> can carry width and height attributes and the browser can
// keep a space the right shape for it before the file arrives. Last generated
// from ${entries.length} image files.

export const IMAGE_SIZES: Record<string, [number, number]> = {
${body}
};

/**
 * width/height attributes for an image src, ready to spread onto an <img>.
 * Returns {} for anything not in the map, so an unknown image simply renders
 * as it did before rather than getting a made-up shape.
 */
export function imageSize(src?: string): { width?: number; height?: number } {
  if (!src) return {};
  const name = src.split("?")[0].split("/").pop() ?? "";
  let dims = IMAGE_SIZES[name];
  if (!dims) {
    // The build fingerprints bundled assets as <name>-<hash>.<ext>.
    const hashed = name.match(/^(.*)-[A-Za-z0-9_-]{8}(\\.[A-Za-z0-9]+)$/);
    if (hashed) dims = IMAGE_SIZES[hashed[1] + hashed[2]];
  }
  return dims ? { width: dims[0], height: dims[1] } : {};
}
`;

writeFileSync(OUT, file, "utf8");
console.log(`Wrote ${relative(ROOT, OUT)} with ${entries.length} images.`);
