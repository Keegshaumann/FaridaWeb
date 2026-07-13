import { ReactNode } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { SEO } from "./SEO";
import { ServiceProductsSection } from "./products/ServiceProductsSection";
import type { ServiceSlug } from "../data/device-types";

interface ServicePageTemplateProps {
  title: string;
  subtitle: string;
  whatIsIt: string;
  benefits: string[];
  availableServices: string[];
  clinicalApproach: string;
  /** When set, renders the filterable device catalogue for this service. */
  serviceSlug?: ServiceSlug;
  additionalSections?: ReactNode;
  seoTitle?: string;
  seoFullTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export function ServicePageTemplate({
  title,
  subtitle,
  whatIsIt,
  benefits,
  availableServices,
  clinicalApproach,
  serviceSlug,
  additionalSections,
  seoTitle,
  seoFullTitle,
  seoDescription,
  seoKeywords,
}: ServicePageTemplateProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[var(--purple-light)] to-[var(--purple-soft)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {/* Blur transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#F5E8F3]/90 backdrop-blur-md pointer-events-none z-0"></div>
      </section>

      {/* Main Content */}
      <div className="relative py-16 md:py-24 bg-[#F5E8F3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* What is it? */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-6">
                What is it?
              </h2>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                {whatIsIt}
              </p>
            </section>

            {/* How can it help? */}
            <section className="relative bg-[var(--pink-light)] rounded-2xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-6">
                How can it help?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-[var(--accent-purple)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--text-muted)] leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Devices catalogue (filterable) or fallback Available Services list */}
            {serviceSlug ? (
              <ServiceProductsSection service={serviceSlug} />
            ) : (
              <section>
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-6">
                  Available Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableServices.map((service, index) => (
                    <div
                      key={index}
                      className="bg-[var(--purple-soft)] rounded-xl p-5 border border-[var(--purple-medium)]"
                    >
                      <p className="text-[var(--text-dark)]">{service}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Additional Sections */}
            {additionalSections}

            {/* Clinical Approach */}
            <section className="relative bg-gradient-to-br from-[var(--purple-light)] to-[var(--purple-soft)] rounded-2xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-6">
                Our Clinical Approach
              </h2>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                {clinicalApproach}
              </p>
            </section>

            {/* CTA */}
            <section className="text-center pt-8">
              <h3 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
                Ready to get started?
              </h3>
              <p className="text-[var(--text-muted)] mb-6">
                Contact us to book an assessment or discuss your needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact#book">
                  <Button size="lg" className="bg-[var(--text-dark)] hover:bg-[var(--text-dark)]/90 text-white rounded-full px-8">
                    Book Assessment
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="rounded-full border-2 px-8">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* SEO */}
      {seoTitle && seoDescription && seoKeywords && (
        <SEO
          title={seoTitle}
          fullTitle={seoFullTitle}
          description={seoDescription}
          keywords={seoKeywords}
        />
      )}
    </>
  );
}