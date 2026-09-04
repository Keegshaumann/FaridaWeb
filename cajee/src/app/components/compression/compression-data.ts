// Clinical content for the medical compression specialism pages.
//
// Compression classes follow the European RAL-GZ 387 standard (the standard the
// mediven / SIGVARIS garments fitted in South Africa are certified against),
// where the stated pressure is always measured at the ankle. Class A sits below
// medical compression class 1 and is a light-support class rather than a RAL
// compression class. It is included because patients ask for it by name.

export interface CompressionClass {
  /** Short label used on chips and the pressure scale, e.g. "Class 2". */
  id: string;
  label: string;
  /** One-word tier shown above the class name on the pressure rail. */
  tier: string;
  /** Headline pressure figure shown large. */
  mmHg: string;
  strength: string;
  /** 0–1, drives the width of the pressure bar. */
  intensity: number;
  colour: string;
  feel: string;
  summary: string;
  indications: string[];
}

export const COMPRESSION_CLASSES: CompressionClass[] = [
  {
    id: "a",
    tier: "Support",
    label: "Class A",
    mmHg: "Under 18",
    strength: "Light support",
    intensity: 0.25,
    colour: "var(--comp-class-a)",
    feel: "Gentle and barely noticeable, a light hug around the ankle that you forget you are wearing.",
    summary:
      "A light-support class that sits below medical compression class 1. Often called support hosiery, travel socks or flight socks, it is used for comfort and prevention rather than to treat diagnosed venous disease.",
    indications: [
      "Tired, aching or heavy legs at the end of the day",
      "Long-haul flights and long-distance travel",
      "Long days standing or seated at a desk",
      "Mild end-of-day ankle puffiness",
      "Prevention where there is no diagnosed venous condition",
    ],
  },
  {
    id: "1",
    tier: "Light",
    label: "Class 1",
    mmHg: "18 – 21",
    strength: "Light compression",
    intensity: 0.45,
    colour: "var(--comp-class-1)",
    feel: "Clearly firm at the ankle and easing as it travels up the leg, comfortable to wear all day from the first fitting.",
    summary:
      "The entry point of true medical compression. Class 1 is prescribed where symptoms are present but the leg is still healthy enough not to need stronger pressure.",
    indications: [
      "Early or mild varicose veins",
      "Heavy, aching legs with visible veins",
      "Mild swelling of the ankle and lower leg",
      "Pregnancy-related oedema",
      "Prevention of swelling in people with limited mobility",
    ],
  },
  {
    id: "2",
    tier: "Moderate",
    label: "Class 2",
    mmHg: "23 – 32",
    strength: "Moderate compression",
    intensity: 0.7,
    colour: "var(--comp-class-2)",
    feel: "Firm and unmistakably supportive. Most people manage it comfortably once they are shown the correct application technique.",
    summary:
      "The most frequently prescribed class for lower-limb venous and lymphatic conditions, and the usual starting point after vein surgery or a confirmed diagnosis.",
    indications: [
      "Pronounced varicose veins",
      "Moderate oedema and chronic venous insufficiency",
      "After deep vein thrombosis or superficial thrombophlebitis",
      "After sclerotherapy or varicose vein surgery",
      "Mild to moderate lymphoedema and lipoedema maintenance",
    ],
  },
  {
    id: "3",
    tier: "Strong",
    label: "Class 3",
    mmHg: "34 – 46",
    strength: "Strong compression",
    intensity: 1,
    colour: "var(--comp-class-3)",
    feel: "Strong and rigid to handle. Almost always fitted alongside a donning aid, and often after a period in bandaging.",
    summary:
      "Reserved for advanced venous and lymphatic disease, where a lighter class will not control the swelling. Fit, skin condition and arterial supply are checked carefully before Class 3 is dispensed.",
    indications: [
      "Severe chronic venous insufficiency",
      "Post-thrombotic syndrome",
      "Healed venous leg ulcers and ulcer prevention",
      "Marked or long-standing lymphoedema and lipoedema",
      "Pronounced, persistent fluid retention in the leg",
    ],
  },
];

