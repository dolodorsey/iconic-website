import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import styles from "./merch.module.css";
import upgrade from "./merch-upgrade.module.css";
import final from "./merch-final.module.css";
import home from "./merch-home-graphic.module.css";
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

const CAMPAIGN_SCENES = [
  "/api/media/drive/1TYE4F9bsN5rv2Ji1X1uRYqpHduP8jVd7",
  "/api/media/drive/1kSAXAOq3ne3RlvNdpMzc5SF8axuTZSlA",
  "/api/media/drive/1eiU8zt30jzfEcHXPS9TpoXQrJXEG62UH",
  "/api/media/drive/1XiA7ZqoTsrNPT-gWRlAQRyZOu5aF6T8W",
  "/api/media/drive/1jQZd9sMH7zhNvNE2darywiHooR9OnuFY",
  "/api/media/drive/1sTPQ66G8KvHYmsZFFKkjbdIq9t46RXz9",
  "/api/media/drive/1UBMuDTJ9TxwRY_eBf21bEOoAOtYb9KTP",
  "/api/media/drive/1_k3IyN7DjAJWL1AVuMTgQr6cjj-vpEEr",
  "/api/media/drive/1UmxvAvLp28OApwunma86ikWrlizqIEmm",
  "/api/media/drive/1qpLsJipcsQuw5dHFF3g_MrKa9fGh_hm3",
];

const HOME_HERO = CAMPAIGN_SCENES[9];
const FEATURE_SCENES = [CAMPAIGN_SCENES[4], CAMPAIGN_SCENES[6], CAMPAIGN_SCENES[7], CAMPAIGN_SCENES[8]];

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

const collectionLanguage: Record<string, { title: string; line: string }> = {
  "21-savage": { title: "SAVAGE MODE", line: "STAGE MENACE" },
  "kodak-black": { title: "PROJECT NIGHT", line: "FLORIDA PRESSURE" },
  "da-baby": { title: "BABY ON BOARD", line: "CHAOS IN MOTION" },
  "meek-mill": { title: "DREAMCHASER", line: "HEADLINE PRESSURE" },
  "belly-gang-kush": { title: "BELLY GANG", line: "RAW ISSUE" },
  "all-artists": { title: "FULL LINEUP", line: "ONE STAGE. ONE NIGHTMARE." },
  tampa: { title: "813 FOREVER", line: "CITY EDITION" },
  "nightmare-on-channelside": { title: "OFFICIAL EVENT", line: "THE CORE COLLECTION" },
};

