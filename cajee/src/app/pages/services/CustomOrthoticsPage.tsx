import { ServicePageTemplate } from "../../components/ServicePageTemplate";
import { customOrthoticsFaqs } from "@/app/data/service-faqs";

export function CustomOrthoticsPage() {
  return (
    <ServicePageTemplate
      faqs={customOrthoticsFaqs}
      relatedSlugs={["are-custom-orthotics-worth-it", "custom-orthotics-cost-south-africa", "child-walking-on-toes-when-to-worry"]}
      serviceSlug="custom-orthotics"
      title="Custom Orthotics in Sandton"
      subtitle="Orthoses made for your body: they support it, align it and help it work better, with lasting independence as the aim"
      whatIsIt="Orthotics are medical devices worn on the outside of the body. They're designed to support or align joints, muscles and limbs, or to improve how they work, when an injury, a neurological condition, developmental delay or a musculoskeletal disorder has affected them."
      benefits={[
        "Improving walking pattern and posture",
        "Supporting weak or unstable joints",
        "Reducing pain during movement",
        "Preventing or slowing deformity progression",
        "Supporting neurological rehabilitation",
        "Improving balance and safety",
        "Assisting developmental milestones in children",
      ]}
      availableServices={[
        "Lower Limb Orthoses",
        "Upper Limb Orthoses",
        "Spinal Orthoses",
        "Paediatric Orthotic Management",
        "Sports Orthotics",
        "Post-Operative Joint Support",
      ]}
      clinicalApproach="Before anything is prescribed, we do a full assessment: what you want to be able to do, your home, and how much moving around your day involves. Then we design a device that supports your independence and fits easily into your daily routine."
      seoTitle="Custom Orthotics | Orthotic Devices & Braces | South Africa"
      seoFullTitle="Custom Orthotics in Sandton | Farida Cajee-Botes"
      seoDescription="Custom-made orthotics in Sandton: AFOs, spinal and scoliosis braces and moulded insoles, individually fitted at the rooms, at home or in hospital."
      seoKeywords="custom orthotics South Africa, orthotic devices, foot orthotics, ankle braces, knee braces, spinal orthosis, pediatric orthotics, custom orthotic insoles, orthotic specialist"
    />
  );
}