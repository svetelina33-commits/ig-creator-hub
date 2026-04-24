/**
 * Curated directory of reference Instagram pages, organized by niche.
 * Surfaced on /creators as "The roster" — benchmark accounts in each
 * category that members can learn from. These are not Nexus Club members.
 * Handles are blurred in the UI; avatars are generated from the handle seed.
 */

export type FeaturedPage = {
  handle: string;
  name: string;
  description: string;
  followers?: string;
  verified?: boolean;
};

export type FeaturedCategory = {
  id: string;
  title: string;
  kicker: string;
  accent: "forest" | "vermillion" | "ochre" | "ink";
  pages: FeaturedPage[];
};

export const FEATURED_DIRECTORY: FeaturedCategory[] = [
  {
    id: "stoicism",
    title: "Stoicism & Mindset",
    kicker: "Discipline · clarity · kept",
    accent: "ink",
    pages: [
      {
        handle: "stoicmindset0",
        name: "Stoic Mindset",
        description:
          "Stoic quotes and mindset reels. Solo-operated, founder tagged in bio. One of the largest in the niche.",
        followers: "~941K",
        verified: true,
      },
      {
        handle: "thestoic",
        name: "The Stoic",
        description:
          "Classic stoic quote + reel page. Launched June 2023, already at half a million.",
        followers: "~500K",
      },
      {
        handle: "stoics.perspective",
        name: "Stoic's Perspective",
        description:
          "Part of Basem Kamal's publicly documented theme-page portfolio.",
      },
      {
        handle: "stoicsmindset",
        name: "Stoics Mindset",
        description:
          "Mid-size stoicism and philosophy curation — steady-growth cohort.",
      },
      {
        handle: "stoicsandstoicism",
        name: "Stoics & Stoicism",
        description:
          "Stoicism meets discipline and self-improvement. Crossover model.",
      },
    ],
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship & Money",
    kicker: "Build · ship · compound",
    accent: "forest",
    pages: [
      {
        handle: "theentrepreneurhq",
        name: "The Entrepreneur HQ",
        description:
          "Entrepreneur content by Basem Kamal — the portfolio-page operator.",
      },
      {
        handle: "entrepreneursonig",
        name: "Entrepreneurs on IG",
        description:
          "'Day count' branding hook — the format's innovator. Joined May 2024.",
        followers: "~342K",
      },
      {
        handle: "millionairessteps",
        name: "Millionaire's Steps",
        description:
          "Run by the Theme Page Insiders founder — OG indie operator.",
        followers: "~1.6M",
        verified: true,
      },
      {
        handle: "visualhustles",
        name: "Visual Hustles",
        description:
          "0 → 1M in seven months. Same operator as Millionaire's Steps.",
        followers: "~1.4M",
        verified: true,
      },
    ],
  },
  {
    id: "self-improvement",
    title: "Personal Development",
    kicker: "Self-made · self-kept",
    accent: "vermillion",
    pages: [
      {
        handle: "kreator.yash",
        name: "Kreator Yash",
        description:
          "Solo-run, launched March 2024. Rising self-improvement voice.",
        followers: "~95K",
      },
      {
        handle: "nonstopclassy",
        name: "Nonstop Classy",
        description:
          "Luxury + self-improvement hybrid. One to two posts a week — viral-heavy model.",
        followers: "~400K",
      },
      {
        handle: "scalewithbasem",
        name: "Scale with Basem",
        description:
          "Basem Kamal's personal brand — inside look at the operator system.",
      },
    ],
  },
  {
    id: "ai-tools",
    title: "AI Tools & Tech",
    kicker: "Prompts · pipelines · gains",
    accent: "ink",
    pages: [
      {
        handle: "aiwithzahra",
        name: "AI with Zahra",
        description:
          "Solo-run AI tools page with some of the tightest engagement in the niche.",
      },
      {
        handle: "aitoolsreport",
        name: "AI Tools Report",
        description: "Daily AI tool curation. Indie-run, shoutout-friendly.",
      },
      {
        handle: "theaitools",
        name: "The AI Tools",
        description: "AI tools discovery. Solo-operator format, quick turnaround.",
      },
    ],
  },
  {
    id: "geopolitics",
    title: "Geopolitics & World",
    kicker: "Maps · conflicts · currents",
    accent: "ochre",
    pages: [
      {
        handle: "insidegeopolitics",
        name: "Inside Geopolitics",
        description:
          "Solo-run. Maps-and-visuals-first global explainers — clean cartography.",
        followers: "~274K",
        verified: true,
      },
      {
        handle: "geopolitical.guy",
        name: "Geopolitical Guy",
        description:
          "'Geopolitics through maps' — the indie format's benchmark.",
        followers: "~372K",
        verified: true,
      },
      {
        handle: "geopoliticsnext",
        name: "Geopolitics Next",
        description:
          "Growing fast. Single operator, clean editorial style.",
        followers: "~38K",
      },
    ],
  },
  {
    id: "soft-feminine",
    title: "Soft Feminine & Aesthetic",
    kicker: "Slow · clean · kept sacred",
    accent: "vermillion",
    pages: [
      {
        handle: "ethereal.aesthetic",
        name: "Ethereal Aesthetic",
        description: "Soft-feminine curation at its most refined. Indie.",
      },
      {
        handle: "aestheticallyvogue",
        name: "Aesthetically Vogue",
        description:
          "Fashion and lifestyle aesthetic curation. Editorial cadence.",
      },
      {
        handle: "divine.feminine.energy",
        name: "Divine Feminine Energy",
        description: "Feminine-energy niche. Solo-run, growing cohort.",
      },
    ],
  },
  {
    id: "dark-feminine",
    title: "Dark Feminine",
    kicker: "High standards · quiet presence",
    accent: "ink",
    pages: [
      {
        handle: "feminine.mystiq",
        name: "Feminine Mystiq",
        description: "Dark-feminine psychology. Solo-operator pattern throughout.",
      },
      {
        handle: "highvaluewoman.club",
        name: "High Value Woman Club",
        description:
          "High-value-woman positioning in the single-operator format.",
      },
    ],
  },
  {
    id: "luxury",
    title: "Luxury & Wealth",
    kicker: "Aspiration · watches · jets",
    accent: "ochre",
    pages: [
      {
        handle: "billionaireharbour",
        name: "Billionaire Harbour",
        description:
          "'Inspiring future billionaires' with a newsletter funnel — classic indie monetization.",
        followers: "~364K",
        verified: true,
      },
      {
        handle: "wealthylifestyleinc",
        name: "Wealthy Lifestyle",
        description:
          "Swiss-based. Photo-credit model — pure curation, quiet luxury.",
        followers: "~160K",
        verified: true,
      },
      {
        handle: "luxury.moments",
        name: "Luxury Moments",
        description: "Luxury-lifestyle curation. Solo operator.",
      },
    ],
  },
  {
    id: "manifestation",
    title: "Manifestation & Spiritual",
    kicker: "Aligned · abundant · arrived",
    accent: "vermillion",
    pages: [
      {
        handle: "mukasmanifestation",
        name: "Muka's Manifestation",
        description:
          "Built by Muka — a 40-yr-old mom, launched while pregnant. Digital product attached.",
        followers: "~250K",
        verified: true,
      },
      {
        handle: "theuniverseguides",
        name: "The Universe Guides",
        description:
          "Manifestation + law-of-attraction curation. The category's template.",
      },
    ],
  },
  {
    id: "faceless",
    title: "Faceless & Anime",
    kicker: "Silent · drawn · kept",
    accent: "forest",
    pages: [
      {
        handle: "gregorsanimation",
        name: "Gregor's Animation",
        description:
          "Documented case study — $14K profit, solo operator, faceless animation.",
        followers: "~138K",
      },
      {
        handle: "animemindsetclub",
        name: "Anime Mindset Club",
        description:
          "Anime clips + stoic captions — the fast-growing anime-self-improvement hybrid.",
      },
    ],
  },
];

export function featuredPageCount(): number {
  return FEATURED_DIRECTORY.reduce((acc, cat) => acc + cat.pages.length, 0);
}
