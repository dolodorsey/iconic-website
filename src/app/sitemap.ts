import type { MetadataRoute } from "next";

const base = "https://iconic-atl.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/atlanta",
    "/southlake-arena",
    "/ball-series",
    "/atlanta/bravo",
    "/series/21-plus",
    "/series/30-plus",
    "/atlanta/halloween",
    "/new-york",
    "/new-york/resorts-world",
    "/new-york/encore",
    "/new-york/funny-business",
    "/las-vegas",
    "/washington-dc",
    "/tampa",
  ];

  return routes.map((route, index) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "daily" : "weekly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
