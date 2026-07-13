import type { ComponentType } from "react";
import {
  Accessibility,
  Activity,
  Bandage,
  Bone,
  Footprints,
  Hand,
  PersonStanding,
  Ribbon,
  Sparkles,
} from "lucide-react";
import type { BodyPart, Device } from "../../data/device-types";

// Device cards use clean, on-brand ICONS rather than stock photos.
// Rationale: the available product photos carry visible supplier/brand marks
// (which must never appear on this site) and only a handful exist, so a photo
// per device would either reveal a supplier or show the wrong device. Icons are
// brand-safe, always correct for the region/type, and fully consistent.
// To move to real photography later, give ProductCard an optional image field
// and prefer it here — this is the single place visuals are chosen.

type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;

const upperBody: BodyPart[] = ["Wrist & Hand", "Elbow", "Shoulder", "Upper Limb"];

export function deviceIcon(device: Pick<Device, "service" | "bodyPart" | "name">): Icon {
  const { service, bodyPart, name } = device;
  const n = name.toLowerCase();

  switch (service) {
    case "prosthetics":
      return upperBody.includes(bodyPart) ? Hand : Bone;

    case "off-the-shelf-orthotics":
    case "custom-orthotics":
      if (bodyPart === "Ankle & Foot") return Footprints;
      if (bodyPart === "Wrist & Hand") return Hand;
      return Bandage;

    case "compression":
      return Activity;

    case "mobility-aids":
      return /wheelchair|seating|scooter/.test(n) ? Accessibility : PersonStanding;

    case "breast-prosthetics":
      return /silicone|facial|face|finger|toe|nipple/.test(n) ? Sparkles : Ribbon;

    default:
      return Bandage;
  }
}
