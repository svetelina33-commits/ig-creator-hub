import type { CampaignRecord } from "@/lib/store";

type Tone = CampaignRecord["coverTone"];

type Palette = {
  primary: string;   // dominant color
  secondary: string; // blend color
  glow: string;      // accent highlight
  textTop: string;
  textMuted: string;
};

/**
 * Dark palettes — luminous gradients with a bright core and deep falloff.
 * Tokens mirror the "forest"/"vermillion"/"ochre"/"ink" names even though
 * the hues have shifted to fit the dark, Cursor-ish aesthetic.
 */
const palettes: Record<Tone, Palette> = {
  forest: {
    primary: "#14343A",
    secondary: "#062023",
    glow: "#5FE1D6",
    textTop: "rgba(240, 238, 246, 0.88)",
    textMuted: "rgba(95, 225, 214, 0.9)",
  },
  vermillion: {
    primary: "#3A1519",
    secondary: "#1C060A",
    glow: "#FF8A93",
    textTop: "rgba(240, 238, 246, 0.9)",
    textMuted: "rgba(255, 138, 147, 0.95)",
  },
  ochre: {
    primary: "#352411",
    secondary: "#160F08",
    glow: "#F3C179",
    textTop: "rgba(240, 238, 246, 0.9)",
    textMuted: "rgba(243, 193, 121, 0.95)",
  },
  ink: {
    primary: "#1B1B24",
    secondary: "#08080C",
    glow: "#7D5AFF",
    textTop: "rgba(240, 238, 246, 0.9)",
    textMuted: "rgba(125, 90, 255, 0.95)",
  },
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
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

  const glowX = 25 + (seed % 45);
  const glowY = 20 + ((seed >> 4) % 40);
  const ringX = 65 + ((seed >> 2) % 20);
  const ringY = 60 + ((seed >> 6) % 20);
  const ringR = 16 + ((seed >> 8) % 10);
  const tick = (seed >> 10) % 60;

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
            <stop offset="0%" stopColor={p.glow} stopOpacity="0.5" />
            <stop offset="40%" stopColor={p.glow} stopOpacity="0.12" />
            <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`sheen-${campaign.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Ambient glow */}
        <circle
          cx={glowX}
          cy={glowY}
          r="55"
          fill={`url(#glow-${campaign.id})`}
          opacity="1"
        />

        {/* Thin ring */}
        <circle
          cx={ringX}
          cy={ringY}
          r={ringR}
          fill="none"
          stroke={p.glow}
          strokeWidth="0.3"
          opacity="0.7"
        />
        <circle
          cx={ringX}
          cy={ringY}
          r={ringR + 3.5}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.18"
        />

        {/* Diagonal sheen */}
        <rect width="100" height="100" fill={`url(#sheen-${campaign.id})`} opacity="0.5" />

        {/* Corner ticks (bigger-feeling) */}
        <g stroke="rgba(255,255,255,0.22)" strokeWidth="0.25" fill="none">
          <path d="M 3 3 L 3 7 M 3 3 L 7 3" />
          <path d="M 97 3 L 97 7 M 97 3 L 93 3" />
          <path d="M 3 97 L 3 93 M 3 97 L 7 97" />
          <path d="M 97 97 L 97 93 M 97 97 L 93 97" />
        </g>

        {/* Typographic ornament */}
        <text
          x="50"
          y="52"
          textAnchor="middle"
          fontFamily="ui-serif, Georgia, serif"
          fontSize="4.5"
          fontStyle="italic"
          fill={p.textTop}
          letterSpacing="0.2"
        >
          {campaign.brand}
        </text>
        <text
          x="50"
          y="58.5"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="1.6"
          fill={p.textMuted}
          letterSpacing="0.8"
        >
          № {String(tick).padStart(3, "0")} · VOL. I
        </text>
      </svg>
    </div>
  );
}
