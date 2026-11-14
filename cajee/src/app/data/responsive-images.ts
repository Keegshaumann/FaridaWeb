// Smaller copies of the large homepage pictures, for srcset.
//
// Why: the originals are 1920px (product pictures), 1280px (graduation photo)
// and 585px (logo) wide, but they are shown at most 400px, 604px and 195px wide
// (CSS px). Without srcset every phone downloaded the full files. With srcset
// and an accurate `sizes`, the browser picks the smallest copy that is still
// sharp at its screen density; the original stays the largest candidate.
//
// The copies live in src/assets/responsive/ and were made from the originals
// with cwebp (1.x):
//   cwebp -m 6 -sharp_yuv -metadata none -q 82 -resize <width> 0 <original> -o <name>-<width>w.webp
// (-q 80 for the graduation photo; -q 92 -alpha_q 100 for the logo). Re-make
// them if an original is replaced.
//
// ?no-inline keeps the small logo copy a real file: Vite would otherwise inline
// anything under 4 KB into the script as a data: URL.

import logo from "@/assets/cajee-logo-lockup.webp";
import logo200 from "@/assets/responsive/cajee-logo-lockup-200w.webp?no-inline";
import logo400 from "@/assets/responsive/cajee-logo-lockup-400w.webp?no-inline";
import logo504 from "@/assets/responsive/cajee-logo-lockup-504w.webp?no-inline";

import graduation from "@/assets/farida-graduation.webp";
import graduation500 from "@/assets/responsive/farida-graduation-500w.webp?no-inline";
import graduation750 from "@/assets/responsive/farida-graduation-750w.webp?no-inline";
import graduation1000 from "@/assets/responsive/farida-graduation-1000w.webp?no-inline";

import p424428 from "@/assets/424428bc84af628c229a68e5a8e17f73eb46101c.webp";
import p424428_480 from "@/assets/responsive/424428bc84af628c229a68e5a8e17f73eb46101c-480w.webp?no-inline";
import p424428_840 from "@/assets/responsive/424428bc84af628c229a68e5a8e17f73eb46101c-840w.webp?no-inline";
import p424428_1200 from "@/assets/responsive/424428bc84af628c229a68e5a8e17f73eb46101c-1200w.webp?no-inline";

import p93d930 from "@/assets/93d9306dca2d06ebc10714a568c9f5598f582439.webp";
import p93d930_480 from "@/assets/responsive/93d9306dca2d06ebc10714a568c9f5598f582439-480w.webp?no-inline";
import p93d930_840 from "@/assets/responsive/93d9306dca2d06ebc10714a568c9f5598f582439-840w.webp?no-inline";
import p93d930_1200 from "@/assets/responsive/93d9306dca2d06ebc10714a568c9f5598f582439-1200w.webp?no-inline";

import p477f91 from "@/assets/477f91a9c7ebdc01e1a75b8cdd3b21ddad197960.webp";
import p477f91_480 from "@/assets/responsive/477f91a9c7ebdc01e1a75b8cdd3b21ddad197960-480w.webp?no-inline";
import p477f91_840 from "@/assets/responsive/477f91a9c7ebdc01e1a75b8cdd3b21ddad197960-840w.webp?no-inline";
import p477f91_1200 from "@/assets/responsive/477f91a9c7ebdc01e1a75b8cdd3b21ddad197960-1200w.webp?no-inline";

import p3425be from "@/assets/3425be9966550c5581635147cd454de36d66ca07.webp";
import p3425be_480 from "@/assets/responsive/3425be9966550c5581635147cd454de36d66ca07-480w.webp?no-inline";
import p3425be_840 from "@/assets/responsive/3425be9966550c5581635147cd454de36d66ca07-840w.webp?no-inline";
import p3425be_1200 from "@/assets/responsive/3425be9966550c5581635147cd454de36d66ca07-1200w.webp?no-inline";

import p9aabea from "@/assets/9aabea5badc8e319a69eaad9da1dd23b1c7e6481.webp";
import p9aabea_480 from "@/assets/responsive/9aabea5badc8e319a69eaad9da1dd23b1c7e6481-480w.webp?no-inline";
import p9aabea_840 from "@/assets/responsive/9aabea5badc8e319a69eaad9da1dd23b1c7e6481-840w.webp?no-inline";
import p9aabea_1200 from "@/assets/responsive/9aabea5badc8e319a69eaad9da1dd23b1c7e6481-1200w.webp?no-inline";

import p538a1e from "@/assets/538a1e8e3cf714b78cdc63eff3781dc6a8484b41.webp";
import p538a1e_480 from "@/assets/responsive/538a1e8e3cf714b78cdc63eff3781dc6a8484b41-480w.webp?no-inline";
import p538a1e_840 from "@/assets/responsive/538a1e8e3cf714b78cdc63eff3781dc6a8484b41-840w.webp?no-inline";
import p538a1e_1200 from "@/assets/responsive/538a1e8e3cf714b78cdc63eff3781dc6a8484b41-1200w.webp?no-inline";

const set = (pairs: [string, number][]) => pairs.map(([url, w]) => `${url} ${w}w`).join(", ");

/** srcset strings keyed by the original's (hashed) URL, as the components receive it. */
const SRCSETS: Record<string, string> = {
  [logo]: set([[logo200, 200], [logo400, 400], [logo504, 504], [logo, 585]]),
  [graduation]: set([[graduation500, 500], [graduation750, 750], [graduation1000, 1000], [graduation, 1280]]),
  [p424428]: set([[p424428_480, 480], [p424428_840, 840], [p424428_1200, 1200], [p424428, 1920]]),
  [p93d930]: set([[p93d930_480, 480], [p93d930_840, 840], [p93d930_1200, 1200], [p93d930, 1920]]),
  [p477f91]: set([[p477f91_480, 480], [p477f91_840, 840], [p477f91_1200, 1200], [p477f91, 1920]]),
  [p3425be]: set([[p3425be_480, 480], [p3425be_840, 840], [p3425be_1200, 1200], [p3425be, 1920]]),
  [p9aabea]: set([[p9aabea_480, 480], [p9aabea_840, 840], [p9aabea_1200, 1200], [p9aabea, 1920]]),
  [p538a1e]: set([[p538a1e_480, 480], [p538a1e_840, 840], [p538a1e_1200, 1200], [p538a1e, 1920]]),
};

/**
 * srcSet and sizes for an image src, ready to spread onto an <img>. Returns {}
 * for any image without smaller copies, so it renders exactly as before.
 * `sizes` must describe the CSS width the <img> is shown at, at each screen width.
 */
export function responsiveImage(src: string | undefined, sizes: string): { srcSet?: string; sizes?: string } {
  const srcSet = src ? SRCSETS[src] : undefined;
  return srcSet ? { srcSet, sizes } : {};
}
