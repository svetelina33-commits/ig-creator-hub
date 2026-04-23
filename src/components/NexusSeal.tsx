type Size = "xs" | "sm" | "md" | "lg";

type Props = {
  size?: Size;
  spin?: boolean;
  showText?: boolean;
  className?: string;
};

const pixel: Record<Size, number> = {
  xs: 28,
  sm: 44,
  md: 96,
  lg: 168,
};

export function NexusSeal({
  size = "md",
  spin = true,
  showText = true,
  className = "",
}: Props) {
  const px = pixel[size];
  const compact = size === "xs" || size === "sm";
  const textId = `nc-seal-text-${size}`;
  const uid = `nc-seal-${size}`;

  return (
    <span
      aria-hidden
      className={`nc-seal relative select-none ${className}`}
      style={{ width: px, height: px }}
    >
      <svg
        viewBox="0 0 100 100"
        width={px}
        height={px}
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        <defs>
          <path
            id={textId}
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
          <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(125, 90, 255, 0.45)" />
            <stop offset="55%" stopColor="rgba(125, 90, 255, 0.06)" />
            <stop offset="100%" stopColor="rgba(125, 90, 255, 0)" />
          </radialGradient>
          <radialGradient id={`${uid}-core`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(27, 27, 36, 0.9)" />
            <stop offset="100%" stopColor="rgba(9, 9, 12, 0.6)" />
          </radialGradient>
        </defs>

        {/* Glow behind seal, breathing */}
        <g
          style={{
            transformOrigin: "50px 50px",
            animation: spin ? "nc-seal-breathe 6.5s ease-in-out infinite" : undefined,
          }}
        >
          <circle cx="50" cy="50" r="48" fill={`url(#${uid}-glow)`} />
        </g>

        {/* Outer hairline ring (static — the frame) */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="rgba(240, 238, 246, 0.22)"
          strokeWidth="0.35"
        />
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="rgba(240, 238, 246, 0.06)"
          strokeWidth="1.6"
        />

        {/* Cardinal + intercardinal ticks — counter-rotating */}
        <g
          className="nc-seal-ticks"
          style={{
            transformOrigin: "50px 50px",
            animation: spin ? "nc-seal-spin-ccw 88s linear infinite" : undefined,
          }}
        >
          <g stroke="rgba(240, 238, 246, 0.65)" strokeWidth="0.5" strokeLinecap="round">
            <line x1="50" y1="1.5" x2="50" y2="6" />
            <line x1="50" y1="94" x2="50" y2="98.5" />
            <line x1="1.5" y1="50" x2="6" y2="50" />
            <line x1="94" y1="50" x2="98.5" y2="50" />
          </g>
          <g stroke="rgba(240, 238, 246, 0.28)" strokeWidth="0.32" strokeLinecap="round">
            <line x1="83.8" y1="16.2" x2="86.6" y2="13.4" />
            <line x1="16.2" y1="16.2" x2="13.4" y2="13.4" />
            <line x1="83.8" y1="83.8" x2="86.6" y2="86.6" />
            <line x1="16.2" y1="83.8" x2="13.4" y2="86.6" />
          </g>
          {/* Tiny shimmer dots at quadrant midpoints */}
          <g fill="rgba(125, 90, 255, 0.6)">
            <circle cx="50" cy="8" r="0.6">
              {spin && (
                <animate
                  attributeName="opacity"
                  values="0.2;1;0.2"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
            <circle cx="92" cy="50" r="0.6">
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
            <circle cx="50" cy="92" r="0.6">
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
            <circle cx="8" cy="50" r="0.6">
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
        </g>

        {/* Orbital text — clockwise */}
        {showText && !compact && (
          <g
            className="nc-seal-text-ring"
            style={{
              transformOrigin: "50px 50px",
              animation: spin ? "nc-seal-spin-cw 38s linear infinite" : undefined,
            }}
          >
            <text
              fill="rgba(215, 212, 226, 0.78)"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="4.2"
              letterSpacing="2.6"
              style={{ textTransform: "uppercase" }}
            >
              <textPath href={`#${textId}`} startOffset="0%">
                Nexus Club · Est. MMXXVI · A Private Network ·
              </textPath>
            </text>
          </g>
        )}

        {/* Core disc (subtle vignette behind N) */}
        <circle cx="50" cy="50" r={compact ? "26" : "22"} fill={`url(#${uid}-core)`} />

        {/* Inner hairline rings — subtly breathing */}
        <circle
          cx="50"
          cy="50"
          r={showText && !compact ? "30" : "34"}
          fill="none"
          stroke="rgba(240, 238, 246, 0.32)"
          strokeWidth="0.25"
          style={{
            transformOrigin: "50px 50px",
            animation:
              spin && showText && !compact
                ? "nc-seal-hairline-pulse 5s ease-in-out infinite"
                : undefined,
          }}
        />
        <circle
          cx="50"
          cy="50"
          r={showText && !compact ? "27.5" : "31.5"}
          fill="none"
          stroke="rgba(240, 238, 246, 0.1)"
          strokeWidth="0.18"
        />

        {/* Center N — Fraunces italic via CSS stack */}
        <text
          x="50"
          y={compact ? "66" : "63"}
          textAnchor="middle"
          fontFamily='var(--font-display), ui-serif, "Iowan Old Style", Georgia, serif'
          fontStyle="italic"
          fontWeight="500"
          fontSize={compact ? "44" : "38"}
          fill="rgba(240, 238, 246, 0.96)"
          style={{
            fontVariationSettings: '"opsz" 144, "SOFT" 100',
            transformOrigin: "50px 50px",
            animation: spin ? "nc-seal-breathe 6.5s ease-in-out infinite" : undefined,
          }}
        >
          N
        </text>

        {/* Violet punctum — pulses */}
        <circle
          className="nc-seal-punctum"
          cx={compact ? "66" : "62.5"}
          cy={compact ? "62" : "60"}
          r="1.4"
          fill="#9b7bff"
          style={{
            transformOrigin: compact ? "66px 62px" : "62.5px 60px",
            animation: spin ? "nc-seal-punctum 2.4s ease-in-out infinite" : undefined,
          }}
        />
      </svg>
    </span>
  );
}
