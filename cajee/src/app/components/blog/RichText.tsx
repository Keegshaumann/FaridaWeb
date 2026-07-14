import { Fragment } from "react";
import { Link } from "react-router";

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders a paragraph string, converting [text](url) into links.
 *  Internal urls (starting with "/") use client-side routing; external
 *  references open in a new tab as standard follow links. */
export function RichText({ text }: { text: string }) {
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
        <Link key={`l${i++}`} to={url} className="font-medium text-[var(--purple-medium)] underline decoration-[var(--accent-purple)]/50 underline-offset-2 hover:text-[var(--text-dark)]">
          {label}
        </Link>
      );
    } else {
      nodes.push(
        <a key={`l${i++}`} href={url} target="_blank" rel="noopener" className="font-medium text-[var(--purple-medium)] underline decoration-[var(--accent-purple)]/50 underline-offset-2 hover:text-[var(--text-dark)]">
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
