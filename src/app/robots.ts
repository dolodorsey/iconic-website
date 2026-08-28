import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://iconic-atl.com/sitemap.xml",
    host: "https://iconic-atl.com",
  };
}
