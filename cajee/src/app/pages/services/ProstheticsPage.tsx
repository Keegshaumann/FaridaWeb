import { Link } from "react-router";
import { ServicePageTemplate } from "../../components/ServicePageTemplate";
import { prostheticsFaqs } from "@/app/data/service-faqs";
import { imageSize } from "../../data/image-sizes";

// 13 Nov 2026 competitor pass: the pages that beat this one for "prosthetic leg"
// searches are dedicated leg pages that show what a leg is made of. Every line
// below restates what the site already says: the parts diagram and its labels
// come from the prosthetic leg cost article, "bought in from manufacturers ...
// chosen and aligned to you" from the "buy online" FAQ, and the visit lines from
// the home and hospital visits page.
const PARTS_IMG = "/blog/prosthetic-leg-parts-below-and-above-knee.webp";
const linkClass = "text-[var(--accent-purple)] underline underline-offset-4 hover:opacity-80";

function ProstheticLegParts() {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-6">
        What is in a prosthetic leg?
      </h2>
      <img
        src={PARTS_IMG}
        alt="Diagram of the parts of a prosthetic leg: a below-knee leg has a socket with a liner, a pylon and a foot; an above-knee leg adds a knee joint between the socket and the pylon"
        {...imageSize(PARTS_IMG)}
        loading="lazy"
        className="w-full max-w-[640px] h-auto rounded-2xl ring-1 ring-[var(--purple-soft)]/50"
      />
      <p className="mt-6 text-lg text-[var(--text-muted)] leading-relaxed">
        A below-knee leg has a socket with a liner, a pylon and a foot. An above-knee leg adds a
        knee joint between the socket and the pylon. The socket is made for you, moulded to your
        residual limb; the foot and knee are bought in from manufacturers, then chosen and aligned
        to you. That split is also what sets the price: read{" "}
        <Link to="/blog/prosthetic-leg-cost-south-africa" className={linkClass}>
          what a prosthetic leg costs in South Africa
        </Link>
        .
      </p>
      <p className="mt-4 text-lg text-[var(--text-muted)] leading-relaxed">
        Still in hospital, or not able to travel yet? Assessment, casting and fittings can happen
        at your bedside or at home across Johannesburg and Gauteng, and the limb itself is made off
        site between visits. See{" "}
        <Link to="/services/home-visits" className={linkClass}>
          home and hospital visits
        </Link>
        .
      </p>
    </section>
  );
}

export function ProstheticsPage() {
  return (
    <ServicePageTemplate
      faqs={prostheticsFaqs}
      relatedSlugs={["prosthetic-leg-cost-south-africa", "how-long-after-amputation-prosthetic-leg", "prosthetic-leg-no-medical-aid-south-africa", "walking-with-a-prosthetic-leg"]}
      serviceSlug="prosthetics"
      title="Prosthetic Leg and Arm Fitting in Sandton"
      subtitle="After an amputation or a limb difference: legs and arms made for you, fitted at the Sandton rooms or at your home or hospital bed"
      whatIsIt="A prosthetic leg or arm replaces a limb lost to amputation or trauma, or missing from birth. Each prosthesis is custom-made for one person: the socket is moulded to your residual limb and the parts are chosen for how you live. Farida Cajee-Botes is the prosthetist who assesses you, casts the socket, fits the limb and reviews it, at the Orthocast Morningside rooms in Sandton or at your home or hospital bed across Johannesburg and Gauteng."
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
      additionalSections={<ProstheticLegParts />}
      clinicalApproach="It starts with a full assessment: your physical condition, your rehab goals, your home and daily surroundings, and what you need to be able to do. Where needed, we do that assessment at home or in hospital, to ensure your prosthetic device supports real-world use and long-term independence."
      seoTitle="Prosthetic Limb Fitting & Management | Upper & Lower Limb Prosthetics"
      seoFullTitle="Prosthetic Leg & Arm Fitting in Sandton | Farida Cajee-Botes"
      seoDescription="Prosthetic legs and arms, custom-made and fitted by a prosthetist in Sandton, Johannesburg, with home and hospital visits across Gauteng."
      seoKeywords="prosthetic limbs South Africa, prosthetic leg fitting, prosthetic arm, limb prosthesis, amputee rehabilitation, prosthetic care, prosthetic specialist, mobile prosthetic service"
    />
  );
}