export interface CompressionLength {
  id: string;
  /** Manufacturer length designation, e.g. AD, AG, AT. */
  code: string;
  name: string;
  /** Local shorthand patients and referring doctors use. */
  alias?: string;
  coverage: string;
  detail: string;
  bestFor: string[];
  /** Fraction of the leg diagram covered, measured from the foot up (0–1). */
  coverTop: number;
  /** Renders the waistband on the diagram. */
  waistband?: boolean;
}

export const COMPRESSION_LENGTHS: CompressionLength[] = [
  {
    id: "ad",
    code: "AD",
    name: "Below-Knee Compression Stocking",
    alias: "BK",
    coverage: "Foot to just below the knee",
    detail:
      "The most commonly fitted compression length and the easiest to apply independently. It sits two finger-widths below the knee crease so it cannot roll or cut in behind the knee when you sit.",
    bestFor: [
      "Swelling and venous symptoms confined below the knee",
      "Patients who apply their own garments",
      "Everyday wear in a warm climate",
      "Venous leg ulcer management and prevention",
    ],
    coverTop: 0.48,
  },
  {
    id: "af",
    code: "AF",
    name: "Above-Knee Compression Stocking",
    coverage: "Foot to just above the knee",
    detail:
      "A short thigh length that clears the knee joint without extending into the upper thigh. Useful when symptoms cross the knee but a full thigh-high garment is more than is needed.",
    bestFor: [
      "Symptoms extending just over the knee",
      "Patients who find a full thigh length too warm",
      "Post-operative swelling around the knee",
    ],
    coverTop: 0.545,
  },
  {
    id: "ag",
    code: "AG",
    name: "Thigh-High Compression Stocking",
    alias: "AK",
    coverage: "Foot to the upper thigh, with a silicone grip top",
    detail:
      "Graduated compression carried all the way to the upper thigh, held in place by a silicone or knitted grip top. Fitted where the thigh itself is symptomatic or swollen.",
    bestFor: [
      "Swelling or venous symptoms above the knee",
      "After thigh or hip surgery",
      "Above-knee varicose veins",
      "Lymphoedema affecting the whole leg",
    ],
    coverTop: 0.945,
  },
  {
    id: "agh",
    code: "AG/H",
    name: "Single-Leg Compression with Waist Attachment",
    coverage: "One leg to the thigh, secured at the waist",
    detail:
      "A thigh-length garment for one leg, anchored by a waist attachment instead of a grip top. The answer when a thigh-high keeps slipping, or when the thigh shape will not hold a grip band.",
    bestFor: [
      "One-sided swelling needing thigh coverage",
      "Thigh shapes a grip top will not stay on",
      "Patients who cannot tolerate a silicone band",
    ],
    coverTop: 1,
    waistband: true,
  },
  {
    id: "at",
    code: "AT",
    name: "Compression Pantyhose & Tights",
    coverage: "Both legs to the waist in a single garment",
    detail:
      "Full graduated compression for both legs in one waist-height garment, with no grip top to slip. The most secure option where both legs need treating and the most comfortable for all-day wear.",
    bestFor: [
      "Swelling in both legs",
      "Patients who dislike a grip top",
      "Symptoms extending into the groin",
      "A cosmetically discreet option under clothing",
    ],
    coverTop: 1,
    waistband: true,
  },
  {
    id: "atu",
    code: "AT/U",
    name: "Maternity Compression Tights",
    coverage: "Both legs to the waist, with an expanding abdominal panel",
    detail:
      "Compression pantyhose knitted with an adjustable panel over the abdomen, so a single garment continues to fit as pregnancy progresses while still supporting circulation in the legs.",
    bestFor: [
      "Pregnancy-related leg swelling",
      "Varicose veins developing during pregnancy",
      "Prevention of clots during and after pregnancy",
    ],
    coverTop: 1,
    waistband: true,
  },
];

export interface KnitType {
  name: string;
  strapline: string;
  points: string[];
}

