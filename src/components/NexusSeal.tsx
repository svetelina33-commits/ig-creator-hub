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
  lg: 160,
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

  return (
    <span
      aria-hidden
      className={`relative inline-block select-none ${className}`}
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
          <radialGradient id={`nc-seal-glow-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(125, 90, 255, 0.35)" />
            <stop offset="60%" stopColor="rgba(125, 90, 255, 0.05)" />
            <stop offset="100%" stopColor="rgba(125, 90, 255, 0)" />
          </radialGradient>
        </defs>

        {/* subtle violet glow behind the seal */}
        <circle cx="50" cy="50" r="48" fill={`url(#nc-seal-glow-${size})`} />

        {/* outer thin ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="rgba(240, 238, 246, 0.18)"
          strokeWidth="0.35"
        />

        {/* cardinal ticks */}
        <g stroke="rgba(240, 238, 246, 0.55)" strokeWidth="0.45" strokeLinecap="round">
          <line x1="50" y1="2" x2="50" y2="6" />
          <line x1="50" y1="94" x2="50" y2="98" />
          <line x1="2" y1="50" x2="6" y2="50" />
          <line x1="94" y1="50" x2="98" y2="50" />
        </g>

        {/* intercardinal micro ticks */}
        <g stroke="rgba(240, 238, 246, 0.2)" strokeWidth="0.3" strokeLinecap="round">
          <line x1="83.8" y1="16.2" x2="85.9" y2="14.1" />
          <line x1="16.2" y1="16.2" x2="14.1" y2="14.1" />
          <line x1="83.8" y1="83.8" x2="85.9" y2="85.9" />
          <line x1="16.2" y1="83.8" x2="14.1" y2="85.9" />
        </g>

        {/* orbital text ring */}
        {showText && !compact && (
          <g
            style={{
              transformOrigin: "50px 50px",
              animation: spin ? "nc-spin 42s linear infinite" : undefined,
            }}
          >
            <text
              fill="rgba(215, 212, 226, 0.72)"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="4.2"
              letterSpacing="2.4"
              style={{ textTransform: "uppercase" }}
            >
              <textPath href={`#${textId}`} startOffset="0%">
                Nexus Club · Est. MMXXVI · A Private Network ·
              </textPath>
            </text>
          </g>
        )}

        {/* inner hairline ring */}
        <circle
          cx="50"
          cy="50"
          r={showText && !compact ? "30" : "34"}
          fill="none"
          stroke="rgba(240, 238, 246, 0.28)"
          strokeWidth="0.25"
        />
        <circle
          cx="50"
          cy="50"
          r={showText && !compact ? "27.5" : "31.5"}
          fill="none"
          stroke="rgba(240, 238, 246, 0.08)"
          strokeWidth="0.18"
        />

        {/* center N */}
        <text
          x="50"
          y={compact ? "66" : "63"}
          textAnchor="middle"
          fontFamily='ui-serif, "Iowan Old Style", "Apple Garamond", Georgia, serif'
          fontStyle="italic"
          fontSize={compact ? "44" : "38"}
          fill="rgba(240, 238, 246, 0.94)"
        >
          N
        </text>

        {/* violet punctum */}
        <circle cx={compact ? "66" : "62.5"} cy={compact ? "62" : "60"} r="1.3" fill="#7D5AFF" />
      </svg>
    </span>
  );
}
