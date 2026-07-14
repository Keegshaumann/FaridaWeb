// Shared types for the device catalogue shown on the service detail pages.
// Devices are sourced generically (no supplier/brand names) and mapped to one of
// the practice's six services and to a body part (used for the on-page filter).

export type ServiceSlug =
  | "prosthetics"
  | "off-the-shelf-orthotics"
  | "custom-orthotics"
  | "mobility-aids"
  | "compression"
  | "breast-prosthetics";

export type BodyPart =
  | "Head"
  | "Neck"
  | "Shoulder"
  | "Elbow"
  | "Wrist & Hand"
  | "Spine & Back"
  | "Hip"
  | "Knee"
  | "Ankle & Foot"
  | "Lower Limb"
  | "Upper Limb"
  | "Chest"
  | "Full Body";

export interface Device {
  id: string;
  name: string;
  service: ServiceSlug;
  bodyPart: BodyPart;
  /** One concise line: who it's for / when it's used. */
  useCase: string;
  /** 2–3 sentence patient-facing description (conservative — support/offload/stabilise/replace). */
  description: string;
  features: string[];
}

// Head-to-toe ordering used to sort the body-part filter chips consistently.
export const BODY_PART_ORDER: BodyPart[] = [
  "Head",
  "Neck",
  "Shoulder",
  "Upper Limb",
  "Elbow",
  "Wrist & Hand",
  "Chest",
  "Spine & Back",
  "Hip",
  "Lower Limb",
  "Knee",
  "Ankle & Foot",
  "Full Body",
];
