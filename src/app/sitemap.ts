import type { MetadataRoute } from "next";

const BASE = "https://thenexusclub.org";

/**
 * Public, indexable surface only. Auth-gated routes (dashboard, earnings,
 * applications, settings, onboarding, support) are excluded by robots.ts
 * and omitted here too.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/about", changeFrequency: "monthly", priority: 0.9 },
    { path: "/how-it-works", changeFrequency: "monthly", priority: 0.9 },
    { path: "/campaigns", changeFrequency: "weekly", priority: 0.8 },
    { path: "/creators", changeFrequency: "weekly", priority: 0.8 },
    { path: "/dispatches", changeFrequency: "weekly", priority: 0.7 },
    { path: "/help", changeFrequency: "monthly", priority: 0.7 },

    // Trust + legal surface
    { path: "/verification", changeFrequency: "monthly", priority: 0.85 },
    { path: "/trust", changeFrequency: "monthly", priority: 0.85 },
    { path: "/curation", changeFrequency: "monthly", priority: 0.8 },
    { path: "/standards", changeFrequency: "monthly", priority: 0.7 },
    { path: "/house-rules", changeFrequency: "yearly", priority: 0.6 },
    { path: "/community-guidelines", changeFrequency: "yearly", priority: 0.6 },
    { path: "/code-of-conduct", changeFrequency: "yearly", priority: 0.6 },
    { path: "/disputes", changeFrequency: "yearly", priority: 0.6 },
    { path: "/security", changeFrequency: "yearly", priority: 0.6 },
    { path: "/subprocessors", changeFrequency: "monthly", priority: 0.5 },
    { path: "/dpa", changeFrequency: "yearly", priority: 0.5 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.5 },
    { path: "/terms-brands", changeFrequency: "yearly", priority: 0.5 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.5 },
    { path: "/copyright", changeFrequency: "yearly", priority: 0.5 },
    { path: "/accessibility", changeFrequency: "yearly", priority: 0.5 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
