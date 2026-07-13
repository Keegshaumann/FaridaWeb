import { Check } from "lucide-react";
import type { Device } from "../../data/device-types";
import { deviceImage } from "./product-images";

export function ProductCard({ device }: { device: Device }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[var(--purple-soft)]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Product photo */}
      <div className="relative flex aspect-[4/3] items-center justify-center bg-white p-3">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-[var(--pink-light)]/90 px-2.5 py-1 text-[11px] font-semibold text-[var(--text-dark)] shadow-sm">
          {device.bodyPart}
        </span>
        <img
          src={deviceImage(device)}
          alt={device.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col border-t border-[var(--purple-soft)]/40 p-5">
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
