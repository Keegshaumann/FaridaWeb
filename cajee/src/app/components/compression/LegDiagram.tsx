// Stylised lower-limb diagram used across the compression pages.
//
// One shape does two jobs: it shows how far up the leg a given compression
// length reaches (AD / AF / AG / AT), and it shows the graduated pressure
// profile: strongest at the ankle, easing as it travels up the leg.

interface LegDiagramProps {
  /** How much of the leg the garment covers, measured from the foot up (0–1). */
  coverTop?: number;
  /** Draws a waistband above the leg, for pantyhose and waist-attached lengths. */
  waistband?: boolean;
  /** Shows the 100% / 70% / 40% graduated-pressure callouts. */
  showScale?: boolean;
  /** Tints the diagram for a dark background. */
  onDark?: boolean;
  className?: string;
  label?: string;
}

const LEG_TOP = 26;
const LEG_BOTTOM = 500;

const LEG_PATH =
  "M 138 26 Q 134 90 130 152 Q 126 210 120 262 Q 116 308 114 354 Q 111 402 108 444 " +
  "Q 108 463 121 471 L 163 477 Q 178 479 178 489 Q 178 499 163 499 L 97 499 " +
  "Q 83 499 83 486 L 83 444 Q 79 412 71 372 Q 61 340 61 312 Q 62 276 76 256 " +
  "Q 62 210 56 142 Q 53 56 66 26 Z";

export function LegDiagram({
  coverTop = 1,
  waistband = false,
  showScale = false,
  onDark = false,
  className = "",
  label = "Diagram of a leg showing how far a compression garment reaches",
}: LegDiagramProps) {
  const coverY = LEG_BOTTOM - Math.max(0, Math.min(1, coverTop)) * (LEG_BOTTOM - LEG_TOP);
  const outline = onDark ? "rgba(245,232,243,0.55)" : "var(--comp-violet)";
  const skin = onDark ? "rgba(245,232,243,0.10)" : "rgba(94,51,98,0.06)";
  const scaleText = onDark ? "rgba(245,232,243,0.92)" : "var(--comp-plum)";
  const scaleLine = onDark ? "rgba(245,232,243,0.35)" : "rgba(94,51,98,0.25)";

  // Unique-per-instance ids so several diagrams can share a page safely.
  const uid = `leg-${coverTop}-${waistband ? "w" : "n"}-${onDark ? "d" : "l"}`;

  return (
    <svg
      viewBox={showScale ? "0 0 268 520" : "0 0 200 520"}
      className={className}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Strongest pressure at the ankle, easing as it climbs the leg. */}
        <linearGradient id={`${uid}-grad`} gradientUnits="userSpaceOnUse" x1="0" y1="480" x2="0" y2="30">
          <stop offset="0%" stopColor="var(--comp-class-3)" />
          <stop offset="35%" stopColor="var(--comp-class-2)" />
          <stop offset="70%" stopColor="var(--comp-class-1)" />
          <stop offset="100%" stopColor="var(--comp-class-a)" />
        </linearGradient>

        <clipPath id={`${uid}-clip`}>
          <path d={LEG_PATH} />
        </clipPath>

        {/* Fine horizontal lines read as knitted compression fabric. */}
        <pattern id={`${uid}-knit`} width="8" height="7" patternUnits="userSpaceOnUse">
          <line x1="0" y1="6.5" x2="8" y2="6.5" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="1.4" />
        </pattern>
      </defs>

      {waistband && (
        <>
          <rect x="46" y="2" width="110" height="20" rx="8" fill="var(--comp-class-a)" />
          <rect x="46" y="2" width="110" height="20" rx="8" fill={`url(#${uid}-knit)`} />
          <rect
            x="46"
            y="2"
            width="110"
            height="20"
            rx="8"
            fill="none"
            stroke={outline}
            strokeWidth="1.6"
          />
        </>
      )}

      {/* Bare leg */}
      <path d={LEG_PATH} fill={skin} />

      {/* Compression coverage, clipped to the leg */}
      <g clipPath={`url(#${uid}-clip)`}>
        <rect x="30" y={coverY} width="170" height={LEG_BOTTOM + 20 - coverY} fill={`url(#${uid}-grad)`} />
        <rect x="30" y={coverY} width="170" height={LEG_BOTTOM + 20 - coverY} fill={`url(#${uid}-knit)`} />
      </g>

      {/* Leg outline sits above everything so the silhouette stays crisp */}
      <path d={LEG_PATH} fill="none" stroke={outline} strokeWidth="2" strokeLinejoin="round" />

      {/* Top edge of the garment, trimmed to the leg */}
      {coverTop < 1 && (
        <g clipPath={`url(#${uid}-clip)`}>
          <line
            x1="40"
            y1={coverY}
            x2="160"
            y2={coverY}
            stroke={onDark ? "#F5E8F3" : "var(--comp-plum)"}
            strokeWidth="3"
          />
        </g>
      )}

      {showScale && (
        <g fontFamily="inherit">
          {[
            { y: 444, pct: "100%", note: "ankle" },
            { y: 330, pct: "70%", note: "calf" },
            { y: 140, pct: "40%", note: "thigh" },
          ].map((m) => (
            <g key={m.pct}>
              <line x1="140" y1={m.y} x2="176" y2={m.y} stroke={scaleLine} strokeWidth="1.5" />
              <circle cx="140" cy={m.y} r="3" fill={scaleText} />
              <text x="182" y={m.y - 2} fill={scaleText} fontSize="15" fontWeight="700">
                {m.pct}
              </text>
              <text x="182" y={m.y + 13} fill={scaleText} fontSize="11" opacity="0.75">
                {m.note}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
