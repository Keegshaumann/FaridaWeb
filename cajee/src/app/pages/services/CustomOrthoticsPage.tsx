import { ServicePageTemplate } from "../../components/ServicePageTemplate";
import { RichText } from "../../components/blog/RichText";
import { customOrthoticsFaqs } from "@/app/data/service-faqs";

// W39 (15 Nov 2026): no page led with heel pain, the problem most people with foot
// pain search for. The medical lines restate the NHS (plantar fasciitis and heel pain
// pages), the JOSPT 2023 heel pain guideline and the CADTH review this page's FAQ
// already cites; the practice lines restate the site (this page's FAQ and clinical
// approach, the custom insole and night splint device cards, the home visits page).
// No figures, no outcome promises. Title, meta and H1 untouched (T-85 runs to 7 Dec).
const h2 = "text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-6";
const h3 = "text-xl font-semibold text-[var(--text-dark)] mt-8 mb-3";
const body = "text-lg text-[var(--text-muted)] leading-relaxed";
const item = "text-lg text-[var(--text-muted)] leading-relaxed";
const telClass = "font-medium text-[var(--purple-medium)] underline decoration-[var(--accent-purple)]/50 underline-offset-2 hover:text-[var(--text-dark)] whitespace-nowrap";
const NHS_PF = "https://www.nhs.uk/conditions/plantar-fasciitis/";
const NHS_HEEL = "https://www.nhs.uk/conditions/heel-pain/";
const JOSPT = "https://doi.org/10.2519/jospt.2023.0303";
const CADTH = "https://www.ncbi.nlm.nih.gov/books/NBK549527/";

const seeDoctor = [
  "the pain is severe or stops you doing your normal activities",
  "it is getting worse or keeps coming back",
  "it has not improved after treating it yourself",
  "you have tingling or loss of feeling in your foot",
  `you have diabetes and foot pain ([NHS](${NHS_PF}); [why that matters](/blog/diabetic-shoes-and-insoles))`,
];

const guideline = [
  "a night splint for people who consistently have pain with the first step in the morning: a ready-made splint worn in bed that holds the ankle so the sole of the foot and the Achilles tendon stay gently stretched overnight. It is one of the [braces and supports we fit](/services/off-the-shelf-orthotics).",
  "insoles, ready-made or custom, as an option alongside other treatment such as stretching, not on their own.",
];

