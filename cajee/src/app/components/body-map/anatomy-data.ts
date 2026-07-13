// Data for the interactive "Conditions We Treat" body map.
// Each pain point maps a body region to the specific orthotic/prosthetic device
// an orthotist would provide, and links to the Cajee Botes service that covers it.
// Clinical rationale + device names are drawn from manufacturer/clinical sources
// (Ottobock, Össur, Bauerfeind, Aircast, NHS, physio-pedia, PubMed) and are kept
// deliberately conservative — devices support/offload/stabilise; they are not cures.

export type BodyView = "front" | "back";

export interface PainPoint {
  id: string;
  label: string;
  /** Which figure the dot sits on. */
  view: BodyView;
  /** Dot position as a percentage of the figure box (x from left, y from top). */
  x: number;
  y: number;
  /** The specific orthotic / prosthetic device. */
  device: string;
  /** Conservative, patient-facing rationale for how the device helps. */
  howItHelps: string;
  /** One-line friendly summary. */
  blurb: string;
  /** Mapped Cajee Botes service. */
  serviceName: string;
  serviceSlug: string;
  /** Authoritative sources consulted during research. */
  sources: string[];
}

export const PAIN_POINTS: PainPoint[] = [
  {
    id: "neck",
    label: "Neck Pain",
    view: "front",
    x: 50,
    y: 19,
    device: "Cervical collar (soft or rigid cervical orthosis)",
    howItHelps:
      "A cervical collar cradles the head and gently limits neck movement, offloading the surrounding muscles to ease pain and spasm during recovery from muscle strains or arthritic flare-ups. It provides short-term support as part of a wider management plan.",
    blurb: "A supportive cervical collar takes the load off a sore or strained neck while you heal.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
    sources: [
      "https://www.physio-pedia.com/Cervical_Collar",
      "https://now.aapmr.org/cervical-thoracic-and-lumbosacral-orthoses/",
    ],
  },
  {
    id: "shoulder",
    label: "Shoulder Pain",
    view: "front",
    x: 63,
    y: 25,
    device: "Shoulder support / stabilising brace or immobiliser sling",
    howItHelps:
      "A shoulder support brace or sling stabilises and offloads the joint, limits painful movement and rests the rotator cuff after strain, instability or injury. Compression-knit supports can also ease discomfort and swelling while allowing controlled movement.",
    blurb: "A fitted support or sling steadies a sore or unstable shoulder so you can move more comfortably.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
    sources: [
      "https://www.bauerfeind.us/shoulder-brace-omotrain/",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC10395168/",
    ],
  },
  {
    id: "elbow-arm",
    label: "Elbow & Arm Pain",
    view: "front",
    x: 83,
    y: 44,
    device: "Epicondylitis forearm strap (tennis / golfer's elbow brace) or elbow support sleeve",
    howItHelps:
      "A forearm strap applies targeted compression just below the elbow to offload the strained tendon attachment, while a support sleeve adds compression and warmth to steady the joint and manage swelling during activity. These manage symptoms but don't replace assessment of the cause.",
    blurb: "A simple elbow strap or support offloads sore tendons in tennis elbow, golfer's elbow or arm strain.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
    sources: [
      "https://www.bauerfeind.us/tennis-elbow-brace-sports-elbow-support/",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC3989882/",
    ],
  },
  {
    id: "wrist-hand",
    label: "Wrist, Hand & Finger Pain",
    view: "front",
    x: 86,
    y: 57,
    device: "Wrist cock-up splint, with a thumb spica for thumb-side pain",
    howItHelps:
      "A wrist cock-up splint holds the wrist in neutral to rest the joint, ease load on the flexor tendons and reduce pressure on the median nerve in carpal tunnel syndrome. A thumb spica limits painful thumb movement in tendinopathy or thumb-base arthritis. Worn as conservative support, not a cure.",
    blurb: "A supportive wrist or thumb brace rests the joint in carpal tunnel, tendon strain or thumb arthritis.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
    sources: [
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC9847107/",
      "https://orthotape.com/products/ossur-formfit-thumb-spica-splint",
    ],
  },
  {
    id: "lower-back",
    label: "Lower Back Pain",
    view: "back",
    x: 50,
    y: 41,
    device: "Lumbosacral orthosis (lumbar support brace / LSO)",
    howItHelps:
      "A lumbosacral orthosis applies gentle compression and support to the lower spine, helping stabilise the lumbar segment, limit painful end-range movement and offload the muscles during activity. It also gives proprioceptive feedback to support conservative care of acute or subacute back pain.",
    blurb: "A supportive lumbar brace stabilises and offloads the lower spine for everyday back pain.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
    sources: [
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC6315306/",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC7046130/",
    ],
  },
  {
    id: "groin",
    label: "Groin Pain",
    view: "front",
    x: 50,
    y: 50,
    device: "Hip / groin compression spica brace (adjustable adductor support wrap)",
    howItHelps:
      "A wrap-around groin/hip spica brace applies graduated compression and support across the adductor and hip-flexor muscles, helping stabilise the area and limit the painful movements of a groin or adductor strain during activity and early recovery. It supports only and doesn't replace assessment of an underlying hernia.",
    blurb: "A supportive compression brace steadies the area while a groin or adductor strain settles.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
    sources: [
      "https://www.braceability.com/products/hip-and-groin-brace",
      "https://www.dme-direct.com/shop-by-injury/hip-injuries/hip-flexor-strain-brace",
    ],
  },
  {
    id: "thigh",
    label: "Thigh Pain",
    view: "front",
    x: 40,
    y: 63,
    device: "Thigh support brace / compression thigh sleeve",
    howItHelps:
      "A thigh support applies graduated compression with targeted pads and straps to support the quadriceps and hamstring muscles, limit muscle oscillation, reduce swelling and add warmth and feedback. It offloads strained tissue and supports comfortable movement without immobilising the leg.",
    blurb: "A well-fitted thigh support steadies a strained quad or hamstring while it settles.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
    sources: [
      "https://www.bauerfeind.us/thigh-brace-myotrain/",
      "https://www.breg.com/products/knee-bracing/soft-supports/thigh-support/",
    ],
  },
  {
    id: "limb-loss",
    label: "Limb Loss / Amputation",
    view: "front",
    x: 59,
    y: 66,
    device: "Custom-fitted prosthetic limb (below-knee, above-knee or upper-limb prosthesis)",
    howItHelps:
      "A prosthetic limb replaces the missing segment to restore weight-bearing, balance and a more natural gait or hand function, with an individually cast socket and liner distributing load and protecting the residual limb. Early on, a residual-limb shrinker can help control swelling and shape the limb for socket fitting.",
    blurb: "After limb loss, a custom-fitted prosthesis helps you get moving again and regain independence.",
    serviceName: "Prosthetics",
    serviceSlug: "/services/prosthetics",
    sources: [
      "https://www.ottobockcare.us/en-us/services/lower-limb-prosthetics",
      "https://www.bacpar.org/Data/Resource_Downloads/OedemaGuidelines.pdf",
    ],
  },
  {
    id: "swelling",
    label: "Limb Swelling / Lymphoedema",
    view: "front",
    x: 61,
    y: 88,
    device: "Graduated medical compression garment (flat-knit sleeve or stocking, typically Class 2–3)",
    howItHelps:
      "A fitted graduated compression garment applies controlled, even pressure — highest at the far end of the limb — to support lymphatic and venous return and help reduce and manage swelling. It is worn during the day for long-term maintenance and doesn't cure the underlying condition.",
    blurb: "A properly fitted compression garment controls swelling from lymphoedema or oedema and keeps you comfortable.",
    serviceName: "Medical Compression",
    serviceSlug: "/services/compression",
    sources: [
      "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/lymphoedema/compression-to-treat-lymphoedema",
      "https://www.cancerresearchuk.org/about-cancer/coping/physically/lymphoedema-and-cancer/treating/compression",
    ],
  },
  {
    id: "upper-back",
    label: "Upper Back & Posture",
    view: "back",
    x: 50,
    y: 30,
    device: "Posture-correcting thoracic orthosis; a semi-rigid posture (activating) back orthosis for postural kyphosis",
    howItHelps:
      "A posture-correcting orthosis gently draws the shoulders back and supports the thoracic spine in a more upright alignment, reducing slouching and easing the muscular strain behind upper-back and postural pain. It acts as a supportive reminder and, in activating designs, encourages the back extensor muscles to work.",
    blurb: "A supportive posture brace helps you sit and stand taller, easing an achy upper back.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
    sources: [
      "https://www.medi.de/en/products/spinomed/",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC9811681/",
    ],
  },
  {
    id: "hip",
    label: "Hip Pain",
    view: "back",
    x: 40,
    y: 52,
    device: "Hip support brace / trochanteric belt",
    howItHelps:
      "A hip support or trochanteric belt compresses and stabilises the hip and pelvis, supporting the joint and limiting excess movement. This offloads the irritated soft tissue around the hip and reduces strain, easing pain during standing and walking.",
    blurb: "A fitted hip support or trochanteric belt stabilises the joint and takes pressure off sore tissues.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
    sources: [
      "https://www.bauerfeind.us/hip-brace-coxatrain/",
      "https://www.physio-pedia.com/Greater_Trochanteric_Pain_Syndrome",
    ],
  },
  {
    id: "sacroiliac",
    label: "Buttock & SI Joint Pain",
    view: "back",
    x: 56,
    y: 50,
    device: "Sacroiliac (SI) joint belt / pelvic compression belt",
    howItHelps:
      "An SI joint belt applies circumferential compression around the pelvis to support the sacroiliac ligaments, stabilise the joint and limit excess movement, helping offload and reduce mechanical SI joint and buttock pain. It supports and steadies the joint rather than curing the cause.",
    blurb: "A supportive pelvic belt gently compresses and stabilises the sacroiliac joint to ease deep buttock pain.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
    sources: [
      "https://www.bauerfeind.us/si-joint-belt-sacroloc/",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4364533/",
    ],
  },
  {
    id: "knee",
    label: "Knee Pain",
    view: "back",
    x: 38,
    y: 72,
    device: "Knee brace / support — hinged or patella-stabilising, or an unloader brace for compartment osteoarthritis",
    howItHelps:
      "A fitted knee brace stabilises the joint, guides patellar tracking and applies graded compression to control pain and swelling. An unloader brace uses a 3-point leverage system to shift load away from the worn compartment in osteoarthritis. It supports and offloads the knee but doesn't cure the cause.",
    blurb: "A properly fitted knee brace stabilises and offloads the joint in arthritis, instability or kneecap pain.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
    sources: [
      "https://www.ossur.com/en-us/bracing-and-supports/unloader/unloader-braces",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6151190/",
    ],
  },
  {
    id: "ankle",
    label: "Ankle Pain",
    view: "back",
    x: 61,
    y: 90,
    device: "Stabilising ankle brace / ankle orthosis (stirrup air-cell or lateral stabilising brace)",
    howItHelps:
      "An ankle brace stabilises the joint by limiting excessive inversion and eversion, offloading strained lateral ligaments and applying graduated compression to help manage swelling. This supports comfortable weight-bearing during recovery from sprains and helps manage chronic ankle instability.",
    blurb: "A fitted ankle brace adds stability and support for sprains or an ankle that keeps giving way.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
    sources: [
      "https://www.bauerfeind.us/stirrup-ankle-brace-malleoloc/",
      "https://www.ncbi.nlm.nih.gov/books/NBK563450/",
    ],
  },
  {
    id: "foot",
    label: "Foot & Heel Pain",
    view: "back",
    x: 38,
    y: 93,
    device: "Orthotic insole / foot orthosis (arch support with cushioned heel cup), plus a plantar fasciitis night splint",
    howItHelps:
      "A contoured insole with a cushioned heel cup supports the arch and redistributes pressure away from the heel and plantar fascia, easing load when standing and walking. A night splint holds the foot in gentle dorsiflexion overnight, which can reduce first-step morning pain.",
    blurb: "The right supportive insole and heel cushioning take the strain off nagging foot or heel pain like plantar fasciitis.",
    serviceName: "Custom Orthotics",
    serviceSlug: "/services/custom-orthotics",
    sources: [
      "https://www.bauerfeind.us/plantar-fasciitis-shoe-insoles-viscoped-s/",
      "https://www.algeos.com/orthotic-therapy/condition-specific/plantar-fasciitis",
    ],
  },
];

export const FRONT_POINTS = PAIN_POINTS.filter((p) => p.view === "front");
export const BACK_POINTS = PAIN_POINTS.filter((p) => p.view === "back");
