import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollection as getFallbackCollection } from "../../merch-data";
import { getMerchCatalog } from "../../catalog";
import { worldLanguage } from "../../noc-assets";
import { ProductCard, StoreFooter, StoreHeader, StoreSubnav } from "../../noc-ui";
import premium from "../../noc-premium.module.css";

type RouteParams = { slug: string };
type Props = { params: Promise<RouteParams> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fallback = getFallbackCollection(slug);
  if (!fallback) return {};
  const world = worldLanguage(slug, fallback.mood, fallback.subtitle);
  const path = `/tampa/nightmare-on-channelside/merch/collection/${slug}`;
  const title = `${world.title} — ${fallback.name} | Nightmare on Channelside`;
  return {
    title,
    description: world.story,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "ICONIC",
      title,
      description: world.story,
      url: path,
      images: [{ url: world.image, alt: `${fallback.name} Nightmare on Channelside collection` }],
    },
    twitter: { card: "summary_large_image", title, description: world.story, images: [world.image] },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const catalog = await getMerchCatalog();
  const collection = catalog.collections.find((item) => item.slug === slug);
  if (!collection) notFound();
  const products = catalog.products
    .filter((item) => item.collection_slug === collection.slug)
    .sort((a, b) => a.design_number - b.design_number);
  const world = worldLanguage(collection.slug, collection.mood, collection.subtitle);

  return (
    <main className={premium.shell}>
      <StoreHeader />
      <section className={premium.collectionHero}>
        <img src={world.image} alt={`${collection.name} Nightmare on Channelside campaign world`} fetchPriority="high" decoding="async" />
        <div className={premium.collectionHeroCopy}>
          <span>{collection.name} · NIGHTMARE ON CHANNELSIDE</span>
          <h1>{world.title}</h1>
          <p>{world.story}</p>
        </div>
      </section>
      <StoreSubnav />
      <div className={premium.container}>
        <section className={premium.section}>
          <div className={premium.sectionHead}>
            <span className={premium.eyebrow}>{world.line}</span>
            <h2>THE {collection.name} ISSUE.</h2>
            <p>Every piece below is pulled from the live NOC Shopify catalog for this world.</p>
          </div>
          <div className={premium.productGrid}>{products.map((product) => <ProductCard key={product.shopify_product_id} product={product} />)}</div>
        </section>
      </div>
      <StoreFooter />
    </main>
  );
}
