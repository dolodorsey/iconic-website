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

  const vars = { "--accent": collection.accent, "--secondary": collection.secondary } as CSSProperties;
  const canSell = product.variants.some((variant) => variant.available);

  return (
    <main className={`${styles.shell} ${upgrade.shell} ${final.cinematicShell}`} style={vars}>
      <div className={styles.noise} />
      <header className={`${styles.storeHeader} ${upgrade.storeHeader} ${final.cleanHeader}`}>
        <Link href="/" className={`${styles.logo} ${upgrade.logo}`}>ICONIC</Link>
        <nav className={styles.desktopNav}><Link href="/tampa/nightmare-on-channelside/merch">MERCH HOME</Link><Link href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`}>THE WORLD</Link><Link href="/tampa/nightmare-on-channelside">EVENT</Link></nav>
        <div className={styles.headerTools}><BagIndicator /></div>
      </header>

      <section className={styles.productDetailNew}>
        <div className={`${styles.productDetailVisual} ${upgrade.productDetailVisual} ${final.productDetailVisualTight}`}>
          <ProductGallery images={product.images} title={product.title} />
        </div>

        <div className={`${styles.productDetailCopy} ${upgrade.productDetailCopy}`}>
          <Link className={styles.back} href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`}>← BACK TO {collection.mood}</Link>
          <span className={styles.productKicker}>{collection.name} / {collection.mood}</span>
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
    </main>
  );
}
