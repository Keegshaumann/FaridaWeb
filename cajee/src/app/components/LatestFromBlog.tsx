import { Link } from "react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { sortedPosts } from "../data/blog-posts";
import { formatPostDate } from "./blog/RichText";

/** Homepage teaser for the three newest advice articles — real crawlable
 *  content with internal links to the blog's answer pages. */
export function LatestFromBlog() {
  const posts = sortedPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="relative py-16 md:py-20 bg-[#F5E8F3]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-dark)] mb-3">
            Advice &amp; Answers
          </h2>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed">
            Clinician-written answers to the questions patients ask us most about orthotic and prosthetic care — from costs and medical aid funding to living with a prosthetic leg.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[var(--purple-soft)]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[var(--pink-light)]">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold leading-snug text-[var(--text-dark)] group-hover:text-[var(--purple-medium)]">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-muted)] line-clamp-3">{post.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatPostDate(post.date)}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-dark)] underline decoration-[var(--accent-purple)]/50 underline-offset-4 hover:text-[var(--purple-medium)]"
          >
            Read all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
