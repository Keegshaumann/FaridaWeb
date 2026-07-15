import { PageHero } from "../components/PageHero";
import { SEO } from "../components/SEO";
import { ServiceCard } from "../components/ServiceCard";
import { ServiceCardPremium } from "../components/ServiceCardPremium";
import { Link } from "react-router";
import { Button } from "../components/ui/button";

// Import product images
import customOrthoticsImg from "@/assets/9aabea5badc8e319a69eaad9da1dd23b1c7e6481.webp";
import offTheShelfImg from "@/assets/477f91a9c7ebdc01e1a75b8cdd3b21ddad197960.webp";
import mobilityAidsImg from "@/assets/424428bc84af628c229a68e5a8e17f73eb46101c.webp";
import compressionGarmentsImg from "@/assets/93d9306dca2d06ebc10714a568c9f5598f582439.webp";
import breastProstheticsImg from "@/assets/538a1e8e3cf714b78cdc63eff3781dc6a8484b41.webp";
import limbProstheticsImg from "@/assets/3425be9966550c5581635147cd454de36d66ca07.webp";

export function ServicesPage() {
  const productCategories = [
    {
      title: "Custom Orthotics",
      description: "Individually designed orthotic devices crafted to support your unique biomechanical needs and rehabilitation goals.",
      image: mobilityAidsImg,
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
      image: offTheShelfImg,
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
      link: "/services/prosthetics",
      features: [
        "Upper and lower limb prostheses",
        "Paediatric prosthetic care",
        "Functional and cosmetic designs",
        "Ongoing support and adjustments"
      ],
    },
  ];

  return (
    <>
      <SEO
        fullTitle="Orthotic & Prosthetic Services in South Africa | Cajee Botes"
        title="Orthotic & Prosthetic Services"
        description="Explore our custom orthotics, prosthetics, mobility aids and compression garments — individually assessed and fitted across South Africa."
        keywords="orthotist prosthetist South Africa, orthotic services, prosthetic services, custom orthotics, off-the-shelf orthotics, mobility aids, medical compression, breast prosthetics"
      />
      {/* Hero Section */}
      

      {/* Services Grid Section */}
      <section className="relative py-16 md:py-32 pt-32 bg-[#f5e8f3]">
        {/* Blur transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-[var(--purple-soft)]/60 backdrop-blur-md pointer-events-none z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-4">
              Our Services
            </h1>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">
              We offer a full range of orthotic and prosthetic services, from custom-made devices to off-the-shelf solutions. Each service is delivered with the same commitment to individualised, assessment-led care.
            </p>
          </div>

          {/* Premium Cards Grid - Same as HomePage */}
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

          {/* CTA */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">
              Ready to get started?
            </h3>
            <p className="text-[var(--text-muted)] mb-6">
              Contact us to book an assessment or discuss which service is right for you
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
          </div>
        </div>
      </section>
    </>
  );
}