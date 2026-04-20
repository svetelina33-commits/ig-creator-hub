import type { CampaignRecord } from "@/lib/store";

type Tone = CampaignRecord["coverTone"];

type Palette = {
  bg: string;
  ink: string;
  accent: string;
  soft: string;
};

const palettes: Record<Tone, Palette> = {
  forest: { bg: "#1F4A3C", ink: "#F0EBE0", accent: "#C9A96A", soft: "#3A6A5B" },
  vermillion: { bg: "#B3261E", ink: "#F7EEDB", accent: "#F0C470", soft: "#D04A3F" },
  ochre: { bg: "#C9A96A", ink: "#231B0E", accent: "#3B2710", soft: "#E0C487" },
  ink: { bg: "#14130F", ink: "#F0EBE0", accent: "#C9A96A", soft: "#36332C" },
};

// Simple deterministic hash from string.
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

type Props = {
  campaign: Pick<CampaignRecord, "id" | "title" | "brand" | "coverTone">;
  /** rectangle: 16x9-ish list card. square: 1x1. tall: 3x4 hero. */
  variant?: "rectangle" | "square" | "tall";
  className?: string;
};

export function CampaignCover({ campaign, variant = "rectangle", className = "" }: Props) {
  const p = palettes[campaign.coverTone];
  const seed = hash(`${campaign.id}-${campaign.title}`);
  const ratio =
    variant === "square" ? "1 / 1" : variant === "tall" ? "3 / 4" : "5 / 4";

  // Generate composition parameters from the seed
  const circleX = 30 + (seed % 40);
  const circleY = 20 + ((seed >> 4) % 50);
  const rotation = (seed % 40) - 20;
  const linePos = 40 + ((seed >> 6) % 35);
  const squareSize = 18 + ((seed >> 8) % 14);

  return (
    <div
      className={`relative overflow-hidden surface-noise ${className}`}
      style={{ aspectRatio: ratio, background: p.bg }}
      aria-hidden
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id={`g-${campaign.id}`} cx="30%" cy="25%" r="80%">
            <stop offset="0%" stopColor={p.soft} stopOpacity="0.9" />
            <stop offset="100%" stopColor={p.bg} stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#g-${campaign.id})`} />
        {/* Large circle — evokes an ink stamp */}
        <circle
          cx={circleX}
          cy={circleY}
          r="28"
          fill="none"
          stroke={p.accent}
          strokeWidth="0.35"
          opacity="0.6"
        />
        <circle
          cx={circleX}
          cy={circleY}
          r="22"
          fill="none"
          stroke={p.ink}
          strokeWidth="0.18"
          opacity="0.35"
        />
        {/* Diagonal line through composition */}
        <line
          x1="0"
          y1={linePos}
          x2="100"
          y2={linePos - 20 + ((seed >> 10) % 15)}
          stroke={p.ink}
          strokeWidth="0.2"
          opacity="0.4"
        />
        {/* Small square mark */}
        <g transform={`rotate(${rotation} ${70 + (seed % 15)} ${65 + ((seed >> 2) % 15)})`}>
          <rect
            x={70 + (seed % 15)}
            y={65 + ((seed >> 2) % 15)}
            width={squareSize}
            height={squareSize}
            fill="none"
            stroke={p.accent}
            strokeWidth="0.25"
            opacity="0.5"
          />
        </g>
        {/* Typographic ornament — brand initials */}
        <text
          x="50"
          y="52"
          textAnchor="middle"
          fontFamily="ui-serif, Georgia, serif"
          fontSize="4"
          fontStyle="italic"
          fill={p.ink}
          opacity="0.85"
          letterSpacing="0.3"
        >
          {campaign.brand}
        </text>
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="1.6"
          fill={p.accent}
          opacity="0.85"
          letterSpacing="0.8"
        >
          № {String(seed % 1000).padStart(3, "0")} · VOL. I
        </text>
        {/* Corner marks */}
        <g stroke={p.ink} strokeWidth="0.2" opacity="0.7" fill="none">
          <path d="M 3 3 L 3 7 M 3 3 L 7 3" />
          <path d="M 97 3 L 97 7 M 97 3 L 93 3" />
          <path d="M 3 97 L 3 93 M 3 97 L 7 97" />
          <path d="M 97 97 L 97 93 M 97 97 L 93 97" />
        </g>
      </svg>
    </div>
  );
}
