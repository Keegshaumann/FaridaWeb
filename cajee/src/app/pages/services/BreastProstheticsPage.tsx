import { ServicePageTemplate } from "../../components/ServicePageTemplate";
import { breastProsthesesFaqs } from "@/app/data/service-faqs";

export function BreastProstheticsPage() {
  return (
    <ServicePageTemplate
      faqs={breastProsthesesFaqs}
      relatedSlugs={["medical-aid-prosthetics-orthotics-cover", "referral-orthotist-prosthetist-first-visit", "orthotist-home-visits-gauteng"]}
      serviceSlug="breast-prosthetics"
      title="Breast Prostheses and Silicone Restoration"
      subtitle="Breast forms and silicone prostheses after mastectomy or lumpectomy, fitted with privacy and dignity"
      whatIsIt="Breast prostheses and custom silicone prosthetics replace the shape of a breast lost to mastectomy, lumpectomy or trauma, or absent from birth. They can also replace a facial feature, finger or toe lost to trauma or absent from birth. They are made to look as natural as possible and to be comfortable to wear."
      benefits={[
        "Shape and symmetry under clothing",
        "Fit of clothes, bras and swimwear",
        "Weight balance across the chest",
        "Private fittings at the rooms, at home or in hospital",
      ]}
      availableServices={[
        "Post-Surgical Fitting Guidance",
        "External Breast Prostheses",
        "Custom Silicone Prosthetic Fabrication",
        "Ongoing Review and Adjustments",
        "Discreet Consultations (Practice, Home, or Hospital)",
      ]}
      clinicalApproach="Our approach puts dignity, privacy and compassion first. Consultations and fittings are discreet and happen where you prefer, with attention to a natural look, comfort and fit, and support at every step."
      seoTitle="Breast Prosthetics & Silicone Prostheses | Post-Mastectomy Care"
      seoFullTitle="Breast Prosthesis Fitting After Mastectomy | Sandton"
      seoDescription="Breast prosthesis fitting after mastectomy or lumpectomy in Sandton: full, partial, lightweight and custom forms, plus facial and digit restoration."
      seoKeywords="breast prosthesis South Africa, post-mastectomy prosthetics, breast forms, silicone prosthetics, breast prosthesis fitting, mastectomy bra, nipple prosthesis, facial prosthetics, finger prosthetics"
    />
  );
}