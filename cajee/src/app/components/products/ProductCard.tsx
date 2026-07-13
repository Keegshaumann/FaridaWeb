import { Check } from "lucide-react";
import type { Device } from "../../data/device-types";
import { deviceIcon } from "./product-images";

export function ProductCard({ device }: { device: Device }) {
  const Icon = deviceIcon(device);
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[var(--purple-soft)]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Icon panel */}
      <div className="relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-[var(--pink-light)] to-[var(--purple-light)]">
        <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-[var(--text-dark)] shadow-sm backdrop-blur">
          {device.bodyPart}
        </span>
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/70 shadow-inner ring-1 ring-white/60 transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-9 w-9 text-[var(--accent-purple)]" strokeWidth={1.6} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-[var(--text-dark)]">{device.name}</h3>
        <p className="mt-1 text-sm font-medium text-[var(--purple-medium)]">{device.useCase}</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--purple-medium)]">{device.description}</p>
        {device.features.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {device.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-[var(--purple-medium)]">
                <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--accent-purple)]" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
