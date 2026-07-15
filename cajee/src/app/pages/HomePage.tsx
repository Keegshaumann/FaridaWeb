import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { ServiceCard } from "../components/ServiceCard";
import { ServiceCardPremium } from "../components/ServiceCardPremium";
import { CaseStudiesSection } from "../components/CaseStudiesSection";
import { LatestFromBlog } from "../components/LatestFromBlog";
import { SignupForm } from "../components/SignupForm";
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

// Import product images
import customOrthoticsImg from "@/assets/9aabea5badc8e319a69eaad9da1dd23b1c7e6481.webp";
import offTheShelfImg from "@/assets/477f91a9c7ebdc01e1a75b8cdd3b21ddad197960.webp";
import mobilityAidsImg from "@/assets/424428bc84af628c229a68e5a8e17f73eb46101c.webp";
import compressionGarmentsImg from "@/assets/93d9306dca2d06ebc10714a568c9f5598f582439.webp";
import breastProstheticsImg from "@/assets/538a1e8e3cf714b78cdc63eff3781dc6a8484b41.webp";
import limbProstheticsImg from "@/assets/3425be9966550c5581635147cd454de36d66ca07.webp";
import workshopImg from "@/assets/a83f936979af43b1f3576745d4abf5e601cb3f01.webp";
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
      description: "Individually designed orthotic devices crafted to support your unique biomechanical needs and rehabilitation goals.",
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
      description: "High-quality prefabricated orthotic devices for immediate support during recovery, injury management, or post-operative care.",
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
      description: "Professional mobility equipment to support safe movement and independence in daily living and rehabilitation.",
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
      description: "Specialist compression garments for lymphoedema management, oedema control, and post-surgical recovery.",
      image: compressionGarmentsImg,
      hoverImage: compressionGarmentsHoverImg,
      link: "/services/compression",
      features: [
        "Medical-grade compression garments",
        "Lymphoedema and oedema management",
        "Scar therapy and burn management",
        "Flight socks and sports compression"
      ],
    },
    {
      title: "Breast & Silicone Prosthetics",
      description: "Compassionate, dignified care for breast, facial, and digit prosthetic needs with a focus on comfort and natural appearance.",
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
      description: "Advanced prosthetic solutions designed to restore function, mobility, and confidence for individuals with limb loss.",
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
      title: "Individualised, Assessment-Led Care",
      description: "Every treatment plan begins with understanding your unique needs, goals, and environment.",
    },
    {
      icon: Award,
      title: "Clinician-Led Expertise",
      description: "Qualified orthotist and prosthetist providing evidence-based, patient-centred support.",
    },
    {
      icon: Users,
      title: "Functional & Thoughtful Design",
      description: "Devices designed for real-life use, comfort, and long-term independence.",
    },
    {
      icon: Home,
      title: "Home & Hospital Accessibility",
      description: "Mobile service bringing professional care to your home or hospital bedside.",
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
        fullTitle="Orthotic & Prosthetic Care South Africa | Cajee Botes"
        title="Orthotic & Prosthetic Care in South Africa"
        description="Professional orthotic and prosthetic care in South Africa: custom devices, compression and mobility support, plus home and hospital assessments."
        keywords="orthotist prosthetist South Africa, custom orthotics, prosthetic limbs, medical compression garments, mobility aids, breast prosthesis, home visit orthotist, hospital prosthetic service, lymphedema treatment, orthotic devices"
      />
      
      {/* Hero Section - Pink/Purple gradient with Warp shader */}
      <section className="relative">
        <MedicalHero />
        {/* Blur transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#F5E8F3]/90 backdrop-blur-md pointer-events-none z-0"></div>
      </section>

      {/* Restoring Movement Section with Accordion - White */}
      <section className="relative bg-[#F5E8F3]">
        <div className="relative z-10">
          <AccordionFeatureSection
            mainHeading="Restoring Movement. Supporting Independence."
            mainDescription="At Cajee Botes Orthotist Prosthetist, care begins with understanding your condition, your goals, and your daily environment. Orthotic and prosthetic devices are not prescribed based on available stock, but on a comprehensive clinical assessment to ensure that each intervention supports safe mobility, comfort, and long-term function. During the initial phase of practice, assessments and fittings are provided through a mobile service in both home and hospital settings. This allows rehabilitation to begin early for patients who may be unable to travel following surgery, injury, or illness."
            features={[
              {
                id: 1,
                title: "Comprehensive, assessment-led care tailored to your diagnosis and daily living needs",
                description: "Every treatment plan begins with a thorough assessment of your unique condition, lifestyle, and rehabilitation goals."
              },
              {
                id: 2,
                title: "Mobile home and hospital visits to ensure early rehabilitation without unnecessary travel",
                description: "Professional care delivered directly to your location, making quality orthotic and prosthetic services accessible during recovery."
              },
              {
                id: 3,
                title: "Individualised treatment plans focused on long-term function and independence",
                description: "Custom solutions designed to support your ongoing mobility, comfort, and quality of life."
              },
              {
                id: 4,
                title: "A respectful, culturally sensitive approach that prioritises dignity, privacy, and patient comfort",
                description: "Care delivered with empathy, professionalism, and respect for your personal needs and preferences."
              },
              {
                id: 5,
                title: "Professional, compassionate care delivered with attention to detail and ethical practice",
                description: "Evidence-based interventions provided by a qualified orthotist and prosthetist committed to the highest standards of care."
              }
            ]}
            image={workshopImg}
          />
        </div>
        {/* Blur transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#fafafa]/60 to-[#fafafa]/90 backdrop-blur-md pointer-events-none z-0"></div>
      </section>

      {/* Contact Info Bar */}
      <section className="bg-[#FDF1FF] border-b border-border/40" ref={ref}>
        
      </section>

      {/* Mobile Service Model - Light Gray */}
      <section className="relative px-[0px] pt-[30px] pb-[0px] bg-[#f5e8f3]">
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
                    We offer a mobile home and hospital service model, bringing professional orthotic and prosthetic care directly to you. Whether you're recovering at home, in hospital, or unable to travel, we conduct comprehensive assessments in your own environment to ensure the most appropriate and functional outcomes.
                  </p>
                  <Link to="/about">
                    <Button variant="default" className="bg-[var(--text-dark)] hover:bg-[var(--text-dark)]/90 text-white rounded-full">
                      Learn More About Our Approach
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
                      Comprehensive Assessment
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-4 h-4 w-4 flex-shrink-0 text-[var(--accent-purple)]" />
                      Personalized Care
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

      {/* Services Grid - Light Gray (continues from above) */}
      <section className="relative py-16 md:py-32 pt-32 bg-[#f5e8f3]">
        {/* Section Header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-4">
              Our Services
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Comprehensive orthotic and prosthetic care tailored to your needs
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
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Blur transition to next section */}
        
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
              Professional, compassionate care focused on long-term independence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="bg-[#FDF1FF] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
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
                  src="/anatomy/hero-muscle.png"
                  alt="Muscular anatomy figure — explore the conditions we treat"
                  className="h-auto w-64 max-w-full drop-shadow-xl transition-transform duration-300 group-hover:scale-[1.03] sm:w-72"
                  loading="lazy"
                />
              </Link>
            </div>
            {/* Content */}
            <div className="order-1 text-center md:order-2 md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--purple-medium)]">
                Interactive Body Map
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[var(--text-dark)]">
                Where does it hurt?
              </h2>
              <p className="mt-4 text-lg text-[var(--text-muted)] leading-relaxed">
                From neck and back pain to knees, ankles and feet — pinpoint your pain on our interactive
                body map and discover the orthotic or prosthetic solution that can help.
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

      {/* Case Studies Section */}
      <CaseStudiesSection />

      {/* Service area — local relevance for patients and search */}
      <section className="relative py-12 bg-[#F5E8F3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-4">
              Care Where You Are
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Cajee Botes Orthotist &amp; Prosthetist is an HPCSA-registered practice based in Centurion, providing orthotic and prosthetic care across Gauteng — including Pretoria, Midrand, Johannesburg and surrounding areas. Because every assessment can happen at home or at the hospital bedside, patients who struggle to travel after surgery, amputation or injury can begin rehabilitation without delay. From custom orthotics and prosthetic limbs to compression garments, mobility aids and breast prostheses, every device is prescribed after an individual clinical assessment and fitted with ongoing review — so your support keeps pace as your needs change.
            </p>
          </div>
        </div>
      </section>

      {/* Latest advice articles */}
      <LatestFromBlog />

      {/* CTA Section - Purple gradient */}
      
    </>
  );
}