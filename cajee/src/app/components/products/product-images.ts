import type { Device } from "../../data/device-types";

// Real, unbranded product photos live in /public/devices/{key}.png.
// imageKeyFor picks the most representative product image for each device; a few
// image types are shared by closely-related devices (e.g. all prosthetic feet).
// This is the single place visuals are chosen, so swapping a device's photo is
// a one-line change.

function imageKeyFor(d: Pick<Device, "service" | "bodyPart" | "name">): string {
  const n = d.name.toLowerCase();
  const bp = d.bodyPart;

  switch (d.service) {
    case "prosthetics":
      if (/blade|running|sprint/.test(n)) return "prosthetic-blade";
      if (/foot|ankle/.test(n)) return /microprocessor|powered|bionic/.test(n) ? "prosthetic-foot-mpc" : "prosthetic-foot";
      if (/knee/.test(n)) return /microprocessor|powered|bionic/.test(n) ? "prosthetic-knee-mpc" : "prosthetic-knee";
      if (/hip/.test(n)) return "prosthetic-hip";
      if (/liner|sleeve|suspension|shrinker/.test(n)) return "prosthetic-liner";
      if (/socket/.test(n)) return "prosthetic-socket";
      if (/hook|body-powered/.test(n)) return "prosthetic-hook";
      if (/cosmetic|passive/.test(n)) return "prosthetic-hand-cosmetic";
      if (/hand|myoelectric|gripper|terminal/.test(n)) return "prosthetic-hand-myo";
      return "prosthetic-arm";

    case "off-the-shelf-orthotics":
    case "custom-orthotics":
      if (/cervical|collar/.test(n) || bp === "Neck") return "cervical-collar";
      if (/scoliosis|tlso|thoracolumbosacral/.test(n)) return "tlso-scoliosis";
      if (/posture/.test(n)) return "posture-brace";
      if (/sacroiliac|\bsi\b/.test(n)) return "si-belt";
      if (/kafo|knee-ankle|hkafo|hip-knee/.test(n)) return "kafo";
      if (/lumbar|lumbosacral|\blso\b|back support/.test(n)) return "lumbar-brace";
      if (/thumb/.test(n)) return "thumb-spica";
      if (/finger/.test(n)) return "finger-splint";
      if (/resting/.test(n)) return "resting-hand-splint";
      if (/carpal|wrist/.test(n)) return "wrist-splint";
      if (/epicondyl|elbow/.test(n)) return "elbow-brace";
      if (/shoulder|sling|subluxation/.test(n)) return "shoulder-sling";
      if (/hip/.test(n)) return "hip-brace";
      if (/thigh/.test(n)) return "thigh-support";
      if (/night splint/.test(n)) return "night-splint";
      if (/boot|fracture/.test(n)) return "walker-boot";
      if (/afo|drop.?foot|ankle-foot/.test(n)) return "afo";
      if (/insole|foot orthosis|foot orthotic|shoe/.test(n)) return "insole";
      if (/ankle/.test(n)) return "ankle-brace";
      if (/cranial|helmet/.test(n)) return "cranial-helmet";
      if (/dynamic.*(arm|upper)|upper.*orthosis/.test(n)) return "dynamic-arm-orthosis";
      if (/knee/.test(n)) return /elastic|sleeve/.test(n) ? "knee-brace-elastic" : "knee-brace";
      // fallbacks by body part
      if (bp === "Knee") return "knee-brace";
      if (bp === "Ankle & Foot") return "afo";
      if (bp === "Spine & Back") return "lumbar-brace";
      if (bp === "Wrist & Hand") return "wrist-splint";
      if (bp === "Elbow") return "elbow-brace";
      if (bp === "Shoulder") return "shoulder-sling";
      if (bp === "Hip") return "hip-brace";
      return "knee-brace";

    case "compression":
      if (/glove|gauntlet/.test(n)) return "compression-glove";
      if (/bandag/.test(n)) return "compression-bandaging";
      if (/mastectomy|scar|burn/.test(n) || bp === "Chest" || bp === "Full Body") return "mastectomy-vest";
      if (/arm|sleeve/.test(n) || bp === "Upper Limb" || bp === "Wrist & Hand") return "compression-arm-sleeve";
      return "compression-stocking";

    case "mobility-aids":
      if (/power|electric/.test(n)) return "power-wheelchair";
      if (/paediatric|buggy/.test(n) && /wheelchair|buggy|rehab/.test(n)) return "paediatric-wheelchair";
      if (/seating|positioning|cushion/.test(n)) return "wheelchair-cushion";
      if (/wheelchair/.test(n)) return "manual-wheelchair";
      if (/rollator/.test(n)) return "rollator";
      if (/crutch/.test(n)) return "crutches";
      if (/stick|cane/.test(n)) return "walking-cane";
      if (/scooter/.test(n)) return "knee-scooter";
      if (/standing/.test(n)) return "standing-frame";
      if (/gait/.test(n)) return "gait-trainer";
      if (/transfer/.test(n)) return "transfer-board";
      return "walking-frame";

    case "breast-prosthetics":
      if (/nipple/.test(n)) return "nipple-prosthesis";
      if (/bra|camisole/.test(n)) return "mastectomy-bra";
      if (/facial|face|finger|toe|digit|restoration/.test(n)) return "silicone-restoration";
      if (/partial|shell/.test(n)) return "breast-form-partial";
      return "breast-form";

    default:
      return "knee-brace";
  }
}

export function deviceImage(device: Pick<Device, "service" | "bodyPart" | "name">): string {
  return `/devices/${imageKeyFor(device)}.png`;
}
