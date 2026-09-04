import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  ClipboardList,
  Gauge,
  HeartPulse,
  Home,
  Layers,
  Ruler,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { FaqSection, faqPageSchema } from "@/app/components/FaqSection";
import { SEO } from "../../components/SEO";
import { LegDiagram } from "../../components/compression/LegDiagram";
import { CompressionClassSelector } from "../../components/compression/CompressionClassSelector";
import { CompressionLengthSelector } from "../../components/compression/CompressionLengthSelector";
import {
  COMPRESSION_CARE,
  COMPRESSION_CONDITIONS,
  COMPRESSION_FAQS,
  COMPRESSION_JOURNEY,
  KNIT_TYPES,
  OTHER_COMPRESSION,
} from "../../components/compression/compression-data";

// Compression is a specialism in its own right at this practice, so this page
// deliberately steps away from the shared ServicePageTemplate: same brand hue,
// inverted weighting (dark plum instead of pale pink) and a compression-specific
// layout built around the pressure gradient.

const SPEC_BAR = [
  { icon: Gauge, label: "4 compression classes", value: "Class A · 1 · 2 · 3" },
  { icon: Ruler, label: "6 compression lengths", value: "Below-knee to pantyhose" },
  { icon: Layers, label: "Two knit constructions", value: "Circular-knit & flat-knit" },
  { icon: Home, label: "Fitted where you are", value: "Practice, home or bedside" },
];

const WHY_SPECIALIST = [
  {
    icon: Stethoscope,
    title: "Compression is prescribed, not picked",
    body: "Class, length, knit and stiffness are four separate clinical decisions. Getting one wrong is the difference between a garment that controls your swelling and a garment that lives in a drawer.",
  },
  {
    icon: Ruler,
    title: "Measured on the leg, in the morning",
    body: "Every compression garment we dispense is built from measurements taken at each landmark the garment is knitted to, before the leg has had the day to swell.",
  },
  {
    icon: ShieldCheck,
    title: "Screened before anything is fitted",
    body: "Arterial supply, skin integrity and sensation are checked first. Compression is powerful treatment, and it is not safe for every leg. Screening for that is part of the fitting.",
  },
  {
    icon: HeartPulse,
    title: "Reviewed, remeasured, replaced",
    body: "Legs change as swelling settles and fabric loses pressure at around six months. Compression is managed as ongoing care, not a once-off purchase.",
  },
];

