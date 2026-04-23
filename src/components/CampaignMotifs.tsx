/**
 * Niche-specific SVG motifs, one per campaign. Rendered inside the
 * CampaignCover's <svg viewBox="0 0 100 100">. Each motif draws in the
 * campaign's tone (via the `glow` color), sits so it doesn't overlap the
 * centered brand text (which lives around y=50–60), and stays line-art
 * to preserve the editorial aesthetic.
 */

type Props = { glow: string };

function Barbell({ glow }: Props) {
  return (
    <g opacity="0.85">
      <line x1="26" y1="30" x2="74" y2="30" stroke={glow} strokeWidth="0.9" strokeLinecap="round" />
      <rect x="21" y="22" width="3" height="16" fill={glow} opacity="0.55" rx="0.5" />
      <rect x="17" y="18" width="3" height="24" fill={glow} opacity="0.35" rx="0.5" />
      <rect x="76" y="22" width="3" height="16" fill={glow} opacity="0.55" rx="0.5" />
      <rect x="80" y="18" width="3" height="24" fill={glow} opacity="0.35" rx="0.5" />
      <line x1="15" y1="46" x2="85" y2="46" stroke={glow} strokeWidth="0.15" opacity="0.3" />
    </g>
  );
}

function Halo({ glow }: Props) {
  return (
    <g opacity="0.85">
      <circle cx="50" cy="30" r="20" fill="none" stroke={glow} strokeWidth="0.3" opacity="0.35" />
      <circle cx="50" cy="30" r="14" fill="none" stroke={glow} strokeWidth="0.35" opacity="0.55" />
      <circle cx="50" cy="30" r="8" fill="none" stroke={glow} strokeWidth="0.4" opacity="0.75" />
      <path
        d="M 50 22 Q 47 27 50 32 Q 53 27 50 22"
        fill={glow}
        opacity="0.8"
      />
      <rect x="48.5" y="32" width="3" height="10" fill={glow} opacity="0.45" rx="0.3" />
    </g>
  );
}

function Chip({ glow }: Props) {
  return (
    <g opacity="0.85">
      <rect x="36" y="18" width="28" height="26" rx="1.8" fill="none" stroke={glow} strokeWidth="0.45" />
      <rect x="40" y="22" width="20" height="18" rx="0.8" fill="none" stroke={glow} strokeWidth="0.25" opacity="0.6" />
      <g stroke={glow} strokeWidth="0.35" strokeLinecap="round">
        <line x1="40" y1="14" x2="40" y2="18" />
        <line x1="45" y1="14" x2="45" y2="18" />
        <line x1="50" y1="14" x2="50" y2="18" />
        <line x1="55" y1="14" x2="55" y2="18" />
        <line x1="60" y1="14" x2="60" y2="18" />
        <line x1="40" y1="44" x2="40" y2="48" />
        <line x1="45" y1="44" x2="45" y2="48" />
        <line x1="50" y1="44" x2="50" y2="48" />
        <line x1="55" y1="44" x2="55" y2="48" />
        <line x1="60" y1="44" x2="60" y2="48" />
        <line x1="32" y1="24" x2="36" y2="24" />
        <line x1="32" y1="28" x2="36" y2="28" />
        <line x1="32" y1="32" x2="36" y2="32" />
        <line x1="32" y1="36" x2="36" y2="36" />
        <line x1="64" y1="24" x2="68" y2="24" />
        <line x1="64" y1="28" x2="68" y2="28" />
        <line x1="64" y1="32" x2="68" y2="32" />
        <line x1="64" y1="36" x2="68" y2="36" />
      </g>
      <text x="50" y="34" textAnchor="middle" fontSize="7" fontFamily="ui-serif, Georgia, serif" fontStyle="italic" fill={glow}>10×</text>
    </g>
  );
}

function Floppy({ glow }: Props) {
  return (
    <g opacity="0.8">
      <rect x="30" y="12" width="40" height="34" rx="1.5" fill="none" stroke={glow} strokeWidth="0.5" />
      <rect x="38" y="12" width="24" height="11" fill={glow} opacity="0.4" />
      <rect x="52" y="14" width="6" height="7" fill="none" stroke={glow} strokeWidth="0.3" opacity="0.6" />
      <rect x="34" y="27" width="32" height="17" rx="0.5" fill="none" stroke={glow} strokeWidth="0.3" opacity="0.7" />
      <line x1="38" y1="32" x2="62" y2="32" stroke={glow} strokeWidth="0.25" opacity="0.55" />
      <line x1="38" y1="35" x2="58" y2="35" stroke={glow} strokeWidth="0.25" opacity="0.4" />
      <line x1="38" y1="38" x2="54" y2="38" stroke={glow} strokeWidth="0.25" opacity="0.3" />
    </g>
  );
}

