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
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-3 text-left"
              defaultValue="item-1"
            >
              {features.map((feature) => (
                <AccordionItem
                  key={feature.id}
                  value={`item-${feature.id}`}
                  className="group rounded-2xl border border-[#5E3362]/10 last:border-b bg-white/45 px-5 transition-[background-color,border-color,box-shadow] duration-200 ease-out data-[state=closed]:hover:bg-white/70 data-[state=open]:bg-white data-[state=open]:border-[#5E3362]/15 data-[state=open]:shadow-[0_12px_32px_-16px_rgba(94,51,98,0.28)]"
                >
                  <AccordionTrigger className="cursor-pointer items-center gap-4 py-4 text-left !no-underline hover:no-underline [&>svg]:size-8 [&>svg]:shrink-0 [&>svg]:translate-y-0 [&>svg]:rounded-full [&>svg]:p-2 [&>svg]:bg-[#5E3362]/[0.07] [&>svg]:text-[var(--text-dark)] [&>svg]:transition-[transform,background-color,color] [&>svg]:duration-200 [&>svg]:ease-out [&[data-state=open]>svg]:bg-[var(--text-dark)] [&[data-state=open]>svg]:text-[var(--pink-light)]">
                    <h3 className="text-base md:text-[17px] font-medium leading-snug text-left text-[#5E3362]/70 transition-colors duration-200 group-data-[state=open]:text-[var(--text-dark)]">
                      {feature.title}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-left">
                    <p className="text-[15px] leading-relaxed text-[#5E3362]/75">
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
