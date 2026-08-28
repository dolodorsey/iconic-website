import type { MetadataRoute } from "next";

const base = "https://iconic-atl.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/atlanta",
    "/atlanta/halloween",
    "/atlanta/bravo",
    "/atlanta/grown-ish",
    "/atlanta/soul-session",
    "/new-york",
    "/new-york/resorts-world",
    "/new-york/encore",
    "/new-york/funny-business",
    "/las-vegas",
  ];

  return routes.map((route, index) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "daily" : "weekly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
