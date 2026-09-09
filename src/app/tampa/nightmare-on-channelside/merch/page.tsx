import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { NIGHTMARE_EVENT } from "../event-config";
import styles from "./merch.module.css";
import upgrade from "./merch-upgrade.module.css";
import final from "./merch-final.module.css";
import { formatPrice, getMerchCatalog, type CatalogCollection, type CatalogProduct } from "./catalog";
import { BagIndicator } from "./shop-client";

export const metadata: Metadata = {
  title: "Nightmare on Channelside — Official Merch",
  description: "Shop the live Nightmare on Channelside Halloween 2026 merch catalog powered by Shopify.",
  alternates: { canonical: "/tampa/nightmare-on-channelside/merch" },
  openGraph: {
    title: "Nightmare on Channelside — Official Merch",
    description: "Official NOC artist, Tampa and event merchandise connected directly to Shopify.",
    url: "/tampa/nightmare-on-channelside/merch",
  },
};

const spritePositions = [
  "0% 0%", "100% 0%", "0% 25%", "100% 25%", "0% 50%",
  "100% 50%", "0% 75%", "100% 75%", "0% 100%", "100% 100%",
];

const artClasses = [
  upgrade.art1, upgrade.art2, upgrade.art3, upgrade.art4, upgrade.art5,
  upgrade.art6, upgrade.art7, upgrade.art8, upgrade.art9, upgrade.art10,
];

function collectionVisualPosition(code: string) {
  const raw = Number.parseInt(code.replace(/\D/g, ""), 10);
  return spritePositions[(Number.isFinite(raw) ? Math.max(raw - 1, 0) : 0) % spritePositions.length];
}

