import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../merch.module.css";
import upgrade from "../../merch-upgrade.module.css";
import final from "../../merch-final.module.css";
import { getCollection as getFallbackCollection } from "../../merch-data";
import { formatPrice, getMerchCatalog } from "../../catalog";
import { BagIndicator } from "../../shop-client";

type RouteParams = { slug: string };
type Props = { params: Promise<RouteParams> };

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

const collectionSceneIndex: Record<string, number> = {
  "21-savage": 4, "kodak-black": 5, "da-baby": 2, "meek-mill": 3,
  "belly-gang-kush": 8, "all-artists": 6, tampa: 9, "nightmare-on-channelside": 0,
};

const language: Record<string, { title: string; line: string }> = {
  "21-savage": { title: "SAVAGE MODE", line: "STAGE MENACE" },
  "kodak-black": { title: "PROJECT NIGHT", line: "FLORIDA PRESSURE" },
  "da-baby": { title: "BABY ON BOARD", line: "CHAOS IN MOTION" },
  "meek-mill": { title: "DREAMCHASER", line: "HEADLINE PRESSURE" },
  "belly-gang-kush": { title: "BELLY GANG", line: "RAW ISSUE" },
  "all-artists": { title: "FULL LINEUP", line: "ONE STAGE. ONE NIGHTMARE." },
  tampa: { title: "813 FOREVER", line: "CITY EDITION" },
  "nightmare-on-channelside": { title: "OFFICIAL EVENT", line: "THE CORE COLLECTION" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getFallbackCollection(slug);
  if (!collection) return {};
  const copy = language[slug];
  return {
    title: `${copy?.title || collection.mood} — ${collection.name} | Nightmare on Channelside`,
    description: copy?.line || collection.subtitle,
    alternates: { canonical: `/tampa/nightmare-on-channelside/merch/collection/${slug}` },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const catalog = await getMerchCatalog();
  const collection = catalog.collections.find((item) => item.slug === slug);
  if (!collection) notFound();
  const products = catalog.products.filter((item) => item.collection_slug === collection.slug).sort((a,b) => a.design_number - b.design_number);
  const vars = { "--accent": collection.accent, "--secondary": collection.secondary } as CSSProperties;
  const scene = CAMPAIGN_SCENES[collectionSceneIndex[collection.slug] ?? 1];
  const copy = language[collection.slug] || { title: collection.mood, line: collection.subtitle };

  return (
    <main className={`${styles.shell} ${upgrade.shell} ${final.cinematicShell}`} style={vars}>
      <div className={styles.noise} />
      <header className={`${styles.storeHeader} ${upgrade.storeHeader} ${final.cleanHeader}`}>
        <Link href="/" className={`${styles.logo} ${upgrade.logo}`}>ICONIC</Link>
        <nav className={styles.desktopNav}><Link href="/tampa/nightmare-on-channelside/merch">MERCH HOME</Link><Link href="/tampa/nightmare-on-channelside">EVENT</Link><a href="#products">THE DROP</a></nav>
        <div className={styles.headerTools}><BagIndicator /></div>
      </header>

      <section className={final.collectionCinemaHero}>
        <span>{collection.name} · NIGHTMARE ON CHANNELSIDE</span>
        <h1>{copy.title}</h1>
        <h2>{copy.line}</h2>
        <p>{collection.subtitle}</p>
      </section>

      <section className={final.collectionCampaignStrip} aria-label={`${collection.name} campaign world`}>
        <img src={scene} alt={`${collection.name} inside the Nightmare on Channelside campaign world`} />
      </section>

      <section className={final.collectionProductsWrap} id="products">
        <div className={final.collectionProductsHead}>
          <span>THE DROP</span>
          <h2>WEAR {copy.title}.</h2>
        </div>
        <div className={final.collectionProductGrid}>
          {products.map((product) => (
            <Link href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}/${product.sku}`} className={final.productCardCinematic} key={product.shopify_product_id}>
              <div className={final.productStageBlack}>
                {product.primary_image_url ? <img src={product.primary_image_url} alt={product.title} className={final.productStageImage} /> : null}
              </div>
              <div className={final.productCardMeta}><div><strong>{product.title}</strong><span>{product.product_type}</span></div><b>{formatPrice(product.price_cents)}</b></div>
            </Link>
          ))}
        </div>
      </section>

      <footer className={final.collectionFooter}>
        <strong>ICONIC</strong><Link href="/tampa/nightmare-on-channelside/merch">← ALL WORLDS</Link><span>NIGHTMARE ON CHANNELSIDE · TAMPA, FL</span>
      </footer>
    </main>
  );
}
