import { Link } from "react-router";
import { Calendar, Clock } from "lucide-react";
import { SEO } from "../components/SEO";
import { sortedPosts } from "../data/blog-posts";
import { formatPostDate } from "../components/blog/RichText";

export function BlogPage() {
  const posts = sortedPosts();

  return (
    <>
      <SEO
        fullTitle="Orthotics & Prosthetics Advice Blog | Cajee Botes"
        title="Advice & Answers Blog"
        description="Clear, clinician-written answers to the questions South Africans ask most about orthotics, prosthetics, braces and insoles — by Farida Cajee-Botes."
        keywords="orthotics blog, prosthetics blog South Africa, orthotist advice, prosthetic limb questions, custom orthotics questions"
      />

      {/* Hero */}
      <section className="relative bg-[#F5E8F3] pt-[90px] pb-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-4">
              Advice & Answers
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed">
              Clinician-written answers to the questions patients ask us most about orthotics and prosthetics.
            </p>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="relative py-12 md:py-16 bg-[#F5E8F3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="max-w-xl mx-auto rounded-2xl bg-white p-10 text-center shadow-sm">
              <p className="font-semibold text-[var(--text-dark)]">Articles coming soon</p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">We're preparing clinician-written answers to your most common questions.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
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
                  <div className="flex flex-1 flex-col p-6">
                  <span className="inline-flex w-fit rounded-full bg-[var(--pink-light)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text-dark)]">
                    {post.category}
                  </span>
                  <h2 className="mt-3 text-lg font-semibold leading-snug text-[var(--text-dark)] group-hover:text-[var(--purple-medium)]">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-[var(--text-muted)]">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatPostDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readMinutes} min read
                    </span>
                  </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
