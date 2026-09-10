import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site-url";
import styles from "../../../merch.module.css";
import upgrade from "../../../merch-upgrade.module.css";
import final from "../../../merch-final.module.css";
import premium from "../../../noc-premium.module.css";
import { formatPrice, getMerchCatalog } from "../../../catalog";
import { AddToBag, ProductGallery } from "../../../shop-client";
import { StoreFooter, StoreHeader } from "../../../noc-ui";

type RouteParams = { slug: string; product: string };
type Props = { params: Promise<RouteParams> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, product: productId } = await params;
  const catalog = await getMerchCatalog();
  const product = catalog.products.find((item) => item.sku === productId && item.collection_slug === slug);
  if (!product) return {};
  const path = `/tampa/nightmare-on-channelside/merch/collection/${slug}/${productId}`;
  const description = product.description || `Official Nightmare on Channelside ${product.product_type}.`;
  return {
    title: `${product.title} — Nightmare on Channelside`,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "ICONIC",
      title: product.title,
      description,
      url: path,
      images: product.primary_image_url ? [{ url: product.primary_image_url, alt: product.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: product.primary_image_url ? [product.primary_image_url] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug, product: productId } = await params;
  const catalog = await getMerchCatalog();
  const collection = catalog.collections.find((item) => item.slug === slug);
  const product = catalog.products.find((item) => item.sku === productId && item.collection_slug === slug);
  if (!collection || !product) notFound();

  const vars = { "--accent": collection.accent, "--secondary": collection.secondary } as CSSProperties;
  const canSell = product.variants.some((variant) => variant.available);
  const prices = product.variants.map((variant) => variant.price_cents / 100);
  const productPath = `/tampa/nightmare-on-channelside/merch/collection/${collection.slug}/${product.sku}`;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || `Official ${collection.name} merchandise from Nightmare on Channelside Halloween 2026.`,
    image: product.images,
    sku: product.sku,
    category: product.product_type,
    brand: { "@type": "Brand", name: "Nightmare on Channelside" },
    offers: {
      "@type": "AggregateOffer",
      url: `${SITE_URL}${productPath}`,
      priceCurrency: "USD",
      lowPrice: Math.min(...prices).toFixed(2),
      highPrice: Math.max(...prices).toFixed(2),
      offerCount: product.variants.length,
      availability: canSell ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <main className={`${premium.shell} ${styles.shell} ${upgrade.shell} ${final.cinematicShell}`} style={vars}>
      <StoreHeader />

      <section className={styles.productDetailNew}>
        <div className={`${styles.productDetailVisual} ${upgrade.productDetailVisual} ${final.productDetailVisualTight} ${premium.productDetailStage}`}>
          <ProductGallery images={product.images} title={product.title} />
        </div>

        <div className={`${styles.productDetailCopy} ${upgrade.productDetailCopy}`}>
          <Link className={styles.back} href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`}>← BACK TO {collection.name}</Link>
          <span className={styles.productKicker}>{collection.name} / NIGHTMARE ON CHANNELSIDE</span>
          <h1>{product.title}</h1>
          <div className={styles.detailPrice}>{formatPrice(product.price_cents)}</div>
          <p>{product.description || `Official ${collection.name} merchandise from the Nightmare on Channelside Halloween 2026 world.`}</p>

          <div className={final.dropCounter}>
            <div><span>ISSUE</span><b>AFTER DARK</b></div>
            <div><span>WORLD</span><b>{collection.name}</b></div>
            <div><span>STATUS</span><b>{canSell ? "IN THE NIGHT" : "GONE DARK"}</b></div>
            <small>Choose the live garment options below. Your exact selection carries into secure checkout.</small>
          </div>

          <div className={styles.detailRule}/>
          {canSell ? (
            <AddToBag variants={product.variants} options={product.options} />
          ) : (
            <div className={styles.dropLocked}><strong>GONE DARK</strong><span>This piece remains in the archive, but no size is available right now.</span></div>
          )}

          <div className={final.storyBlock}>
            <span>FROM THE NIGHT</span>
            <p>Built inside the Nightmare on Channelside world—arena energy, Tampa after dark and collectible concert culture in one piece.</p>
          </div>

          <div className={styles.productAssurances}><span>✦ OFFICIAL NOC ISSUE</span><span>✦ LIVE GARMENT OPTIONS</span><span>✦ SECURE CHECKOUT</span></div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, "\\u003c") }} />
      <StoreFooter />
    </main>
  );
}