function CollectionTile({ collection }: { collection: CatalogCollection }) {
  const art = CAMPAIGN_SCENES[collectionSceneIndex[collection.slug] ?? 1];
  const language = collectionLanguage[collection.slug] || { title: collection.mood, line: collection.subtitle };
  const vars = { "--accent": collection.accent, "--collection-art": `url(${art})` } as CSSProperties;
  return <Link href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`} className={final.worldCard} style={vars}>
    <span className={final.worldArtist}>{collection.name}</span>
    <div className={final.worldCopy}><strong>{language.title}</strong><span>{language.line}</span><em>ENTER WORLD →</em></div>
  </Link>;
}

function ProductCard({ product, collection }: { product: CatalogProduct; collection?: CatalogCollection }) {
  const vars = { "--accent": collection?.accent || "#ff3528" } as CSSProperties;
  return <Link href={`/tampa/nightmare-on-channelside/merch/collection/${product.collection_slug}/${product.sku}`} className={final.productCardCinematic} style={vars}>
    <div className={final.productStageBlack}>
      {product.primary_image_url ? <img src={product.primary_image_url} alt={product.title} className={final.productStageImage} /> : <div className={styles.teeShape}><span>{collection?.name || "NIGHTMARE"}</span><b>{String(product.design_number).padStart(2, "0")}</b></div>}
    </div>
    <div className={final.productCardMeta}><div><strong>{product.title}</strong><span>{product.product_type}</span></div><b>{formatPrice(product.price_cents)}</b></div>
  </Link>;
}

export default async function NightmareMerchPage() {
  const catalog = await getMerchCatalog();
  const featured = catalog.products.filter((product) => product.featured).slice(0, 8);
  const collectionMap = new Map(catalog.collections.map((collection) => [collection.slug, collection]));

  return <main className={`${styles.shell} ${upgrade.shell} ${final.cinematicShell}`}>
    <div className={styles.noise} />
    <header className={`${styles.storeHeader} ${upgrade.storeHeader} ${final.cleanHeader}`}>
      <Link href="/" className={`${styles.logo} ${upgrade.logo}`}>ICONIC</Link>
      <nav className={styles.desktopNav} aria-label="Store navigation"><a href="#featured">SHOP</a><a href="#collections">WORLDS</a><Link href="/tampa/nightmare-on-channelside">EVENT</Link><a href="#world">CAMPAIGN</a></nav>
      <div className={styles.headerTools}><BagIndicator /></div>
    </header>

    <section className={home.graphicHero} aria-label="Nightmare on Channelside animated arena campaign hero">
      <img src={HOME_HERO} alt="Nightmare on Channelside arena under the red moon" />
      <div className={home.heroPulse} />
    </section>

    <section className={final.centeredIntro}>
      <span>NIGHTMARE ON CHANNELSIDE · HALLOWEEN 2026</span>
      <h1>WEAR THE NIGHTMARE.</h1>
      <p>Tampa after dark. Arena energy. Limited pieces built from the world of Nightmare on Channelside.</p>
      <a href="#featured">ENTER THE DROP ↓</a>
    </section>

    {catalog.source === "unavailable" ? <section className={final.centeredUnavailable}><span>THE DROP IS TEMPORARILY OFFLINE</span><h2>THE NIGHTMARE IS RELOADING.</h2><p>The storefront is intentionally hiding stale inventory until the live catalog reconnects.</p></section> : <>
      <section className={final.centeredSection} id="featured">
        <div className={final.centeredSectionHead}><span>FROM THE NIGHT</span><h2>AFTER DARK PICKS.</h2><p>Artist issues, Tampa editions and event-only heat pulled straight from the Nightmare.</p></div>
        <div className={final.cinematicProductGrid}>{featured.map((product) => <ProductCard key={product.shopify_product_id} product={product} collection={collectionMap.get(product.collection_slug)} />)}</div>
        <div className={final.centeredAction}><a href="#collections">CHOOSE YOUR WORLD ↓</a></div>
      </section>

      <section className={home.editorialStack} aria-label="Nightmare on Channelside campaign features">
        <figure className={home.editorialHero}><img src={FEATURE_SCENES[0]} alt="Nightmare on Channelside merch overlooking the arena" /><figcaption className={home.editorialCaption}><span>ARENA ISSUE</span><strong>BUILT FOR THE NIGHT.</strong></figcaption></figure>
        <div className={home.editorialSplitGrid}>
          <figure className={home.editorialSplit}><img src={FEATURE_SCENES[1]} alt="Nightmare on Channelside seated merch campaign scene" /><figcaption className={home.editorialCaption}><span>AFTER DARK</span><strong>THE FIT BECOMES THE FLYER.</strong></figcaption></figure>
          <figure className={home.editorialSplit}><img src={FEATURE_SCENES[2]} alt="Nightmare on Channelside backstage merch campaign scene" /><figcaption className={home.editorialCaption}><span>BACKSTAGE</span><strong>NO GENERIC TOUR MERCH.</strong></figcaption></figure>
        </div>
        <figure className={home.editorialHero}><img src={FEATURE_SCENES[3]} alt="Nightmare on Channelside full merch collection in Tampa" /><figcaption className={home.editorialCaption}><span>THE COLLECTION</span><strong>ONE CITY. ONE NIGHT. EVERY WORLD.</strong></figcaption></figure>
      </section>

      <section className={final.centeredSection} id="collections">
        <div className={final.centeredSectionHead}><span>CHOOSE YOUR SIDE</span><h2>SHOP BY WORLD.</h2><p>Every artist gets a universe. Every piece belongs to the night.</p></div>
        <div className={final.worldGrid}>{catalog.collections.map((collection) => <CollectionTile key={collection.slug} collection={collection} />)}</div>
      </section>

      <section className={final.campaignSection} id="world">
        <div className={final.centeredSectionHead}><span>THE CAMPAIGN WORLD</span><h2>CHANNELSIDE AFTER DARK.</h2><p>Concert night, carnival glow, Tampa skyline and the merch built to survive all of it.</p></div>
        <div className={home.campaignMosaicCompact}>{CAMPAIGN_SCENES.slice(0, 6).map((scene, index) => <figure key={scene}><img src={scene} alt={`Nightmare on Channelside campaign scene ${index + 1}`} /></figure>)}</div>
      </section>

      {collectionMap.has("all-artists") && <section className={final.lineupFeature}><img src={CAMPAIGN_SCENES[8]} alt="Nightmare on Channelside full lineup merchandise" /><div className={final.lineupCopy}><span>FULL LINEUP</span><h2>ONE STAGE.<br/>ONE NIGHTMARE.</h2><p>The whole cast. One night. Wear the bill.</p><Link href="/tampa/nightmare-on-channelside/merch/collection/all-artists">WEAR THE FULL LINEUP →</Link></div></section>}
    </>}

    <footer className={final.minimalFooter} id="footer"><div><strong>ICONIC</strong><p>Live entertainment turned into collectible culture.</p></div><nav><a href="#featured">SHOP</a><a href="#collections">WORLDS</a><Link href="/tampa/nightmare-on-channelside">EVENT</Link><Link href="/tampa/nightmare-on-channelside/merch/cart">CART</Link></nav><span>NIGHTMARE ON CHANNELSIDE · TAMPA, FL</span></footer>
  </main>;
}
