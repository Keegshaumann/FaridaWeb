import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, User } from "lucide-react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface CaseStudy {
  id: string;
  title: string;
  type?: "case-study" | "blog";
  category: string;
  author?: string;
  patientAge?: string;
  condition?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  content?: string;
  image?: string;
  published?: boolean;
  createdAt: string;
}

const categoryLabels: Record<string, string> = {
  prosthetics: "Prosthetics",
  orthotics: "Custom Orthotics",
  compression: "Medical Compression",
  mobility: "Mobility Aids",
  breast: "Breast Prosthetics",
};

// Function to get display label for category
const getCategoryLabel = (category: string): string => {
  return categoryLabels[category] || category || "Other";
};

export function CaseStudiesSection() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/case-studies`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Filter to only show published case studies
        const publishedStudies = data.filter((study: CaseStudy) => study.published !== false);
        setCaseStudies(publishedStudies);
      }
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="relative py-16 md:py-24 bg-[#F5E8F3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <p className="text-[var(--text-muted)]">Loading success stories...</p>
          </div>
        </div>
      </section>
    );
  }

  if (caseStudies.length === 0) {
    return (
      <section className="relative py-16 md:py-24 bg-[#F5E8F3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-dark)] mb-4">
              Success Stories
            </h2>
            <div className="bg-[#FDF1FF] rounded-2xl p-8 max-w-md mx-auto mt-8">
              <p className="text-[var(--text-dark)] font-semibold mb-2">
                Patient stories are on their way
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                In the meantime, our blog answers the questions patients ask us most.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-24 bg-[#F5E8F3]">
      {/* Blur transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-[var(--pink-light)]/60 backdrop-blur-md pointer-events-none z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Navigation */}
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 text-[var(--text-dark)]">
              Success Stories
            </h2>
            <Link
              to="/case-studies"
              className="group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg text-[var(--accent-purple)] hover:text-[var(--text-dark)] transition-colors"
            >
              View all case studies
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2 md:mt-0">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto h-10 w-10 rounded-full border-2 border-[var(--text-dark)] bg-white hover:bg-[var(--purple-soft)] disabled:opacity-30"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto h-10 w-10 rounded-full border-2 border-[var(--text-dark)] bg-white hover:bg-[var(--purple-soft)] disabled:opacity-30"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
            loop: false,
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative"
        >
          <CarouselContent className="ml-4 sm:ml-6 md:ml-8 lg:ml-8">
            {caseStudies.map((caseStudy) => (
              <CarouselItem
                key={caseStudy.id}
                className="pl-4 md:max-w-[420px] lg:max-w-[480px]"
              >
                <Link
                  to="/case-studies"
                  className="group flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Image */}
                    <div className="flex aspect-[3/2] overflow-clip rounded-xl bg-gradient-to-br from-[var(--pink-soft)] to-[var(--purple-soft)]">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          {caseStudy.image ? (
                            <img
                              src={caseStudy.image}
                              alt={caseStudy.title}
                              className="h-full w-full object-cover object-center"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-[var(--pink-soft)] to-[var(--purple-soft)]"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1">
                    {/* Category Badge */}
                    <div className="mt-4">
                      <span className="inline-block px-3 py-1 bg-[var(--purple-soft)] text-[var(--text-dark)] text-xs font-medium rounded-full">
                        {getCategoryLabel(caseStudy.category)}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mb-2 line-clamp-2 break-words pt-4 text-lg font-semibold md:mb-3 md:text-xl lg:text-2xl text-[var(--text-dark)]">
                      {caseStudy.title}
                    </div>

                    {/* Author and/or Patient Age */}
                    {(caseStudy.author || caseStudy.patientAge) && (
                      <div className="flex items-center gap-1 text-sm text-[var(--text-muted)] mb-3">
                        <User className="w-4 h-4" />
                        <span>
                          {caseStudy.type === "blog"
                            ? caseStudy.author
                            : caseStudy.patientAge
                            ? caseStudy.patientAge
                            : caseStudy.author
                          }
                        </span>
                      </div>
                    )}

                    {/* Description Preview - shows condition for case studies, content for blogs */}
                    <div className="mb-8 line-clamp-3 text-sm text-[var(--text-muted)] md:mb-12 lg:mb-9">
                      {caseStudy.type === "blog"
                        ? (caseStudy.content?.replace(/<[^>]*>/g, "") || "")
                        : (caseStudy.condition || caseStudy.outcome || "")
                      }
                    </div>

                    {/* Read More Link */}
                    <div className="flex items-center text-sm font-medium text-[var(--accent-purple)] mt-auto">
                      Read more{" "}
                      <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Blur transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[var(--purple-light)]/60 backdrop-blur-md pointer-events-none -z-10"></div>
    </section>
  );
}