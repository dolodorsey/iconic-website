import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NIGHTMARE_EVENT } from "../../../event-config";
import styles from "../../merch.module.css";
import upgrade from "../../merch-upgrade.module.css";
import final from "../../merch-final.module.css";
import { collections as fallbackCollections, getCollection as getFallbackCollection } from "../../merch-data";
import { formatPrice, getMerchCatalog } from "../../catalog";
import { getFinishedSpriteArtwork } from "../../artwork-sprite";
import { BagIndicator } from "../../shop-client";

type RouteParams = { slug: string };
type Props = { params: Promise<RouteParams> };

const spritePositions = ["0% 0%","100% 0%","0% 25%","100% 25%","0% 50%","100% 50%","0% 75%","100% 75%","0% 100%","100% 100%"];

export function generateStaticParams() {
  return fallbackCollections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getFallbackCollection(slug);
  if (!collection) return {};
  return {
    title: `${collection.name} Halloween Merch — Nightmare on Channelside`,
    description: `${collection.subtitle} Ten official designs in the ICONIC Nightmare on Channelside collection.`,
    alternates: { canonical: `/tampa/nightmare-on-channelside/merch/collection/${slug}` },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const catalog = await getMerchCatalog();
  const collection = catalog.collections.find((item) => item.slug === slug);
  if (!collection) notFound();
  const products = catalog.products.filter((item) => item.collection_slug === collection.slug).sort((a,b) => a.design_number - b.design_number);
  const rawCode = Number.parseInt(collection.code.replace(/\D/g, ""), 10);
  const artPos = spritePositions[(Number.isFinite(rawCode) ? Math.max(rawCode - 1, 0) : 0) % spritePositions.length];
  const vars = { "--accent": collection.accent, "--secondary": collection.secondary, "--art-pos": artPos } as CSSProperties;
  const finishedCount = products.filter((product) => Boolean(product.primary_image_url || getFinishedSpriteArtwork(product.collection_slug, product.design_number))).length;

  return (
    <main className={`${styles.shell} ${upgrade.shell}`} style={vars}>
      <div className={styles.noise} />
      <header className={`${styles.storeHeader} ${upgrade.storeHeader}`}>
        <Link href="/" className={`${styles.logo} ${upgrade.logo}`}>ICONIC</Link>
        <nav className={styles.desktopNav}><Link href="/tampa/nightmare-on-channelside/merch">MERCH HOME</Link><Link href="/tampa">EVENTS</Link><a href="#products">DROP</a></nav>
        <div className={styles.headerTools}><BagIndicator /></div>
      </header>
      <div className={`${styles.eventTicker} ${upgrade.eventTicker}`}><div className={styles.eventTickerTrack}><span>NIGHTMARE ON CHANNELSIDE · {collection.name} · HALLOWEEN {NIGHTMARE_EVENT.year} · TAMPA, FL</span><span>NIGHTMARE ON CHANNELSIDE · {collection.name} · HALLOWEEN {NIGHTMARE_EVENT.year} · TAMPA, FL</span></div></div>

      <section className={styles.collectionHeroNew}>
        <div className={`${styles.collectionPosterLarge} ${upgrade.collectionPosterLarge}`}>
          <span className={styles.posterCode}>{collection.code}</span>
          <div className={styles.collectionHeroCopy}><span>ICONIC / COLLECTION {collection.code}</span><h1>{collection.name}</h1><em>{collection.mood}</em></div>
        </div>
        <div className={`${styles.collectionInfo} ${upgrade.collectionInfo}`}>
          <Link className={styles.back} href="/tampa/nightmare-on-channelside/merch">← ALL COLLECTIONS</Link>
          <span>10 DESIGNS / LIMITED HALLOWEEN CAPSULE</span>
          <h2>{collection.subtitle}</h2>
          <p>{finishedCount > 0 ? `${finishedCount} finished designs are now loaded into this collection. Each product route keeps its own SKU, price, size selection and artwork.` : "This collection is built and routed. Finished artwork will replace each clearly marked coming-soon slot as production completes."}</p>
          <div className={styles.collectionStats}><div><b>10</b><span>DESIGNS</span></div><div><b>{finishedCount}</b><span>FINISHED ART</span></div><div><b>$45</b><span>BASE TEE</span></div></div>
        </div>
      </section>

      <section className={`${styles.productsSection} ${upgrade.productsSection}`} id="products">
        <div className={styles.productsHeading}><div><span>THE DROP</span><h2>{collection.name}</h2></div><p>GRAPHIC TEES · LIMITED TEES · S–3XL</p></div>
        <div className={styles.productGridNew}>
          {products.map((product) => {
            const localArtwork = getFinishedSpriteArtwork(product.collection_slug, product.design_number);
            const artVars = localArtwork ? {
              "--merch-art": `url("${localArtwork.url}")`,
              "--merch-pos": localArtwork.position,
            } as CSSProperties : undefined;
            const hasArtwork = Boolean(product.primary_image_url || localArtwork);
            return (
              <Link href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}/${product.sku}`} className={`${styles.productCardNew} ${upgrade.dropCard}`} key={product.sku}>
                <div className={`${styles.productVisual} ${upgrade.productVisual} ${hasArtwork ? final.productVisualLive : ""}`}>
                  {product.primary_image_url ? (
                    <img src={product.primary_image_url} alt={product.title} className={final.catalogArtwork} />
                  ) : localArtwork ? (
                    <div className={final.finishedArtwork} style={artVars} aria-label={localArtwork.label} />
                  ) : (
                    <div className={styles.teeShape}><span>{collection.name}</span><b>{String(product.design_number).padStart(2,"0")}</b></div>
                  )}
                  <span className={styles.dropBadge}>{hasArtwork ? "FINISHED DROP" : "COMING SOON"}</span>
                </div>
                <div className={styles.productCardCopy}><div><strong>{product.title}</strong><span>{product.product_type}</span></div><b>{formatPrice(product.price_cents)}</b></div>
                <div className={styles.productStatus}>{hasArtwork ? "ARTWORK LOADED" : product.status}</div>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className={`${styles.storeFooter} ${upgrade.storeFooter}`}>
        <div><strong>ICONIC</strong><p>Nightmare on Channelside / Tampa.</p></div>
        <div><b>COLLECTION</b><span>{collection.name}</span><span>10 PRODUCT ROUTES</span></div>
        <div><b>ART STATUS</b><span>{finishedCount} / 10 FINISHED</span></div>
      </footer>
    </main>
  );
}
