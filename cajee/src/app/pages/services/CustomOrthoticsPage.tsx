import { ServicePageTemplate } from "../../components/ServicePageTemplate";

export function CustomOrthoticsPage() {
  return (
    <ServicePageTemplate
      serviceSlug="custom-orthotics"
      title="Orthotic Management"
      subtitle="Supporting, aligning, and improving function for lasting independence"
      whatIsIt="Orthotics are externally applied medical devices designed to support, align, or improve the function of joints, muscles, and limbs affected by injury, neurological conditions, developmental delay, or musculoskeletal disorders."
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
      clinicalApproach="Every orthotic prescription begins with comprehensive assessment, understanding your functional goals, home environment, and real-life mobility demands. We design devices that support independence and integrate seamlessly into your daily routine."
      seoTitle="Custom Orthotics | Orthotic Devices & Braces | South Africa"
      seoFullTitle="Custom Orthotic Devices in South Africa | Cajee Botes"
      seoDescription="Custom-made orthotic devices — AFOs, spinal and scoliosis braces and moulded insoles — individually fitted, with mobile home and hospital assessments."
      seoKeywords="custom orthotics South Africa, orthotic devices, foot orthotics, ankle braces, knee braces, spinal orthosis, pediatric orthotics, custom orthotic insoles, orthotic specialist"
    />
  );
}