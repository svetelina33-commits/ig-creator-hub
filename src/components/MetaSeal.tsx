type Size = "xs" | "sm" | "md" | "lg";

type Props = {
  size?: Size;
  spin?: boolean;
  className?: string;
  partnerRef?: string;
  dateRoman?: string;
};

/* 4:5 portrait stamp — sister to NexusSeal's 5:4 landscape nameplate.
   Forest-cyan accent reads as "approved / live"; violet stays reserved
   for the publisher's own monogram. */
const dims: Record<Size, { w: number; h: number }> = {
  xs: { w: 22, h: 28 },
  sm: { w: 36, h: 46 },
  md: { w: 84, h: 108 },
  lg: { w: 144, h: 184 },
};

export function MetaSeal({
  size = "md",
  spin = true,
  className = "",
  partnerRef = "NX-IGB-026",
  dateRoman = "MMXXVI",
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
          <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="62%">
            <stop offset="0%" stopColor="rgba(95, 225, 214, 0.42)" />
            <stop offset="55%" stopColor="rgba(95, 225, 214, 0.06)" />
            <stop offset="100%" stopColor="rgba(95, 225, 214, 0)" />
          </radialGradient>
          <linearGradient id={`${uid}-core`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(27, 27, 36, 0.95)" />
            <stop offset="100%" stopColor="rgba(9, 9, 12, 0.6)" />
          </linearGradient>
          <linearGradient id={`${uid}-ribbon`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(95, 225, 214, 0)" />
            <stop offset="50%" stopColor="rgba(95, 225, 214, 0.55)" />
            <stop offset="100%" stopColor="rgba(95, 225, 214, 0)" />
          </linearGradient>
        </defs>

        {/* Breathing glow */}
        <g
          style={{
            transformOrigin: "40px 50px",
            animation: spin ? "nc-seal-breathe 6.5s ease-in-out infinite" : undefined,
          }}
        >
          <rect x="0" y="0" width="80" height="100" fill={`url(#${uid}-glow)`} />
        </g>

        {/* Outer frame — double hairline rectangle */}
        <rect
          x="3"
          y="3"
          width="74"
          height="94"
          rx="3"
          ry="3"
          fill={`url(#${uid}-core)`}
          stroke="rgba(240, 238, 246, 0.32)"
          strokeWidth="0.4"
        />
        <rect
          x="5.5"
          y="5.5"
          width="69"
          height="89"
          rx="1.8"
          ry="1.8"
          fill="none"
          stroke="rgba(240, 238, 246, 0.12)"
          strokeWidth="0.25"
        />

        {/* Corner L-brackets — forest cyan signals approval */}
        <g
          stroke="rgba(95, 225, 214, 0.62)"
          strokeWidth="0.5"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M 7 11 V 7 H 11" />
          <path d="M 69 7 H 73 V 11" />
          <path d="M 7 89 V 93 H 11" />
          <path d="M 69 93 H 73 V 89" />
        </g>

        {/* Edge midpoint ticks */}
        <g stroke="rgba(240, 238, 246, 0.42)" strokeWidth="0.4" strokeLinecap="round">
          <line x1="40" y1="1.5" x2="40" y2="4" />
          <line x1="40" y1="96" x2="40" y2="98.5" />
          <line x1="1.5" y1="50" x2="4" y2="50" />
          <line x1="76" y1="50" x2="78.5" y2="50" />
        </g>

        {compact ? (
          <CompactMark uid={uid} spin={spin} />
        ) : (
          <FullMark uid={uid} spin={spin} dateRoman={dateRoman} partnerRef={partnerRef} />
        )}

        {/* Corner shimmer dots — sequenced pulse, mirrors NexusSeal */}
        <g fill="rgba(95, 225, 214, 0.78)">
          <circle cx="7" cy="7" r="0.6">
            {spin && (
              <animate
                attributeName="opacity"
                values="0.2;1;0.2"
                dur="3.2s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="73" cy="7" r="0.6">
            {spin && (
              <animate
                attributeName="opacity"
                values="0.2;1;0.2"
                dur="3.2s"
                begin="0.8s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="73" cy="93" r="0.6">
            {spin && (
              <animate
                attributeName="opacity"
                values="0.2;1;0.2"
                dur="3.2s"
                begin="1.6s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="7" cy="93" r="0.6">
            {spin && (
              <animate
                attributeName="opacity"
                values="0.2;1;0.2"
                dur="3.2s"
                begin="2.4s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        </g>
      </svg>
    </span>
  );
}

/* Full layout: APPROVED ribbon · italic META · abstract IG-style mark ·
   APP REVIEW · roman date · partner reference. Reads as a stacked stamp. */
function FullMark({
  uid,
  spin,
  dateRoman,
  partnerRef,
}: {
  uid: string;
  spin: boolean;
  dateRoman: string;
  partnerRef: string;
}) {
  return (
    <>
      {/* APPROVED — top ribbon */}
      <rect x="11" y="11" width="58" height="6" fill={`url(#${uid}-ribbon)`} opacity="0.32" />
      <text
        x="40"
        y="15.4"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="3.6"
        fontWeight="600"
        letterSpacing="2.6"
        fill="rgba(95, 225, 214, 0.95)"
        style={{ textTransform: "uppercase" }}
      >
        Approved
      </text>

      {/* META — italic Cormorant for editorial weight */}
      <text
        x="40"
        y="32"
        textAnchor="middle"
        fontFamily='var(--font-italic), ui-serif, "Iowan Old Style", Georgia, serif'
        fontStyle="italic"
        fontWeight="500"
        fontSize="13.5"
        fill="rgba(240, 238, 246, 0.96)"
        letterSpacing="0.02em"
      >
        Meta
      </text>
      <line
        x1="32"
        y1="35"
        x2="48"
        y2="35"
        stroke="rgba(240, 238, 246, 0.22)"
        strokeWidth="0.3"
      />

      {/* Abstract publication-mark — outline square + inner ring + accent point.
          Deliberately not the Meta or IG logo; it's a typographic device that
          reads as "platform integration" without reproducing brand assets. */}
      <g style={{ transformOrigin: "40px 50px" }}>
        <rect
          x="32"
          y="42"
          width="16"
          height="16"
          rx="3.2"
          ry="3.2"
          fill="none"
          stroke="rgba(240, 238, 246, 0.55)"
          strokeWidth="0.55"
        />
        <circle
          cx="40"
          cy="50"
          r="3.4"
          fill="none"
          stroke="rgba(240, 238, 246, 0.55)"
          strokeWidth="0.55"
        />
        <circle cx="44.6" cy="45.4" r="0.85" fill="rgba(95, 225, 214, 0.95)">
          {spin && (
            <animate
              attributeName="opacity"
              values="0.45;1;0.45"
              dur="2.4s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>

      {/* APP REVIEW — under the mark */}
      <text
        x="40"
        y="68"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="2.7"
        letterSpacing="1.6"
        fill="rgba(215, 212, 226, 0.78)"
        style={{ textTransform: "uppercase" }}
      >
        App · Review
      </text>

      {/* Divider */}
      <line
        x1="22"
        y1="73.5"
        x2="58"
        y2="73.5"
        stroke="rgba(240, 238, 246, 0.16)"
        strokeWidth="0.25"
      />

      {/* Roman date */}
      <text
        x="40"
        y="80.5"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="2.5"
        letterSpacing="1.3"
        fill="rgba(147, 144, 159, 0.82)"
        style={{ textTransform: "uppercase" }}
      >
        {dateRoman}
      </text>

      {/* Partner reference — the document number */}
      <text
        x="40"
        y="89"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="2.7"
        fontWeight="600"
        letterSpacing="0.7"
        fill="rgba(95, 225, 214, 0.85)"
      >
        № {partnerRef}
      </text>
    </>
  );
}

/* Compact: just the abstract publication-mark, slightly enlarged so the
   stamp still reads at masthead/footer scale. */
function CompactMark({ uid: _uid, spin }: { uid: string; spin: boolean }) {
  return (
    <g style={{ transformOrigin: "40px 50px" }}>
      <rect
        x="26"
        y="36"
        width="28"
        height="28"
        rx="5.6"
        ry="5.6"
        fill="none"
        stroke="rgba(240, 238, 246, 0.6)"
        strokeWidth="0.7"
      />
      <circle
        cx="40"
        cy="50"
        r="6"
        fill="none"
        stroke="rgba(240, 238, 246, 0.6)"
        strokeWidth="0.7"
      />
      <circle cx="48.5" cy="41.5" r="1.4" fill="rgba(95, 225, 214, 0.95)">
        {spin && (
          <animate
            attributeName="opacity"
            values="0.45;1;0.45"
            dur="2.4s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      {/* tiny APPROVED beneath, on edge */}
      <text
        x="40"
        y="78"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="4"
        letterSpacing="2"
        fill="rgba(95, 225, 214, 0.85)"
        fontWeight="600"
        style={{ textTransform: "uppercase" }}
      >
        ◆ Approved
      </text>
    </g>
  );
}
