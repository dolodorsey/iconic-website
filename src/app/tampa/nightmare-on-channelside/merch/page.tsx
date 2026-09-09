import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import styles from "./merch.module.css";
import upgrade from "./merch-upgrade.module.css";
import final from "./merch-final.module.css";
import { formatPrice, getMerchCatalog, type CatalogCollection, type CatalogProduct } from "./catalog";
import { BagIndicator } from "./shop-client";

export const metadata: Metadata = {
  title: "Nightmare on Channelside — Official Merch",
  description: "Enter the official Nightmare on Channelside Halloween 2026 merch world.",
  alternates: { canonical: "/tampa/nightmare-on-channelside/merch" },
  openGraph: {
    title: "Nightmare on Channelside — Official Merch",
    description: "Artist issues, Tampa editions and official event pieces from Nightmare on Channelside.",
    url: "/tampa/nightmare-on-channelside/merch",
  },
};

const HERO_ANIMATION = "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-hero-animation.webp?v=1788992759";
const CAMPAIGN_SCENES = [
  "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-01.webp?v=1788992156",
  "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-02.webp?v=1788992166",
  "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-03.webp?v=1788992178",
  "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-04.webp?v=1788992188",
  "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-05.webp?v=1788992200",
  "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-06.webp?v=1788992210",
  "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-07.webp?v=1788992224",
  "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-08.webp?v=1788992234",
  "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-09.webp?v=1788992246",
  "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-10.webp?v=1788992257",
];

const collectionSceneIndex: Record<string, number> = {
  "21-savage": 4,
  "kodak-black": 5,
  "da-baby": 2,
  "meek-mill": 3,
  "belly-gang-kush": 8,
  "all-artists": 6,
  tampa: 9,
  "nightmare-on-channelside": 0,
};

