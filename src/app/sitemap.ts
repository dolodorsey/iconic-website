import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site-url";
import { getMerchCatalog } from "./tampa/nightmare-on-channelside/merch/catalog";

const MERCH_BASE = "/tampa/nightmare-on-channelside/merch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const coreRoutes = [
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
    MERCH_BASE,
    `${MERCH_BASE}/shop`,
    `${MERCH_BASE}/worlds`,
    `${MERCH_BASE}/policies`,
  ];

  const catalog = await getMerchCatalog();
  const collectionRoutes = catalog.collections.map((collection) => `${MERCH_BASE}/collection/${collection.slug}`);
  const productRoutes = catalog.products.map((product) => `${MERCH_BASE}/collection/${product.collection_slug}/${product.sku}`);
  const routes = Array.from(new Set([...coreRoutes, ...collectionRoutes, ...productRoutes]));

  return routes.map((route, index) => {
    const isProduct = route.split("/").length >= 8;
    const isCollection = route.includes(`${MERCH_BASE}/collection/`) && !isProduct;
    const isMerch = route.startsWith(MERCH_BASE);
    const isPolicy = route === `${MERCH_BASE}/policies`;
    return {
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: (isPolicy ? "monthly" : isMerch ? "daily" : index === 0 ? "daily" : "weekly") as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: index === 0 ? 1 : isPolicy ? 0.5 : isProduct ? 0.8 : isCollection ? 0.9 : route.includes("nightmare-on-channelside") || route === "/atlanta/bravo" ? 0.95 : 0.8,
    };
  });
}
