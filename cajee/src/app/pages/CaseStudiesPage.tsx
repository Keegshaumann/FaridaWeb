import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { PageHero } from "../components/PageHero";
import { Button } from "../components/ui/button";
import { X, Calendar, User } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface CaseStudy {
  id: string;
  title: string;
  type: "case-study" | "blog";
  category: string;
  author?: string;
  patientAge?: string;
  condition?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  content?: string;
  image?: string;
  published: boolean;
  createdAt: string;
}

export function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCaseStudy) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCaseStudy]);

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
        // Filter only published case studies (treat undefined as published for backwards compatibility)
        const publishedOnly = data.filter((cs: CaseStudy) => cs.published !== false);
        setCaseStudies(publishedOnly);
      }
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from published case studies
  const categories = [
    "all",
    ...Array.from(new Set(caseStudies.map((cs) => cs.category))),
  ];

  const filteredCaseStudies =
    selectedCategory === "all"
      ? caseStudies
      : caseStudies.filter((cs) => cs.category === selectedCategory);

  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Case Studies & Insights"
        description="Real patient stories and professional insights showcasing the impact of quality orthotic and prosthetic care"
      />

      {/* Case Studies Section */}
      <section className="relative py-16 md:py-24 bg-[#F5E8F3]">
        {/* Blur transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-[var(--purple-soft)]/60 backdrop-blur-md pointer-events-none z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="flex justify-center mb-12">
              <div className="inline-flex gap-2 p-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-[var(--text-dark)] text-white"
                        : "text-[var(--text-muted)] hover:text-[var(--text-dark)]"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-[var(--text-muted)]">Loading case studies...</p>
            </div>
          ) : filteredCaseStudies.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg">
                <p className="text-[var(--text-dark)] font-semibold mb-2">
                  No case studies available yet.
                </p>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Case studies can be added through the admin panel.
                </p>
                <Link to="/admin">
                  <Button className="bg-[var(--text-dark)] hover:bg-[var(--text-dark)]/90 text-white rounded-full">
                    Go to Admin Panel
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredCaseStudies.map((caseStudy, index) => {
                const isBlog = caseStudy.type === "blog";

                return (
                  <motion.div
                    key={caseStudy.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="relative bg-white rounded-2xl overflow-visible shadow-lg hover:shadow-xl transition-all flex flex-col min-h-[380px]"
                  >
                    {/* Rotated Image Sticking Out on Left */}
                    {caseStudy.image && (
                      <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-40 h-56 -rotate-6 z-10 group-hover:rotate-0 transition-transform duration-300">
                        <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl ring-4 ring-white">
                          <img
                            src={caseStudy.image}
                            alt={caseStudy.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Content - with left padding to accommodate image */}
                    <div className="p-4 pl-36 flex-1 flex flex-col">
                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="inline-block px-2 py-1 bg-[var(--purple-soft)] text-[var(--text-dark)] text-xs font-medium rounded-full">
                          {caseStudy.category}
                        </span>
                        {isBlog && (
                          <span className="inline-block px-2 py-1 bg-[var(--pink-light)] text-[var(--text-dark)] text-xs font-medium rounded-full">
                            Blog
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-[var(--text-dark)] mb-2 line-clamp-2">
                        {caseStudy.title}
                      </h3>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-2 mb-3 text-xs text-[var(--text-muted)]">
                        {caseStudy.author && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{caseStudy.author}</span>
                          </div>
                        )}
                        {caseStudy.patientAge && !isBlog && (
                          <span>• {caseStudy.patientAge}</span>
                        )}
                      </div>

                      {/* Condition/Content Preview */}
                      {!isBlog && caseStudy.condition && (
                        <p className="text-xs text-[var(--text-muted)] mb-4 line-clamp-4 flex-1">
                          {caseStudy.condition}
                        </p>
                      )}
                      {isBlog && caseStudy.content && (
                        <p className="text-xs text-[var(--text-muted)] mb-4 line-clamp-4 flex-1">
                          {caseStudy.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                        </p>
                      )}

                      {/* Read More Button */}
                      <button
                        onClick={() => setSelectedCaseStudy(caseStudy)}
                        className="mt-auto w-full py-2 px-4 bg-[var(--text-dark)] hover:bg-[var(--text-dark)]/90 text-white text-sm font-medium rounded-full transition-colors"
                      >
                        Read More
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCaseStudy(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedCaseStudy(null)}
                    className="sticky top-4 right-4 float-right z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-[var(--text-dark)]" />
                  </button>

                  {/* Image */}
                  {selectedCaseStudy.image && (
                    <div className="h-64 md:h-80 overflow-hidden bg-gradient-to-br from-[var(--pink-soft)] to-[var(--purple-soft)]">
                      <img
                        src={selectedCaseStudy.image}
                        alt={selectedCaseStudy.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    {/* Badges */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-block px-3 py-1 bg-[var(--purple-soft)] text-[var(--text-dark)] text-sm font-medium rounded-full">
                        {selectedCaseStudy.category}
                      </span>
                      {selectedCaseStudy.type === "blog" && (
                        <span className="inline-block px-3 py-1 bg-[var(--pink-light)] text-[var(--text-dark)] text-sm font-medium rounded-full">
                          Blog
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-dark)] mb-4">
                      {selectedCaseStudy.title}
                    </h2>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-[var(--text-muted)] pb-6 border-b border-gray-200">
                      {selectedCaseStudy.author && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{selectedCaseStudy.author}</span>
                        </div>
                      )}
                      {selectedCaseStudy.patientAge && selectedCaseStudy.type !== "blog" && (
                        <div className="flex items-center gap-2">
                          <span>Patient: {selectedCaseStudy.patientAge}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(selectedCaseStudy.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Case Study Content */}
                    {selectedCaseStudy.type !== "blog" && (
                      <div className="space-y-6">
                        {selectedCaseStudy.condition && (
                          <div>
                            <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-2">
                              Condition
                            </h3>
                            <p className="text-[var(--text-muted)] leading-relaxed">
                              {selectedCaseStudy.condition}
                            </p>
                          </div>
                        )}

                        {selectedCaseStudy.challenge && (
                          <div>
                            <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-2">
                              Challenge
                            </h3>
                            <p className="text-[var(--text-muted)] leading-relaxed">
                              {selectedCaseStudy.challenge}
                            </p>
                          </div>
                        )}

                        {selectedCaseStudy.solution && (
                          <div>
                            <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-2">
                              Solution
                            </h3>
                            <p className="text-[var(--text-muted)] leading-relaxed">
                              {selectedCaseStudy.solution}
                            </p>
                          </div>
                        )}

                        {selectedCaseStudy.outcome && (
                          <div className="p-6 bg-gradient-to-br from-[var(--pink-light)] to-[var(--purple-soft)] rounded-2xl">
                            <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-2">
                              Outcome
                            </h3>
                            <p className="text-[var(--text-muted)] leading-relaxed">
                              {selectedCaseStudy.outcome}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Blog Content */}
                    {selectedCaseStudy.type === "blog" && selectedCaseStudy.content && (
                      <div
                        className="prose prose-lg max-w-none text-[var(--text-muted)]"
                        dangerouslySetInnerHTML={{ __html: selectedCaseStudy.content }}
                      />
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}