import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site-url";

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
    "/tampa/nightmare-on-channelside",
    "/tampa/nightmare-on-channelside/merch",
  ];

  return routes.map((route, index) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "daily" : "weekly",
    priority: index === 0 ? 1 : route.includes("nightmare-on-channelside") || route === "/atlanta/bravo" ? 0.95 : 0.8,
  }));
}
