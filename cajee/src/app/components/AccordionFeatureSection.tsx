import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
}

interface AccordionFeatureSectionProps {
  mainHeading: string;
  mainDescription: string;
  features: FeatureItem[];
  image: string;
}

export function AccordionFeatureSection({
  mainHeading,
  mainDescription,
  features,
  image,
}: AccordionFeatureSectionProps) {
  const [activeTabId, setActiveTabId] = useState<number | null>(1);

  return (
    <section className="py-12 md:py-16 bg-[var(--pink-light)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-[100px] py-8 md:py-12 lg:py-[50px] bg-[#00000000]">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-dark)] mb-6">
              {mainHeading}
            </h2>
            {/* Shorter description for mobile, full for desktop */}
            <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8 lg:hidden">
              At Cajee Botes Orthotist Prosthetist, care begins with understanding your unique needs. Every device is prescribed based on comprehensive clinical assessment, not available stock.
            </p>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8 hidden lg:block">
              {mainDescription}
            </p>

            {/* Mobile Image - appears once below description */}
            <div className="mb-8 lg:hidden">
              <img
                src={image}
                alt={mainHeading}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>

            {/* Accordion */}
            <Accordion type="single" className="w-full" defaultValue="item-1">
              {features.map((feature) => (
                <AccordionItem key={feature.id} value={`item-${feature.id}`}>
                  <AccordionTrigger
                    onClick={() => {
                      setActiveTabId(feature.id);
                    }}
                    className="cursor-pointer py-5 !no-underline transition hover:no-underline"
                  >
                    <h3
                      className={`text-lg font-semibold text-left ${
                        feature.id === activeTabId
                          ? "text-[var(--text-dark)]"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      {feature.title}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                      {feature.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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