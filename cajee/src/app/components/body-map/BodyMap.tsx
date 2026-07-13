import { useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { AnatomyFigure } from "./AnatomyFigure";
import {
  BACK_POINTS,
  FRONT_POINTS,
  PAIN_POINTS,
  POINT_TO_BODYPART,
  type BodyView,
  type PainPoint,
} from "./anatomy-data";
import { DEVICES } from "../../data/devices";

/** Devices in the catalogue matching a body-map point's service + body region. */
function relatedDevices(point: PainPoint) {
  const bodyPart = POINT_TO_BODYPART[point.id];
  const svc = point.serviceSlug.replace("/services/", "");
  return DEVICES.filter((d) => d.service === svc && d.bodyPart === bodyPart);
}

function Hotspot({
  point,
  active,
  onSelect,
}: {
  point: PainPoint;
  active: boolean;
  onSelect: (p: PainPoint) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(point)}
      aria-label={`${point.label} — see how we can help`}
      aria-pressed={active}
      className={`group absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full hover:z-30 focus-visible:z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-dark)] focus-visible:ring-offset-2 ${
        active ? "z-30" : "z-10"
      }`}
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
    >
      {/* pulse ring */}
      <span
        className={`pointer-events-none absolute inset-0 m-auto h-7 w-7 rounded-full transition-opacity ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        }`}
        style={{ background: "radial-gradient(circle, rgba(94,51,98,0.35) 0%, rgba(94,51,98,0) 70%)" }}
      />
      {/* dot */}
      <span
        className={`relative block h-4 w-4 rounded-full border-2 border-white shadow-md transition-transform duration-200 group-hover:scale-125 group-focus-visible:scale-125 ${
          active ? "scale-125 bg-[var(--text-dark)]" : "bg-[var(--purple-medium)]"
        }`}
      />
      {/* label tooltip */}
      <span
        className={`pointer-events-none absolute left-1/2 top-9 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--text-dark)] px-2 py-1 text-[11px] font-medium text-white shadow-lg transition-all duration-150 ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        }`}
      >
        {point.label}
      </span>
    </button>
  );
}

function Figure({
  view,
  selected,
  onSelect,
}: {
  view: BodyView;
  selected: PainPoint | null;
  onSelect: (p: PainPoint) => void;
}) {
  const points = view === "front" ? FRONT_POINTS : BACK_POINTS;
  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-[9/17] w-full max-w-[250px]">
        <AnatomyFigure view={view} />
        {points.map((p) => (
          <Hotspot key={p.id} point={p} active={selected?.id === p.id} onSelect={onSelect} />
        ))}
      </div>
      <span className="mt-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
        {view === "front" ? "Front" : "Back"}
      </span>
    </div>
  );
}

function DetailPanel({ selected }: { selected: PainPoint | null }) {
  return (
    <div className="rounded-2xl bg-[#FDF1FF] p-6 shadow-sm md:p-8">
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--purple-medium)]">
              How we can help
            </p>
            <h3 className="mt-1 text-2xl font-bold text-[var(--text-dark)]">{selected.label}</h3>

            <div className="mt-4 rounded-xl bg-[var(--pink-light)] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Device we'd typically consider
              </p>
              <p className="mt-1 font-medium leading-snug text-[var(--text-dark)]">{selected.device}</p>
            </div>

            <p className="mt-4 leading-relaxed text-[var(--text-muted)]">{selected.howItHelps}</p>

            <div className="mt-5 flex items-center gap-2 text-sm text-[var(--text-dark)]">
              <Check className="h-4 w-4 flex-shrink-0 text-[var(--accent-purple)]" />
              <span>
                Covered by our <span className="font-semibold">{selected.serviceName}</span> service
              </span>
            </div>

            {relatedDevices(selected).length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Devices we might consider
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {relatedDevices(selected)
                    .slice(0, 6)
                    .map((d) => (
                      <span
                        key={d.id}
                        className="rounded-full bg-[var(--purple-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-dark)]"
                      >
                        {d.name}
                      </span>
                    ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3">
              <Button
                asChild
                className="w-full rounded-full bg-[var(--text-dark)] text-white hover:bg-[var(--text-dark)]/90"
              >
                <Link to={`${selected.serviceSlug}?part=${encodeURIComponent(POINT_TO_BODYPART[selected.id])}`}>
                  Explore {selected.serviceName}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-2 border-[var(--text-dark)] text-[var(--text-dark)]"
              >
                <Link to="/contact#book">Book an Assessment</Link>
              </Button>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-[var(--text-muted)]">
              This is a guide, not a diagnosis. Guidance is general and informed by clinical and
              manufacturer sources — the right device is always confirmed after an individual assessment.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full flex-col items-center justify-center py-8 text-center"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--purple-soft)]">
              <MapPin className="h-7 w-7 text-[var(--accent-purple)]" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-dark)]">Where does it hurt?</h3>
            <p className="mt-2 max-w-xs text-[var(--text-muted)]">
              Tap a point on the body — or pick a condition below — to see the orthotic or prosthetic
              solution we'd recommend, and the service that covers it.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BodyMap() {
  const [selected, setSelected] = useState<PainPoint | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSelect = (p: PainPoint) => {
    setSelected(p);
    // On small screens, bring the detail panel into view.
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      window.requestAnimationFrame(() => {
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  };

  return (
    <div>
      {/* Figures + detail panel */}
      <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:items-start">
        <div className="rounded-2xl bg-white/60 p-4 backdrop-blur-sm sm:p-6 md:p-8">
          <div className="mx-auto grid max-w-md grid-cols-2 gap-2 sm:max-w-none sm:gap-8">
            <Figure view="front" selected={selected} onSelect={handleSelect} />
            <Figure view="back" selected={selected} onSelect={handleSelect} />
          </div>
        </div>
        <div ref={panelRef} className="lg:sticky lg:top-24">
          <DetailPanel selected={selected} />
        </div>
      </div>

      {/* Full clickable condition list (accessible + mobile-friendly) */}
      <div className="mt-12">
        <h3 className="mb-5 text-center text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Or choose a condition
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PAIN_POINTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelect(p)}
              aria-pressed={selected?.id === p.id}
              className={`rounded-2xl px-4 py-2.5 text-sm font-medium transition-all active:scale-95 ${
                selected?.id === p.id
                  ? "bg-[var(--text-dark)] text-white shadow-md"
                  : "bg-[var(--purple-soft)] text-[var(--text-dark)] hover:bg-[var(--purple-medium)] hover:text-white"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