export const KNIT_TYPES: KnitType[] = [
  {
    name: "Circular-knit compression",
    strapline: "Seamless, fine and cosmetically discreet",
    points: [
      "Knitted in a continuous tube, so there is no seam",
      "Finer and more like everyday hosiery in appearance",
      "Ready-to-wear sizes and made-to-measure options",
      "Best suited to venous conditions and mild to moderate swelling",
      "Requires a limb that is still a fairly normal shape",
    ],
  },
  {
    name: "Flat-knit compression",
    strapline: "Higher stiffness for difficult limb shapes",
    points: [
      "Knitted flat and joined with a seam, so any shape can be built",
      "Thicker fabric with a higher stiffness, so it works with the muscle pump",
      "Made-to-measure only, from a full set of limb measurements",
      "Will not cut into deep skin folds or creases",
      "The standard for lymphoedema, lipoedema and distorted limb shapes",
    ],
  },
];

export const COMPRESSION_CONDITIONS: { name: string; note: string }[] = [
  { name: "Varicose veins", note: "Aching, visible and bulging leg veins" },
  { name: "Chronic venous insufficiency", note: "Valves no longer returning blood efficiently" },
  { name: "Venous leg ulcers", note: "Compression during healing and to prevent recurrence" },
  { name: "Deep vein thrombosis", note: "Post-thrombotic swelling and clot prevention" },
  { name: "Lymphoedema", note: "Primary and secondary lymphatic swelling" },
  { name: "Lipoedema", note: "Painful, symmetrical fat and fluid in the legs" },
  { name: "Pregnancy oedema", note: "Leg swelling and veins during pregnancy" },
  { name: "Post-surgical swelling", note: "After vein, orthopaedic or general surgery" },
  { name: "Dependent oedema", note: "Swelling from immobility, sitting or standing" },
  { name: "Travel-related swelling", note: "Long-haul flights and long journeys" },
  { name: "Residual limb oedema", note: "Shaping and shrinking after amputation" },
  { name: "Sports recovery", note: "Compression for training load and recovery" },
];

export const COMPRESSION_JOURNEY: { step: string; title: string; body: string }[] = [
  {
    step: "01",
    title: "Compression assessment",
    body: "We take your history, examine the leg, check the skin and screen for anything that would make compression unsafe: arterial disease in particular. Compression is only dispensed once we are satisfied it is the right treatment for your leg.",
  },
  {
    step: "02",
    title: "Measurement",
    body: "The leg is measured at every landmark the garment is knitted to: ankle, calf, below the knee, thigh and the relevant lengths. Measurements are taken first thing in the morning, before the leg has had a chance to swell.",
  },
  {
    step: "03",
    title: "Compression prescription",
    body: "Class, length, knit, toe style, grip top and fabric are chosen together. Two people with the same diagnosis rarely leave with the same garment. Dexterity, skin, climate and what you will realistically wear all count.",
  },
  {
    step: "04",
    title: "Fitting and application training",
    body: "We check the fit on the leg, then teach you how to get the garment on and off. Donning gloves and application frames are demonstrated and supplied where they will make the difference between a garment worn and a garment in a drawer.",
  },
  {
    step: "05",
    title: "Review and replacement",
    body: "We review at four to six weeks, remeasure as the swelling settles, and plan replacements. Compression fabric loses its therapeutic pressure over roughly six months, so garments are replaced on a schedule rather than when they look worn.",
  },
];

export const COMPRESSION_CARE: string[] = [
  "Put your compression garment on first thing in the morning, before the leg swells",
  "Wash after every one to two wears in warm water; washing restores the elastic fibres",
  "No fabric softener, no bleach and no tumble dryer",
  "Dry flat, away from direct sun and heaters",
  "Use donning gloves; they protect both your skin and the garment",
  "Check your skin daily, especially over the shin, heel and any bony point",
  "Wear two garments in rotation so one is always clean and ready",
  "Replace roughly every six months, or sooner if it becomes easy to pull on",
];

export const OTHER_COMPRESSION: { name: string; image: string }[] = [
  { name: "Compression arm sleeves", image: "/devices/compression-arm-sleeve.png" },
  { name: "Compression gloves & gauntlets", image: "/devices/compression-glove.png" },
  { name: "Compression vests & chest garments", image: "/devices/mastectomy-vest.png" },
  { name: "Scar & burn compression garments", image: "/devices/compression-bandaging.png" },
];

