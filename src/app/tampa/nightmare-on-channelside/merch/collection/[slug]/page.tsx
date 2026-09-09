import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NIGHTMARE_EVENT } from "../../../event-config";
import styles from "../../merch.module.css";
import upgrade from "../../merch-upgrade.module.css";
import final from "../../merch-final.module.css";
import { getCollection as getFallbackCollection } from "../../merch-data";
import { formatPrice, getMerchCatalog } from "../../catalog";
import { BagIndicator } from "../../shop-client";

type RouteParams = { slug: string };
type Props = { params: Promise<RouteParams> };

const spritePositions = ["0% 0%","100% 0%","0% 25%","100% 25%","0% 50%","100% 50%","0% 75%","100% 75%","0% 100%","100% 100%"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getFallbackCollection(slug);
  if (!collection) return {};
  return {
    title: `${collection.name} Merch — Nightmare on Channelside`,
    description: `${collection.subtitle} Official products from the Nightmare on Channelside Shopify catalog.`,
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
  const lowestPrice = products.length ? Math.min.apply(null, products.map((product) => product.price_cents)) : 0;
  const productTypes = Array.from(products.reduce<Record<string, true>>((result, product) => {
    result[product.product_type] = true;
    return result;
  }, {}) ? Object.keys(products.reduce<Record<string, true>>((result, product) => { result[product.product_type] = true; return result; }, {})) : []).slice(0, 4);

  return (
    <main className={`${styles.shell} ${upgrade.shell}`} style={vars}>
      <div className={styles.noise} />
      <header className={`${styles.storeHeader} ${upgrade.storeHeader}`}>
        <Link href="/" className={`${styles.logo} ${upgrade.logo}`}>ICONIC</Link>
        <nav className={styles.desktopNav}><Link href="/tampa/nightmare-on-channelside/merch">MERCH HOME</Link><Link href="/tampa/nightmare-on-channelside">EVENT</Link><a href="#products">DROP</a></nav>
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
          <span>{products.length} LIVE SHOPIFY PRODUCTS / HALLOWEEN CAPSULE</span>
          <h2>{collection.subtitle}</h2>
          <p>Every product below is live in the official NOC Shopify catalog. Product names, prices, images and purchasable variants are pulled from Shopify rather than placeholder merch data.</p>
          <div className={styles.collectionStats}><div><b>{products.length}</b><span>LIVE PRODUCTS</span></div><div><b>{productTypes.length}</b><span>GARMENT TYPES</span></div><div><b>{lowestPrice ? formatPrice(lowestPrice) : "—"}</b><span>FROM</span></div></div>
        </div>
      </section>

      <section className={`${styles.productsSection} ${upgrade.productsSection}`} id="products">
        <div className={styles.productsHeading}><div><span>THE LIVE DROP</span><h2>{collection.name}</h2></div><p>{productTypes.join(" · ") || "OFFICIAL NOC MERCH"}</p></div>
        <div className={styles.productGridNew}>
          {products.map((product) => (
            <Link href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}/${product.sku}`} className={`${styles.productCardNew} ${upgrade.dropCard}`} key={product.shopify_product_id}>
              <div className={`${styles.productVisual} ${upgrade.productVisual} ${final.productVisualLive}`}>
                {product.primary_image_url ? (
                  <img src={product.primary_image_url} alt={product.title} className={final.catalogArtwork} />
                ) : (
                  <div className={styles.teeShape}><span>{collection.name}</span><b>{String(product.design_number).padStart(2,"0")}</b></div>
                )}
                <span className={styles.dropBadge}>SHOPIFY LIVE</span>
              </div>
              <div className={styles.productCardCopy}><div><strong>{product.title}</strong><span>{product.product_type}</span></div><b>{formatPrice(product.price_cents)}</b></div>
              <div className={styles.productStatus}>{product.variants.some((variant) => variant.available) ? "AVAILABLE" : "SOLD OUT"}</div>
            </Link>
          ))}
        </div>
      </section>

      <footer className={`${styles.storeFooter} ${upgrade.storeFooter}`}>
        <div><strong>ICONIC</strong><p>Nightmare on Channelside / Tampa.</p></div>
        <div><b>COLLECTION</b><span>{collection.name}</span><span>{products.length} SHOPIFY PRODUCTS</span></div>
        <div><b>COMMERCE</b><span>LIVE VARIANTS</span><span>SHOPIFY CHECKOUT</span></div>
      </footer>
    </main>
  );
}
