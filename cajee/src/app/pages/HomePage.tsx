import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { ServiceCardPremium } from "../components/ServiceCardPremium";
import { LatestFromBlog } from "../components/LatestFromBlog";
import { Heart, Users, Home, Award, Phone, Mail, Check, ArrowRight } from "lucide-react";
import { MedicalHero } from "../components/ui/medical-hero";
import { VelocityScroll } from "../components/ui/velocity-scroll";
import { AccordionFeatureSection } from "../components/AccordionFeatureSection";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SEO } from "../components/SEO";
import { imageSize } from "../data/image-sizes";
import { LegDiagram } from "../components/compression/LegDiagram";

// Import product images
import customOrthoticsImg from "@/assets/9aabea5badc8e319a69eaad9da1dd23b1c7e6481.webp";
import offTheShelfImg from "@/assets/477f91a9c7ebdc01e1a75b8cdd3b21ddad197960.webp";
import mobilityAidsImg from "@/assets/424428bc84af628c229a68e5a8e17f73eb46101c.webp";
import compressionGarmentsImg from "@/assets/93d9306dca2d06ebc10714a568c9f5598f582439.webp";
import breastProstheticsImg from "@/assets/538a1e8e3cf714b78cdc63eff3781dc6a8484b41.webp";
import limbProstheticsImg from "@/assets/3425be9966550c5581635147cd454de36d66ca07.webp";
import faridaGraduationImg from "@/assets/farida-graduation.webp";
import customOrthoticsHoverImg from "@/assets/333a3e1dd99582b83c3f9c38dead3e13c3cf6dd8.webp";
import offTheShelfHoverImg from "@/assets/e5730945e19fdb01e509b02c9949458b5176689c.webp";
import mobilityAidsHoverImg from "@/assets/0c656bc256881f7d19efdc0720e6c85ef11b2335.webp";
import compressionGarmentsHoverImg from "@/assets/da03a7c08a7f70f2988d76e292e2365329d7da4b.webp";
import breastProstheticsHoverImg from "@/assets/ab54e9bc406f99d945a9fc82535f9ab964c208be.webp";
import limbProstheticsHoverImg from "@/assets/9c4e446ca8913326ca2915d99d461c49f5418570.webp";

