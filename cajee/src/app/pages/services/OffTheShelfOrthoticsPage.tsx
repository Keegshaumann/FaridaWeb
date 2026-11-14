import { ServicePageTemplate } from "../../components/ServicePageTemplate";
import { offTheShelfFaqs } from "@/app/data/service-faqs";

export function OffTheShelfOrthoticsPage() {
  return (
    <ServicePageTemplate
      faqs={offTheShelfFaqs}
      relatedSlugs={["are-custom-orthotics-worth-it", "can-orthotics-fix-flat-feet", "referral-orthotist-prosthetist-first-visit"]}
      serviceSlug="off-the-shelf-orthotics"
      title="Braces and Supports, Fitted After Assessment"
      subtitle="Conservative orthotic support for pain management and injury recovery"
      whatIsIt="Conservative orthotic support means support without surgery. It includes clinically prescribed braces, supports, taping techniques and soft orthotic devices, used to support joints, help manage pain and protect an injury while it recovers."
      benefits={[
        "Managing musculoskeletal pain",
        "Supporting injured joints during healing",
        "Stability for joints during daily activity",
        "Offloading strained joints and tendons during movement",
        "Supporting recovery after injury or surgery",
        "Support during a gradual return to activity",
      ]}
      availableServices={[
        "Functional Joint Supports",
        "Soft Bracing",
        "Physiotherapy Taping Techniques",
        "Sports Orthotics",
        "Post-Operative Support Devices",
        "Compression Supports (where indicated)",
      ]}
      clinicalApproach="All devices are recommended following clinical assessment to ensure they are appropriate for your condition, goals, and activity level. We provide guidance on use, application, and progression."
      seoTitle="Off-the-Shelf Orthotics | Ready-to-Wear Braces & Supports"
      seoFullTitle="Knee, Back & Ankle Braces in Sandton | Farida Cajee-Botes"
      seoDescription="Ready-to-fit braces and supports for the knee, ankle, back, wrist and neck, fitted after an individual assessment in Sandton or at your home."
      seoKeywords="off-the-shelf orthotics, ready-made braces, joint supports, ankle braces, knee supports, wrist braces, sports bracing, post-operative supports, orthotic devices South Africa"
    />
  );
}