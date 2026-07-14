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
      if (/paediatric/.test(n)) return "paediatric-prosthesis";
      if (/upper limb|transhumeral|transradial/.test(n)) return "prosthetic-arm";
      return "prosthetic-leg";

    case "off-the-shelf-orthotics":
    case "custom-orthotics":
      if (/cervical|collar/.test(n) || bp === "Neck") return "cervical-collar";
      if (/bennett/.test(n)) return "bennett-brace";
      if (/scoliosis|tlso|thoracolumbosacral/.test(n)) return "tlso-scoliosis";
      if (/posture/.test(n)) return "posture-brace";
      if (/hernia/.test(n)) return "hernia-belt";
      if (/maternity/.test(n)) return "maternity-belt";
      if (/abdominal/.test(n)) return "abdominal-binder";
      if (/hkafo|hip-knee/.test(n)) return "hkafo";
      if (/kafo|knee-ankle/.test(n)) return "kafo";
      if (/lumbar|lumbosacral|\blso\b|back support/.test(n)) return "lumbar-brace";
      if (/thumb/.test(n)) return "thumb-spica";
      if (/resting/.test(n)) return "resting-hand-splint";
      if (/carpal|wrist/.test(n)) return "wrist-splint";
      if (/\brom\b/.test(n)) return bp === "Elbow" ? "dynamic-arm-orthosis" : "rom-knee-brace";
      if (/epicondyl|elbow/.test(n)) return "elbow-brace";
      if (/shoulder|sling|subluxation/.test(n)) return "shoulder-sling";
      if (/hip/.test(n)) return "hip-brace";
      if (/night splint/.test(n)) return "night-splint";
      if (/boot|fracture/.test(n)) return "walker-boot";
      if (/afo|drop.?foot|ankle-foot/.test(n)) return "afo";
      if (/insole|foot orthosis|foot orthotic|shoe/.test(n)) return /custom/.test(n) ? "custom-foot-orthosis" : "insole";
      if (/ankle/.test(n)) return "ankle-brace";
      if (/cranial|helmet/.test(n)) return "cranial-helmet";
      if (/osteoarthritis|offloading|unloader/.test(n)) return "unloader-knee";
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
      if (/tights|pantyhose/.test(n)) return "compression-tights";
      if (/thigh/.test(n)) return "compression-stocking-thigh";
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
