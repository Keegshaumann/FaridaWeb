import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { COMPRESSION_CLASSES } from "./compression-data";

// The centrepiece of the compression page: a pressure rail that lets a patient
// step from Class A through to Class 3 and see, in one place, what the class
// means in mmHg, what it feels like, and what it is prescribed for.
export function CompressionClassSelector() {
  const [active, setActive] = useState(2); // Class 2: the most commonly prescribed
  const cls = COMPRESSION_CLASSES[active];

  return (
    <div>
      {/* Pressure rail */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {COMPRESSION_CLASSES.map((c, i) => {
          const selected = i === active;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={selected}
              // The stacked spans have no whitespace between them, so spell the
              // chip out for screen readers.
              aria-label={`${c.label}: ${c.strength}, ${c.mmHg} mmHg`}
              className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 active:scale-[0.98] ${
                selected
                  ? "border-[var(--comp-lilac)] bg-white/[0.09] shadow-[0_0_0_1px_rgba(184,145,181,0.4)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
              }`}
            >
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--comp-lilac)]">
                {c.tier}
              </span>
              <span className="mt-1 block text-lg font-bold text-white">{c.label}</span>
              <span className="mt-0.5 block text-sm tabular-nums text-white/60">{c.mmHg} mmHg</span>

              {/* Pressure bar: grows with the class */}
              <span className="mt-3 block h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.span
                  className="block h-full rounded-full"
                  style={{ background: c.colour }}
                  initial={false}
                  animate={{ width: `${c.intensity * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.05] p-6 md:p-9">
        <AnimatePresence mode="wait">
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--comp-lilac)]">
                {cls.label} · {cls.strength}
              </p>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="text-5xl font-bold tabular-nums text-white md:text-6xl">{cls.mmHg}</span>
                <span className="text-xl font-semibold text-white/60">mmHg</span>
              </p>
              <p className="mt-1 text-sm text-white/50">Measured at the ankle, where compression is highest</p>

              <p className="mt-6 leading-relaxed text-white/80">{cls.summary}</p>

              <div className="mt-6 rounded-2xl border-l-2 border-[var(--comp-lilac)] bg-white/[0.04] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--comp-lilac)]">
                  How it feels
                </p>
                <p className="mt-2 leading-relaxed text-white/80">{cls.feel}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--comp-lilac)]">
                Typically prescribed for
              </p>
              <ul className="mt-4 space-y-3">
                {cls.indications.map((ind) => (
                  <li key={ind} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ background: cls.colour }}
                    >
                      <Check className="h-3 w-3 text-[var(--comp-ink)]" strokeWidth={3} />
                    </span>
                    <span className="leading-relaxed text-white/85">{ind}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-white/45">
        Classes follow the European RAL standard used by the compression garments dispensed in South
        Africa, and the pressure quoted is always the pressure at the ankle. Class 4 compression (over
        49&nbsp;mmHg) and clinician-applied multi-layer compression bandaging are available on request.
        Your compression class is confirmed at assessment, never chosen from a shelf.
      </p>
    </div>
  );
}