function CollectionTile({ collection, compact = false, count = 0 }: { collection: CatalogCollection; compact?: boolean; count?: number }) {
  const vars = {
    "--accent": collection.accent,
    "--secondary": collection.secondary,
    "--art-pos": collectionVisualPosition(collection.code),
  } as CSSProperties;
  return (
    <Link
      href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`}
      className={`${compact ? styles.collectionMini : styles.collectionCard} ${upgrade.collectionTile}`}
      style={vars}
    >
      <span className={styles.collectionIndex}>{collection.code}</span>
      <span className={styles.posterName}>{collection.name}</span>
      {!compact && <span className={styles.posterMood}>{collection.mood}</span>}
      <small style={{ marginTop: 8, opacity: .58, fontSize: 9, letterSpacing: ".12em" }}>{count} LIVE PRODUCTS</small>
    </Link>
  );
}

function ProductCard({ product, collection }: { product: CatalogProduct; collection?: CatalogCollection }) {
  const vars = { "--accent": collection?.accent || "#ff3528" } as CSSProperties;
  return (
    <Link
      href={`/tampa/nightmare-on-channelside/merch/collection/${product.collection_slug}/${product.sku}`}
      className={`${styles.dropCard} ${upgrade.dropCard}`}
      style={vars}
    >
      <div className={`${styles.productVisual} ${upgrade.productVisual} ${final.productVisualLive}`}>
        {product.primary_image_url ? (
          <img src={product.primary_image_url} alt={product.title} className={final.catalogArtwork} />
        ) : (
          <div className={styles.teeShape}><span>{collection?.name || "NIGHTMARE"}</span><b>{String(product.design_number).padStart(2, "0")}</b></div>
        )}
        <span className={styles.dropBadge}>SHOPIFY LIVE</span>
      </div>
      <div className={styles.dropMeta}>
        <div><strong>{product.title}</strong><span>{product.product_type}</span></div>
        <b>{formatPrice(product.price_cents)}</b>
      </div>
    </Link>
  );
}

export default async function NightmareMerchPage() {
  const catalog = await getMerchCatalog();
  const featured = catalog.products.filter((product) => product.featured).slice(0, 8);
  const collectionMap = new Map(catalog.collections.map((collection) => [collection.slug, collection]));
  const collectionCounts = catalog.products.reduce<Record<string, number>>((result, product) => {
    result[product.collection_slug] = (result[product.collection_slug] || 0) + 1;
    return result;
  }, {});
  const ticker = [...catalog.collections, ...catalog.collections];

  return (
    <main className={`${styles.shell} ${upgrade.shell}`}>
      <div className={styles.noise} />

      <header className={`${styles.storeHeader} ${upgrade.storeHeader}`}>
        <Link href="/" className={`${styles.logo} ${upgrade.logo}`}>ICONIC</Link>
        <nav className={styles.desktopNav} aria-label="Store navigation">
          <Link href="/">HOME</Link><a href="#featured">SHOP</a><a href="#collections">COLLECTIONS</a><Link href="/tampa/nightmare-on-channelside">EVENT</Link><a href="#world">VISUAL WORLD</a><a href="#footer">ABOUT</a>
        </nav>
        <div className={styles.headerTools}><span>SHOPIFY LIVE</span><BagIndicator /></div>
      </header>

      {ticker.length > 0 && <div className={`${styles.eventTicker} ${upgrade.eventTicker}`}>
        <div className={styles.eventTickerTrack}>
          {ticker.map((collection, index) => <span key={`${collection.slug}-${index}`}>NIGHTMARE ON CHANNELSIDE · HALLOWEEN {NIGHTMARE_EVENT.year} · TAMPA, FL · {collection.name}</span>)}
        </div>
      </div>}

      <section className={`${upgrade.heroStage} ${final.heroStageFinal}`}>
        <div className={`${upgrade.heroVisual} ${final.heroVisualFinal}`} aria-label="Nightmare on Channelside Halloween visual world">
          <span className={upgrade.heroGlow} aria-hidden="true" />
        </div>
        <div className={`${upgrade.heroCommand} ${final.heroCommandFinal}`}>
          <span className={upgrade.eyebrow}>ICONIC PRESENTS / TAMPA / SHOPIFY LIVE</span>
          <h1><b>NIGHTMARE</b><em>ON CHANNELSIDE</em></h1>
          <h2>HALLOWEEN {NIGHTMARE_EVENT.year}</h2>
          <p>The official NOC product universe. Every live product, image, price and purchasable variant below comes from the dedicated Nightmare on Channelside Shopify collection.</p>
          <div className={upgrade.heroActions}>
            <a href="#featured" className={`${styles.primaryCta} ${upgrade.primaryCta}`}>SHOP THE LIVE DROP <span>→</span></a>
            <a href="#collections" className={upgrade.textCta}>EXPLORE {catalog.collections.length} LIVE COLLECTIONS</a>
          </div>
          <div className={upgrade.heroFacts}>
            <span><b>{catalog.products.length}</b> SHOPIFY PRODUCTS</span><span><b>{catalog.collections.length}</b> LIVE WORLDS</span><span><b>1</b> NOC CATALOG</span>
          </div>
        </div>
      </section>

      {catalog.source === "unavailable" ? (
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "90px 24px 130px" }}>
          <span style={{ color: "#ff3b30", fontSize: 10, fontWeight: 900, letterSpacing: ".2em" }}>SHOPIFY CATALOG TEMPORARILY UNAVAILABLE</span>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(42px,6vw,76px)", margin: "18px 0" }}>NO FAKE INVENTORY.</h2>
          <p style={{ maxWidth: 680, color: "rgba(255,255,255,.6)", lineHeight: 1.8 }}>The store intentionally fails closed rather than displaying fabricated products or stale prices. Refresh when the Shopify catalog connection is available.</p>
        </section>
      ) : (
        <>
          <section className={upgrade.collectionDeck} id="collections">
            <div className={upgrade.sectionHead}>
              <div><span>BROWSE THE NIGHTMARE</span><h2>SHOP BY COLLECTION</h2></div>
              <p>Only collections containing live NOC Shopify products appear here. Empty future collection concepts are not presented as sellable inventory.</p>
            </div>
            <div className={`${styles.miniGrid} ${upgrade.miniGrid} ${final.miniGridFinal}`}>
              {catalog.collections.map((collection) => <CollectionTile key={collection.slug} collection={collection} count={collectionCounts[collection.slug] || 0} compact />)}
            </div>
          </section>

          <section className={`${styles.benefits} ${upgrade.benefits}`} aria-label="Store benefits">
            <div><i>♛</i><strong>OFFICIAL NOC CATALOG</strong><span>Products isolated by NOC brand and event tags.</span></div>
            <div><i>◷</i><strong>LIVE VARIANTS</strong><span>Choose the actual Shopify garment options.</span></div>
            <div><i>▱</i><strong>REAL PRICING</strong><span>No placeholder $45 product layer.</span></div>
            <div><i>☠</i><strong>SHOPIFY CHECKOUT</strong><span>Secure payment, shipping and taxes.</span></div>
          </section>

          <section className={`${styles.featuredSection} ${upgrade.featuredSection}`} id="featured">
            <div className={styles.featuredIntro}>
              <span>LIVE FROM SHOPIFY</span><h2>FEATURED <em>DROPS</em></h2>
              <p>These are real NOC product records and images from today’s Shopify catalog—not website mockups or placeholder SKUs.</p>
              <a href="#allCollections" className={`${styles.primaryCta} ${upgrade.primaryCta}`}>VIEW ALL COLLECTIONS <span>→</span></a>
            </div>
            <div className={styles.featuredGrid}>
              {featured.map((product) => <ProductCard key={product.shopify_product_id} product={product} collection={collectionMap.get(product.collection_slug)} />)}
            </div>
          </section>

          <section className={upgrade.visualWorld} id="world">
            <div className={upgrade.sectionHead}>
              <div><span>THE CAMPAIGN WORLD</span><h2>ENTER THE NIGHTMARE</h2></div>
              <p>The original NOC campaign environment stays intact around the live commerce layer.</p>
            </div>
            <div className={upgrade.artGrid}>
              {artClasses.map((artClass, index) => (
                <div className={`${upgrade.artFrame} ${artClass}`} key={index} aria-label={`Nightmare visual ${index + 1}`} />
              ))}
            </div>
          </section>

          <section className={`${styles.collectionArchive} ${upgrade.collectionArchive}`} id="allCollections">
            <div className={styles.archiveHeading}><span>THE LIVE ARCHIVE</span><h2>{catalog.products.length} PRODUCTS. NO GENERIC MERCH.</h2><p>Shop by artist, Tampa, the full lineup, or the official event collection. Every route resolves to a real Shopify product.</p></div>
            <div className={`${styles.archiveGrid} ${upgrade.archiveGrid}`}>
              {catalog.collections.map((collection) => <CollectionTile key={collection.slug} collection={collection} count={collectionCounts[collection.slug] || 0} />)}
            </div>
          </section>

          {collectionMap.has("all-artists") && <section className={`${styles.allArtistsBanner} ${upgrade.allArtistsBanner}`}>
            <div>
              <span>FULL LINEUP</span><h2>ALL ARTISTS</h2><p>REP THE WHOLE LINEUP.<br/>ONE STAGE. ONE NIGHTMARE.</p>
              <Link className={`${styles.secondaryCta} ${upgrade.secondaryCta}`} href="/tampa/nightmare-on-channelside/merch/collection/all-artists">SHOP COLLECTION →</Link>
            </div>
            <div className={upgrade.allArtistsVisual} aria-hidden="true" />
          </section>}
        </>
      )}

      <footer className={`${styles.storeFooter} ${upgrade.storeFooter}`} id="footer">
        <div><strong>ICONIC</strong><p>Live entertainment turned into collectible culture.</p></div>
        <div><b>STORE</b><span>{catalog.products.length} NOC PRODUCTS</span><span>{catalog.collections.length} LIVE COLLECTIONS</span><span>TAMPA, FLORIDA</span></div>
        <div><b>COMMERCE</b><span>SHOPIFY PRODUCT SOURCE</span><span>SHOPIFY VARIANT CHECKOUT</span></div>
        <div><b>ISOLATION</b><span>BRAND:NOC</span><span>EVENT:NOC-2026</span></div>
      </footer>
    </main>
  );
}
