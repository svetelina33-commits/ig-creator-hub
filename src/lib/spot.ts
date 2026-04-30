/**
 * Map a campaign cover tone (or any palette name) to the spotlight
 * modifier class used on .nc-card. Falls back to violet for any
 * unrecognised value so the card still picks up the brand halo.
 */
export type SpotTone =
  | "forest"
  | "vermillion"
  | "ochre"
  | "ink"
  | "gold"
  | "peach"
  | "violet";

const TONE_TO_SPOT: Record<SpotTone, string> = {
  forest: "spot-forest",
  vermillion: "spot-vermillion",
  ochre: "spot-ochre",
  ink: "spot-ink",
  gold: "spot-gold",
  peach: "spot-peach",
  violet: "spot-violet",
};

export function spotClass(tone: string | undefined | null): string {
  if (!tone) return "spot-violet";
  return TONE_TO_SPOT[tone as SpotTone] ?? "spot-violet";
}
