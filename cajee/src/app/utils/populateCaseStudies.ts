import { projectId, publicAnonKey } from "/utils/supabase/info";

export const sampleCaseStudies = [
  {
    title: "Returning to Independence After Below-Knee Amputation",
    type: "case-study",
    category: "prosthetics",
    author: "Cajee Botes",
    patientAge: "52 years",
    published: true,
    condition: "Transtibial (below-knee) amputation following diabetic complications",
    challenge: "Patient experienced significant mobility loss and struggled with balance and confidence. Initial prosthetic fitting at hospital was uncomfortable and limited functional use. Patient was hesitant to bear weight and required extensive gait re-education.",
    solution: "Comprehensive home-based assessment to understand daily living environment and mobility goals. Custom below-knee prosthesis designed with shock-absorbing foot component and comfortable silicone liner. Gradual progressive fitting schedule with ongoing adjustments to socket alignment and suspension system.",
    outcome: "Patient successfully returned to independent mobility within 12 weeks. Able to walk confidently indoors and outdoors, navigate stairs, and return to community activities. Regular follow-up appointments ensure continued comfort and optimal prosthetic function.",
    image: "/external/photo-1734524669929.jpg",
  },
  {
    title: "Spinal Support for Scoliosis Management",
    type: "case-study",
    category: "orthotics",
    author: "Cajee Botes",
    patientAge: "16 years",
    published: true,
    condition: "Adolescent idiopathic scoliosis with progressive spinal curvature requiring bracing intervention",
    challenge: "Active teenager with 35-degree thoracic curve requiring full-time orthotic wear. Patient was concerned about appearance, comfort during school activities, and potential impact on social life. Previous brace from another provider caused skin irritation and was abandoned after two weeks.",
    solution: "Custom thoracolumbosacral orthosis (TLSO) designed with lightweight materials and low-profile design for discreet wear under clothing. Multiple fitting sessions to ensure optimal comfort and curve correction. Patient and family education on wearing schedule, skin care, and activity modifications.",
    outcome: "Patient achieved excellent compliance with 20+ hours daily wear. Spinal curve stabilized at 32 degrees with no progression over 18-month monitoring period. Patient successfully participated in school activities, sports, and social events while wearing orthosis. Skin remained healthy with no pressure areas.",
    image: "/external/photo-1728347053156.jpg",
  },
  {
    title: "Immediate Post-Operative Knee Support Following ACL Reconstruction",
    type: "case-study",
    category: "orthotics",
    author: "Cajee Botes",
    patientAge: "28 years",
    published: true,
    condition: "Anterior cruciate ligament (ACL) reconstruction requiring post-operative immobilization and progressive range-of-motion control",
    challenge: "Patient required immediate post-surgical knee bracing with controlled range of motion settings. Hospital discharge was pending brace delivery. Patient was anxious about early mobilization and protecting the surgical repair during physiotherapy.",
    solution: "Hospital bedside fitting of adjustable hinged knee brace with lockable range-of-motion controls. Brace fitted and locked in extension for immediate post-operative phase. Education provided to patient and physiotherapy team on progressive unlocking protocol aligned with surgical rehabilitation timeline.",
    outcome: "Patient discharged same day with appropriate post-operative support. Range of motion progressively increased according to surgeon's protocol (0-90 degrees at 2 weeks, 0-120 degrees at 4 weeks). Patient reported confidence during early mobilization and returned to full activity at 6 months post-surgery.",
    image: "/external/photo-1715531786031.jpg",
  },
  {
    title: "Lymphoedema Management Following Cancer Treatment",
    type: "case-study",
    category: "compression",
    author: "Cajee Botes",
    patientAge: "61 years",
    published: true,
    condition: "Secondary lymphoedema of the left arm following breast cancer treatment including lymph node removal and radiotherapy",
    challenge: "Patient developed progressive swelling in left arm 18 months post-treatment. Swelling affected hand, forearm, and upper arm, limiting functional use and causing discomfort. Patient struggled with clothing fit and experienced heaviness and restricted shoulder movement.",
    solution: "Home assessment to measure limb volumes and skin condition. Prescription of custom flat-knit compression sleeve and glove with appropriate compression gradient (20-30 mmHg). Education on donning technique, skin care, and lymphatic drainage principles. Liaison with oncology team and lymphoedema therapist for integrated care approach.",
    outcome: "Significant reduction in limb volume within 6 weeks of garment use. Patient reported improved comfort, reduced heaviness, and better arm function. Compression garments replaced every 6 months to maintain therapeutic compression. Patient successfully managing condition long-term with continued garment use and self-care routine.",
    image: "/external/photo-1773385411245.jpg",
  },
  {
    title: "Safe Mobility Following Hip Replacement Surgery",
    type: "case-study",
    category: "mobility",
    author: "Cajee Botes",
    patientAge: "74 years",
    published: true,
    condition: "Total hip arthroplasty (hip replacement) requiring mobility aids for safe weight-bearing and fall prevention during recovery",
    challenge: "Patient lived alone and required immediate post-discharge mobility support. Hospital physiotherapy recommended walking frame, but patient was unfamiliar with equipment and concerned about navigating home environment safely. Risk of falls was high due to post-surgical precautions and reduced balance.",
    solution: "Home visit conducted pre-discharge to assess living environment and mobility requirements. Lightweight wheeled walker (rollator) supplied with height adjustment, hand brakes, and padded seat for rest breaks. Demonstration of safe technique for transfers, turning, and navigating doorways. Additional toilet seat raiser and grab rail recommendations provided.",
    outcome: "Patient discharged safely with appropriate mobility equipment in place. Demonstrated confident, independent mobility indoors and outdoors within 2 weeks. Progressed to single walking stick at 8 weeks post-surgery. No falls reported during recovery period. Patient retained walker for outdoor use and community access.",
    image: "/external/photo-1706700373818.jpg",
  },
  {
    title: "Restoring Confidence with Breast Prosthesis Following Mastectomy",
    type: "case-study",
    category: "breast",
    author: "Cajee Botes",
    patientAge: "48 years",
    published: true,
    condition: "Left-sided mastectomy following breast cancer diagnosis, experiencing asymmetry and loss of confidence in body image",
    challenge: "Patient felt self-conscious about appearance and struggled with clothing fit following surgery. Temporary soft prosthesis provided at hospital was uncomfortable and visibly noticeable under certain garments. Patient avoided social situations and experienced emotional distress related to body image changes.",
    solution: "Private home fitting conducted in comfortable, dignified environment. Comprehensive assessment of chest wall shape, surgical scar position, and desired aesthetic outcome. Silicone breast prosthesis selected and fitted to match natural breast size, shape, and weight. Specialized mastectomy bra fitted to ensure secure, comfortable positioning.",
    outcome: "Patient reported immediate improvement in confidence and comfort. Prosthesis provided natural appearance and symmetry under all clothing types. Patient returned to work and social activities feeling supported and confident. Follow-up appointments ensured continued fit as post-surgical changes settled. Patient expressed gratitude for compassionate, respectful care during vulnerable time.",
    image: "/external/photo-1773227054034.jpg",
  },
];

export async function populateCaseStudies() {
  const results = [];
  
  for (const caseStudy of sampleCaseStudies) {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/case-studies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(caseStudy),
        }
      );

      if (response.ok) {
        const data = await response.json();
        results.push({ success: true, title: caseStudy.title, data });
      } else {
        results.push({ success: false, title: caseStudy.title, error: await response.text() });
      }
    } catch (error) {
      results.push({ success: false, title: caseStudy.title, error: String(error) });
    }
  }

  return results;
}
