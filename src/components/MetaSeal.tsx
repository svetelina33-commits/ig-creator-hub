type Size = "xs" | "sm" | "md" | "lg" | "xl";

type Props = {
  size?: Size;
  spin?: boolean;
  className?: string;
  partnerRef?: string;
  yearRoman?: string;
};

/* 4:5 portrait stamp · gold notary rosette · "AUTHORIZED PARTNER" header.
   Sister to NexusSeal but with a different posture: where NexusSeal is the
   publishing house's italic monogram, MetaSeal is the registered-firm credential. */
const dims: Record<Size, { w: number; h: number }> = {
  xs: { w: 22, h: 28 },
  sm: { w: 38, h: 48 },
  md: { w: 92, h: 116 },
  lg: { w: 156, h: 198 },
  xl: { w: 224, h: 282 },
};

export function MetaSeal({
  size = "md",
  spin = true,
  className = "",
  partnerRef = "NX-IGB-026",
  yearRoman = "MMXXVI",
}: Props) {
  const { w, h } = dims[size];
  const compact = size === "xs" || size === "sm";
  const uid = `nc-meta-seal-${size}`;

  return (
    <span
      aria-hidden
      className={`relative select-none inline-block ${className}`}
      style={{ width: w, height: h }}
    >
      <svg
        viewBox="0 0 80 100"
        width={w}
        height={h}
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        <defs>
          {/* Gold radial wash — the signature of the credential */}
          <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="62%">
            <stop offset="0%" stopColor="rgba(231, 206, 148, 0.4)" />
            <stop offset="55%" stopColor="rgba(231, 206, 148, 0.06)" />
            <stop offset="100%" stopColor="rgba(231, 206, 148, 0)" />
          </radialGradient>

          {/* Card body gradient — paper-deep top to paper-sunken bottom */}
          <linearGradient id={`${uid}-core`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(28, 25, 20, 0.95)" />
            <stop offset="100%" stopColor="rgba(9, 9, 12, 0.65)" />
          </linearGradient>

          {/* Header ribbon — sweep of gold across the AUTHORIZED bar */}
          <linearGradient id={`${uid}-ribbon`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(231, 206, 148, 0)" />
            <stop offset="50%" stopColor="rgba(231, 206, 148, 0.65)" />
            <stop offset="100%" stopColor="rgba(231, 206, 148, 0)" />
          </linearGradient>

          {/* Rosette gradient — embossed center, lighter at top-left */}
          <radialGradient id={`${uid}-rosette`} cx="40%" cy="38%" r="68%">
            <stop offset="0%" stopColor="rgba(243, 224, 178, 0.95)" />
            <stop offset="60%" stopColor="rgba(208, 155, 79, 0.9)" />
            <stop offset="100%" stopColor="rgba(160, 110, 50, 0.75)" />
          </radialGradient>

          {/* Guilloché (banknote engraving) pattern — interlocking curves */}
          <pattern
            id={`${uid}-guilloche`}
            x="0"
            y="0"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0,3 Q1.5,0.5 3,3 T6,3"
              fill="none"
              stroke="rgba(231, 206, 148, 0.09)"
              strokeWidth="0.18"
            />
            <path
              d="M0,4.5 Q1.5,2 3,4.5 T6,4.5"
              fill="none"
              stroke="rgba(231, 206, 148, 0.06)"
              strokeWidth="0.15"
            />
          </pattern>
        </defs>

        {/* Soft gold breathing glow */}
        <g
          style={{
            transformOrigin: "40px 50px",
            animation: spin ? "nc-seal-breathe 6.5s ease-in-out infinite" : undefined,
          }}
        >
          <rect x="0" y="0" width="80" height="100" fill={`url(#${uid}-glow)`} />
        </g>

        {/* Card body — outer + inner double-frame */}
        <rect
          x="3"
          y="3"
          width="74"
          height="94"
          rx="2.4"
          ry="2.4"
          fill={`url(#${uid}-core)`}
          stroke="rgba(231, 206, 148, 0.38)"
          strokeWidth="0.45"
        />
        {/* Guilloché etched into the body */}
        <rect
          x="3"
          y="3"
          width="74"
          height="94"
          rx="2.4"
          ry="2.4"
          fill={`url(#${uid}-guilloche)`}
        />
        {/* Inner frame — finer hairline */}
        <rect
          x="5.4"
          y="5.4"
          width="69.2"
          height="89.2"
          rx="1.4"
          ry="1.4"
          fill="none"
          stroke="rgba(231, 206, 148, 0.18)"
          strokeWidth="0.28"
        />

        {/* Corner serifs — the registered-firm vibe */}
        <g
          stroke="rgba(231, 206, 148, 0.78)"
          strokeWidth="0.55"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M 8 11 V 8 H 11" />
          <path d="M 69 8 H 72 V 11" />
          <path d="M 8 89 V 92 H 11" />
          <path d="M 69 92 H 72 V 89" />
        </g>

        {/* Edge midpoint ticks */}
        <g stroke="rgba(231, 206, 148, 0.5)" strokeWidth="0.4" strokeLinecap="round">
          <line x1="40" y1="1.8" x2="40" y2="4.4" />
          <line x1="40" y1="95.6" x2="40" y2="98.2" />
          <line x1="1.8" y1="50" x2="4.4" y2="50" />
          <line x1="75.6" y1="50" x2="78.2" y2="50" />
        </g>

        {compact ? (
          <CompactMark uid={uid} spin={spin} />
        ) : (
          <FullMark uid={uid} spin={spin} yearRoman={yearRoman} partnerRef={partnerRef} />
        )}

        {/* Corner shimmer dots — sequenced gold pulse */}
        <g fill="rgba(231, 206, 148, 0.85)">
          {[
            { x: 8, y: 8, delay: "0s" },
            { x: 72, y: 8, delay: "0.8s" },
            { x: 72, y: 92, delay: "1.6s" },
            { x: 8, y: 92, delay: "2.4s" },
          ].map((dot) => (
            <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r="0.6">
              {spin && (
                <animate
                  attributeName="opacity"
                  values="0.25;1;0.25"
                  dur="3.4s"
                  begin={dot.delay}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}
        </g>
      </svg>
    </span>
  );
}

/* ───── Full layout (md / lg / xl) ─────
   Header AUTHORIZED ribbon · italic META · gold rosette punch ·
   APP REVIEW · Roman year · partner reference. */
function FullMark({
  uid,
  spin,
  yearRoman,
  partnerRef,
}: {
  uid: string;
  spin: boolean;
  yearRoman: string;
  partnerRef: string;
}) {
  return (
    <>
      {/* AUTHORIZED — top ribbon */}
      <rect x="9" y="11" width="62" height="6" fill={`url(#${uid}-ribbon)`} opacity="0.45" />
      <text
        x="40"
        y="15.4"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="3.4"
        fontWeight="600"
        letterSpacing="2.4"
        fill="rgba(243, 224, 178, 0.96)"
        style={{ textTransform: "uppercase" }}
      >
        Authorized
      </text>

      {/* INSTAGRAM GRAPH API · narrow caption under the ribbon */}
      <text
        x="40"
        y="22.6"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="2.2"
        letterSpacing="1.4"
        fill="rgba(208, 155, 79, 0.7)"
        style={{ textTransform: "uppercase" }}
      >
        Instagram · Graph · Api
      </text>

      {/* Notary rosette — concentric rings + radial petals + center punch.
          The whole thing reads as an embossed wax stamp. */}
      <g style={{ transformOrigin: "40px 49px" }}>
        {/* outermost ring */}
        <circle
          cx="40"
          cy="49"
          r="13.5"
          fill="none"
          stroke="rgba(231, 206, 148, 0.45)"
          strokeWidth="0.4"
        />
        {/* dotted ring (notary punch perimeter) */}
        <circle
          cx="40"
          cy="49"
          r="11.8"
          fill="none"
          stroke="rgba(231, 206, 148, 0.65)"
          strokeWidth="0.35"
          strokeDasharray="0.6 0.9"
        />
        {/* Radial petal lines — 16 spokes, classical heraldic device */}
        <g stroke="rgba(231, 206, 148, 0.5)" strokeWidth="0.3" strokeLinecap="round">
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i * 360) / 16;
            const rad = (a * Math.PI) / 180;
            const x1 = 40 + Math.cos(rad) * 7;
            const y1 = 49 + Math.sin(rad) * 7;
            const x2 = 40 + Math.cos(rad) * 10.6;
            const y2 = 49 + Math.sin(rad) * 10.6;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
        {/* Inner ring */}
        <circle
          cx="40"
          cy="49"
          r="6.6"
          fill="none"
          stroke="rgba(231, 206, 148, 0.55)"
          strokeWidth="0.42"
        />
        {/* Embossed gold core */}
        <circle cx="40" cy="49" r="5.4" fill={`url(#${uid}-rosette)`} />
        {/* italic M monogram — center punch (Cormorant) */}
        <text
          x="40"
          y="51.6"
          textAnchor="middle"
          fontFamily='var(--font-italic), ui-serif, "Iowan Old Style", Georgia, serif'
          fontStyle="italic"
          fontWeight="500"
          fontSize="6.2"
          fill="rgba(28, 22, 12, 0.85)"
        >
          M
        </text>
        {/* Tiny pulsing star at upper-right — the credential is alive */}
        <circle cx="46.2" cy="42.8" r="0.7" fill="rgba(243, 224, 178, 0.95)">
          {spin && (
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="2.6s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>

      {/* PARTNER · REGISTER */}
      <text
        x="40"
        y="71"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="2.5"
        letterSpacing="1.5"
        fill="rgba(215, 212, 226, 0.78)"
        style={{ textTransform: "uppercase" }}
      >
        Partner · Register
      </text>

      {/* Hairline divider with gold dot */}
      <g>
        <line
          x1="20"
          y1="76"
          x2="38"
          y2="76"
          stroke="rgba(231, 206, 148, 0.28)"
          strokeWidth="0.22"
        />
        <circle cx="40" cy="76" r="0.55" fill="rgba(231, 206, 148, 0.7)" />
        <line
          x1="42"
          y1="76"
          x2="60"
          y2="76"
          stroke="rgba(231, 206, 148, 0.28)"
          strokeWidth="0.22"
        />
      </g>

      {/* Roman year */}
      <text
        x="40"
        y="82"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="2.4"
        letterSpacing="1.2"
        fill="rgba(147, 144, 159, 0.85)"
        style={{ textTransform: "uppercase" }}
      >
        {yearRoman}
      </text>

      {/* Partner reference — the document number */}
      <text
        x="40"
        y="89.2"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="2.7"
        fontWeight="600"
        letterSpacing="0.5"
        fill="rgba(231, 206, 148, 0.92)"
      >
        № {partnerRef}
      </text>
    </>
  );
}

/* ───── Compact (xs / sm) — just the rosette mark, slightly enlarged.
   Used in the masthead pill and footer stamp where text would be illegible. */
function CompactMark({ uid, spin }: { uid: string; spin: boolean }) {
  return (
    <g style={{ transformOrigin: "40px 50px" }}>
      <circle
        cx="40"
        cy="50"
        r="22"
        fill="none"
        stroke="rgba(231, 206, 148, 0.42)"
        strokeWidth="0.7"
      />
      <circle
        cx="40"
        cy="50"
        r="18"
        fill="none"
        stroke="rgba(231, 206, 148, 0.6)"
        strokeWidth="0.55"
        strokeDasharray="1.2 1.6"
      />
      <g stroke="rgba(231, 206, 148, 0.5)" strokeWidth="0.42" strokeLinecap="round">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 360) / 12;
          const rad = (a * Math.PI) / 180;
          const x1 = 40 + Math.cos(rad) * 11;
          const y1 = 50 + Math.sin(rad) * 11;
          const x2 = 40 + Math.cos(rad) * 16;
          const y2 = 50 + Math.sin(rad) * 16;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      <circle cx="40" cy="50" r="9" fill={`url(#${uid}-rosette)`} />
      <text
        x="40"
        y="54"
        textAnchor="middle"
        fontFamily='var(--font-italic), ui-serif, Georgia, serif'
        fontStyle="italic"
        fontSize="11"
        fontWeight="500"
        fill="rgba(28, 22, 12, 0.85)"
      >
        M
      </text>
      <circle cx="49.5" cy="40.5" r="1.1" fill="rgba(243, 224, 178, 0.95)">
        {spin && (
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="2.6s"
            repeatCount="indefinite"
          />
        )}
      </circle>
    </g>
  );
}
