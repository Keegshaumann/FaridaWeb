// Types for the static, SEO-focused blog. Posts are authored in blog-posts.ts —
// content strings support one inline syntax: [link text](url). Internal urls
// start with "/", everything else renders as an external reference link.

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogReference {
  title: string;
  publisher: string;
  url: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: "Orthotics" | "Prosthetics" | "General";
  /** ISO date the post is published under (spread across the year). */
  date: string;
  author: string;
  /** Header image path (public/), shown on the card and at the top of the post. */
  image: string;
  /** Descriptive alt text for the header image. */
  imageAlt: string;
  metaDescription: string;
  excerpt: string;
  readMinutes: number;
  sections: BlogSection[];
  keyTakeaways: string[];
  references: BlogReference[];
}
