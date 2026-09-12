import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site-url";
import { PMF_CITIES } from "./dj-snake-pardon-my-french/cities";
import { SOUL_SYMPHONY_CITIES } from "./summer-walker/cities";
import { getMerchCatalog } from "./tampa/nightmare-on-channelside/merch/catalog";

const MERCH_BASE = "/tampa/nightmare-on-channelside/merch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const coreRoutes = [
    "",
    "/about",
    "/events",
    "/experiences",
    "/social",
    "/creators",
    "/music",
    "/media",
    "/partners",
    "/book",
    "/contact",
    "/tampa-halloween",
    "/summer-walker",
    "/dj-snake-pardon-my-french",
    "/merch",
    "/access",
    "/privacy",
    "/terms",
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

  const pmfCityRoutes = PMF_CITIES.map((market)=>`/dj-snake-pardon-my-french/${market.slug}`);
  const soulCityRoutes = SOUL_SYMPHONY_CITIES.map((market)=>`/summer-walker/${market.slug}`);
  const catalog = await getMerchCatalog();
  const collectionRoutes = catalog.collections.map((collection) => `${MERCH_BASE}/collection/${collection.slug}`);
  const productRoutes = catalog.products.map((product) => `${MERCH_BASE}/collection/${product.collection_slug}/${product.sku}`);
  const routes = Array.from(new Set([...coreRoutes, ...pmfCityRoutes, ...soulCityRoutes, ...collectionRoutes, ...productRoutes]));

  return routes.map((route, index) => {
    const isProduct = route.split("/").length >= 8;
    const isCollection = route.includes(`${MERCH_BASE}/collection/`) && !isProduct;
    const isMerch = route.startsWith(MERCH_BASE) || route === "/merch";
    const isPolicy = route === `${MERCH_BASE}/policies` || route === "/privacy" || route === "/terms";
    const isPmfCity=route.startsWith("/dj-snake-pardon-my-french/");
    const isSoulCity=route.startsWith("/summer-walker/");
    const isPlatform=["/about","/events","/experiences","/social","/creators","/music","/media","/partners","/book","/contact"].includes(route);
    const isCurrentSlate=["/tampa-halloween","/summer-walker","/dj-snake-pardon-my-french","/merch"].includes(route);
    return {
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: (isPolicy ? "monthly" : isMerch || isCurrentSlate || isPmfCity || isSoulCity || isPlatform ? "daily" : index === 0 ? "daily" : "weekly") as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: index === 0 ? 1 : isCurrentSlate ? 0.98 : isPmfCity || isSoulCity ? 0.96 : isPlatform ? 0.94 : isPolicy ? 0.5 : isProduct ? 0.8 : isCollection ? 0.9 : route.includes("nightmare-on-channelside") || route === "/atlanta/bravo" ? 0.95 : 0.8,
    };
  });
}
