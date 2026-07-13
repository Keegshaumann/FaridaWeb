import { ServicePageTemplate } from "../../components/ServicePageTemplate";

export function OffTheShelfOrthoticsPage() {
  return (
    <ServicePageTemplate
      serviceSlug="off-the-shelf-orthotics"
      title="Off-the-Shelf Orthotics"
      subtitle="Conservative orthotic support for pain management and injury recovery"
      whatIsIt="Conservative orthotic support includes clinically prescribed braces, supports, taping techniques, and soft orthotic devices to manage pain, improve joint stability, and support recovery without surgery."
      benefits={[
        "Managing musculoskeletal pain",
        "Supporting injured joints during healing",
        "Improving functional stability",
        "Reducing strain during movement",
        "Supporting recovery after injury or surgery",
        "Improving tolerance to activity",
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
      seoFullTitle="Off-the-Shelf Orthotic Braces & Supports | Cajee Botes"
      seoDescription="Ready-to-fit orthotic braces and supports for the knee, ankle, back, wrist, neck and more — fitted after an individual assessment in South Africa."
      seoKeywords="off-the-shelf orthotics, ready-made braces, joint supports, ankle braces, knee supports, wrist braces, sports bracing, post-operative supports, orthotic devices South Africa"
    />
  );
}