import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { SEO } from "../components/SEO";
import { BodyMap } from "../components/body-map/BodyMap";

const COMMON_CONDITIONS = [
  "Sports Injuries",
  "Arthritis & Joint Pain",
  "Sprains & Strains",
  "Post-Surgical Recovery",
  "Lymphoedema & Swelling",
  "Diabetic Foot Care",
  "Back & Posture Pain",
  "Limb Loss",
];

export function ConditionsPage() {
  return (
    <>
      <SEO
        fullTitle="Conditions We Treat | Cajee Botes Orthotist & Prosthetist"
        title="Conditions We Treat"
        description="Find your pain on our interactive body map and see the orthotic or prosthetic solution — braces, insoles, compression or prosthetics — that can help."
        keywords="orthotic solutions for pain, knee brace, ankle brace, back support, cervical collar, plantar fasciitis insole, SI joint belt, lymphoedema compression, prosthetic limb South Africa"
      />

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[var(--purple-light)] to-[var(--purple-soft)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)]">
              Conditions <span className="text-[var(--accent-purple)]">We Treat</span>
            </h1>
            <p className="mt-4 text-lg text-[var(--text-muted)] leading-relaxed">
              Whether you're recovering from an operation, managing a sports injury, or living with
              chronic pain, our clinician-led assessments match you to the right orthotic or prosthetic
              solution for your individual needs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {COMMON_CONDITIONS.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-[var(--text-dark)] px-4 py-2 text-sm font-medium text-white/95 shadow-sm"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Blur transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#F5E8F3]/90 backdrop-blur-md pointer-events-none z-0"></div>
      </section>

      {/* Interactive body map */}
      <section className="relative py-16 md:py-24 bg-[#F5E8F3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-dark)]">
              Where does it hurt?
            </h2>
            <p className="mt-3 text-[var(--text-muted)] leading-relaxed">
              Select a point on the body — or a condition — to see the device we'd recommend and the
              service that provides it.
            </p>
            <p className="mt-3 text-sm text-[var(--text-muted)]/80">
              This is a guide, not a diagnosis — every recommendation is confirmed by an individual
              clinical assessment.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <BodyMap />
          </div>
        </div>
      </section>

      {/* Reassurance / CTA */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[var(--pink-light)] to-[var(--pink-soft)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)]">
              Don't see your condition?
            </h2>
            <p className="mt-3 text-[var(--text-muted)] leading-relaxed">
              This is a guide, not a diagnosis. If your pain isn't listed, or you're not sure which
              solution is right for you, get in touch — every treatment plan begins with a thorough,
              individual assessment in your home or hospital room.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact#book">
                <Button size="lg" className="rounded-full bg-[var(--text-dark)] px-8 text-white hover:bg-[var(--text-dark)]/90">
                  Book an Assessment
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="rounded-full border-2 px-8">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
