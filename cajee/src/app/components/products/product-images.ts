import type { Device } from "../../data/device-types";

// Each device card shows an original diagram, drawn for this site in the flat
// style and colours of the blog's prosthetic-leg parts diagram: a simple figure
// with the place the device is worn marked in blue, or, for mobility aids, a
// plain drawing of the aid. They replaced rendered "product photos" on
// 13 November 2026: those looked AI-made, and this is a health practice, so the
// rule is no AI images (BLOG-IMAGES.md). A diagram shows where a device goes;
// it never pretends to be a photo of Farida's own stock or a patient.
//
// Files: /public/devices/diagrams/diagram-{key}.webp, 640x640, lossless WebP.
// The drawings are generated from SVG (recorded in the SEO programme's
// plans/faridaweb/images/SOURCES.md). A new device needs a row here; a device
// with no row falls back to a plain body outline rather than a wrong picture.

type Diagram = { key: string; alt: string };

const DIAGRAMS: Record<string, Diagram> = {
  "lower-limb-prosthetics": { key: "prosthesis-leg", alt: "Diagram of a below-knee prosthetic leg on one leg: socket, pylon and foot" },
  "upper-limb-prosthetics": { key: "prosthesis-arm", alt: "Diagram of a below-elbow prosthetic arm: socket and hand" },
  "paediatric-prosthetics": { key: "prosthesis-child", alt: "Diagram of a child with a prosthetic leg and a prosthetic arm" },
  "oa-offloading-knee-brace": { key: "knee-brace-offloading", alt: "Diagram of an offloading knee brace on one knee, hinged on one side" },
  "hinged-ligament-knee-brace": { key: "knee-brace-hinged", alt: "Diagram of a hinged knee brace around one knee" },
  "post-op-rom-knee-brace": { key: "knee-brace-rom", alt: "Diagram of a long hinged knee brace from the thigh to the shin" },
  "patellar-stabilising-knee-brace": { key: "knee-brace-patellar", alt: "Diagram of a knee brace with an opening around the kneecap" },
  "elastic-knee-sleeve": { key: "knee-sleeve", alt: "Diagram of an elastic sleeve over one knee" },
  "ankle-stirrup-brace": { key: "ankle-stirrup", alt: "Diagram of a stirrup brace on both sides of one ankle" },
  "walker-fracture-boot": { key: "walker-boot", alt: "Diagram of a walker boot over one foot and lower leg" },
  "off-the-shelf-afo-drop-foot": { key: "afo", alt: "Diagram of an ankle-foot orthosis on one lower leg and foot" },
  "night-splint-plantar-achilles": { key: "night-splint", alt: "Diagram of a night splint on one lower leg and foot" },
  "cervical-collar-rigid-adjustable": { key: "cervical-collar", alt: "Diagram of a collar around the neck" },
  "hernia-support-belt": { key: "hernia-belt", alt: "Diagram of a support belt around the lower abdomen with pads over the groin" },
  "maternity-support-belt": { key: "maternity-belt", alt: "Diagram of a support belt under the belly" },
  "abdominal-binder-post-op": { key: "abdominal-binder", alt: "Diagram of a wide binder around the abdomen" },
  "rigid-lumbosacral-orthosis": { key: "lso", alt: "Diagram of a brace around the lower back and waist" },
  "wrist-splint-day-night": { key: "wrist-splint", alt: "Diagram of a splint on one wrist and forearm" },
  "thumb-spica-splint": { key: "thumb-spica", alt: "Diagram of a wrist splint that also holds the thumb" },
  "elbow-support-epicondylitis-strap": { key: "elbow-strap", alt: "Diagram of a strap around the forearm just below the elbow" },
  "shoulder-immobiliser-sling": { key: "shoulder-sling", alt: "Diagram of one arm held across the body in a sling" },
  "custom-ankle-foot-orthosis": { key: "afo", alt: "Diagram of an ankle-foot orthosis on one lower leg and foot" },
  "custom-knee-ankle-foot-orthosis": { key: "kafo", alt: "Diagram of a knee-ankle-foot orthosis from the thigh to the foot" },
  "custom-hip-knee-ankle-foot-orthosis": { key: "hkafo", alt: "Diagram of a hip-knee-ankle-foot orthosis from the hips down both legs" },
  "custom-foot-orthosis": { key: "insoles", alt: "Diagram of a pair of insoles seen from above" },
  "custom-scoliosis-brace": { key: "scoliosis-brace", alt: "Diagram of a brace around the trunk, from under the arms to the hips" },
  "custom-moulded-bennett-brace": { key: "bennett-brace", alt: "Diagram of a brace around the mid and lower back with a fabric front panel" },
  "cranial-remoulding-helmet": { key: "cranial-helmet", alt: "Diagram of a baby's head in a remoulding helmet, with the face open" },
  "custom-resting-hand-wrist-orthosis": { key: "resting-hand", alt: "Diagram of a splint holding one hand and wrist" },
  "elbow-rom-brace": { key: "elbow-rom", alt: "Diagram of a hinged brace around one elbow" },
  "active-rigid-manual-wheelchair": { key: "wheelchair-active", alt: "Drawing of a rigid-frame manual wheelchair with a low backrest" },
  "standard-attendant-wheelchair": { key: "wheelchair-standard", alt: "Drawing of a standard wheelchair with push handles and armrests" },
  "power-wheelchair": { key: "wheelchair-power", alt: "Drawing of a power wheelchair with a joystick" },
  "paediatric-wheelchair-buggy": { key: "wheelchair-child", alt: "Drawing of a child's rehab buggy" },
  "wheelchair-seating-positioning-system": { key: "seating-system", alt: "Drawing of a contoured seat, backrest and head support" },
  "rollator": { key: "rollator", alt: "Drawing of a rollator with wheels, a seat and a basket" },
  "standard-walking-frame": { key: "walking-frame", alt: "Drawing of a walking frame" },
  "forearm-crutches": { key: "crutches", alt: "Drawing of a pair of forearm crutches" },
  "walking-stick-cane": { key: "cane", alt: "Drawing of a walking stick" },
  "knee-scooter": { key: "knee-scooter", alt: "Drawing of a knee scooter with a knee pad and handlebar" },
  "standing-frame": { key: "standing-frame", alt: "Drawing of a standing frame with knee and chest supports" },
  "transfer-board": { key: "transfer-board", alt: "Drawing of a transfer board bridging two seats" },
  "below-knee-compression-stocking": { key: "stocking-bk", alt: "Diagram of below-knee compression stockings, from the foot to just below the knee" },
  "thigh-high-compression-stocking": { key: "stocking-thigh", alt: "Diagram of thigh-high compression stockings, from the foot to the upper thigh" },
  "compression-tights": { key: "tights", alt: "Diagram of compression tights, from the feet to the waist" },
  "compression-arm-sleeve": { key: "arm-sleeve", alt: "Diagram of a compression sleeve from the upper arm to the wrist" },
  "compression-glove-gauntlet": { key: "glove", alt: "Diagram of a compression glove over one hand and wrist" },
  "post-mastectomy-compression-garment": { key: "chest-garment", alt: "Diagram of a compression vest over the chest" },
  "scar-burn-compression-garment": { key: "scar-garment", alt: "Diagram of a compression garment over the trunk and both arms" },
  "multi-layer-compression-bandaging": { key: "bandaging", alt: "Diagram of layered bandaging from the foot to below the knee" },
  "breast-forms": { key: "breast-form", alt: "Diagram of a breast form on one side of the chest" },
  "post-mastectomy-bra-camisole": { key: "mastectomy-bra", alt: "Diagram of a mastectomy bra with a breast form in one cup" },
  "nipple-prosthesis": { key: "nipple-prosthesis", alt: "Diagram of a nipple prosthesis on one side of the chest" },
  "silicone-cosmetic-restoration-face-digits": { key: "silicone-restoration", alt: "Diagram marking the face, a finger and a toe" },
  "posture-support-brace-thoracic": { key: "posture-brace", alt: "Diagram of straps around both shoulders and across the upper back" },
};

const FALLBACK: Diagram = { key: "body", alt: "" };

export const diagramPath = (key: string) => `/devices/diagrams/diagram-${key}.webp`;

export function deviceImage(device: Pick<Device, "id">): string {
  return diagramPath((DIAGRAMS[device.id] ?? FALLBACK).key);
}

export function deviceImageAlt(device: Pick<Device, "id" | "name">): string {
  return DIAGRAMS[device.id]?.alt ?? "";
}
