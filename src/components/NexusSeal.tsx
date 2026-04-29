type Size = "xs" | "sm" | "md" | "lg";

type Props = {
  size?: Size;
  spin?: boolean;
  showText?: boolean;
  className?: string;
};

/* 5:4 nameplate. sm is tuned for the masthead pill. */
const pixel: Record<Size, { w: number; h: number }> = {
  xs: { w: 30, h: 24 },
  sm: { w: 46, h: 36 },
  md: { w: 108, h: 84 },
  lg: { w: 196, h: 152 },
};

export function NexusSeal({
  size = "md",
  spin = true,
  showText = true,
  className = "",
}: Props) {
  const { w, h } = pixel[size];
  const compact = size === "xs" || size === "sm";
  const uid = `nc-seal-${size}`;

  return (
    <span
      aria-hidden
      className={`nc-seal-rect relative select-none inline-block ${className}`}
      style={{ width: w, height: h }}
    >
      <svg
        viewBox="0 0 100 80"
        width={w}
        height={h}
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        <defs>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(125, 90, 255, 0.45)" />
            <stop offset="55%" stopColor="rgba(125, 90, 255, 0.06)" />
            <stop offset="100%" stopColor="rgba(125, 90, 255, 0)" />
          </radialGradient>
          <linearGradient id={`${uid}-core`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(27, 27, 36, 0.95)" />
            <stop offset="100%" stopColor="rgba(9, 9, 12, 0.6)" />
          </linearGradient>
        </defs>

        {/* Breathing glow */}
        <g
          style={{
            transformOrigin: "50px 40px",
            animation: spin ? "nc-seal-breathe 6.5s ease-in-out infinite" : undefined,
          }}
        >
          <rect x="0" y="0" width="100" height="80" fill={`url(#${uid}-glow)`} />
        </g>

        {/* Outer frame — double hairline rectangle */}
        <rect
          x="4"
          y="4"
          width="92"
          height="72"
          rx="4"
          ry="4"
          fill={`url(#${uid}-core)`}
          stroke="rgba(240, 238, 246, 0.32)"
          strokeWidth="0.4"
        />
        <rect
          x="6.5"
          y="6.5"
          width="87"
          height="67"
          rx="2.5"
          ry="2.5"
          fill="none"
          stroke="rgba(240, 238, 246, 0.12)"
          strokeWidth="0.25"
        />

        {/* Corner L-brackets */}
        <g
          stroke="rgba(240, 238, 246, 0.65)"
          strokeWidth="0.5"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M 8 11 V 8 H 11" />
          <path d="M 89 8 H 92 V 11" />
          <path d="M 8 69 V 72 H 11" />
          <path d="M 89 72 H 92 V 69" />
        </g>

        {/* Edge midpoint ticks */}
        <g stroke="rgba(240, 238, 246, 0.45)" strokeWidth="0.4" strokeLinecap="round">
          <line x1="50" y1="1.5" x2="50" y2="5" />
          <line x1="50" y1="75" x2="50" y2="78.5" />
          <line x1="1.5" y1="40" x2="5" y2="40" />
          <line x1="95" y1="40" x2="98.5" y2="40" />
        </g>

        {/* Static readable nameplate text — top + bottom edges */}
        {showText && !compact && (
          <>
            <text
              x="50"
              y="15.5"
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="3.3"
              fontWeight="500"
              letterSpacing="2.2"
              fill="rgba(215, 212, 226, 0.85)"
              style={{ textTransform: "uppercase" }}
            >
              Nexus · Club
            </text>
            <text
              x="50"
              y="69"
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="2.6"
              letterSpacing="1.6"
              fill="rgba(147, 144, 159, 0.7)"
              style={{ textTransform: "uppercase" }}
            >
              Founded MMXXVI
            </text>
          </>
        )}

        {/* Corner shimmer dots — sequenced pulse */}
        <g fill="rgba(125, 90, 255, 0.75)">
          <circle cx="8" cy="8" r="0.6">
            {spin && (
              <animate
                attributeName="opacity"
                values="0.2;1;0.2"
                dur="3.2s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="92" cy="8" r="0.6">
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
          <circle cx="92" cy="72" r="0.6">
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
          <circle cx="8" cy="72" r="0.6">
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

        {/* Center N — Cormorant italic for editorial contrast */}
        <text
          x="50"
          y={compact ? "54" : "48"}
          textAnchor="middle"
          fontFamily='var(--font-italic), ui-serif, "Iowan Old Style", Georgia, serif'
          fontStyle="italic"
          fontWeight="500"
          fontSize={compact ? "36" : "32"}
          fill="rgba(240, 238, 246, 0.96)"
          style={{
            transformOrigin: "50px 40px",
            animation: spin ? "nc-seal-breathe 6.5s ease-in-out infinite" : undefined,
          }}
        >
          N
        </text>

        {/* Violet punctum */}
        <circle
          className="nc-seal-punctum"
          cx={compact ? "63" : "61.5"}
          cy={compact ? "54" : "48"}
          r="1.1"
          fill="#9b7bff"
          style={{
            transformOrigin: compact ? "63px 54px" : "61.5px 48px",
            animation: spin ? "nc-seal-punctum 2.4s ease-in-out infinite" : undefined,
          }}
        />
      </svg>
    </span>
  );
}
