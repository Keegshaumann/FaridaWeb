import { ServicePageTemplate } from "../../components/ServicePageTemplate";
import { mobilityAidsFaqs } from "@/app/data/service-faqs";

export function MobilityAidsPage() {
  return (
    <ServicePageTemplate
      faqs={mobilityAidsFaqs}
      relatedSlugs={["medical-aid-prosthetics-orthotics-cover", "orthotist-home-visits-gauteng", "walking-with-a-prosthetic-leg"]}
      serviceSlug="mobility-aids"
      title="Wheelchairs, Walkers and Mobility Aids"
      subtitle="Helping you move safely and independently, at home and out in the community"
      whatIsIt="Mobility aids are assistive devices prescribed to help you move safely at home and out in the community. Which one you get depends on your physical condition, your surroundings and what you want to be able to do, and the aim is more independence and a lower risk of falling."
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
      clinicalApproach="We assess how you manage in your own home or in hospital. We look at what you can physically do, how the space is laid out and what your day involves, so the mobility aid we recommend is appropriate and safe, and supports your independence over the long term."
      seoTitle="Mobility Aids | Wheelchairs, Crutches, Walking Frames | South Africa"
      seoFullTitle="Wheelchairs, Walkers & Mobility Aids | Sandton"
      seoDescription="Wheelchairs, walkers, rollators, crutches and walking aids, fitted after an assessment in Sandton or at your home to support safe, independent movement."
      seoKeywords="mobility aids South Africa, wheelchairs, crutches, walking frames, walking sticks, rollators, transfer aids, bathroom safety equipment, mobility equipment supplier"
    />
  );
}