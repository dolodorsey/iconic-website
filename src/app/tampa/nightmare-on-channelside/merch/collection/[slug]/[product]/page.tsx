import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../../merch.module.css";
import upgrade from "../../../merch-upgrade.module.css";
import final from "../../../merch-final.module.css";
import { formatPrice, getMerchCatalog } from "../../../catalog";
import { AddToBag, BagIndicator, ProductGallery } from "../../../shop-client";

type RouteParams = { slug: string; product: string };
type Props = { params: Promise<RouteParams> };
const spritePositions = ["0% 0%","100% 0%","0% 25%","100% 25%","0% 50%","100% 50%","0% 75%","100% 75%","0% 100%","100% 100%"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, product: productId } = await params;
  const catalog = await getMerchCatalog();
  const product = catalog.products.find((item) => item.sku === productId && item.collection_slug === slug);
  if (!product) return {};
  return {
    title: `${product.title} — Nightmare on Channelside`,
    description: product.description || `Official Nightmare on Channelside ${product.product_type}.`,
    alternates: { canonical: `/tampa/nightmare-on-channelside/merch/collection/${slug}/${productId}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug, product: productId } = await params;
  const catalog = await getMerchCatalog();
  const collection = catalog.collections.find((item) => item.slug === slug);
  const product = catalog.products.find((item) => item.sku === productId && item.collection_slug === slug);
  if (!collection || !product) notFound();

  const artPos = spritePositions[(Math.max(product.design_number, 1) - 1) % spritePositions.length];
  const vars = { "--accent": collection.accent, "--secondary": collection.secondary, "--art-pos": artPos } as CSSProperties;
  const canSell = product.variants.some((variant) => variant.available);
  const number = String(product.design_number).padStart(2,"0");

  return (
    <main className={`${styles.shell} ${upgrade.shell}`} style={vars}>
      <div className={styles.noise} />
      <header className={`${styles.storeHeader} ${upgrade.storeHeader}`}>
        <Link href="/" className={`${styles.logo} ${upgrade.logo}`}>ICONIC</Link>
        <nav className={styles.desktopNav}><Link href="/tampa/nightmare-on-channelside/merch">MERCH HOME</Link><Link href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`}>COLLECTION</Link><Link href="/tampa/nightmare-on-channelside">EVENT</Link></nav>
        <div className={styles.headerTools}><BagIndicator /></div>
      </header>
      <div className={`${styles.eventTicker} ${upgrade.eventTicker}`}><div className={styles.eventTickerTrack}><span>NIGHTMARE ON CHANNELSIDE · {collection.name} · DROP {number}</span><span>NIGHTMARE ON CHANNELSIDE · {collection.name} · DROP {number}</span></div></div>

      <section className={styles.productDetailNew}>
        <div className={`${styles.productDetailVisual} ${upgrade.productDetailVisual} ${final.productDetailVisualTight}`}>
          <ProductGallery images={product.images} title={product.title} />
        </div>

        <div className={`${styles.productDetailCopy} ${upgrade.productDetailCopy}`}>
          <Link className={styles.back} href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`}>← BACK TO {collection.name}</Link>
          <span className={styles.productKicker}>{collection.name} / {product.product_type} / DROP {number}</span>
          <h1>{product.title}</h1>
          <div className={styles.detailPrice}>{formatPrice(product.price_cents)}</div>
          <p>{product.description || `Official ${collection.name} merchandise from the Nightmare on Channelside Halloween 2026 capsule.`}</p>

          <div className={final.dropCounter}>
            <div><span>DROP</span><b>{number}</b></div>
            <div><span>CATALOG</span><b>SHOPIFY LIVE</b></div>
            <div><span>STATUS</span><b>{canSell ? "AVAILABLE" : "SOLD OUT"}</b></div>
            <small>Price, garment options and variant availability on this page come directly from the official NOC Shopify catalog.</small>
          </div>

          <div className={styles.detailRule}/>
          {canSell ? (
            <AddToBag variants={product.variants} options={product.options} />
          ) : (
            <div className={styles.dropLocked}><strong>SOLD OUT</strong><span>This product remains in the NOC archive, but no Shopify variant is currently available.</span></div>
          )}

          <div className={final.storyBlock}>
            <span>THE PIECE</span>
            <p>Official Nightmare on Channelside merchandise connected directly to the event’s Shopify catalog. The product shown here is the same product and variant that enters Shopify checkout.</p>
          </div>

          <div className={styles.productAssurances}><span>✦ OFFICIAL NOC PRODUCT</span><span>✦ LIVE SHOPIFY VARIANTS</span><span>✦ SECURE SHOPIFY CHECKOUT</span></div>
          <div className={styles.skuLine}>SHOPIFY PRODUCT / {product.shopify_product_id}</div>
        </div>
      </section>
    </main>
  );
}
