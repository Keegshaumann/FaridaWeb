import { ServicePageTemplate } from "../../components/ServicePageTemplate";

export function MobilityAidsPage() {
  return (
    <ServicePageTemplate
      serviceSlug="mobility-aids"
      title="Mobility Aids & Independent Living Support"
      subtitle="Supporting safe movement and independence at home and in the community"
      whatIsIt="Mobility aids are assistive devices prescribed to support safe movement in the home and community. They are selected based on your physical condition, environment, and functional goals to promote independence and reduce fall risk."
      benefits={[
        "Improving walking safety and stability",
        "Preventing falls and injuries",
        "Supporting transfers from bed, chair, or toilet",
        "Improving independence at home",
        "Reducing fatigue during movement",
        "Supporting early discharge from hospital",
      ]}
      availableServices={[
        "Walking Aids Prescription",
        "Transfer Support Devices",
        "Home Mobility Recommendations",
        "Bed and Bathroom Mobility Support",
        "Stair Navigation Support",
        "Functional Environment Assessments",
      ]}
      clinicalApproach="Our approach focuses on functional assessment in your home or hospital setting. We evaluate your physical abilities, environment layout, and daily routines to ensure mobility aids are appropriate, safe, and support long-term independence."
      seoTitle="Mobility Aids | Wheelchairs, Crutches, Walking Frames | South Africa"
      seoFullTitle="Mobility Aids: Wheelchairs & Walkers | Cajee Botes"
      seoDescription="Wheelchairs, walkers, rollators, crutches and walking aids fitted to support safe movement and independence, with expert guidance and home visits."
      seoKeywords="mobility aids South Africa, wheelchairs, crutches, walking frames, walking sticks, rollators, transfer aids, bathroom safety equipment, mobility equipment supplier"
    />
  );
}