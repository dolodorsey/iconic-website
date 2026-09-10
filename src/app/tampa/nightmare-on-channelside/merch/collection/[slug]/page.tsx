import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollection as getFallbackCollection } from "../../merch-data";
import { getMerchCatalog } from "../../catalog";
import { COLLECTION_ART, NOC_MEDIA } from "../../noc-assets";
import { ProductCard, StoreFooter, StoreHeader, StoreSubnav } from "../../noc-ui";
import premium from "../../noc-premium.module.css";

type RouteParams = { slug: string };
type Props = { params: Promise<RouteParams> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fallback = getFallbackCollection(slug);
  if (!fallback) return {};

  const catalog = await getMerchCatalog();
  const product = catalog.products.find((item) => item.collection_slug === slug && item.primary_image_url);
  const path = `/tampa/nightmare-on-channelside/merch/collection/${slug}`;
  const title = `${fallback.name} — Nightmare on Channelside`;
  const description = fallback.subtitle || `Official ${fallback.name} Nightmare on Channelside merchandise.`;
  const image = COLLECTION_ART[slug] || product?.primary_image_url || NOC_MEDIA.headliners;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "ICONIC",
      title,
      description,
      url: path,
      images: [{ url: image, alt: `${fallback.name} Nightmare on Channelside collection` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
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
  const art = COLLECTION_ART[collection.slug];

  return (
    <main className={premium.shell}>
      <StoreHeader />

      <section className="noc-collection-artist-banner">
        <div className="noc-collection-artist-banner-media">
          {art ? <img src={art} alt={`${collection.name} Nightmare on Channelside collection artwork`} fetchPriority="high" decoding="async" /> : null}
        </div>
        <div className="noc-collection-artist-banner-copy">
          <span>OFFICIAL NIGHTMARE ON CHANNELSIDE COLLECTION</span>
          <h1>{collection.name}</h1>
          <p>{collection.subtitle}</p>
          <a href="#collection-products">SHOP COLLECTION ↓</a>
        </div>
      </section>

      <StoreSubnav />

      <div className={premium.container}>
        <section className={premium.section} id="collection-products">
          <div className={premium.sectionHead}>
            <span className={premium.eyebrow}>{collection.name} · TAMPA · HALLOWEEN 2026</span>
            <h2 className="noc-editorial-heading">THE COLLECTION</h2>
            <p>Front and back at a glance. Open any piece for live sizes, variants and checkout.</p>
          </div>
          <div className={premium.productGrid}>{products.map((product) => <ProductCard key={product.shopify_product_id} product={product} />)}</div>
        </section>
      </div>

      <StoreFooter />
    </main>
  );
}
