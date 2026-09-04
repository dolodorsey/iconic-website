import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import styles from "./merch.module.css";
import { formatPrice, getMerchCatalog, type CatalogCollection, type CatalogProduct } from "./catalog";
import { BagIndicator } from "./shop-client";

export const metadata: Metadata = {
  title: "Nightmare on Channelside — Official Merch",
  description: "Official ICONIC Nightmare on Channelside Halloween merch: 14 separate artist, Tampa, event and culture collections.",
};

function CollectionTile({ collection, compact = false }: { collection: CatalogCollection; compact?: boolean }) {
  const vars = { "--accent": collection.accent, "--secondary": collection.secondary } as CSSProperties;
  return (
    <Link href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`} className={compact ? styles.collectionMini : styles.collectionCard} style={vars}>
      <span className={styles.collectionIndex}>{collection.code}</span>
      <span className={styles.posterMark} aria-hidden="true">{collection.code}</span>
      <span className={styles.posterName}>{collection.name}</span>
      {!compact && <span className={styles.posterMood}>{collection.mood}</span>}
    </Link>
  );
}

function ProductCard({ product, collection }: { product: CatalogProduct; collection?: CatalogCollection }) {
  const vars = { "--accent": collection?.accent || "#df3326" } as CSSProperties;
  return (
    <Link href={`/tampa/nightmare-on-channelside/merch/collection/${product.collection_slug}/${product.sku}`} className={styles.dropCard} style={vars}>
      <div className={styles.productVisual}>
        <div className={styles.teeShape}>
          <span>{collection?.name || "NIGHTMARE"}</span>
          <b>{String(product.design_number).padStart(2, "0")}</b>
        </div>
        <span className={styles.dropBadge}>{product.primary_image_url ? "NEW DROP" : "ARTWORK SLOT"}</span>
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
  const featured = catalog.products.filter((product) => product.featured).slice(0, 4);
  const collectionMap = new Map(catalog.collections.map((collection) => [collection.slug, collection]));
  const ticker = [...catalog.collections, ...catalog.collections];

  return (
    <main className={styles.shell}>
      <div className={styles.noise} />
      <header className={styles.storeHeader}>
        <Link href="/" className={styles.logo}>ICONIC</Link>
        <nav className={styles.desktopNav} aria-label="Store navigation">
          <Link href="/">HOME</Link><a href="#featured">SHOP</a><a href="#collections">ARTISTS</a><Link href="/tampa">EVENTS</Link><Link href="/tampa">TAMPA</Link><a href="#footer">ABOUT</a>
        </nav>
        <div className={styles.headerTools}><span>SEARCH</span><span>ACCOUNT</span><BagIndicator /></div>
      </header>

      <div className={styles.eventTicker}><div className={styles.eventTickerTrack}>{ticker.map((collection, index) => <span key={`${collection.slug}-${index}`}>NIGHTMARE ON CHANNELSIDE · HALLOWEEN 2027 · TAMPA, FL · {collection.name}</span>)}</div></div>

      <section className={styles.homeHero}>
        <div className={styles.heroPoster}>
          <div className={styles.heroSkyline} aria-hidden="true"><i/><i/><i/><i/><i/></div>
          <div className={styles.heroMask} aria-hidden="true"><span/><span/></div>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>ICONIC PRESENTS</span>
            <h1><b>NIGHTMARE</b><em>ON CHANNELSIDE</em></h1>
            <h2>HALLOWEEN 2027</h2>
            <p>THE BIGGEST HALLOWEEN MERCH UNIVERSE IN TAMPA.<br/>EXCLUSIVE DROPS · LIMITED QUANTITIES.</p>
            <a href="#featured" className={styles.primaryCta}>SHOP ALL MERCH <span>→</span></a>
            <div className={styles.heroTrust}><span>◎ WORLDWIDE SHIPPING</span><span>▣ CART-READY STORE</span></div>
          </div>
          <div className={styles.dateStamp}><strong>10<br/>31<br/>27</strong><span>TAMPA<br/>FLORIDA</span></div>
        </div>

        <aside className={styles.heroCollections} id="collections">
          <div className={styles.panelHeading}><div><span>BROWSE THE NIGHTMARE</span><h2>SHOP BY COLLECTION</h2><p>14 COLLECTIONS · 140+ DESIGNS</p></div><a href="#allCollections">VIEW ALL</a></div>
          <div className={styles.miniGrid}>{catalog.collections.map((collection) => <CollectionTile key={collection.slug} collection={collection} compact />)}</div>
        </aside>
      </section>

      <section className={styles.benefits} aria-label="Store benefits">
        <div><i>♛</i><strong>EXCLUSIVE DESIGNS</strong><span>You won’t find these anywhere else.</span></div>
        <div><i>◷</i><strong>LIMITED DROP</strong><span>Once it’s gone, it’s gone.</span></div>
        <div><i>▱</i><strong>FAST SHIPPING</strong><span>Secure, tracked delivery to your door.</span></div>
        <div><i>☠</i><strong>HALLOWEEN 2027</strong><span>The night Tampa will never forget.</span></div>
      </section>

      <section className={styles.featuredSection} id="featured">
        <div className={styles.featuredIntro}>
          <span>THE LATEST DESIGNS</span><h2>FEATURED <em>DROPS</em></h2>
          <p>The real nightmare is missing out. Finished merch artwork drops into these live SKUs as production is completed.</p>
          <a href="#allCollections" className={styles.primaryCta}>SHOP NEW ARRIVALS <span>→</span></a>
        </div>
        <div className={styles.featuredGrid}>{featured.map((product) => <ProductCard key={product.sku} product={product} collection={collectionMap.get(product.collection_slug)} />)}</div>
      </section>

      <section className={styles.collectionArchive} id="allCollections">
        <div className={styles.archiveHeading}><span>THE FULL ARCHIVE</span><h2>14 WORLDS. NO GENERIC MERCH.</h2><p>Every artist, Tampa, the event itself, and Halloween culture keep their own visual identity.</p></div>
        <div className={styles.archiveGrid}>{catalog.collections.map((collection) => <CollectionTile key={collection.slug} collection={collection} />)}</div>
      </section>

      <section className={styles.allArtistsBanner}>
        <div><span>COLLECTION 09</span><h2>ALL ARTISTS</h2><p>REP THE WHOLE LINEUP.<br/>ONE STAGE. ONE NIGHTMARE.</p><Link className={styles.secondaryCta} href="/tampa/nightmare-on-channelside/merch/collection/all-artists">SHOP COLLECTION →</Link></div>
        <div className={styles.bannerTees} aria-hidden="true"><i/><i/><i/><i/></div>
      </section>

      <footer className={styles.storeFooter} id="footer">
        <div><strong>ICONIC</strong><p>Live entertainment turned into collectible culture.</p></div>
        <div><b>SHOP</b><a href="#featured">NEW ARRIVALS</a><a href="#collections">ALL COLLECTIONS</a><Link href="/tampa">EVENT</Link></div>
        <div><b>STORE</b><span>14 COLLECTIONS</span><span>140 PRODUCT SKUS</span><span>TAMPA, FLORIDA</span></div>
        <div><b>STATUS</b><span>{catalog.source === "supabase" ? "LIVE CATALOG" : "CATALOG FALLBACK"}</span><span>ARTWORK LOADING AS CREATED</span></div>
      </footer>
    </main>
  );
}
