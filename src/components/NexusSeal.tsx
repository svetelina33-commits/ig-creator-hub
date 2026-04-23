type Size = "xs" | "sm" | "md" | "lg";

type Props = {
  size?: Size;
  spin?: boolean;
  showText?: boolean;
  className?: string;
};

/* 5:4 nameplate dimensions. Width / height pairs.
   sm is tuned to fit inside the masthead glass pill (~40px content area). */
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

  // viewBox 100 x 80. Rounded rectangle path for the orbital text.
  // Traces the perimeter clockwise from top-left, with corner radius 5.
  const perimeterPath =
    "M 8 4 H 92 Q 96 4 96 8 V 72 Q 96 76 92 76 H 8 Q 4 76 4 72 V 8 Q 4 4 8 4 Z";

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
          <path id={`${uid}-perim`} d={perimeterPath} fill="none" />
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
          stroke="rgba(240, 238, 246, 0.28)"
          strokeWidth="0.35"
        />
        <rect
          x="6.5"
          y="6.5"
          width="87"
          height="67"
          rx="2.5"
          ry="2.5"
          fill="none"
          stroke="rgba(240, 238, 246, 0.1)"
          strokeWidth="0.22"
        />

        {/* Corner L-brackets */}
        <g stroke="rgba(240, 238, 246, 0.6)" strokeWidth="0.45" strokeLinecap="round" fill="none">
          <path d="M 8 11 V 8 H 11" />
          <path d="M 89 8 H 92 V 11" />
          <path d="M 8 69 V 72 H 11" />
          <path d="M 89 72 H 92 V 69" />
        </g>

        {/* Edge midpoint ticks */}
        <g stroke="rgba(240, 238, 246, 0.4)" strokeWidth="0.35" strokeLinecap="round">
          <line x1="50" y1="2" x2="50" y2="5" />
          <line x1="50" y1="75" x2="50" y2="78" />
          <line x1="2" y1="40" x2="5" y2="40" />
          <line x1="95" y1="40" x2="98" y2="40" />
        </g>

        {/* Orbital text — scrolls along perimeter via startOffset animation */}
        {showText && !compact && (
          <text
            fill="rgba(215, 212, 226, 0.78)"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="3.4"
            letterSpacing="2.4"
            style={{ textTransform: "uppercase" }}
          >
            <textPath href={`#${uid}-perim`} startOffset="0%">
              Nexus Club · Est. MMXXVI · A Private Network · Nexus Club · Est. MMXXVI · A Private Network ·
              {spin && (
                <animate
                  attributeName="startOffset"
                  from="0%"
                  to="-50%"
                  dur="36s"
                  repeatCount="indefinite"
                />
              )}
            </textPath>
          </text>
        )}

        {/* Corner shimmer dots */}
        <g fill="rgba(125, 90, 255, 0.7)">
          <circle cx="8" cy="8" r="0.55">
            {spin && (
              <animate
                attributeName="opacity"
                values="0.2;1;0.2"
                dur="3.2s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="92" cy="8" r="0.55">
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
          <circle cx="92" cy="72" r="0.55">
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
          <circle cx="8" cy="72" r="0.55">
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

        {/* Center N — Fraunces italic */}
        <text
          x="50"
          y={compact ? "52" : "50"}
          textAnchor="middle"
          fontFamily='var(--font-display), ui-serif, "Iowan Old Style", Georgia, serif'
          fontStyle="italic"
          fontWeight="500"
          fontSize={compact ? "34" : "30"}
          fill="rgba(240, 238, 246, 0.96)"
          style={{
            fontVariationSettings: '"opsz" 144, "SOFT" 100',
            transformOrigin: "50px 40px",
            animation: spin ? "nc-seal-breathe 6.5s ease-in-out infinite" : undefined,
          }}
        >
          N
        </text>

        {/* Violet punctum next to the N */}
        <circle
          className="nc-seal-punctum"
          cx={compact ? "62" : "61"}
          cy={compact ? "52" : "50"}
          r="1.1"
          fill="#9b7bff"
          style={{
            transformOrigin: compact ? "62px 52px" : "61px 50px",
            animation: spin ? "nc-seal-punctum 2.4s ease-in-out infinite" : undefined,
          }}
        />

        {/* Bottom tag — only on large */}
        {showText && size === "lg" && (
          <text
            x="50"
            y="68"
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="2.4"
            letterSpacing="1.8"
            fill="rgba(147, 144, 159, 0.75)"
            style={{ textTransform: "uppercase" }}
          >
            Nexus Club
          </text>
        )}
      </svg>
    </span>
  );
}
