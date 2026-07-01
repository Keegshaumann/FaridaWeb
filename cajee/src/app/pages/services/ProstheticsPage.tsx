import { ServicePageTemplate } from "../../components/ServicePageTemplate";

export function ProstheticsPage() {
  return (
    <ServicePageTemplate
      title="Prosthetic Management"
      subtitle="Restoring mobility, function, and independence following limb loss"
      whatIsIt="Prosthetics are externally applied medical devices used to replace a missing limb or body part following amputation, trauma, or congenital limb difference. They are carefully designed and fitted to restore mobility, daily function, and independence."
      benefits={[
        "Walking and standing safely",
        "Performing self-care tasks independently",
        "Improving balance and stability",
        "Returning to work or school",
        "Participating in sport or recreation",
        "Enhancing body symmetry and posture",
        "Improving confidence and independence",
      ]}
      availableServices={[
        "Lower Limb Prosthetics",
        "Upper Limb Prosthetics",
        "Paediatric Prosthetic Care",
      ]}
      clinicalApproach="Our approach begins with a comprehensive assessment of your physical condition, rehabilitation goals, daily environment, and functional needs. We conduct mobile home or hospital assessments where needed to ensure your prosthetic device supports real-world use and long-term independence."
      seoTitle="Prosthetic Limb Fitting & Management | Upper & Lower Limb Prosthetics"
      seoDescription="Expert prosthetic limb fitting for upper and lower limb amputees. Custom prosthetic design, paediatric care, and mobile home/hospital assessments. Restoring mobility and independence."
      seoKeywords="prosthetic limbs South Africa, prosthetic leg fitting, prosthetic arm, limb prosthesis, amputee rehabilitation, prosthetic care, prosthetic specialist, mobile prosthetic service"
    />
  );
}