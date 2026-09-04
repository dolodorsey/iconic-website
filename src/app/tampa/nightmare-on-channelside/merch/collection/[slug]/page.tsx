import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../merch.module.css";
import { collections as fallbackCollections, getCollection as getFallbackCollection } from "../../merch-data";
import { formatPrice, getMerchCatalog } from "../../catalog";
import { BagIndicator } from "../../shop-client";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return fallbackCollections.map((collection) => ({ slug: collection.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const collection = getFallbackCollection(params.slug);
  if (!collection) return {};
  return {
    title: `${collection.name} Halloween Merch — Nightmare on Channelside`,
    description: `${collection.subtitle} Ten official designs in the ICONIC Nightmare on Channelside collection.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const catalog = await getMerchCatalog();
  const collection = catalog.collections.find((item) => item.slug === params.slug);
  if (!collection) notFound();
  const products = catalog.products.filter((item) => item.collection_slug === collection.slug).sort((a,b) => a.design_number - b.design_number);
  const vars = { "--accent": collection.accent, "--secondary": collection.secondary } as CSSProperties;

  return (
    <main className={styles.shell} style={vars}>
      <div className={styles.noise} />
      <header className={styles.storeHeader}>
        <Link href="/" className={styles.logo}>ICONIC</Link>
        <nav className={styles.desktopNav}><Link href="/tampa/nightmare-on-channelside/merch">MERCH HOME</Link><Link href="/tampa">EVENTS</Link><a href="#products">DROP</a></nav>
        <div className={styles.headerTools}><BagIndicator /></div>
      </header>
      <div className={styles.eventTicker}><div className={styles.eventTickerTrack}><span>NIGHTMARE ON CHANNELSIDE · {collection.name} · HALLOWEEN 2027 · TAMPA, FL</span><span>NIGHTMARE ON CHANNELSIDE · {collection.name} · HALLOWEEN 2027 · TAMPA, FL</span></div></div>

      <section className={styles.collectionHeroNew}>
        <div className={styles.collectionPosterLarge}>
          <span className={styles.posterCode}>{collection.code}</span>
          <span className={styles.bigGhostNumber}>{collection.code}</span>
          <div className={styles.collectionHeroCopy}><span>ICONIC / COLLECTION {collection.code}</span><h1>{collection.name}</h1><em>{collection.mood}</em></div>
        </div>
        <div className={styles.collectionInfo}>
          <Link className={styles.back} href="/tampa/nightmare-on-channelside/merch">← ALL COLLECTIONS</Link>
          <span>10 DESIGNS / LIMITED HALLOWEEN CAPSULE</span>
          <h2>{collection.subtitle}</h2>
          <p>Every design stays inside this collection’s own visual language. Finished artwork can replace any current slot without changing its SKU, route, price, or collection placement.</p>
          <div className={styles.collectionStats}><div><b>10</b><span>DESIGNS</span></div><div><b>{products.filter(p=>p.featured).length || 1}</b><span>FEATURED</span></div><div><b>$45</b><span>BASE TEE</span></div></div>
        </div>
      </section>

      <section className={styles.productsSection} id="products">
        <div className={styles.productsHeading}><div><span>THE DROP</span><h2>{collection.name}</h2></div><p>GRAPHIC TEES · LIMITED TEES · S–3XL</p></div>
        <div className={styles.productGridNew}>
          {products.map((product) => (
            <Link href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}/${product.sku}`} className={styles.productCardNew} key={product.sku}>
              <div className={styles.productVisual}>
                <div className={styles.teeShape}><span>{collection.name}</span><b>{String(product.design_number).padStart(2,"0")}</b></div>
                <span className={styles.dropBadge}>{product.primary_image_url ? "NEW DROP" : "ARTWORK SLOT"}</span>
              </div>
              <div className={styles.productCardCopy}><div><strong>{product.title}</strong><span>{product.product_type}</span></div><b>{formatPrice(product.price_cents)}</b></div>
              <div className={styles.productStatus}>{product.status}</div>
            </Link>
          ))}
        </div>
      </section>

      <footer className={styles.storeFooter}>
        <div><strong>ICONIC</strong><p>Nightmare on Channelside / Tampa.</p></div>
        <div><b>COLLECTION</b><span>{collection.name}</span><span>10 LIVE SKUS</span></div>
        <div><b>CATALOG</b><span>{catalog.source === "supabase" ? "SUPABASE LIVE" : "LOCAL FALLBACK"}</span></div>
      </footer>
    </main>
  );
}