function Plates({ glow }: Props) {
  return (
    <g opacity="0.85">
      <circle cx="50" cy="30" r="16" fill="none" stroke={glow} strokeWidth="0.7" />
      <circle cx="50" cy="30" r="12" fill="none" stroke={glow} strokeWidth="0.4" opacity="0.7" />
      <circle cx="50" cy="30" r="5" fill="none" stroke={glow} strokeWidth="0.55" />
      <circle cx="50" cy="30" r="1.2" fill={glow} />
      <line x1="28" y1="30" x2="34" y2="30" stroke={glow} strokeWidth="0.6" />
      <line x1="66" y1="30" x2="72" y2="30" stroke={glow} strokeWidth="0.6" />
    </g>
  );
}

function Candles({ glow }: Props) {
  const bars = [
    { x: 22, bodyY: 36, bodyH: 5, wickTop: 30, wickBot: 43 },
    { x: 32, bodyY: 32, bodyH: 7, wickTop: 27, wickBot: 42 },
    { x: 42, bodyY: 28, bodyH: 6, wickTop: 25, wickBot: 39 },
    { x: 52, bodyY: 22, bodyH: 9, wickTop: 18, wickBot: 35 },
    { x: 62, bodyY: 19, bodyH: 8, wickTop: 14, wickBot: 32 },
    { x: 72, bodyY: 14, bodyH: 10, wickTop: 10, wickBot: 28 },
  ];
  return (
    <g opacity="0.9">
      {bars.map((b, i) => {
        const rising = i >= 3;
        return (
          <g key={i}>
            <line x1={b.x} y1={b.wickTop} x2={b.x} y2={b.wickBot} stroke={glow} strokeWidth="0.35" />
            <rect
              x={b.x - 2}
              y={b.bodyY}
              width="4"
              height={b.bodyH}
              fill={rising ? glow : "none"}
              stroke={glow}
              strokeWidth="0.4"
              opacity={rising ? 0.7 : 0.5}
            />
          </g>
        );
      })}
    </g>
  );
}

function Globe({ glow }: Props) {
  return (
    <g opacity="0.8">
      <circle cx="50" cy="30" r="18" fill="none" stroke={glow} strokeWidth="0.5" />
      <ellipse cx="50" cy="30" rx="6" ry="18" fill="none" stroke={glow} strokeWidth="0.3" opacity="0.65" />
      <ellipse cx="50" cy="30" rx="13" ry="18" fill="none" stroke={glow} strokeWidth="0.3" opacity="0.45" />
      <ellipse cx="50" cy="30" rx="18" ry="6" fill="none" stroke={glow} strokeWidth="0.3" opacity="0.7" />
      <ellipse cx="50" cy="30" rx="18" ry="13" fill="none" stroke={glow} strokeWidth="0.3" opacity="0.45" />
      <circle cx="50" cy="30" r="1" fill={glow} />
    </g>
  );
}

function Pearl({ glow }: Props) {
  return (
    <g opacity="0.9">
      <circle cx="50" cy="30" r="24" fill="none" stroke={glow} strokeWidth="0.25" opacity="0.35" />
      <circle cx="50" cy="30" r="16" fill={glow} opacity="0.18" />
      <circle cx="50" cy="30" r="14" fill="none" stroke={glow} strokeWidth="0.3" opacity="0.55" />
      <circle cx="44" cy="24" r="3.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="44" cy="24" r="1.5" fill="rgba(255,255,255,0.85)" />
    </g>
  );
}

function Quotes({ glow }: Props) {
  return (
    <g opacity="0.7">
      <text
        x="30"
        y="42"
        fontSize="38"
        fontFamily="ui-serif, Georgia, serif"
        fontStyle="italic"
        fill={glow}
      >
        “
      </text>
      <text
        x="58"
        y="42"
        fontSize="38"
        fontFamily="ui-serif, Georgia, serif"
        fontStyle="italic"
        fill={glow}
      >
        ”
      </text>
    </g>
  );
}

function Growth({ glow }: Props) {
  return (
    <g opacity="0.9">
      <line x1="14" y1="44" x2="86" y2="44" stroke={glow} strokeWidth="0.15" opacity="0.3" />
      <path
        d="M 18 42 L 30 36 L 40 38 L 50 30 L 60 25 L 72 18 L 82 14"
        fill="none"
        stroke={glow}
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="42" r="0.9" fill={glow} />
      <circle cx="30" cy="36" r="0.9" fill={glow} />
      <circle cx="40" cy="38" r="0.9" fill={glow} />
      <circle cx="50" cy="30" r="0.9" fill={glow} />
      <circle cx="60" cy="25" r="0.9" fill={glow} />
      <circle cx="72" cy="18" r="0.9" fill={glow} />
      <circle cx="82" cy="14" r="1.7" fill={glow} />
      <circle cx="82" cy="14" r="3" fill="none" stroke={glow} strokeWidth="0.3" opacity="0.5" />
    </g>
  );
}