export function CompressionPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        name: "Medical Compression Specialists",
        description:
          "Specialist medical compression therapy in South Africa: graduated compression stockings, compression pantyhose and made-to-measure compression garments in compression class A to class 3.",
        url: "https://www.cajeebotes.com/services/compression",
        about: {
          "@type": "MedicalTherapy",
          name: "Compression therapy",
          alternateName: [
            "Medical compression",
            "Graduated compression therapy",
            "Compression stockings",
          ],
        },
      },
      {
        "@type": "Service",
        serviceType: "Medical compression therapy",
        name: "Medical Compression Garments & Compression Stockings",
        provider: {
          "@type": "MedicalBusiness",
          name: "Farida Cajee-Botes Orthotist Prosthetist",
          url: "https://www.cajeebotes.com",
        },
        areaServed: ["Centurion", "Pretoria", "Midrand", "Johannesburg", "Gauteng", "South Africa"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Lower-limb compression garments",
          itemListElement: [
            "Below-knee compression stockings (AD)",
            "Above-knee compression stockings (AF)",
            "Thigh-high compression stockings (AG)",
            "Compression pantyhose and tights (AT)",
            "Maternity compression tights",
            "Flat-knit made-to-measure compression garments",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Product", name, category: "Medical compression garment" },
          })),
        },
      },
      faqPageSchema(COMPRESSION_FAQS),
    ],
  };

  return (
    <>
      <SEO
        fullTitle="Medical Compression Garments & Stockings | Sandton"
        title="Medical Compression Specialists"
        description="Graduated compression stockings and made-to-measure garments, class A to 3, measured and fitted by an orthotist in Sandton or at your home."
        keywords="medical compression, compression specialist South Africa, compression stockings, graduated compression, compression therapy, compression garments, compression class 1 2 3, below knee compression stockings, thigh high compression stockings, compression pantyhose, compression tights, lymphoedema compression, varicose veins compression stockings, flat knit compression, compression fitting Morningside, compression stockings Sandton, compression fitting Centurion, compression stockings Pretoria, compression stockings Gauteng"
        schema={faqSchema}
      />

      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--comp-ink)] pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Pressure-gradient wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            background:
              "radial-gradient(90rem 45rem at 78% 8%, rgba(184,145,181,0.30), transparent 62%), radial-gradient(60rem 40rem at 0% 100%, rgba(139,90,142,0.35), transparent 60%)",
          }}
        />
        {/* Knit-line texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, rgba(245,232,243,0.9) 0px, rgba(245,232,243,0.9) 1px, transparent 1px, transparent 9px)",
          }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--comp-lilac)]">
                <Sparkles className="h-3.5 w-3.5" />
                Lower-limb compression clinic
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-[1.08] text-white md:text-5xl lg:text-6xl">
                Medical Compression{" "}
                <span className="block text-[var(--comp-lilac)]">Garments and Stockings</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
                Graduated compression stockings, compression pantyhose and made-to-measure
                compression garments: measured, prescribed and fitted by a qualified orthotist.
                Compression class A through class 3, below-knee (BK) through to pantyhose.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact#book">
                  <Button
                    size="lg"
                    className="h-12 w-full rounded-full bg-[var(--comp-shell)] px-8 text-[var(--comp-plum)] shadow-lg hover:bg-white sm:w-auto"
                  >
                    Book a Compression Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href="#compression-classes">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 w-full rounded-full border-2 border-white/30 bg-transparent px-8 text-white hover:bg-white/10 hover:text-white sm:w-auto"
                  >
                    Compare Compression Classes
                  </Button>
                </a>
              </div>

              <p className="mt-7 text-sm text-white/45">
                Compression assessments at the Morningside rooms, at home, or at the hospital
                bedside across Gauteng.
              </p>
            </div>

            {/* Graduated pressure diagram */}
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm md:p-9">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--comp-lilac)]">
                  Graduated compression profile
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="mt-4"
                >
                  <LegDiagram
                    coverTop={1}
                    showScale
                    onDark
                    className="mx-auto h-auto w-full max-w-[320px]"
                    label="Diagram of a leg in a compression stocking, showing 100% pressure at the ankle, 70% at the calf and 40% at the thigh"
                  />
                </motion.div>
                <p className="mt-4 text-center text-sm leading-relaxed text-white/60">
                  Pressure is highest at the ankle and eases up the leg. That gradient is what moves
                  fluid in the right direction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────── Spec bar ─────────────────────── */}
      <section className="relative border-y border-white/10 bg-[var(--comp-ink-2)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {SPEC_BAR.map((s) => (
              <div key={s.label} className="flex items-center gap-4 px-2 py-6 lg:px-7">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.07]">
                  <s.icon className="h-5 w-5 text-[var(--comp-lilac)]" />
                </span>
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                    {s.label}
                  </span>
                  <span className="mt-0.5 block font-semibold text-white">{s.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Why a compression specialist ───────────── */}
      <section className="relative bg-[var(--comp-shell)] py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--comp-violet)]">
              A compression practice, not a compression shelf
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[var(--comp-plum)] md:text-4xl">
              Compression works when it is measured, prescribed and reviewed
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--text-muted)]">
              A compression garment is a medical device with a dose. The right compression, in the
              right class, in the right length, worn every day, changes how a leg looks and feels;
              the wrong one does nothing at all, and can do harm.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
            {WHY_SPECIALIST.map((w) => (
              <div
                key={w.title}
                className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-[var(--comp-lilac)]/20 transition-shadow hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--comp-mist)]">
                  <w.icon className="h-6 w-6 text-[var(--comp-violet)]" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-[var(--comp-plum)]">{w.title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── How graduated compression works ─────────── */}
      <section className="relative bg-[var(--comp-mist)] py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[220px_minmax(0,1fr)] md:gap-16">
            <div className="mx-auto w-[190px] md:w-full">
              <LegDiagram
                coverTop={1}
                showScale
                className="h-auto w-full"
                label="Graduated compression profile: 100% pressure at the ankle, 70% at the calf, 40% at the thigh"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--comp-violet)]">
                The principle
              </p>
              <h2 className="mt-4 text-3xl font-bold text-[var(--comp-plum)] md:text-4xl">
                How graduated compression actually works
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-[var(--text-muted)]">
                <p>
                  Blood has to travel from your feet back up to your heart against gravity. It is
                  pushed there by the calf muscle pump and held in place by a series of one-way
                  valves. When those valves leak or the pump is not working, blood and fluid pool in
                  the lower leg, and that is where the aching, heaviness and swelling come from.
                </p>
                <p>
                  A graduated compression garment applies its strongest pressure at the ankle and
                  progressively less as it moves up the leg. That falling gradient narrows the veins,
                  helps the valves close properly and gives the calf muscle something firm to work
                  against, so each step pushes fluid upwards instead of letting it settle.
                </p>
                <p>
                  This is also why compression is measured in millimetres of mercury (mmHg) at the
                  ankle, and why compression is worn from the moment you get up. Putting a garment on
                  a leg that has already swollen is treating the problem after it has happened.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { pct: "100%", label: "at the ankle" },
                  { pct: "≈70%", label: "at the calf" },
                  { pct: "≈40%", label: "at the thigh" },
                ].map((p) => (
                  <div
                    key={p.pct}
                    className="rounded-2xl bg-white/80 px-5 py-4 ring-1 ring-[var(--comp-lilac)]/25"
                  >
                    <p className="text-2xl font-bold tabular-nums text-[var(--comp-plum)]">{p.pct}</p>
                    <p className="mt-0.5 text-sm text-[var(--comp-violet)]">{p.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Compression classes ─────────────── */}
      <section
        id="compression-classes"
        className="relative scroll-mt-20 overflow-hidden bg-[var(--comp-ink)] py-16 md:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            background:
              "radial-gradient(70rem 40rem at 20% 0%, rgba(139,90,142,0.40), transparent 60%), radial-gradient(60rem 40rem at 100% 100%, rgba(184,145,181,0.25), transparent 60%)",
          }}
        />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--comp-lilac)]">
              Compression classes
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Class A to Class 3: what each level of compression is for
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">
              Compression strength is described in classes, and each class is a defined pressure range
              measured at the ankle. Select a class to see what it feels like and what it is
              prescribed for.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl">
            <CompressionClassSelector />
          </div>
        </div>
      </section>

      {/* ──────────── Lengths: BK, AK, pantyhose ──────────── */}
      <section className="relative bg-[var(--comp-shell)] py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--comp-violet)]">
              Compression lengths & styles
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[var(--comp-plum)] md:text-4xl">
              Below-knee, above-knee, thigh-high or pantyhose
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--text-muted)]">
              The rule is simple: the compression garment has to cover everything that swells. Choose
              a length to see exactly where it stops on the leg.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl">
            <CompressionLengthSelector />
          </div>
        </div>
      </section>

      {/* ──────────── Circular-knit vs flat-knit ──────────── */}
      <section className="relative bg-[var(--comp-mist)] py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--comp-violet)]">
              Compression construction
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[var(--comp-plum)] md:text-4xl">
              Circular-knit or flat-knit compression?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--text-muted)]">
              Two compression garments can carry the same class and behave completely differently.
              How the fabric is knitted decides how it holds a limb, and it is the decision most
              often got wrong.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {KNIT_TYPES.map((k, i) => (
              <div
                key={k.name}
                className={`rounded-3xl p-8 shadow-sm ring-1 ${
                  i === 0
                    ? "bg-white ring-[var(--comp-lilac)]/25"
                    : "bg-[var(--comp-plum)] ring-[var(--comp-plum)]"
                }`}
              >
                <h3
                  className={`text-2xl font-bold ${i === 0 ? "text-[var(--comp-plum)]" : "text-white"}`}
                >
                  {k.name}
                </h3>
                <p
                  className={`mt-2 font-medium ${
                    i === 0 ? "text-[var(--comp-violet)]" : "text-[var(--comp-class-a)]"
                  }`}
                >
                  {k.strapline}
                </p>
                <ul className="mt-6 space-y-3">
                  {k.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <Check
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                          i === 0 ? "text-[var(--accent-purple)]" : "text-[var(--comp-class-a)]"
                        }`}
                      />
                      <span
                        className={`leading-relaxed ${
                          i === 0 ? "text-[var(--text-muted)]" : "text-white/85"
                        }`}
                      >
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── Conditions treated with compression ──────────── */}
      <section className="relative bg-[var(--comp-shell)] py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--comp-violet)]">
              Compression indications
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[var(--comp-plum)] md:text-4xl">
              Conditions we manage with compression
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMPRESSION_CONDITIONS.map((c) => (
              <div
                key={c.name}
                className="group rounded-2xl bg-white p-5 ring-1 ring-[var(--comp-lilac)]/20 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--comp-violet)] transition-transform group-hover:scale-150" />
                  <div>
                    <p className="font-semibold text-[var(--comp-plum)]">{c.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{c.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-[var(--text-muted)]">
            Not sure whether compression is the right treatment for your leg? Have a look at the{" "}
            <Link to="/conditions" className="font-medium text-[var(--comp-plum)] underline underline-offset-4">
              conditions we treat
            </Link>{" "}
            or book an assessment and we will tell you honestly.
          </p>
        </div>
      </section>

      {/* ──────────── The compression fitting journey ──────────── */}
      <section className="relative overflow-hidden bg-[var(--comp-ink-2)] py-16 md:py-24">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--comp-lilac)]">
              What to expect
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Your compression fitting, step by step
            </h2>
          </div>

          <ol className="mx-auto mt-14 max-w-3xl">
            {COMPRESSION_JOURNEY.map((j, i) => (
              <li key={j.step} className="relative flex gap-6 pb-10 last:pb-0">
                {/* Connector rail */}
                {i < COMPRESSION_JOURNEY.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[27px] top-14 bottom-0 w-px bg-gradient-to-b from-[var(--comp-lilac)]/60 to-[var(--comp-lilac)]/5"
                  />
                )}
                <span className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-[var(--comp-ink)] text-sm font-bold tabular-nums text-[var(--comp-lilac)]">
                  {j.step}
                </span>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold text-white">{j.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-white/70">{j.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ──────────── Care + other compression ──────────── */}
      <section className="relative bg-[var(--comp-shell)] py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            {/* Care & wear */}
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[var(--comp-lilac)]/20">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--comp-mist)]">
                <ClipboardList className="h-6 w-6 text-[var(--comp-violet)]" />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-[var(--comp-plum)] md:text-3xl">
                Living with your compression garment
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
                Compression only works on the days it is worn. These are the habits that keep a
                garment comfortable, effective and lasting its full life.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {COMPRESSION_CARE.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-purple)]" />
                    <span className="text-sm leading-relaxed text-[var(--text-muted)]">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other compression: deliberately a small block */}
            <div className="rounded-3xl border-2 border-dashed border-[var(--comp-lilac)]/50 bg-[var(--comp-mist)]/60 p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--comp-violet)]">
                Beyond the lower limb
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[var(--comp-plum)]">
                Other compression available on request
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                Our focus is lower-limb compression, but upper-limb and body compression garments are
                measured and ordered on request.
              </p>
              <ul className="mt-6 space-y-3">
                {OTHER_COMPRESSION.map((o) => (
                  <li key={o.name} className="flex items-center gap-3">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-[var(--comp-lilac)]/25">
                      <img
                        src={o.image}
                        alt={o.name}
                        loading="lazy"
                        className="h-full w-full object-contain p-1.5"
                      />
                    </span>
                    <span className="text-sm font-medium text-[var(--comp-plum)]">{o.name}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--comp-plum)] underline underline-offset-4"
              >
                Ask about a compression garment
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        faqs={COMPRESSION_FAQS}
        eyebrow="Compression questions"
        heading="Compression, answered"
        theme={{
          section: "bg-[var(--comp-mist)]",
          eyebrow: "text-[var(--comp-violet)]",
          heading: "text-[var(--comp-plum)]",
          question: "text-[var(--comp-plum)]",
          answer: "text-[var(--text-muted)]",
          divider: "border-[var(--comp-lilac)]/30",
        }}
      />

      {/* ──────────────────────── CTA ──────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--comp-ink)] py-16 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(60rem 34rem at 50% 0%, rgba(139,90,142,0.45), transparent 65%)",
          }}
        />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Get your compression measured properly
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Bring your referral, your current compression garment, or just the leg that is
              bothering you. We will measure, explain the class and length you need, and quote before
              anything is ordered.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/contact#book">
                <Button
                  size="lg"
                  className="h-12 w-full rounded-full bg-[var(--comp-shell)] px-8 text-[var(--comp-plum)] shadow-lg hover:bg-white sm:w-auto"
                >
                  Book a Compression Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:0646520684">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-full border-2 border-white/30 bg-transparent px-8 text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  Call 064 652 0684
                </Button>
              </a>
            </div>
            <p className="mt-7 text-sm text-white/45">
              Compression fitting at our Morningside rooms, or at your home or hospital bed across
              Pretoria, Midrand, Johannesburg and greater Gauteng.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
