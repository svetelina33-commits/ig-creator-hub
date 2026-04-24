/**
 * Curated directory of reference Instagram pages, organized by niche.
 * Surfaced on /creators as "The roster" — external profile links only.
 * These are not Nexus Club members; they're the benchmark accounts in
 * each category that members can learn from.
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
    id: "ai-tech",
    title: "AI & Tech",
    kicker: "Systems · tools · models",
    accent: "ink",
    pages: [
      {
        handle: "ai",
        name: "Meta AI",
        description: "Meta's own AI page — the benchmark for AI content curation at scale.",
        verified: true,
      },
      {
        handle: "aiwithzahra",
        name: "AI with Zahra",
        description: "AI tools and tutorials with consistently high engagement per post.",
      },
      {
        handle: "theaiedge",
        name: "The AI Edge",
        description: "AI news, research breakdowns, and tool showcases for knowledge workers.",
      },
      {
        handle: "aitoolsguide",
        name: "AI Tools Guide",
        description: "Daily AI tool discovery — shoutout-friendly, stacked audience.",
      },
      {
        handle: "aihub_",
        name: "AI Hub",
        description: "AI art: Sora, Midjourney, Runway showcases — a generative gallery.",
      },
    ],
  },
  {
    id: "geo-news",
    title: "Geopolitics & News",
    kicker: "Maps · conflicts · currents",
    accent: "ochre",
    pages: [
      {
        handle: "insidegeopolitics",
        name: "Inside Geopolitics",
        description: "Map-driven global explainers. Clean cartography, strong hook rates.",
        followers: "274K",
      },
      {
        handle: "geopolitical.guy",
        name: "Geopolitical Guy",
        description: "Geopolitics through maps and visuals — the format's bestseller.",
        followers: "372K",
      },
      {
        handle: "geopoliticsnext",
        name: "Geopolitics Next",
        description: "Fast-growing, clean editorial style. One to benchmark against.",
        followers: "38K",
      },
      {
        handle: "morningbrewdaily",
        name: "Morning Brew Daily",
        description: "Business and geo news mashup. Massive engagement, tight voice.",
      },
      {
        handle: "visualeconomik",
        name: "Visual Economik",
        description: "Infographic-driven global economics explainers for scrollers.",
      },
    ],
  },
  {
    id: "motivation",
    title: "Motivation & High-Agency",
    kicker: "Discipline · quotes · locked in",
    accent: "vermillion",
    pages: [
      {
        handle: "millionaire_mentor",
        name: "Millionaire Mentor",
        description: "Luxury and motivation hybrid — the OG theme-page model.",
        followers: "2M+",
      },
      {
        handle: "motivationmafia",
        name: "Motivation Mafia",
        description: "One of the original IG motivation accounts. Template-setter.",
        followers: "700K+",
      },
      {
        handle: "thegoodquote",
        name: "The Good Quote",
        description: "The largest quote theme page on Instagram. Reference ceiling.",
        followers: "~19M",
      },
      {
        handle: "6amsuccess",
        name: "6 AM Success",
        description: "Discipline and morning-routine mindset content. Tight niche voice.",
      },
      {
        handle: "wealthygorilla",
        name: "Wealthy Gorilla",
        description: "Masculine self-improvement via quote carousels. Repeat-viewer hook.",
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
        handle: "millionaire.life.style",
        name: "Millionaire Life Style",
        description: "Pure luxury lifestyle curation — watches, cars, jets.",
        followers: "2M",
      },
      {
        handle: "billionaireharbour",
        name: "Billionaire Harbour",
        description: "'Inspiring future billionaires' with a newsletter funnel.",
        followers: "364K",
      },
      {
        handle: "wealthylifestyleinc",
        name: "Wealthy Lifestyle",
        description: "Swiss-based wealth aesthetic — quiet luxury, not bling.",
        followers: "160K",
      },
      {
        handle: "luxury",
        name: "Luxury",
        description: "One of the largest verified luxury curation accounts on IG.",
      },
    ],
  },
  {
    id: "finance",
    title: "Finance & Business",
    kicker: "Charts · tickers · terminals",
    accent: "forest",
    pages: [
      {
        handle: "morningbrew",
        name: "Morning Brew",
        description: "Corporate finance newsletter's IG arm. Voice benchmark.",
        followers: "3M+",
        verified: true,
      },
      {
        handle: "chartr",
        name: "Chartr",
        description: "Data-viz finance pages. Chart-of-the-day format, saveable.",
      },
      {
        handle: "thedailyupside",
        name: "The Daily Upside",
        description: "Finance news repackaged for scrollers. Sharp, quick.",
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
        description: "Clean-girl / soft-feminine curation at its most refined.",
      },
      {
        handle: "pinterest",
        name: "Pinterest",
        description: "Pinterest's own IG — the aesthetic benchmark, effectively a theme page.",
        verified: true,
      },
      {
        handle: "aestheticallyvogue",
        name: "Aesthetically Vogue",
        description: "Fashion and lifestyle aesthetic curation. Editorial cadence.",
      },
    ],
  },
  {
    id: "pop-culture",
    title: "Pop Culture & Drama",
    kicker: "Memes · breakups · discourse",
    accent: "vermillion",
    pages: [
      {
        handle: "pubity",
        name: "Pubity",
        description: "Among the largest meme / pop-culture pages on IG. Industry benchmark.",
        followers: "40M+",
        verified: true,
      },
      {
        handle: "pop.crave",
        name: "Pop Crave",
        description: "Celebrity and pop-culture news — extremely fast turnaround.",
      },
      {
        handle: "dailymail",
        name: "Daily Mail",
        description: "Tabloid content on IG. Massive engagement, controversial source.",
        verified: true,
      },
    ],
  },
  {
    id: "facts",
    title: "Facts & Knowledge",
    kicker: "Did you know · saveable",
    accent: "ink",
    pages: [
      {
        handle: "factsdaily",
        name: "Facts Daily",
        description: "The classic facts carousel page. Template for the whole niche.",
      },
      {
        handle: "onlmaps",
        name: "Only Maps",
        description: "Maps and geography facts. Highly saveable, faceless, compounding.",
      },
    ],
  },
];

export function featuredPageCount(): number {
  return FEATURED_DIRECTORY.reduce((acc, cat) => acc + cat.pages.length, 0);
}
