import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../../merch.module.css";
import upgrade from "../../../merch-upgrade.module.css";
import { collections as fallbackCollections, getCollection as getFallbackCollection, getProductSlots } from "../../../merch-data";
import { formatPrice, getMerchCatalog } from "../../../catalog";
import { AddToBag, BagIndicator } from "../../../shop-client";

type Props = { params: { slug: string; product: string } };
const spritePositions = ["0% 0%","100% 0%","0% 25%","100% 25%","0% 50%","100% 50%","0% 75%","100% 75%","0% 100%","100% 100%"];

export function generateStaticParams() {
  return fallbackCollections.flatMap((collection) =>
    getProductSlots(collection).map((product) => ({ slug: collection.slug, product: product.id }))
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const collection = getFallbackCollection(params.slug);
  const product = collection ? getProductSlots(collection).find((item) => item.id === params.product) : undefined;
  if (!collection || !product) return {};
  return { title: `${product.title} — Nightmare on Channelside` };
}

export default async function ProductPage({ params }: Props) {
  const catalog = await getMerchCatalog();
  const collection = catalog.collections.find((item) => item.slug === params.slug);
  const product = catalog.products.find((item) => item.sku === params.product && item.collection_slug === params.slug);
  if (!collection || !product) notFound();
  const artPos = spritePositions[(Math.max(product.design_number, 1) - 1) % spritePositions.length];
  const vars = { "--accent": collection.accent, "--secondary": collection.secondary, "--art-pos": artPos } as CSSProperties;
  const canSell = Boolean(product.primary_image_url) || product.status.toUpperCase() === "LIVE";

  return (
    <main className={`${styles.shell} ${upgrade.shell}`} style={vars}>
      <div className={styles.noise} />
      <header className={`${styles.storeHeader} ${upgrade.storeHeader}`}>
        <Link href="/" className={`${styles.logo} ${upgrade.logo}`}>ICONIC</Link>
        <nav className={styles.desktopNav}><Link href="/tampa/nightmare-on-channelside/merch">MERCH HOME</Link><Link href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`}>COLLECTION</Link><Link href="/tampa">EVENT</Link></nav>
        <div className={styles.headerTools}><BagIndicator /></div>
      </header>
      <div className={`${styles.eventTicker} ${upgrade.eventTicker}`}><div className={styles.eventTickerTrack}><span>NIGHTMARE ON CHANNELSIDE · {collection.name} · DROP {String(product.design_number).padStart(2,"0")}</span><span>NIGHTMARE ON CHANNELSIDE · {collection.name} · DROP {String(product.design_number).padStart(2,"0")}</span></div></div>

      <section className={styles.productDetailNew}>
        <div className={`${styles.productDetailVisual} ${upgrade.productDetailVisual}`}>
          <div className={`${styles.detailFrame} ${upgrade.detailFrame}`}>
            <span className={styles.detailNumber}>{String(product.design_number).padStart(2,"0")}</span>
            <div className={styles.detailTee}><span>{collection.name}</span><b>NIGHTMARE<br/>ON CHANNELSIDE</b><em>{String(product.design_number).padStart(2,"0")}</em></div>
            {!product.primary_image_url && <div className={styles.artworkNotice}>FINAL ARTWORK SLOT</div>}
          </div>
          <div className={styles.thumbRail}><i/><i/><i/></div>
        </div>

        <div className={`${styles.productDetailCopy} ${upgrade.productDetailCopy}`}>
          <Link className={styles.back} href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`}>← BACK TO {collection.name}</Link>
          <span className={styles.productKicker}>{collection.name} / {product.product_type} / DESIGN {String(product.design_number).padStart(2,"0")}</span>
          <h1>{product.title}</h1>
          <div className={styles.detailPrice}>{formatPrice(product.price_cents)}</div>
          <p>{product.description}</p>
          <div className={styles.detailRule}/>
          {canSell ? (
            <AddToBag sku={product.sku} title={product.title} priceCents={product.price_cents} sizes={product.sizes} />
          ) : (
            <div className={styles.dropLocked}><strong>ARTWORK IN PRODUCTION</strong><span>This SKU is built and ready. Sales unlock when the finished merch graphic is loaded.</span></div>
          )}
          <div className={styles.productAssurances}><span>✦ PREMIUM HEAVYWEIGHT TEE</span><span>✦ LIMITED HALLOWEEN CAPSULE</span><span>✦ TAMPA / ICONIC</span></div>
          <div className={styles.skuLine}>SKU / {product.sku.toUpperCase()}</div>
        </div>
      </section>
    </main>
  );
}
