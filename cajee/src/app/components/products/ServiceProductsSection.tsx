import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { DEVICES } from "../../data/devices";
import { BODY_PART_ORDER, type BodyPart, type ServiceSlug } from "../../data/device-types";
import { ProductCard } from "./ProductCard";

interface Props {
  service: ServiceSlug;
  heading?: string;
  intro?: string;
}

export function ServiceProductsSection({
  service,
  heading = "Devices We Provide",
  intro = "A selection of the devices we fit within this service. Filter by area of the body to find what fits your needs — the right device is always confirmed after an individual assessment.",
}: Props) {
  const items = useMemo(() => DEVICES.filter((d) => d.service === service), [service]);
  const bodyParts = useMemo(() => {
    const present = new Set(items.map((d) => d.bodyPart));
    return BODY_PART_ORDER.filter((bp) => present.has(bp));
  }, [items]);

  // Allow deep-linking a body part, e.g. from the body map: /services/x?part=Knee
  const [searchParams] = useSearchParams();
  const partParam = searchParams.get("part");
  const initial: BodyPart | "All" =
    partParam && bodyParts.includes(partParam as BodyPart) ? (partParam as BodyPart) : "All";
  const [active, setActive] = useState<BodyPart | "All">(initial);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (partParam && bodyParts.includes(partParam as BodyPart)) {
      setActive(partParam as BodyPart);
      window.requestAnimationFrame(() =>
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partParam]);

  if (items.length === 0) return null;
  const shown = active === "All" ? items : items.filter((d) => d.bodyPart === active);

  const chip = (label: string, value: BodyPart | "All", count: number) => (
    <button
      key={value}
      type="button"
      onClick={() => setActive(value)}
      aria-pressed={active === value}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
        active === value
          ? "bg-[var(--text-dark)] text-white shadow-md"
          : "bg-[var(--purple-soft)] text-[var(--text-dark)] hover:bg-[var(--purple-medium)] hover:text-white"
      }`}
    >
      {label}
      <span className="ml-1.5 font-normal">{count}</span>
    </button>
  );

  return (
    <section ref={sectionRef} className="scroll-mt-24">
      <div className="mb-6 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-3">{heading}</h2>
        <p className="text-[var(--text-muted)] leading-relaxed">{intro}</p>
      </div>

      {/* Body-part filter */}
      {bodyParts.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2.5">
          {chip("All", "All", items.length)}
          {bodyParts.map((bp) => chip(bp, bp, items.filter((d) => d.bodyPart === bp).length))}
        </div>
      )}

      {/* Product grid */}
      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((d) => (
            <motion.div
              key={d.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard device={d} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
