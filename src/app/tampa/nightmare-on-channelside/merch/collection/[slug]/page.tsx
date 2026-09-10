import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollection as getFallbackCollection } from "../../merch-data";
import { getMerchCatalog } from "../../catalog";
import { NOC_MEDIA } from "../../noc-assets";
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
  const image = product?.primary_image_url || NOC_MEDIA.headliners;

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
  const showcase = products.filter((product) => product.primary_image_url).slice(0, 3);

  return (
    <main className={premium.shell}>
      <StoreHeader />

      <section className="noc-collection-showcase">
        <div className="noc-collection-showcase-copy">
          <span>OFFICIAL NOC COLLECTION</span>
          <h1 className="noc-collection-title">{collection.name}</h1>
          <p>{collection.subtitle}</p>
          <a href="#collection-products">SHOP COLLECTION ↓</a>
        </div>

        <div className="noc-collection-showcase-media" aria-label={`${collection.name} featured merchandise`}>
          {showcase.map((product, index) => (
            <div className="noc-collection-showcase-product" key={product.shopify_product_id}>
              {product.primary_image_url ? <img src={product.primary_image_url} alt={`${product.title} front view`} fetchPriority={index === 0 ? "high" : "auto"} decoding="async" /> : null}
              <span>{index === 0 ? "FEATURED" : `LOOK ${index + 1}`}</span>
            </div>
          ))}
        </div>
      </section>

      <StoreSubnav />

      <div className={premium.container}>
        <section className={premium.section} id="collection-products">
          <div className={premium.sectionHead}>
            <span className={premium.eyebrow}>NIGHTMARE ON CHANNELSIDE · TAMPA</span>
            <h2 className="noc-editorial-heading">{collection.name}</h2>
            <p>Front and back at a glance. Open any piece for live sizes, variants and checkout.</p>
          </div>
          <div className={premium.productGrid}>{products.map((product) => <ProductCard key={product.shopify_product_id} product={product} />)}</div>
        </section>
      </div>

      <StoreFooter />
    </main>
  );
}
