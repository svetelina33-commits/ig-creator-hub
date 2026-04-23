import type { CampaignRecord } from "@/lib/store";
import { CampaignMotif } from "./CampaignMotifs";

type Tone = CampaignRecord["coverTone"];

type Palette = {
  primary: string;
  secondary: string;
  glow: string;
  textTop: string;
  textMuted: string;
};

const palettes: Record<Tone, Palette> = {
  forest: {
    primary: "#14343A",
    secondary: "#062023",
    glow: "#5FE1D6",
    textTop: "rgba(240, 238, 246, 0.9)",
    textMuted: "rgba(95, 225, 214, 0.95)",
  },
  vermillion: {
    primary: "#3A1519",
    secondary: "#1C060A",
    glow: "#FF8A93",
    textTop: "rgba(240, 238, 246, 0.92)",
    textMuted: "rgba(255, 138, 147, 0.95)",
  },
  ochre: {
    primary: "#352411",
    secondary: "#160F08",
    glow: "#F3C179",
    textTop: "rgba(240, 238, 246, 0.92)",
    textMuted: "rgba(243, 193, 121, 0.95)",
  },
  ink: {
    primary: "#1B1B24",
    secondary: "#08080C",
    glow: "#7D5AFF",
    textTop: "rgba(240, 238, 246, 0.92)",
    textMuted: "rgba(155, 123, 255, 1)",
  },
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function brandMonogram(brand: string): string {
  const parts = brand
    .replace(/[^A-Za-z0-9 &]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return (parts[0] ?? brand).slice(0, 2).toUpperCase();
}

type Props = {
  campaign: Pick<CampaignRecord, "id" | "title" | "brand" | "coverTone">;
  variant?: "rectangle" | "square" | "tall";
  className?: string;
};

export function CampaignCover({ campaign, variant = "rectangle", className = "" }: Props) {
  const p = palettes[campaign.coverTone] ?? palettes.ink;
  const seed = hash(`${campaign.id}-${campaign.title}`);
  const ratio =
    variant === "square" ? "1 / 1" : variant === "tall" ? "3 / 4" : "5 / 4";

  const glowX = 22 + (seed % 20);
  const glowY = 18 + ((seed >> 4) % 18);
  const tick = (seed >> 10) % 60;
  const monogram = brandMonogram(campaign.brand);

  return (
    <div
      className={`relative overflow-hidden surface-noise rounded-2xl ${className}`}
      style={{
        aspectRatio: ratio,
        background: `linear-gradient(135deg, ${p.primary} 0%, ${p.secondary} 100%)`,
      }}
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
          <radialGradient id={`glow-${campaign.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={p.glow} stopOpacity="0.45" />
            <stop offset="40%" stopColor={p.glow} stopOpacity="0.1" />
            <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`sheen-${campaign.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Ambient glow — positioned behind the motif center */}
        <circle
          cx={glowX + 25}
          cy={glowY + 18}
          r="55"
          fill={`url(#glow-${campaign.id})`}
          opacity="1"
        />

        {/* Niche-specific motif — vertically centered in the visible
            area (5:4 aspect crops top/bottom ~y=10/90 of the 100x100
            viewBox). Shifted +10 so motif center lands on the card's
            optical center rather than the top half. */}
        <g transform="translate(0, 10)">
          <CampaignMotif id={campaign.id} glow={p.glow} />
        </g>

        {/* Diagonal sheen */}
        <rect width="100" height="100" fill={`url(#sheen-${campaign.id})`} opacity="0.45" />

        {/* Corner ticks — editorial stamp detail */}
        <g stroke="rgba(255,255,255,0.25)" strokeWidth="0.28" fill="none">
          <path d="M 3 3 L 3 7 M 3 3 L 7 3" />
          <path d="M 97 3 L 97 7 M 97 3 L 93 3" />
          <path d="M 3 97 L 3 93 M 3 97 L 7 97" />
          <path d="M 97 97 L 97 93 M 97 97 L 93 97" />
        </g>

        {/* Divider above brand plate */}
        <line
          x1="18"
          y1="66"
          x2="82"
          y2="66"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.2"
        />

        {/* Brand monogram mark — rendered like a signet/logo, square bracket frame */}
        <g transform="translate(24 71)">
          <rect
            x="0"
            y="0"
            width="10"
            height="10"
            fill="none"
            stroke={p.glow}
            strokeWidth="0.4"
            rx="1"
            opacity="0.85"
          />
          <text
            x="5"
            y="7.4"
            textAnchor="middle"
            fontFamily='var(--font-italic), ui-serif, Georgia, serif'
            fontStyle="italic"
            fontSize="6.4"
            fontWeight="500"
            fill={p.textTop}
          >
            {monogram}
          </text>
        </g>

        {/* Brand name (italic serif, editorial) */}
        <text
          x="40"
          y="78"
          fontFamily='var(--font-italic), ui-serif, Georgia, serif'
          fontStyle="italic"
          fontSize="6.8"
          fill={p.textTop}
          letterSpacing="0.15"
        >
          {campaign.brand}
        </text>

        {/* Volume / issue mark */}
        <text
          x="40"
          y="84.5"
          fontFamily="ui-monospace, monospace"
          fontSize="2.4"
          fill={p.textMuted}
          letterSpacing="0.8"
        >
          № {String(tick).padStart(3, "0")} · VOL. I
        </text>
      </svg>
    </div>
  );
}
