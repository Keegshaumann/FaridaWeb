import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { COMPRESSION_LENGTHS } from "./compression-data";
import { LegDiagram } from "./LegDiagram";

// Lets a patient see exactly where each compression length stops on the leg,
// the question that decides between a BK (AD) and an AK (AG) stocking.
export function CompressionLengthSelector() {
  const [active, setActive] = useState(0); // AD / below-knee: the length most often fitted
  const len = COMPRESSION_LENGTHS[active];

  return (
    <div>
      {/* Length picker */}
      <div className="flex flex-wrap gap-2.5">
        {COMPRESSION_LENGTHS.map((l, i) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            aria-label={`${l.code}: ${l.name}`}
            className={`flex items-baseline gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all active:scale-95 ${
              i === active
                ? "bg-[var(--comp-plum)] text-white shadow-md"
                : "bg-white text-[var(--comp-plum)] ring-1 ring-[var(--comp-lilac)]/40 hover:bg-[var(--comp-mist)]"
            }`}
          >
            <span className="font-bold tracking-wide">{l.code}</span>
            <span className={i === active ? "text-white/80" : "text-[var(--comp-violet)]"}>
              {l.alias ? `${l.alias} · ${shortName(l.name)}` : shortName(l.name)}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid items-start gap-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-12">
        {/* Leg diagram */}
        <div className="mx-auto w-[168px] md:mx-0 md:w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={len.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <LegDiagram
                coverTop={len.coverTop}
                waistband={len.waistband}
                className="h-auto w-full"
                label={`Leg diagram showing the coverage of a ${len.name} (${len.code})`}
              />
            </motion.div>
          </AnimatePresence>
          <p className="mt-3 text-center text-xs text-[var(--comp-violet)] md:text-left">
            Compression is always strongest at the ankle
          </p>
        </div>

        {/* Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={len.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--comp-violet)]">
              Length {len.code}
              {len.alias ? ` · known locally as ${len.alias}` : ""}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-[var(--comp-plum)] md:text-3xl">{len.name}</h3>
            <p className="mt-2 text-lg font-medium text-[var(--comp-violet)]">{len.coverage}</p>
            <p className="mt-4 leading-relaxed text-[var(--text-muted)]">{len.detail}</p>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--comp-violet)]">
              Best suited to
            </p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {len.bestFor.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-purple)]" />
                  <span className="text-sm leading-relaxed text-[var(--text-muted)]">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-8 rounded-2xl bg-white/70 p-5 text-sm leading-relaxed text-[var(--text-muted)] ring-1 ring-[var(--comp-lilac)]/25">
        <span className="font-semibold text-[var(--comp-plum)]">Open toe or closed toe?</span> Every
        lower-limb compression length above is available with either. A closed toe is warmer and more
        cosmetic; an open toe suits long feet, sore toes, arthritic toes, or anyone using a slide-on
        application aid. Both are fitted from the same leg measurements.
      </p>
    </div>
  );
}

// The chips carry the code, so the name only needs its distinguishing part.
function shortName(name: string) {
  return name
    .replace(" Compression Stocking", "")
    .replace("Compression ", "")
    .replace(" with Waist Attachment", " + waist")
    .replace("Single-Leg", "Single leg");
}