function HeelPainSection() {
  return (
    <section id="heel-pain" className="scroll-mt-24">
      <h2 className={h2}>Heel pain when you get out of bed?</h2>
      <p className={body}>
        <RichText
          text={`If the pain under your heel is much worse on your first steps after sleeping or resting, eases as you start moving, and comes back when you stand or walk for a long time, plantar fasciitis is more likely ([NHS](${NHS_PF})). It is the most commonly recognised cause of pain under the heel ([heel pain guideline, JOSPT 2023](${JOSPT})). This is a guide, not a diagnosis.`}
        />
      </p>

      <h3 className={h3}>What to try first</h3>
      <p className={body}>
        <RichText
          text={`A GP will usually suggest you start at home: shoes with cushioned heels and good arch support, insoles or heel pads, regular gentle stretches for the sole of your foot and your heel, rest with the foot raised, and painkillers if you need them. Try not to stand or walk for long periods, and avoid flip-flops (slops), backless slippers and walking barefoot on hard floors ([NHS](${NHS_PF})).`}
        />
      </p>
      <p className={`${body} mt-4`}>
        <RichText
          text={`For this kind of heel pain in adults, a review found no difference in pain or function between custom-made and ready-made insoles, though the evidence was of very low to low quality ([CADTH](${CADTH})). That makes a pharmacy pair a sensible first step ([are custom orthotics worth it?](/blog/are-custom-orthotics-worth-it)). We don't stock ready-made insoles, and if a ready-made pair is all you need, we will say so.`}
        />
      </p>

      <h3 className={h3}>See a doctor first if</h3>
      <ul className="list-disc space-y-2 pl-6">
        {seeDoctor.map((s) => (
          <li key={s} className={item}>
            <RichText text={s} />
          </li>
        ))}
      </ul>
      <p className={`${body} mt-4`}>
        <RichText
          text={`Get urgent medical help if the pain is severe after an injury, you heard a snap, grinding or popping noise when it happened, your foot or ankle has changed shape, or you can't walk: these can be signs of a broken heel bone or ankle ([NHS](${NHS_HEEL})).`}
        />
      </p>

      <h3 className={h3}>Where an orthotist comes in</h3>
      <p className={body}>
        <RichText
          text={`If it is not getting better, the NHS suggests a physiotherapist for exercises, or a foot specialist (podiatrist) for insoles, the right shoes or splints to wear at night ([NHS](${NHS_PF})). Insoles and splints are orthoses, the devices an orthotist assesses for and fits. The American Physical Therapy Association's orthopaedic and sports academies published a heel pain guideline in 2023 ([JOSPT](${JOSPT})). It recommends:`}
        />
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        {guideline.map((s) => (
          <li key={s} className={item}>
            <RichText text={s} />
          </li>
        ))}
      </ul>
      <p className={`${body} mt-4`}>
        A custom insole earns its cost when a ready-made one cannot fit the foot: a rigid deformity, a
        diabetic foot at risk of ulceration, a genuine leg length difference, or a foot changed by
        surgery or a neurological condition.
      </p>

      <h3 className={h3}>What happens at the assessment</h3>
      <p className={body}>
        <RichText
          text={`You can book directly, though your medical aid may want a doctor's prescription before it pays towards a device. Before anything is prescribed, Farida Cajee-Botes asks what you want to be able to do and how much your day keeps you on your feet, and looks at the shoes you wear every day, so bring them. If a custom insole is the right device, it is moulded from a cast, foam impression or 3D scan of your foot and fitted in your own or recommended shoes. If the assessment turns up something a doctor should see first, she will tell you so, and who to see.`}
        />
      </p>
      <p className={`${body} mt-4`}>
        Assessments are at the Orthocast Morningside rooms in Sandton by appointment (
        <a href="tel:+27118839100" className={telClass}>011&nbsp;883&nbsp;9100</a>), or at your home
        across Johannesburg, Sandton, Midrand, Centurion and Pretoria (
        <a href="tel:+27799982203" className={telClass}>079&nbsp;998&nbsp;2203</a>).{" "}
        <RichText text="[Book an assessment](/contact#book)." />
      </p>
    </section>
  );
}

export function CustomOrthoticsPage() {
  return (
    <ServicePageTemplate
      faqs={customOrthoticsFaqs}
      faqIntro="Sources are linked in the answers and were last checked on 14 November 2026."
      relatedSlugs={["are-custom-orthotics-worth-it", "diabetic-shoes-and-insoles", "custom-orthotics-cost-south-africa", "child-walking-on-toes-when-to-worry"]}
      serviceSlug="custom-orthotics"
      title="Custom Orthotics in Sandton"
      subtitle="For a foot that drags, a spine curving during growth, painful feet or a weak, unstable joint: braces, splints and insoles made for your body, designed to support and align it"
      whatIsIt="Orthotics are medical devices worn on the outside of the body. They're designed to support or align joints, muscles and limbs, or to improve how they work, when an injury, a neurological condition, developmental delay or a musculoskeletal disorder has affected them."
      problemSection={<HeelPainSection />}
      benefits={[
        "Support for walking pattern and posture",
        "Supporting weak or unstable joints",
        "Offloading painful areas during movement",
        "Managing deformity progression, such as a scoliosis curve during growth",
        "Supporting neurological rehabilitation",
        "Support for balance and safety",
        "Support for children working towards developmental milestones",
      ]}
      availableServices={[
        "Lower Limb Orthoses",
        "Upper Limb Orthoses",
        "Spinal Orthoses",
        "Paediatric Orthotic Management",
        "Sports Orthotics",
        "Post-Operative Joint Support",
      ]}
      clinicalApproach="Before anything is prescribed, we do a full assessment: what you want to be able to do, your home, and how much moving around your day involves. Then we design a device around your goals and your daily routine."
      seoTitle="Custom Orthotics | Orthotic Devices & Braces | South Africa"
      seoFullTitle="Custom Orthotics, AFOs & Scoliosis Braces | Sandton"
      seoDescription="Custom-made orthotics in Sandton: AFOs, spinal and scoliosis braces and moulded insoles, individually fitted at the rooms, at home or in hospital."
      seoKeywords="custom orthotics South Africa, orthotic devices, foot orthotics, ankle braces, knee braces, spinal orthosis, pediatric orthotics, custom orthotic insoles, orthotic specialist"
    />
  );
}