export function HomePage() {
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);

  const productCategories = [
    {
      title: "Custom Orthotics",
      description: "Orthotic devices designed for you alone, to support the way your body moves and what you're working towards in rehab.",
      image: offTheShelfImg,
      hoverImage: customOrthoticsHoverImg,
      link: "/services/custom-orthotics",
      features: [
        "Custom-fit upper and lower limb orthoses",
        "Spinal and neurological support devices",
        "Paediatric orthotic solutions",
        "Precision-crafted insoles and supports"
      ],
    },
    {
      title: "Off-the-Shelf Orthotics",
      description: "High-quality ready-made orthotic devices you can wear straight away, during recovery, for an injury or after an operation.",
      image: mobilityAidsImg,
      hoverImage: offTheShelfHoverImg,
      link: "/services/off-the-shelf-orthotics",
      features: [
        "Joint braces and post-operative supports",
        "Injury management and soft support",
        "Sports bracing and protection",
        "Ready-to-use mobility solutions"
      ],
    },
    {
      title: "Mobility Aids",
      description: "Professional mobility equipment to help you move safely and independently, day to day and during rehab.",
      image: customOrthoticsImg,
      hoverImage: mobilityAidsHoverImg,
      link: "/services/mobility-aids",
      features: [
        "Crutches, walking sticks, and frames",
        "Wheelchairs and transfer aids",
        "Toilet seat raisers and bathroom support",
        "Expert guidance on proper use"
      ],
    },
    {
      title: "Medical Compression",
      description: "Our compression specialism: graduated compression stockings, pantyhose and made-to-measure compression garments in compression class A to class 3.",
      image: compressionGarmentsImg,
      hoverImage: compressionGarmentsHoverImg,
      link: "/services/compression",
      features: [
        "Below-knee (BK) and thigh-high (AK) compression stockings",
        "Compression pantyhose, tights and maternity compression",
        "Compression class A, 1, 2 and 3: measured and fitted",
        "Flat-knit compression for lymphoedema and lipoedema"
      ],
    },
    {
      title: "Breast & Silicone Prosthetics",
      description: "Breast, facial, finger and toe prostheses, with compassionate, dignified care and a focus on comfort and a natural look.",
      image: breastProstheticsImg,
      hoverImage: breastProstheticsHoverImg,
      link: "/services/breast-prosthetics",
      features: [
        "Breast prostheses and nipple solutions",
        "Finger and toe prosthetics",
        "Facial and cosmetic prostheses",
        "Private, respectful fittings"
      ],
    },
    {
      title: "Upper & Lower Limb Prosthetics",
      description: "Upper and lower limb prostheses (artificial arms and legs) for people with limb loss, designed to restore function, mobility and confidence.",
      image: limbProstheticsImg,
      hoverImage: limbProstheticsHoverImg,
      link: "/services/prosthetics",
      features: [
        "Upper and lower limb prostheses",
        "Paediatric prosthetic care",
        "Functional and cosmetic designs",
        "Ongoing support and adjustments"
      ],
    },
  ];

  const whyChooseUs = [
    {
      icon: Heart,
      title: "Assessment-Led Care, Planned for You",
      description: "Every treatment plan starts with understanding what you need, what you're aiming for and your surroundings.",
    },
    {
      icon: Award,
      title: "Clinician-Led Expertise",
      description: "You're seen by a qualified orthotist and prosthetist, and the support is evidence-based and built around you.",
    },
    {
      icon: Users,
      title: "Designed for Everyday Life",
      description: "Devices designed to be used in real life, comfortable to wear, and aimed at long-term independence.",
    },
    {
      icon: Home,
      title: "Home and Hospital Visits",
      description: "We bring professional care to your home or your hospital bedside.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  // Carousel settings for infinite product slider
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: false,
    arrows: false,
    variableWidth: true,
  };

  // Product names for carousel
  const productNames = [
    "Products",
    "Custom Orthotics",
    "Products",
    "Prosthetics",
    "Products",
    "Mobility Aids",
    "Products",
    "Compression",
    "Products",
    "Breast Prosthetics",
  ];


  return (
    <>
      <SEO
        fullTitle="Orthotist & Prosthetist in Sandton | Farida Cajee-Botes"
        title="Orthotics, Prosthetics & Medical Compression"
        description="Orthotist and prosthetist in Morningside, Sandton: custom braces and insoles, prosthetic limbs and medical compression, with home visits across Gauteng."
        keywords="orthotist prosthetist South Africa, medical compression, compression specialist, compression stockings South Africa, compression garments, compression therapy, custom orthotics, prosthetic limbs, mobility aids, breast prosthesis, home visit orthotist, hospital prosthetic service, lymphoedema compression, orthotic devices"
      />
      
      {/* Hero Section - Pink/Purple gradient with Warp shader */}
      <section className="relative">
        <MedicalHero />
        {/* Blur transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#E9F4FB]/90 backdrop-blur-md pointer-events-none z-0"></div>
      </section>

      {/* Restoring Movement Section with Accordion - White */}
      <section className="relative bg-[#E9F4FB]">
        <div className="relative z-10">
          <AccordionFeatureSection
            mainHeading="Restoring Movement and Supporting Independence"
            subHeading="Personalised Orthotic & Prosthetic Care"
            mainDescription="Farida is a qualified Orthotist & Prosthetist. Her work covers orthotic and prosthetic care, medical compression and breast care, and it's centred on understanding the person behind the prescription. What she recommends is a clinical decision made for that patient, to support their comfort, function and independence."
            features={[
              {
                id: 1,
                title: "A full assessment first, based on your diagnosis and the way you live",
                description: "Every treatment plan starts with a thorough assessment: your condition, how you live, and what you're working towards in your rehabilitation."
              },
              {
                id: 2,
                title: "Home and hospital visits, so your rehabilitation starts early without unnecessary travel",
                description: "We bring professional care to you, so quality orthotic and prosthetic services are within reach while you recover."
              },
              {
                id: 3,
                title: "A plan made for you, aimed at function and independence for the long term",
                description: "Designed around you, to keep supporting your mobility, comfort and quality of life."
              },
              {
                id: 4,
                title: "Respectful and culturally sensitive, with your dignity, privacy and comfort put first",
                description: "Care given with empathy and professionalism, and with respect for what you need and prefer."
              },
              {
                id: 5,
                title: "Compassionate and professional, with attention to detail and ethical practice",
                description: "Treatment is evidence-based and comes from a qualified orthotist and prosthetist who holds herself to a high standard of care."
              }
            ]}
            image={faridaGraduationImg}
            imageAlt="Farida Cajee-Botes on her graduation day, wearing her academic cap and gown and holding her qualification certificate"
          />
        </div>
        {/* Blur transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#fafafa]/60 to-[#fafafa]/90 backdrop-blur-md pointer-events-none z-0"></div>
      </section>

      {/* Contact Info Bar */}
      <section className="bg-[#F4FBFF] border-b border-border/40" ref={ref}>
        
      </section>

      {/* Mobile Service Model - Light Gray */}
      <section className="relative px-[0px] pt-[30px] pb-[0px] bg-[#E9F4FB]">
        {/* Blur transition from previous section */}
        
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-center">
            <div className="max-w-5xl w-full">
              <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-white/60 backdrop-blur-sm px-6 py-10 md:flex-row lg:px-20 lg:py-16 shadow-sm">
                <div className="md:w-1/2">
                  <h2 className="mb-4 text-2xl md:text-3xl font-bold text-[var(--text-dark)]">
                    Care Where You Need It
                  </h2>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                    We run a mobile home and hospital service, so professional orthotic, prosthetic and compression care comes to you. If you're recovering at home, you're in hospital or you can't travel, we do the full assessment where you are, compression measuring and fitting included. Seeing you in your own environment is how we make sure the result is appropriate and works for you.
                  </p>
                  <Link to="/about">
                    <Button variant="default" className="bg-[var(--text-dark)] hover:bg-[var(--text-dark)]/90 text-white rounded-full">
                      See How We Work
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="md:w-1/3">
                  <ul className="flex flex-col space-y-3 text-sm font-medium">
                    <li className="flex items-center">
                      <Check className="mr-4 h-4 w-4 flex-shrink-0 text-[var(--accent-purple)]" />
                      Home Visits Available
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-4 h-4 w-4 flex-shrink-0 text-[var(--accent-purple)]" />
                      Hospital Service
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-4 h-4 w-4 flex-shrink-0 text-[var(--accent-purple)]" />
                      Full Assessment
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-4 h-4 w-4 flex-shrink-0 text-[var(--accent-purple)]" />
                      Personalised Care
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-4 h-4 w-4 flex-shrink-0 text-[var(--accent-purple)]" />
                      Professional Service
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Light Gray (continues from above). overflow-x-clip:
          the floating card pictures are 400px wide and pushed past the right
          edge from 1024 to about 1160px, so the page scrolled sideways. Clipping
          at the section's edge (the window's edge) cuts only what was off
          screen; nothing is clipped vertically. */}
      <section className="relative py-16 md:py-32 pt-32 bg-[#E9F4FB] overflow-x-clip">
        {/* Section Header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-4">
              Our Services
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              The full range of orthotic, prosthetic and medical compression care, matched to your needs
            </p>
          </div>
        </div>

        {/* Premium Cards Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Grid - 3 columns on desktop, 1 on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-14 pt-20 pb-12">
            {productCategories.map((service, index) => (
              <div key={service.title} className="flex">
                <ServiceCardPremium
                  index={index + 1}
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  features={service.features}
                  link={service.link}
                  lazy
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Blur transition to next section */}
        
      </section>

      {/* Compression specialism band: teases the dedicated compression clinic */}
      <section className="relative overflow-hidden bg-[var(--comp-ink)] py-14 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(60rem 34rem at 82% 10%, rgba(184,145,181,0.32), transparent 62%), radial-gradient(50rem 32rem at 0% 100%, rgba(0,96,192,0.35), transparent 60%)",
          }}
        />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:gap-14">
            <div className="w-28 flex-shrink-0 md:w-36">
              <LegDiagram
                coverTop={0.48}
                onDark
                className="h-auto w-full"
                label="Leg wearing a below-knee graduated compression stocking"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-[13px] md:text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--comp-lilac)]">
                Our compression specialism
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                We specialise in medical compression
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/70">
                A dedicated lower-limb compression clinic within the practice: graduated compression
                stockings, compression pantyhose and made-to-measure compression garments, in
                compression class A through class 3, measured and fitted on the leg.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                {[
                  "Below-knee (BK)",
                  "Thigh-high (AK)",
                  "Pantyhose",
                  "Class A · 1 · 2 · 3",
                  "Flat-knit & circular-knit",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-sm text-white/80"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex justify-center md:justify-start">
                <Link to="/services/compression">
                  <Button
                    size="lg"
                    className="rounded-full bg-[var(--comp-shell)] px-8 text-[var(--comp-plum)] hover:bg-white"
                  >
                    Explore Medical Compression
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Pink gradient */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[var(--pink-light)] to-[var(--pink-soft)]">
        {/* Blur transition from previous section */}
        
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-dark)] mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Professional, compassionate care, with long-term independence as the goal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="bg-[#F4FBFF] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--purple-soft)] flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-[var(--accent-purple)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-3">
                  {item.title}
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Blur transition to next section */}
        
      </section>

      {/* Testimonials Section - White background */}
      

      {/* About Section */}

      {/* Conditions / Body Map Teaser */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[var(--purple-light)] to-[var(--purple-soft)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
            {/* Muscle figure */}
            <div className="order-2 flex justify-center md:order-1">
              <Link to="/conditions" aria-label="Explore the conditions we treat" className="group relative">
                <img
                  src="/anatomy/hero-muscle.webp"
                  alt="Muscular anatomy figure: explore the conditions we treat"
                  {...imageSize("/anatomy/hero-muscle.webp")}
                  className="h-auto w-64 max-w-full drop-shadow-xl transition-transform duration-300 group-hover:scale-[1.03] sm:w-72"
                  loading="lazy"
                />
              </Link>
            </div>
            {/* Content */}
            <div className="order-1 text-center md:order-2 md:text-left">
              <p className="text-[13px] md:text-xs font-semibold uppercase tracking-[0.2em] text-[var(--purple-medium)]">
                Interactive Body Map
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[var(--text-dark)]">
                Where does it hurt?
              </h2>
              <p className="mt-4 text-lg text-[var(--text-muted)] leading-relaxed">
                Neck, back, knees, ankles or feet: mark where it hurts on the interactive
                body map and see which orthotic or prosthetic options can help.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                {["Neck Pain", "Lower Back Pain", "Knee Pain", "Ankle Pain", "Foot & Heel Pain"].map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-white/70 px-3 py-1.5 text-sm font-medium text-[var(--text-dark)] shadow-sm"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex justify-center md:justify-start">
                <Link to="/conditions">
                  <Button size="lg" className="rounded-full bg-[var(--text-dark)] px-8 text-white hover:bg-[var(--text-dark)]/90">
                    Explore Conditions We Treat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farida's own statement of how she practises. Written by her; used as
          supplied. Multi-paragraph body is left-aligned because centred text at
          this length is hard to read. */}
      <section className="relative py-12 bg-[#E9F4FB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-6 text-center">
              Your Orthotist and Prosthetist, Wherever You Need It
            </h2>
            <div className="space-y-4 text-left text-[var(--text-muted)] leading-relaxed">
              <p>
                I am an HPCSA-registered Orthotist &amp; Prosthetist currently practising in
                Morningside, Sandton, where I provide comprehensive orthotic, prosthetic and
                medical compression services.
              </p>
              <p>
                My clinical approach begins with a thorough assessment of each patient&rsquo;s
                needs, lifestyle and goals. I believe that orthotic and prosthetic care should
                never be about simply selecting a device from available stock. It should be about
                finding the right solution for the individual.
              </p>
              <p>
                My areas of clinical interest include custom orthotics, prosthetic rehabilitation,
                medical compression, breast prostheses and post-operative support, with a
                particular focus on providing solutions that are practical, comfortable and
                clinically appropriate.
              </p>
              <p>
                Where appropriate, I also provide consultations at hospitals, healthcare
                facilities and patients&rsquo; homes, particularly when mobility, recovery or
                medical circumstances make travelling difficult.
              </p>
              <p>
                I work closely with patients and their healthcare teams, so that every device fits
                the wider plan for recovery and for daily life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest advice articles */}
      <LatestFromBlog />

      {/* CTA Section - Purple gradient */}
      
    </>
  );
}