export const COMPRESSION_FAQS: { q: string; a: string }[] = [
  {
    q: "Which compression class do I need?",
    a: "Compression class is a clinical decision, not a preference. It depends on your diagnosis, how much swelling is present, the condition of your skin, your arterial circulation and how well you can manage the garment. Class 1 (18–21 mmHg) suits early symptoms, Class 2 (23–32 mmHg) is the most commonly prescribed class for venous and lymphatic conditions, and Class 3 (34–46 mmHg) is used for advanced disease. Class A is a light-support class for tired legs and travel. We confirm the class at your compression assessment, alongside your referring doctor where one is involved.",
  },
  {
    q: "What is the difference between BK and AK compression stockings?",
    a: "BK (below-knee, designated AD) runs from the foot to just below the knee and is the most commonly fitted length. AK (thigh-high, designated AG) carries the compression up to the upper thigh and is held by a silicone grip top. The rule is simple: the garment must cover the whole area that swells. If your swelling stops below the knee, a below-knee stocking is both sufficient and easier to live with; if the thigh is involved, a thigh-high or pantyhose length is needed.",
  },
  {
    q: "How long do compression stockings last?",
    a: "Roughly six months of daily wear. The knitted elastane loses pressure long before the garment looks worn out, which is why compression garments are replaced on a schedule rather than on appearance. If a stocking that used to take effort suddenly slides on easily, it has stopped delivering its prescribed compression. Most patients are fitted with two garments so one can be worn while the other is washed and dried.",
  },
  {
    q: "Are compression stockings supposed to be uncomfortable?",
    a: "They should feel firm, never painful. Firmness at the ankle that eases as it moves up the leg is exactly what graduated compression is meant to feel like. Pain, numbness, pins and needles, a change in toe colour, or a garment that digs in or rolls down are not normal. They usually mean the size, class or length is wrong, and they are worth a refit rather than abandoning compression altogether.",
  },
  {
    q: "Can I sleep in my compression stockings?",
    a: "Day compression garments are removed at night. Lying flat already takes gravity out of the equation, and wearing daytime compression in bed adds risk without adding benefit. Where swelling needs controlling overnight, a purpose-made night garment or an adjustable compression wrap is prescribed instead. These use a different, low-stiffness construction designed for lying down.",
  },
  {
    q: "When should compression not be worn?",
    a: "Compression is not safe for everyone. Significant arterial disease, an untreated deep vein thrombosis, uncontrolled heart failure, active infection such as cellulitis, and severe peripheral neuropathy all need medical clearance before any compression garment is fitted. This is precisely why compression is assessed and dispensed by a clinician rather than bought off a shelf. Screening for these is part of the fitting.",
  },
  {
    q: "What is the difference between flat-knit and circular-knit compression?",
    a: "Circular-knit garments are knitted seamlessly in a tube. They are finer, more cosmetic and suit legs that are still a normal shape, and are the usual choice for venous conditions. Flat-knit garments are knitted flat and seamed, which lets them be built to any limb shape. They are thicker and stiffer, will not cut into skin folds, and are the standard for lymphoedema, lipoedema and limbs whose shape has changed.",
  },
  {
    q: "Does medical aid cover compression garments in South Africa?",
    a: "Many schemes contribute towards medical compression garments, usually from an appliance or external medical items benefit and generally with a prescription or motivation from your doctor. Cover varies considerably between schemes and plans. We quote before ordering and can supply the clinical motivation and coding your scheme needs, so you know what you are covered for before anything is made.",
  },
  {
    q: "Do you fit compression garments at home or in hospital?",
    a: "Yes. Compression assessments, measuring and fitting can be done at the consulting rooms in Morningside, Sandton, at your home, or at the hospital bedside across Gauteng, including Johannesburg, Centurion, Pretoria and Midrand. Patients who cannot travel after surgery or during treatment are exactly the patients who most need compression started early.",
  },
];
