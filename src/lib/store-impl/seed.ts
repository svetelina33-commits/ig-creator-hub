import type { CampaignRecord } from "./types";

export const SEED_CAMPAIGNS: CampaignRecord[] = [
  {
    id: "cmp_seed_01",
    slug: "maison-ophir-fw26",
    title: "Autumn Dossier",
    brand: "Maison Ophir",
    tagline: "A quiet luxury edit for the cold months.",
    brief:
      "We're looking for three creators with a distinct, editorial point-of-view to feature the Maison Ophir FW26 capsule. One carousel post and one Reel, shot in natural light. Styling freedom within our moodboard.",
    payoutCents: 180000,
    currency: "USD",
    deadline: "2026-05-20",
    deliverables: [
      { kind: "post", count: 1 },
      { kind: "reel", count: 1 },
    ],
    status: "open",
    coverTone: "forest",
    createdAt: "2026-04-12T09:00:00.000Z",
  },
  {
    id: "cmp_seed_02",
    slug: "helia-vol-02",
    title: "Volume 02",
    brand: "Helia",
    tagline: "Slow mornings. Warm rituals. A product story.",
    brief:
      "A single 60–90 second Reel narrating your morning ritual with our new ceramic pour-over. We license the footage for 90 days across Helia's channels.",
    payoutCents: 85000,
    currency: "USD",
    deadline: "2026-05-02",
    deliverables: [{ kind: "reel", count: 1 }],
    status: "open",
    coverTone: "ochre",
    createdAt: "2026-04-14T10:30:00.000Z",
  },
  {
    id: "cmp_seed_03",
    slug: "folio-press-launch",
    title: "Folio Press — launch week",
    brand: "Folio Press",
    tagline: "An independent bookshop, now online.",
    brief:
      "Help us open the doors. One Story set (minimum 6 frames) on launch day and one carousel post within the first week. Genuine voice required — we review portfolios.",
    payoutCents: 60000,
    currency: "USD",
    deadline: "2026-05-30",
    deliverables: [
      { kind: "story", count: 6 },
      { kind: "post", count: 1 },
    ],
    status: "open",
    coverTone: "vermillion",
    createdAt: "2026-04-18T08:15:00.000Z",
  },
];

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}
