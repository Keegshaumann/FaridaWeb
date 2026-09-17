// Types for the static, SEO-focused blog. Posts are authored in blog-posts.ts;
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
  /** Short SEO title (<=60 chars incl. " | Farida Cajee-Botes"); falls back to title. */
  metaTitle?: string;
  category: "Orthotics" | "Prosthetics" | "General";
  /** ISO date the post is published under (spread across the year). */
  date: string;
  /**
   * ISO date the article's text was last changed. Set it in the same commit
   * that changes the article, or it silently goes stale and becomes another
   * unverifiable claim on the page.
   *
   * Leave it out on an article that has not been changed since publication:
   * the page then shows no "Last updated" line and dateModified falls back to
   * datePublished, which is the truth for an unchanged article.
   *
   * It deliberately does NOT say "reviewed". A date labelled "reviewed" on a
   * health page claims a clinician read it again on that day. This field only
   * records that the text changed. If Farida does start re-reading articles on
   * a schedule, add a separate reviewer and date rather than relabelling this.
   */
  dateUpdated?: string;
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
