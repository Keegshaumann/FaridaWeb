import { ChevronDown } from "lucide-react";

export type Faq = { q: string; a: string };

/**
 * Builds the FAQPage JSON-LD for a set of questions.
 *
 * Keep this paired with <FaqSection/> rendering the same array, so the structured
 * data and the visible answers can never drift apart.
 */
export function faqPageSchema(faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

type FaqSectionProps = {
  faqs: Faq[];
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  heading?: string;
  intro?: string;
  /** Per-page colour overrides; defaults suit the standard purple/pink pages. */
  theme?: {
    section?: string;
    eyebrow?: string;
    heading?: string;
    question?: string;
    answer?: string;
    divider?: string;
  };
};

/**
 * Accordion FAQ built on native <details>/<summary>.
 *
 * Deliberately NOT a Radix accordion: Radix unmounts collapsed panels, so the
 * answers never reach the prerendered HTML and neither crawlers nor AI answer
 * engines can read them. <details> keeps every answer in the DOM whether open or
 * shut, and is keyboard- and screen-reader-accessible without any JavaScript.
 */
export function FaqSection({
  faqs,
  eyebrow = "Common questions",
  heading = "Questions we are asked most",
  intro,
  theme,
}: FaqSectionProps) {
  if (!faqs.length) return null;

  const t = {
    section: theme?.section ?? "bg-[var(--pink-light)]",
    eyebrow: theme?.eyebrow ?? "text-[var(--accent-purple)]",
    heading: theme?.heading ?? "text-[var(--text-dark)]",
    question: theme?.question ?? "text-[var(--text-dark)]",
    answer: theme?.answer ?? "text-[var(--text-muted)]",
    divider: theme?.divider ?? "border-[var(--purple-soft)]",
  };

  return (
    <section className={`relative py-16 md:py-24 ${t.section}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${t.eyebrow}`}>
            {eyebrow}
          </p>
          <h2 className={`mt-4 text-3xl font-bold md:text-4xl ${t.heading}`}>{heading}</h2>
          {intro ? (
            <p className={`mt-4 text-base leading-relaxed ${t.answer}`}>{intro}</p>
          ) : null}

          <div className="mt-8">
            {faqs.map((f) => (
              <details key={f.q} className={`group border-b ${t.divider} py-4`}>
                <summary
                  className={`flex cursor-pointer list-none items-start justify-between gap-4 text-left text-lg font-semibold ${t.question}`}
                >
                  <h3 className="text-lg font-semibold">{f.q}</h3>
                  <ChevronDown
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <div className={`pt-3 text-base leading-relaxed ${t.answer}`}>{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
