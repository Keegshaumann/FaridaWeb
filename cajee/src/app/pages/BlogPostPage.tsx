import { Link, useParams } from "react-router";
import { ArrowLeft, Calendar, CheckCircle2, Clock, User } from "lucide-react";
import { SEO } from "../components/SEO";
import { Button } from "../components/ui/button";
import { getPostBySlug, sortedPosts } from "../data/blog-posts";
import { RichText, formatPostDate } from "../components/blog/RichText";
import { NotFoundPage } from "./NotFoundPage";

export function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <NotFoundPage />;

  const related = sortedPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-ZA",
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: "Orthotist & Prosthetist",
      worksFor: { "@type": "MedicalBusiness", name: "Cajee Botes Orthotist Prosthetist" },
    },
    publisher: {
      "@type": "Organization",
      name: "Cajee Botes Orthotist Prosthetist",
      url: "https://www.cajeebotes.com",
      logo: { "@type": "ImageObject", url: "https://www.cajeebotes.com/logo.png" },
    },
    mainEntityOfPage: `https://www.cajeebotes.com/blog/${post.slug}`,
    image: `https://www.cajeebotes.com${post.image}`,
  };

  return (
    <>
      <SEO
        fullTitle={post.metaTitle ?? `${post.title} | Cajee Botes`}
        title={post.title}
        description={post.metaDescription}
        ogImage={`https://www.cajeebotes.com${post.image}`}
        schema={articleSchema}
      />

      {/* Hero */}
      <section className="relative bg-[#F5E8F3] pt-[90px] pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--purple-medium)] hover:text-[var(--text-dark)]">
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
            <span className="mt-4 block">
              <span className="inline-flex rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-[var(--text-dark)]">
                {post.category}
              </span>
            </span>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold leading-tight text-[var(--text-dark)]">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}, Orthotist & Prosthetist
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatPostDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readMinutes} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="relative pb-16 bg-[#F5E8F3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-6 overflow-hidden rounded-2xl shadow-sm">
            <img
              src={post.image}
              alt={post.imageAlt}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
          <article className="max-w-3xl mx-auto rounded-2xl bg-white p-7 md:p-12 shadow-sm">
            {post.sections.map((section, sIdx) => (
              <div key={sIdx} className={sIdx === 0 ? "" : "mt-8"}>
                {section.heading && (
                  <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-3">{section.heading}</h2>
                )}
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="mb-4 leading-relaxed text-[var(--text-muted)]">
                    <RichText text={para} />
                  </p>
                ))}
              </div>
            ))}

            {/* Key takeaways */}
            <div className="mt-10 rounded-xl bg-[var(--pink-light)] p-6">
              <h2 className="text-lg font-semibold text-[var(--text-dark)] mb-3">Key takeaways</h2>
              <ul className="space-y-2">
                {post.keyTakeaways.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm leading-relaxed text-[var(--text-dark)]/80">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--purple-medium)]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8 rounded-xl border border-[var(--purple-soft)]/60 p-6 text-center">
              <p className="font-semibold text-[var(--text-dark)]">Have a question about your own situation?</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Every device we provide starts with an individual assessment — at home, in hospital, or at the practice.
              </p>
              <Link to="/contact" className="mt-4 inline-block">
                <Button className="rounded-full bg-[var(--text-dark)] px-6 text-white hover:bg-[var(--text-dark)]/90">
                  Book an assessment
                </Button>
              </Link>
            </div>

            {/* References */}
            <div className="mt-10 border-t border-[var(--purple-soft)]/40 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-dark)]">References</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5">
                {post.references.map((ref) => (
                  <li key={ref.url} className="text-sm leading-relaxed text-[var(--text-muted)]">
                    <a href={ref.url} target="_blank" rel="noopener" className="underline decoration-[var(--accent-purple)]/50 underline-offset-2 hover:text-[var(--text-dark)]">
                      {ref.title}
                    </a>{" "}
                    — {ref.publisher}
                  </li>
                ))}
              </ol>
            </div>
          </article>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="max-w-3xl mx-auto mt-10">
              <h2 className="text-lg font-semibold text-[var(--text-dark)] mb-4">More answers</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-[var(--purple-soft)]/50 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="text-[11px] font-semibold text-[var(--purple-medium)]">{r.category}</span>
                    <p className="mt-1 text-sm font-semibold leading-snug text-[var(--text-dark)]">{r.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
