import { ChevronDown } from "lucide-react";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
}

interface AccordionFeatureSectionProps {
  mainHeading: string;
  /** Optional sub-heading between the section heading and the copy. */
  subHeading?: string;
  mainDescription: string;
  /** Condensed copy shown on small screens. Google indexes mobile-first, so this
   *  is the version it primarily reads: keep it a true summary, not a stub. */
  mainDescriptionShort?: string;
  /** Describes the image. Defaults to the heading, which is poor alt text:
   *  a screen reader has just announced that heading. Pass a real description. */
  imageAlt?: string;
  features: FeatureItem[];
  image: string;
}

export function AccordionFeatureSection({
  mainHeading,
  subHeading,
  mainDescription,
  mainDescriptionShort,
  imageAlt,
  features,
  image,
}: AccordionFeatureSectionProps) {
  return (
    <section className="py-12 md:py-16 bg-[var(--pink-light)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-[100px] py-8 md:py-12 lg:py-[50px] bg-[#00000000]">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-dark)] mb-4">
              {mainHeading}
            </h2>
            {subHeading && (
              <h3 className="text-xl md:text-2xl font-semibold text-[var(--accent-purple)] mb-4">
                {subHeading}
              </h3>
            )}
            {/* One paragraph unless a distinct mobile variant is supplied. Rendering
                both branches with identical text put the same copy in the DOM twice. */}
            {mainDescriptionShort ? (
              <>
                <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8 lg:hidden">
                  {mainDescriptionShort}
                </p>
                <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8 hidden lg:block">
                  {mainDescription}
                </p>
              </>
            ) : (
              <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8">
                {mainDescription}
              </p>
            )}

            {/* Mobile Image - appears once below description */}
            <div className="mb-8 lg:hidden">
              <img
                src={image}
                alt={imageAlt ?? mainHeading}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>

            {/* Disclosure list. Native <details> keeps every description in the
                prerendered HTML; a Radix accordion unmounts closed panels and hid
                them from crawlers and AI answer engines. */}
            <div className="w-full space-y-3 text-left">
              {features.map((feature, i) => (
                <details
                  key={feature.id}
                  name="feature-accordion"
                  open={i === 0}
                  className="group rounded-2xl border border-[#5E3362]/10 bg-white/45 px-5 transition-[background-color,border-color,box-shadow] duration-200 ease-out hover:bg-white/70 open:bg-white open:border-[#5E3362]/15 open:shadow-[0_12px_32px_-16px_rgba(94,51,98,0.28)]"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-4 py-4 text-left">
                    <h3 className="flex-1 text-base md:text-[17px] font-medium leading-snug text-[#5E3362]/70 transition-colors duration-200 group-open:text-[var(--text-dark)]">
                      {feature.title}
                    </h3>
                    <ChevronDown
                      aria-hidden="true"
                      className="size-8 shrink-0 rounded-full bg-[#5E3362]/[0.07] p-2 text-[var(--text-dark)] transition-[transform,background-color,color] duration-200 ease-out group-open:rotate-180 group-open:bg-[var(--text-dark)] group-open:text-[var(--pink-light)]"
                    />
                  </summary>
                  <div className="pb-5 text-left">
                    <p className="text-[15px] leading-relaxed text-[#5E3362]/75">
                      {feature.description}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Right Column - Image (Desktop Only) */}
          <div className="hidden lg:block sticky top-24">
            <img
              src={image}
              alt={mainHeading}
              className="w-full h-auto rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
