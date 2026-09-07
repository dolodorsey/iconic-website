import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { NIGHTMARE_EVENT } from "../event-config";
import styles from "./merch.module.css";
import upgrade from "./merch-upgrade.module.css";
import final from "./merch-final.module.css";
import { formatPrice, getMerchCatalog, type CatalogCollection, type CatalogProduct } from "./catalog";
import { getFinishedSpriteArtwork } from "./artwork-sprite";
import { BagIndicator } from "./shop-client";

export const metadata: Metadata = {
  title: "Nightmare on Channelside — Official Merch",
  description: "Official ICONIC Nightmare on Channelside Halloween merch: artist, Tampa, event and culture collections.",
  alternates: { canonical: "/tampa/nightmare-on-channelside/merch" },
  openGraph: {
    title: "Nightmare on Channelside — Official Merch",
    description: "Limited Halloween concert merch from ICONIC in Tampa.",
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

function CollectionTile({ collection, compact = false }: { collection: CatalogCollection; compact?: boolean }) {
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
    </Link>
  );
}

function ProductCard({ product, collection }: { product: CatalogProduct; collection?: CatalogCollection }) {
  const localArtwork = getFinishedSpriteArtwork(product.collection_slug, product.design_number);
  const artVars = localArtwork ? {
    "--merch-art": `url("${localArtwork.url}")`,
    "--merch-pos": localArtwork.position,
  } as CSSProperties : undefined;
  const hasArtwork = Boolean(product.primary_image_url || localArtwork);
  const vars = { "--accent": collection?.accent || "#ff3528" } as CSSProperties;

  return (
    <Link
      href={`/tampa/nightmare-on-channelside/merch/collection/${product.collection_slug}/${product.sku}`}
      className={`${styles.dropCard} ${upgrade.dropCard}`}
      style={vars}
    >
      <div className={`${styles.productVisual} ${upgrade.productVisual} ${hasArtwork ? final.productVisualLive : ""}`}>
        {product.primary_image_url ? (
          <img src={product.primary_image_url} alt={product.title} className={final.catalogArtwork} />
        ) : localArtwork ? (
          <div className={final.finishedArtwork} style={artVars} aria-label={localArtwork.label} />
        ) : (
          <div className={styles.teeShape}>
            <span>{collection?.name || "NIGHTMARE"}</span>
            <b>{String(product.design_number).padStart(2, "0")}</b>
          </div>
        )}
        <span className={styles.dropBadge}>{hasArtwork ? "FINISHED DROP" : "COMING SOON"}</span>
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
    <main className={`${styles.shell} ${upgrade.shell}`}>
      <div className={styles.noise} />

      <header className={`${styles.storeHeader} ${upgrade.storeHeader}`}>
        <Link href="/" className={`${styles.logo} ${upgrade.logo}`}>ICONIC</Link>
        <nav className={styles.desktopNav} aria-label="Store navigation">
          <Link href="/">HOME</Link><a href="#featured">SHOP</a><a href="#collections">ARTISTS</a><Link href="/tampa">EVENTS</Link><a href="#world">VISUAL WORLD</a><a href="#footer">ABOUT</a>
        </nav>
        <div className={styles.headerTools}><span>SEARCH</span><span>ACCOUNT</span><BagIndicator /></div>
      </header>

      <div className={`${styles.eventTicker} ${upgrade.eventTicker}`}>
        <div className={styles.eventTickerTrack}>
          {ticker.map((collection, index) => <span key={`${collection.slug}-${index}`}>NIGHTMARE ON CHANNELSIDE · HALLOWEEN {NIGHTMARE_EVENT.year} · TAMPA, FL · {collection.name}</span>)}
        </div>
      </div>

      <section className={`${upgrade.heroStage} ${final.heroStageFinal}`}>
        <div className={`${upgrade.heroVisual} ${final.heroVisualFinal}`} aria-label="Nightmare on Channelside Halloween visual world">
          <span className={upgrade.heroGlow} aria-hidden="true" />
        </div>
        <div className={`${upgrade.heroCommand} ${final.heroCommandFinal}`}>
          <span className={upgrade.eyebrow}>ICONIC PRESENTS / TAMPA</span>
          <h1><b>NIGHTMARE</b><em>ON CHANNELSIDE</em></h1>
          <h2>HALLOWEEN {NIGHTMARE_EVENT.year}</h2>
          <p>A limited merch universe built like the night itself: loud, dark, collectible and impossible to mistake for anybody else.</p>
          <div className={upgrade.heroActions}>
            <a href="#featured" className={`${styles.primaryCta} ${upgrade.primaryCta}`}>SHOP THE DROP <span>→</span></a>
            <a href="#collections" className={upgrade.textCta}>EXPLORE 14 COLLECTIONS</a>
          </div>
          <div className={upgrade.heroFacts}>
            <span><b>140+</b> DESIGNS</span><span><b>14</b> WORLDS</span><span><b>1</b> NIGHTMARE</span>
          </div>
        </div>
      </section>

      <section className={upgrade.collectionDeck} id="collections">
        <div className={upgrade.sectionHead}>
          <div><span>BROWSE THE NIGHTMARE</span><h2>SHOP BY COLLECTION</h2></div>
          <p>Every artist, Tampa, the full lineup and Halloween culture keep their own identity.</p>
        </div>
        <div className={`${styles.miniGrid} ${upgrade.miniGrid} ${final.miniGridFinal}`}>
          {catalog.collections.map((collection) => <CollectionTile key={collection.slug} collection={collection} compact />)}
        </div>
      </section>

      <section className={`${styles.benefits} ${upgrade.benefits}`} aria-label="Store benefits">
        <div><i>♛</i><strong>EXCLUSIVE DESIGNS</strong><span>Built for this event universe.</span></div>
        <div><i>◷</i><strong>LIMITED DROP</strong><span>Once a run closes, it closes.</span></div>
        <div><i>▱</i><strong>TRACKED SHIPPING</strong><span>Secure delivery to your door.</span></div>
        <div><i>☠</i><strong>HALLOWEEN CAPSULE</strong><span>Collect the night, not a generic tee.</span></div>
      </section>

      <section className={`${styles.featuredSection} ${upgrade.featuredSection}`} id="featured">
        <div className={styles.featuredIntro}>
          <span>THE LATEST DESIGNS</span><h2>FEATURED <em>DROPS</em></h2>
          <p>Finished artwork is shown live as each collection is completed. Unfinished pieces stay clearly marked instead of using fake product art.</p>
          <a href="#allCollections" className={`${styles.primaryCta} ${upgrade.primaryCta}`}>SHOP NEW ARRIVALS <span>→</span></a>
        </div>
        <div className={styles.featuredGrid}>
          {featured.map((product) => <ProductCard key={product.sku} product={product} collection={collectionMap.get(product.collection_slug)} />)}
        </div>
      </section>

      <section className={upgrade.visualWorld} id="world">
        <div className={upgrade.sectionHead}>
          <div><span>THE CAMPAIGN WORLD</span><h2>ENTER THE NIGHTMARE</h2></div>
          <p>Ten original campaign environments built from the same concert-merch universe.</p>
        </div>
        <div className={upgrade.artGrid}>
          {artClasses.map((artClass, index) => (
            <div className={`${upgrade.artFrame} ${artClass}`} key={index} aria-label={`Nightmare visual ${index + 1}`} />
          ))}
        </div>
      </section>

      <section className={`${styles.collectionArchive} ${upgrade.collectionArchive}`} id="allCollections">
        <div className={styles.archiveHeading}><span>THE FULL ARCHIVE</span><h2>14 WORLDS. NO GENERIC MERCH.</h2><p>Go straight into the collection you want. Every category is merch-first and visually independent.</p></div>
        <div className={`${styles.archiveGrid} ${upgrade.archiveGrid}`}>
          {catalog.collections.map((collection) => <CollectionTile key={collection.slug} collection={collection} />)}
        </div>
      </section>

      <section className={`${styles.allArtistsBanner} ${upgrade.allArtistsBanner}`}>
        <div>
          <span>COLLECTION 09</span><h2>ALL ARTISTS</h2><p>REP THE WHOLE LINEUP.<br/>ONE STAGE. ONE NIGHTMARE.</p>
          <Link className={`${styles.secondaryCta} ${upgrade.secondaryCta}`} href="/tampa/nightmare-on-channelside/merch/collection/all-artists">SHOP COLLECTION →</Link>
        </div>
        <div className={upgrade.allArtistsVisual} aria-hidden="true" />
      </section>

      <footer className={`${styles.storeFooter} ${upgrade.storeFooter}`} id="footer">
        <div><strong>ICONIC</strong><p>Live entertainment turned into collectible culture.</p></div>
        <div><b>SHOP</b><a href="#featured">NEW ARRIVALS</a><a href="#collections">ALL COLLECTIONS</a><Link href="/tampa">EVENT</Link></div>
        <div><b>STORE</b><span>14 COLLECTIONS</span><span>140 PRODUCT SKUS</span><span>TAMPA, FLORIDA</span></div>
        <div><b>ART STATUS</b><span>21 SAVAGE · 10 FINISHED DESIGNS</span><span>OTHER COLLECTIONS LOAD AS COMPLETED</span></div>
      </footer>
    </main>
  );
}