function Watch({ glow }: Props) {
  return (
    <g opacity="0.9">
      <circle cx="50" cy="30" r="18" fill="none" stroke={glow} strokeWidth="0.55" />
      <circle cx="50" cy="30" r="21" fill="none" stroke={glow} strokeWidth="0.2" opacity="0.35" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 50 + Math.sin(rad) * 16;
        const cy = 30 - Math.cos(rad) * 16;
        const r = deg % 90 === 0 ? 0.55 : 0.3;
        return <circle key={i} cx={cx} cy={cy} r={r} fill={glow} />;
      })}
      <line x1="50" y1="30" x2="50" y2="17" stroke={glow} strokeWidth="0.6" strokeLinecap="round" />
      <line x1="50" y1="30" x2="60" y2="33" stroke={glow} strokeWidth="0.4" strokeLinecap="round" />
      <circle cx="50" cy="30" r="0.8" fill={glow} />
      <rect x="48.5" y="8" width="3" height="3" fill={glow} opacity="0.4" />
      <rect x="48.5" y="49" width="3" height="3" fill={glow} opacity="0.4" />
    </g>
  );
}

function Bubbles({ glow }: Props) {
  return (
    <g opacity="0.85">
      <path
        d="M 22 24 Q 22 17 30 17 L 46 17 Q 54 17 54 24 L 54 28 Q 54 34 46 34 L 34 34 L 28 40 L 30 34 Q 22 34 22 28 Z"
        fill="none"
        stroke={glow}
        strokeWidth="0.45"
      />
      <path
        d="M 50 32 Q 50 27 56 27 L 72 27 Q 78 27 78 32 L 78 37 Q 78 42 72 42 L 64 42 L 68 47 L 62 42 Q 50 42 50 37 Z"
        fill="none"
        stroke={glow}
        strokeWidth="0.45"
        opacity="0.7"
      />
      <circle cx="32" cy="25" r="0.7" fill={glow} />
      <circle cx="38" cy="25" r="0.7" fill={glow} />
      <circle cx="44" cy="25" r="0.7" fill={glow} />
      <line x1="56" y1="33" x2="74" y2="33" stroke={glow} strokeWidth="0.35" />
      <line x1="56" y1="36" x2="70" y2="36" stroke={glow} strokeWidth="0.35" opacity="0.7" />
    </g>
  );
}

function Profile({ glow }: Props) {
  return (
    <g opacity="0.85">
      <path
        d="M 38 46 Q 38 26 48 20 Q 60 18 64 30 L 63 36 L 66 38 L 63 42 L 63 46"
        fill="none"
        stroke={glow}
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      <circle cx="58" cy="32" r="0.8" fill={glow} />
      <circle cx="50" cy="28" r="16" fill="none" stroke={glow} strokeWidth="0.2" opacity="0.35" />
    </g>
  );
}

function Wave({ glow }: Props) {
  return (
    <g opacity="0.9">
      <path
        d="M 12 30 L 22 30 L 26 22 L 30 38 L 34 10 L 38 48 L 42 20 L 46 34 L 52 30 L 88 30"
        fill="none"
        stroke={glow}
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="12" y1="30" x2="88" y2="30" stroke={glow} strokeWidth="0.15" opacity="0.3" />
    </g>
  );
}

function Nib({ glow }: Props) {
  return (
    <g opacity="0.9">
      <path
        d="M 50 12 L 58 40 L 50 48 L 42 40 Z"
        fill={glow}
        opacity="0.55"
      />
      <path
        d="M 50 12 L 58 40 L 50 48 L 42 40 Z"
        fill="none"
        stroke={glow}
        strokeWidth="0.35"
      />
      <line x1="50" y1="28" x2="50" y2="48" stroke="rgba(0,0,0,0.45)" strokeWidth="0.45" />
      <circle cx="50" cy="26" r="1.4" fill="rgba(0,0,0,0.5)" />
      <line x1="30" y1="12" x2="70" y2="12" stroke={glow} strokeWidth="0.15" opacity="0.25" />
    </g>
  );
}

const motifMap: Record<string, (p: Props) => React.ReactElement> = {
  cmp_niche_01: Barbell,
  cmp_niche_02: Halo,
  cmp_niche_03: Chip,
  cmp_niche_04: Floppy,
  cmp_niche_05: Plates,
  cmp_niche_06: Candles,
  cmp_niche_07: Globe,
  cmp_niche_08: Pearl,
  cmp_niche_09: Quotes,
  cmp_niche_10: Growth,
  cmp_niche_11: Watch,
  cmp_niche_12: Bubbles,
  cmp_niche_13: Profile,
  cmp_niche_14: Wave,
  cmp_niche_15: Nib,
};

export function CampaignMotif({ id, glow }: { id: string; glow: string }) {
  const Motif = motifMap[id];
  if (!Motif) return null;
  return <Motif glow={glow} />;
}
