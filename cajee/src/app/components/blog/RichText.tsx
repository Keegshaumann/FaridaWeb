import { Fragment } from "react";
import { Link } from "react-router";

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

const DEFAULT_LINK_CLASS =
  "font-medium text-[var(--purple-medium)] underline decoration-[var(--accent-purple)]/50 underline-offset-2 hover:text-[var(--text-dark)]";

/** Plain-text version of a RichText string: [text](url) becomes text.
 *  Used wherever the same string also feeds structured data (FAQ schema). */
export function stripLinks(text: string): string {
  return text.replace(LINK_RE, "$1");
}

/** Renders a paragraph string, converting [text](url) into links.
 *  Internal urls (starting with "/") use client-side routing; external
 *  references open in a new tab as standard follow links.
 *  linkClassName overrides the link colours on dark sections. */
export function RichText({ text, linkClassName }: { text: string; linkClassName?: string }) {
  const linkClass = linkClassName ?? DEFAULT_LINK_CLASS;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > last) nodes.push(<Fragment key={`t${i++}`}>{text.slice(last, match.index)}</Fragment>);
    const [, label, url] = match;
    if (url.startsWith("/")) {
      nodes.push(
        <Link key={`l${i++}`} to={url} className={linkClass}>
          {label}
        </Link>
      );
    } else {
      nodes.push(
        <a key={`l${i++}`} href={url} target="_blank" rel="noopener" className={linkClass}>
          {label}
        </a>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(<Fragment key={`t${i++}`}>{text.slice(last)}</Fragment>);
  return <>{nodes}</>;
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
