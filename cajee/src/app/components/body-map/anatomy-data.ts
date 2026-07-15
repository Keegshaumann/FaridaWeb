// Data for the interactive "Conditions We Treat" body map.
// Each pain point maps a body region to the specific orthotic/prosthetic device
// an orthotist would provide, and links to the Cajee Botes service that covers it.
// Clinical rationale + device names are drawn from general clinical and
// manufacturer guidance and are kept deliberately conservative — devices
// support / offload / stabilise; they are not cures.

import type { BodyPart } from "../../data/device-types";

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
}

export const PAIN_POINTS: PainPoint[] = [
  {
    id: "head",
    label: "Infant Head Shape (Flat Head)",
    view: "front",
    x: 50,
    y: 9,
    device: "Cranial remoulding helmet",
    howItHelps:
      "A cranial remoulding helmet is a lightweight custom helmet, moulded from a 3D scan of the infant's head, that applies gentle, evenly distributed contact to help guide skull growth into a more symmetrical shape during a period of rapid growth. It is worn for most of the day over a defined treatment period and adjusted as the head grows.",
    blurb: "A custom-moulded helmet gently guides an infant's head shape during rapid skull growth.",
    serviceName: "Custom Orthotics",
    serviceSlug: "/services/custom-orthotics",
  },
  {
    id: "neck",
    label: "Neck Pain",
    view: "front",
    x: 50,
    y: 21,
    device: "Cervical collar (soft or rigid cervical orthosis)",
    howItHelps:
      "A cervical collar cradles the head and gently limits neck movement, offloading the surrounding muscles to ease pain and spasm during recovery from muscle strains or arthritic flare-ups. It provides short-term support as part of a wider management plan.",
    blurb: "A supportive cervical collar takes the load off a sore or strained neck while you heal.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
  },
  {
    id: "shoulder",
    label: "Shoulder Pain",
    view: "front",
    x: 67,
    y: 24,
    device: "Shoulder immobiliser sling or abduction sling",
    howItHelps:
      "A shoulder sling supports the weight of the arm and rests the joint after strain, instability or injury. An abduction sling holds the arm slightly away from the body in a protected position, commonly used after rotator cuff repair or shoulder surgery to protect healing tissue.",
    blurb: "A fitted sling or abduction sling rests and protects a sore or healing shoulder.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
  },
  {
    id: "elbow-arm",
    label: "Elbow & Arm Pain",
    view: "front",
    x: 80,
    y: 40,
    device: "Epicondylitis forearm strap (tennis / golfer's elbow brace) or elbow support sleeve",
    howItHelps:
      "A forearm strap applies targeted compression just below the elbow to offload the strained tendon attachment, while a support sleeve adds compression and warmth to steady the joint and manage swelling during activity. These manage symptoms but don't replace assessment of the cause.",
    blurb: "A simple elbow strap or support offloads sore tendons in tennis elbow, golfer's elbow or arm strain.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
  },
  {
    id: "wrist-hand",
    label: "Wrist, Hand & Finger Pain",
    view: "front",
    x: 86,
    y: 57,
    device: "Supportive wrist splint, with a thumb spica for thumb-side pain",
    howItHelps:
      "A wrist splint holds the wrist in a comfortable neutral position to rest the joint, ease load on the tendons and reduce pressure on the median nerve in carpal tunnel syndrome. A thumb spica limits painful thumb movement in tendinopathy or thumb-base arthritis. Worn as conservative support, not a cure.",
    blurb: "A supportive wrist or thumb brace rests the joint in carpal tunnel, tendon strain or thumb arthritis.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
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
  },
  {
    id: "groin",
    label: "Groin Pain & Hernia",
    view: "front",
    x: 50,
    y: 50,
    device: "Hernia support belt (inguinal hernia truss)",
    howItHelps:
      "A hernia support belt applies gentle, targeted pressure over a reducible inguinal hernia to hold it supported during standing, walking and daily activity, easing discomfort and the dragging sensation. It manages symptoms while surgical review is awaited or not appropriate — it does not repair the hernia itself.",
    blurb: "A fitted hernia support belt keeps a groin hernia comfortably supported during daily activity.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
  },
  {
    id: "limb-loss",
    label: "Limb Loss / Amputation",
    view: "front",
    x: 60,
    y: 75,
    device: "Custom-fitted prosthetic limb (below-knee, above-knee or upper-limb prosthesis)",
    howItHelps:
      "A prosthetic limb replaces the missing segment to restore weight-bearing, balance and a more natural gait or hand function, with an individually cast socket and liner distributing load and protecting the residual limb. Early on, a residual-limb shrinker can help control swelling and shape the limb for socket fitting.",
    blurb: "After limb loss, a custom-fitted prosthesis helps you get moving again and regain independence.",
    serviceName: "Prosthetics",
    serviceSlug: "/services/prosthetics",
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
  },
  {
    id: "knee",
    label: "Knee Pain",
    view: "back",
    x: 38,
    y: 70,
    device: "Knee brace / support — hinged or patella-stabilising, or an offloading brace for compartment osteoarthritis",
    howItHelps:
      "A fitted knee brace stabilises the joint, guides patellar tracking and applies graded compression to control pain and swelling. An offloading brace uses a 3-point leverage system to shift load away from the worn compartment in osteoarthritis. It supports and offloads the knee but doesn't cure the cause.",
    blurb: "A properly fitted knee brace stabilises and offloads the joint in arthritis, instability or kneecap pain.",
    serviceName: "Off-the-Shelf Orthotics",
    serviceSlug: "/services/off-the-shelf-orthotics",
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
  },
];

export const FRONT_POINTS = PAIN_POINTS.filter((p) => p.view === "front");
export const BACK_POINTS = PAIN_POINTS.filter((p) => p.view === "back");

// Maps each body-map point to the device-catalogue body part, so the detail
// panel can list related devices and deep-link to the filtered service page.
export const POINT_TO_BODYPART: Record<string, BodyPart> = {
  head: "Head",
  neck: "Neck",
  shoulder: "Shoulder",
  "elbow-arm": "Elbow",
  "wrist-hand": "Wrist & Hand",
  "lower-back": "Spine & Back",
  groin: "Hip",
  "limb-loss": "Lower Limb",
  swelling: "Lower Limb",
  "upper-back": "Spine & Back",
  knee: "Knee",
  ankle: "Ankle & Foot",
  foot: "Ankle & Foot",
};
