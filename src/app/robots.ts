import type { MetadataRoute } from "next";

const BASE = "https://thenexusclub.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard",
          "/settings",
          "/earnings",
          "/applications/",
          "/onboarding/",
          "/connect/",
          "/reset-password/",
          "/support",
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
