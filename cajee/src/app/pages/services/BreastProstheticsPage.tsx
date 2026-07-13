import { ServicePageTemplate } from "../../components/ServicePageTemplate";

export function BreastProstheticsPage() {
  return (
    <ServicePageTemplate
      serviceSlug="breast-prosthetics"
      title="Breast & Silicone Prosthetics"
      subtitle="Restoring symmetry and confidence with compassionate, dignified care"
      whatIsIt="Breast prostheses and custom silicone prosthetics restore symmetry and body image following mastectomy, lumpectomy, trauma, or congenital absence. They may include facial or partial limb restorations, designed with realistic aesthetics and functional outcomes in mind."
      benefits={[
        "Restoring natural body contour and symmetry",
        "Improving clothing fit and comfort",
        "Reducing postural imbalance",
        "Supporting emotional wellbeing",
        "Enhancing confidence and self-image",
      ]}
      availableServices={[
        "Post-Surgical Fitting Guidance",
        "External Breast Prostheses",
        "Custom Silicone Prosthetic Fabrication",
        "Ongoing Review and Adjustments",
        "Discreet Consultations (Practice, Home, or Hospital)",
      ]}
      clinicalApproach="Our approach prioritises dignity, privacy, and compassion. We conduct discreet consultations and fittings in your preferred setting, ensuring realistic aesthetics, functional outcomes, and emotional support throughout your journey."
      seoTitle="Breast Prosthetics & Silicone Prostheses | Post-Mastectomy Care"
      seoFullTitle="Breast Prostheses & Silicone Restoration | Cajee Botes"
      seoDescription="Breast prostheses and silicone restoration fitted with dignity — full, partial, lightweight and custom forms, plus facial and digit restoration."
      seoKeywords="breast prosthesis South Africa, post-mastectomy prosthetics, breast forms, silicone prosthetics, breast prosthesis fitting, mastectomy bra, nipple prosthesis, facial prosthetics, finger prosthetics"
    />
  );
}