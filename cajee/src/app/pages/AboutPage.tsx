import { PageHero } from "../components/PageHero";
import { Heart, Users, Award, Home, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";
import faridaImage from "@/assets/8bc488eb1600d499b9d860b11fca9c3eefc7f847.webp";
import { SafeWarp } from "../components/ui/safe-warp";
import { SEO } from "../components/SEO";

export function AboutPage() {
  const whyChooseUs = [
    {
      id: "1",
      title: "Individualised, Assessment-Led Care",
      description: "Every intervention begins with a comprehensive clinical assessment. Orthoses and prostheses are prescribed according to diagnosis, functional goals, and daily environment, ensuring appropriate support, optimal fit, and long-term function.",
    },
    {
      id: "2",
      title: "Clinician-Led Expertise",
      description: "Care is delivered by Farida Cajee-Botes, a qualified Orthotist and Prosthetist committed to combining technical precision with a compassionate, patient-focused approach.",
    },
    {
      id: "3",
      title: "Functional & Thoughtful Design",
      description: "Devices are selected and designed to prioritise comfort, durability, and real-life usability, supporting independence at home, work, school, and in the community.",
    },
    {
      id: "4",
      title: "Home & Hospital Accessibility",
      description: "Our mobile service model brings professional care to your home or hospital bedside, removing barriers to access and ensuring real-world appropriateness.",
    },
  ];

  // Registration numbers are the practice's own, as published on its patient intake
  // form. They are the only checkable authority signal available for a YMYL health
  // page, so they belong in both the visible copy and the structured data.
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Farida Cajee-Botes",
      jobTitle: "Orthotist & Prosthetist",
      url: "https://www.cajeebotes.com/about",
      worksFor: {
        "@type": "MedicalBusiness",
        name: "Farida Cajee-Botes Orthotist Prosthetist",
        url: "https://www.cajeebotes.com",
      },
      workLocation: {
        "@type": "Place",
        name: "Orthocast Morningside",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Block F, Ground Floor, Rochester Place, 173 Rivonia Road, Morningside",
          addressLocality: "Sandton",
          addressRegion: "Gauteng",
          postalCode: "2196",
          addressCountry: "ZA",
        },
      },
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Professional registration",
          recognizedBy: {
            "@type": "Organization",
            name: "Health Professions Council of South Africa",
            url: "https://www.hpcsa.co.za/",
          },
          identifier: "OS 0015148",
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Practice number",
          recognizedBy: { "@type": "Organization", name: "Board of Healthcare Funders" },
          identifier: "1321412",
        },
      ],
      knowsAbout: [
        "Orthotics",
        "Prosthetics",
        "Medical compression therapy",
        "Mobility aids",
        "Breast prostheses",
      ],
    },
  };

  return (
    <>
      <SEO
        schema={personSchema}
        fullTitle="About Farida Cajee-Botes | Orthotist & Prosthetist"
        title="About Farida Cajee-Botes"
        description="Farida Cajee-Botes is a qualified orthotist and prosthetist consulting in Morningside, Sandton, with home and hospital visits across Gauteng."
        keywords="Farida Cajee-Botes, qualified orthotist, certified prosthetist, orthotic specialist South Africa, prosthetic specialist, medical compression specialist, compression garment fitter, mobile orthotist, home visit prosthetist"
      />
      
      {/* Hero Section */}
      

      {/* Introduction Section - Two Column Layout */}
      <section className="relative py-16 md:py-24 bg-[#F5E8F3] overflow-hidden">
        {/* Background Warp Shader */}
        <div className="absolute inset-0 opacity-20 z-0">
          <SafeWarp
            style={{ height: "100%", width: "100%" }}
            proportion={0.45}
            softness={1}
            distortion={0.25}
            swirl={0.8}
            swirlIterations={10}
            shape="checks"
            shapeScale={0.1}
            scale={1}
            rotation={0}
            speed={0.5}
            colors={[
              "hsl(330, 60%, 85%)", // soft pink
              "hsl(280, 50%, 75%)", // soft purple
              "hsl(340, 55%, 90%)", // light pink
              "hsl(270, 45%, 80%)", // light purple
            ]}
          />
        </div>

        <motion.div
          className="relative z-10 flex w-full flex-col overflow-hidden text-[var(--text-dark)] md:flex-row"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {/* Left Side: Content */}
          <div className="flex w-full flex-col justify-between p-8 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16">
            {/* Top Section: Header */}
            <div>
              <motion.header
                className="mb-12"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
                }}
              >
                <p className="text-xs font-medium tracking-[0.3em] text-[var(--text-muted)] uppercase">
                  Orthotist & Prosthetist
                </p>
              </motion.header>

              <motion.main
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                <motion.h1
                  className="text-4xl font-bold leading-tight text-[var(--text-dark)] md:text-5xl lg:text-6xl"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                >
                  Farida <br />
                  <span className="text-[var(--accent-purple)]">Cajee-Botes</span>
                </motion.h1>
                <motion.div
                  className="my-6 h-1 w-20 bg-[var(--accent-purple)]"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                ></motion.div>
                <motion.p
                  className="mb-6 max-w-lg text-base text-[var(--text-muted)] leading-relaxed"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                >
                  Farida Cajee-Botes is a qualified Orthotist and Prosthetist providing individualised, clinician-led rehabilitation support for people living with injury, illness, or physical impairment across Gauteng, South Africa.
                </motion.p>
                <motion.p
                  className="mb-8 max-w-lg text-base text-[var(--text-muted)] leading-relaxed"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                >
                  With a deep commitment to assessment-led care, Farida works closely with patients, caregivers, and hospital teams to design and prescribe orthotic and prosthetic devices that support real-world function, dignity, and long-term independence.
                </motion.p>
                <motion.div
                  className="mb-8 max-w-lg"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                >
                  <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-[var(--accent-purple)]">
                    Registrations
                  </h2>
                  {/* A real table, not a div grid: these are the only checkable
                      authority signals on a health page, and tables are what search
                      engines and AI assistants actually extract. */}
                  <table className="w-full text-left text-sm text-[var(--text-muted)]">
                    <caption className="sr-only">
                      Professional registration and practice numbers for Farida Cajee-Botes
                    </caption>
                    <tbody>
                      <tr className="border-b border-[var(--purple-soft)]/40">
                        <th scope="row" className="py-2 pr-4 font-medium text-[var(--text-dark)]">
                          HPCSA registration
                        </th>
                        <td className="py-2">OS 0015148</td>
                      </tr>
                      <tr className="border-b border-[var(--purple-soft)]/40">
                        <th scope="row" className="py-2 pr-4 font-medium text-[var(--text-dark)]">
                          Practice number
                        </th>
                        <td className="py-2">1321412</td>
                      </tr>
                      <tr>
                        <th scope="row" className="py-2 pr-4 font-medium text-[var(--text-dark)]">
                          Company registration
                        </th>
                        <td className="py-2">2026/136620/21</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="mt-3 text-xs text-[var(--text-muted)]">
                    Registration can be checked on the{" "}
                    <a
                      href="https://www.hpcsa.co.za/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-[var(--text-dark)]"
                    >
                      Health Professions Council of South Africa
                    </a>{" "}
                    register. Consulting rooms at Orthocast Morningside, 173 Rivonia Road,
                    Sandton, with home and hospital visits across Gauteng.
                  </p>
                </motion.div>

                <Link to="/contact#book">
                  <motion.div
                    className="inline-block text-sm font-bold tracking-widest text-[var(--accent-purple)] transition-colors hover:text-[var(--accent-purple)]/80 cursor-pointer"
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
                    }}
                  >
                    BOOK AN ASSESSMENT →
                  </motion.div>
                </Link>
              </motion.main>
            </div>

            {/* Bottom Section: Footer Info */}
            <motion.footer
              className="mt-12 w-full"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
              }}
            >
              <div className="grid grid-cols-1 gap-6 text-xs text-[var(--text-muted)] sm:grid-cols-3">
                <div className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-[var(--accent-purple)]" />
                  <span>Compassionate Care</span>
                </div>
                <div className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-[var(--accent-purple)]" />
                  <span>Clinical Excellence</span>
                </div>
                <div className="flex items-center">
                  <Home className="mr-2 h-5 w-5 text-[var(--accent-purple)]" />
                  <span>Mobile Service</span>
                </div>
              </div>
            </motion.footer>
          </div>

          {/* Right Side: Image with Clip Path Animation */}
          <motion.div
            className="w-full min-h-[400px] bg-cover bg-center md:w-1/2 md:min-h-full lg:w-2/5"
            style={{
              backgroundImage: `url(${faridaImage})`,
              backgroundPosition: 'center top',
            }}
            initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
            animate={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
            transition={{ duration: 1.2, ease: "circOut" }}
          >
          </motion.div>
        </motion.div>
        {/* Blur transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[var(--pink-light)]/90 backdrop-blur-md pointer-events-none z-0"></div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-16 md:py-24 bg-[var(--pink-light)]">
        {/* Blur transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-[#FDF1FF]/60 backdrop-blur-md pointer-events-none z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-dark)] mb-4">
                Why Choose Us
              </h2>
              <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
                Professional orthotic and prosthetic care grounded in clinical excellence, compassion, and individualised support
              </p>
            </div>

            {/* Native <details> so every description reaches the prerendered HTML.
                A Radix accordion unmounts closed panels, which previously hid the
                practitioner's credentials from crawlers. */}
            <div className="w-full">
              {whyChooseUs.map((item, i) => (
                <details
                  key={item.id}
                  name="why-choose-us"
                  open={i === 0}
                  className="group border-b"
                >
                  <summary className="flex cursor-pointer list-none items-start gap-4 py-4 pl-6 text-left text-foreground/20 duration-200 group-open:text-[var(--accent-purple)] md:pl-14">
                    <p className="pt-2 text-xs">{item.id}</p>
                    <h3 className="relative text-left text-xl font-semibold uppercase md:text-3xl">
                      {item.title}
                    </h3>
                  </summary>
                  <div className="pb-6 pl-6 text-base leading-relaxed text-[var(--text-muted)] md:px-20">
                    {item.description}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
        {/* Blur transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#FDF1FF]/90 backdrop-blur-md pointer-events-none z-0"></div>
      </section>

      {/* Our Approach Section */}
      <section className="relative py-16 md:py-24 bg-[#F5E8F3]">
        {/* Blur transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-[var(--pink-light)]/60 backdrop-blur-md pointer-events-none z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-dark)] mb-4">
                Our Approach
              </h2>
              <p className="text-lg text-[var(--text-muted)]">
                Comprehensive assessment, thoughtful prescription, and ongoing support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--pink-soft)] flex items-center justify-center">
                  <span className="text-2xl font-bold text-[var(--accent-purple)]">1</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2">
                  Assessment
                </h3>
                <p className="text-[var(--text-muted)]">
                  Comprehensive clinical evaluation of your condition, goals, and daily environment
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--purple-soft)] flex items-center justify-center">
                  <span className="text-2xl font-bold text-[var(--accent-pink)]">2</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2">
                  Prescription
                </h3>
                <p className="text-[var(--text-muted)]">
                  Devices prescribed for optimal fit, function, and long-term independence
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--pink-soft)] flex items-center justify-center">
                  <span className="text-2xl font-bold text-[var(--accent-purple)]">3</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2">
                  Support
                </h3>
                <p className="text-[var(--text-muted)]">
                  Regular reviews and adjustments to ensure continued comfort and effectiveness
                </p>
              </div>
            </div>

            {/* Detailed Approach Content */}
            <div className="mt-12 space-y-4 text-lg text-[var(--text-muted)] leading-relaxed bg-[var(--purple-light)] rounded-2xl p-8 md:p-10">
              <p>
                Every patient journey begins with a comprehensive clinical assessment. We take time to understand your medical history, current condition, functional goals, and the environment in which you live and move.
              </p>
              <p>
                We believe the best outcomes come from devices that are prescribed thoughtfully, fitted carefully, and reviewed regularly. Our mobile service model allows us to conduct assessments and fittings in your home or hospital room, ensuring real-world appropriateness and comfort.
              </p>
              <p>
                Whether you need a prosthetic limb, custom orthotic device, compression garment, or mobility aid, we focus on practical support, dignity, and improved daily function.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Service Model Section */}
      

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-[#F5E8F3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-semibold text-[var(--text-dark)] mb-4">
              Let's Work Together
            </h3>
            <p className="text-lg text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
              If you'd like to discuss your needs or book an assessment, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact#book">
                <Button size="lg" className="bg-[var(--text-dark)] hover:bg-[var(--text-dark)]/90 text-white rounded-full px-8 h-12">
                  Book an Assessment
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="rounded-full border-2 px-8 h-12">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}