import type { ReactNode } from "react";
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

  // Related posts by topic, chosen circularly so inbound links spread evenly.
  // A plain "newest three" slice sent every related link to the same three posts
  // and left six posts with a single inbound link each.
  const related = (() => {
    const all = sortedPosts();
    const picked: typeof all = [];
    const add = (c?: (typeof all)[number]) => {
      if (c && c.slug !== post.slug && !picked.some((x) => x.slug === c.slug)) picked.push(c);
    };
    // Walk forward from this post within its own topic, wrapping around.
    const sameTopic = all.filter((p) => p.category === post.category);
    const here = sameTopic.findIndex((p) => p.slug === post.slug);
    for (let i = 1; i <= sameTopic.length && picked.length < 2; i++) {
      add(sameTopic[(here + i) % sameTopic.length]);
    }
    // Then a practical/funding piece, also rotated.
    const practical = all.filter((p) => p.category === "General");
    const seed = all.findIndex((p) => p.slug === post.slug);
    for (let i = 0; i < practical.length && picked.length < 3; i++) {
      add(practical[(seed + i) % practical.length]);
    }
    // Top up from everything else if a topic is small.
    for (let i = 1; i <= all.length && picked.length < 3; i++) {
      add(all[(seed + i) % all.length]);
    }
    return picked.slice(0, 3);
  })();

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
      worksFor: { "@type": "MedicalBusiness", name: "Farida Cajee-Botes Orthotist Prosthetist" },
    },
    publisher: {
      "@type": "Organization",
      name: "Farida Cajee-Botes Orthotist Prosthetist",
      url: "https://www.cajeebotes.com",
      logo: { "@type": "ImageObject", url: "https://www.cajeebotes.com/logo.png" },
    },
    mainEntityOfPage: `https://www.cajeebotes.com/blog/${post.slug}`,
    image: `https://www.cajeebotes.com${post.image}`,
  };

  return (
    <>
      <SEO
        fullTitle={post.metaTitle ?? `${post.title} | Farida Cajee-Botes`}
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
                <Link
                  to="/about"
                  className="underline underline-offset-2 hover:text-[var(--text-dark)]"
                >
                  {post.author}
                </Link>
                , Orthotist &amp; Prosthetist
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
                {/* Consecutive pipe-delimited lines render as a real <table>. Search
                    engines and AI assistants extract tables; a run of paragraphs that
                    merely looks tabular gives them nothing to extract. */}
                {(() => {
                  const isRow = (t: string) => t.split(" | ").length >= 3;
                  const out: ReactNode[] = [];
                  let i = 0;
                  while (i < section.paragraphs.length) {
                    if (isRow(section.paragraphs[i])) {
                      const rows: string[] = [];
                      while (i < section.paragraphs.length && isRow(section.paragraphs[i])) {
                        rows.push(section.paragraphs[i]);
                        i += 1;
                      }
                      const [head, ...body] = rows.map((r) => r.split(" | ").map((c) => c.trim()));
                      out.push(
                        <div key={`t-${i}`} className="mb-6 overflow-x-auto">
                          <table className="w-full border-collapse text-left text-sm">
                            <thead>
                              <tr>
                                {head.map((h, hi) => (
                                  <th
                                    key={hi}
                                    scope="col"
                                    className="border-b-2 border-[var(--purple-soft)] px-3 py-2 font-semibold text-[var(--text-dark)]"
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {body.map((r, ri) => (
                                <tr key={ri} className="align-top">
                                  {r.map((c, ci) => (
                                    <td
                                      key={ci}
                                      className="border-b border-[var(--purple-soft)]/50 px-3 py-2 text-[var(--text-muted)]"
                                    >
                                      {c}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    } else {
                      const t = section.paragraphs[i];
                      out.push(
                        <p key={`p-${i}`} className="mb-4 leading-relaxed text-[var(--text-muted)]">
                          <RichText text={t} />
                        </p>
                      );
                      i += 1;
                    }
                  }
                  return out;
                })()}
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
                Every device we provide starts with an individual assessment: at home, in hospital, or at the practice.
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
                    ({ref.publisher})
                  </li>
                ))}
              </ol>
            </div>
            {/* Author box. Names the clinician, states the registration that can be
                checked, and links onward, which is the pattern Google's quality
                guidelines describe for YMYL medical content. */}
            <aside className="mt-12 rounded-2xl bg-[var(--pink-light)] p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-dark)]">
                About the author
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--text-muted)]">
                <Link to="/about" className="font-semibold text-[var(--text-dark)] underline underline-offset-2">
                  {post.author}
                </Link>{" "}
                is a qualified Orthotist and Prosthetist registered with the Health
                Professions Council of South Africa (HPCSA registration OS 0015148,
                practice number 1321412). She consults from Orthocast Morningside at 173
                Rivonia Road, Sandton, and sees patients at home or at the hospital
                bedside across Centurion, Pretoria, Midrand and Johannesburg.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/contact#book"
                  className="inline-flex items-center rounded-full bg-[var(--accent-purple)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Book an assessment
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center rounded-full border border-[var(--accent-purple)] px-4 py-2 text-sm font-semibold text-[var(--accent-purple)] transition-colors hover:bg-[var(--purple-soft)]"
                >
                  More about Farida
                </Link>
              </div>
            </aside>

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