function CollectionTile({ collection }: { collection: CatalogCollection }) {
  const art = CAMPAIGN_SCENES[collectionSceneIndex[collection.slug] ?? 1];
  const vars = { "--accent": collection.accent, "--collection-art": `url(${art})` } as CSSProperties;
  return (
    <Link href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`} className={final.worldCard} style={vars}>
      <span className={final.worldArtist}>{collection.name}</span>
      <div className={final.worldCopy}>
        <strong>{collection.mood}</strong>
        <span>{collection.subtitle}</span>
        <em>ENTER WORLD →</em>
      </div>
    </Link>
  );
}

function ProductCard({ product, collection }: { product: CatalogProduct; collection?: CatalogCollection }) {
  const vars = { "--accent": collection?.accent || "#ff3528" } as CSSProperties;
  return (
    <Link href={`/tampa/nightmare-on-channelside/merch/collection/${product.collection_slug}/${product.sku}`} className={final.productCardCinematic} style={vars}>
      <div className={final.productStageBlack}>
        {product.primary_image_url ? <img src={product.primary_image_url} alt={product.title} className={final.productStageImage} /> : <div className={styles.teeShape}><span>{collection?.name || "NIGHTMARE"}</span><b>{String(product.design_number).padStart(2, "0")}</b></div>}
      </div>
      <div className={final.productCardMeta}><div><strong>{product.title}</strong><span>{product.product_type}</span></div><b>{formatPrice(product.price_cents)}</b></div>
    </Link>
  );
}

export default async function NightmareMerchPage() {
  const catalog = await getMerchCatalog();
  const featured = catalog.products.filter((product) => product.featured).slice(0, 8);
  const collectionMap = new Map(catalog.collections.map((collection) => [collection.slug, collection]));

  return (
    <main className={`${styles.shell} ${upgrade.shell} ${final.cinematicShell}`}>
      <div className={styles.noise} />
      <header className={`${styles.storeHeader} ${upgrade.storeHeader} ${final.cleanHeader}`}>
        <Link href="/" className={`${styles.logo} ${upgrade.logo}`}>ICONIC</Link>
        <nav className={styles.desktopNav} aria-label="Store navigation"><a href="#featured">SHOP</a><a href="#collections">WORLDS</a><Link href="/tampa/nightmare-on-channelside">EVENT</Link><a href="#world">CAMPAIGN</a></nav>
        <div className={styles.headerTools}><BagIndicator /></div>
      </header>

      <section className={final.videoHero} aria-label="Nightmare on Channelside animated campaign hero">
        <img src={HERO_ANIMATION} alt="Nightmare on Channelside animated campaign" className={final.heroAnimationFallback} />
      </section>

      <section className={final.centeredIntro}>
        <span>NIGHTMARE ON CHANNELSIDE · HALLOWEEN 2026</span>
        <h1>WEAR THE NIGHTMARE.</h1>
        <p>Tampa after dark. Arena energy. Limited pieces built from the world of Nightmare on Channelside.</p>
        <a href="#featured">ENTER THE DROP ↓</a>
      </section>

      {catalog.source === "unavailable" ? (
        <section className={final.centeredUnavailable}><span>THE DROP IS TEMPORARILY OFFLINE</span><h2>THE NIGHTMARE IS RELOADING.</h2><p>The storefront is intentionally hiding stale inventory until the live catalog reconnects.</p></section>
      ) : (
        <>
          <section className={final.centeredSection} id="featured">
            <div className={final.centeredSectionHead}><span>FROM THE NIGHT</span><h2>AFTER DARK PICKS.</h2><p>Artist issues, Tampa editions and event-only heat pulled straight from the Nightmare.</p></div>
            <div className={final.cinematicProductGrid}>{featured.map((product) => <ProductCard key={product.shopify_product_id} product={product} collection={collectionMap.get(product.collection_slug)} />)}</div>
            <div className={final.centeredAction}><a href="#collections">CHOOSE YOUR WORLD ↓</a></div>
          </section>

          <section className={final.centeredSection} id="collections">
            <div className={final.centeredSectionHead}><span>CHOOSE YOUR SIDE</span><h2>SHOP BY WORLD.</h2><p>Every artist gets a universe. Every piece belongs to the night.</p></div>
            <div className={final.worldGrid}>{catalog.collections.map((collection) => <CollectionTile key={collection.slug} collection={collection} />)}</div>
          </section>

          <section className={final.campaignSection} id="world">
            <div className={final.centeredSectionHead}><span>THE CAMPAIGN WORLD</span><h2>CHANNELSIDE AFTER DARK.</h2><p>Concert night, carnival glow, Tampa skyline and the merch built to survive all of it.</p></div>
            <div className={final.campaignMosaic}>{CAMPAIGN_SCENES.slice(0, 8).map((scene, index) => <figure className={index === 0 || index === 3 || index === 6 ? final.campaignWide : final.campaignTile} key={scene}><img src={scene} alt={`Nightmare on Channelside campaign scene ${index + 1}`} /></figure>)}</div>
          </section>

          {collectionMap.has("all-artists") && <section className={final.lineupFeature}><img src={CAMPAIGN_SCENES[8]} alt="Nightmare on Channelside full lineup merchandise" /><div className={final.lineupCopy}><span>FULL LINEUP</span><h2>ONE STAGE.<br/>ONE NIGHTMARE.</h2><p>The whole cast. One night. Wear the bill.</p><Link href="/tampa/nightmare-on-channelside/merch/collection/all-artists">WEAR THE FULL LINEUP →</Link></div></section>}

          <section className={final.lastScene}><img src={CAMPAIGN_SCENES[9]} alt="Benchmark International Arena inside the Nightmare on Channelside world" /><div><span>OCTOBER 31 · TAMPA</span><strong>MEET US AFTER DARK.</strong></div></section>
        </>
      )}

      <footer className={final.minimalFooter} id="footer"><div><strong>ICONIC</strong><p>Live entertainment turned into collectible culture.</p></div><nav><a href="#featured">SHOP</a><a href="#collections">WORLDS</a><Link href="/tampa/nightmare-on-channelside">EVENT</Link><Link href="/tampa/nightmare-on-channelside/merch/cart">CART</Link></nav><span>NIGHTMARE ON CHANNELSIDE · TAMPA, FL</span></footer>
    </main>
  );
}
