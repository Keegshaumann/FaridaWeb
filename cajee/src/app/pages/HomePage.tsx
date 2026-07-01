import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { ServiceCard } from "../components/ServiceCard";
import { ServiceCardPremium } from "../components/ServiceCardPremium";
import { CaseStudiesSection } from "../components/CaseStudiesSection";
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
import { TestimonialsColumn } from "../components/ui/testimonials-columns-1";
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

  // Testimonials data
  const testimonials = [
    {
      text: "The home visit service made such a difference during my recovery. Cajee's professional yet compassionate approach helped me regain my independence.",
      image: "/external/photo-1758686254563.jpg",
      name: "Margaret Thompson",
      role: "Prosthetic Patient",
    },
    {
      text: "Professional, knowledgeable, and truly caring. The custom orthotic device has improved my mobility and quality of life significantly.",
      image: "/external/photo-1764084051438.jpg",
      name: "David Chen",
      role: "Orthotic Patient",
    },
    {
      text: "The assessment was thorough and respectful. I felt heard and understood throughout the entire process of getting my compression garments.",
      image: "/external/photo-1676552055618.jpg",
      name: "Linda Botha",
      role: "Compression Patient",
    },
    {
      text: "Excellent service from start to finish. The mobility aids recommended were perfect for my needs and delivered with expert guidance.",
      image: "/external/photo-1758686253859.jpg",
      name: "James Williams",
      role: "Mobility Aid User",
    },
    {
      text: "As a caregiver, I appreciated the clear communication and education provided. It made supporting my mother's recovery much easier.",
      image: "/external/photo-1710452772856.jpg",
      name: "Sarah Patel",
      role: "Family Caregiver",
    },
    {
      text: "The hospital bedside fitting was incredibly convenient and professional. Highly recommend for anyone needing orthotic or prosthetic care.",
      image: "/external/photo-1577202214328.jpg",
      name: "Peter van der Merwe",
      role: "Hospital Patient",
    },
    {
      text: "Compassionate, dignified care that made a difficult time much easier. The breast prosthetic fitting was handled with such sensitivity and professionalism.",
      image: "/external/photo-1765896387387.jpg",
      name: "Elizabeth Johnson",
      role: "Breast Prosthetic Patient",
    },
    {
      text: "The custom insoles have made such a difference to my daily comfort. Professional service with genuine care for patient outcomes.",
      image: "/external/photo-1770058428154.jpg",
      name: "Amanda Naidoo",
      role: "Custom Orthotic Patient",
    },
    {
      text: "Outstanding expertise and care. The assessment was detailed and the treatment plan perfectly suited to my rehabilitation needs.",
      image: "/external/photo-1770058428159.jpg",
      name: "Michael de Villiers",
      role: "Spinal Orthotic Patient",
    },
  ];

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <>
      <SEO
        title="Professional Orthotist & Prosthetist Services in South Africa"
        description="Expert orthotics and prosthetics care with mobile home and hospital assessments. Custom orthotics, prosthetic limbs, compression garments, mobility aids, and breast prosthetics. Book your assessment today."
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

      {/* Case Studies Section */}
      <CaseStudiesSection />

      {/* CTA Section - Purple gradient */}
      
    </>
  );
}