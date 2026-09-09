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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getFallbackCollection(slug);
  if (!collection) return {};
  return {
    title: `${collection.mood} — ${collection.name} | Nightmare on Channelside`,
    description: `${collection.subtitle} Official Nightmare on Channelside merchandise.`,
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
        <h1>{collection.mood}</h1>
        <h2>{collection.name}</h2>
        <p>{collection.subtitle}</p>
      </section>

      <section className={final.collectionCampaignStrip} aria-label={`${collection.name} campaign world`}>
        <img src={scene} alt={`${collection.name} inside the Nightmare on Channelside campaign world`} />
      </section>

      <section className={final.collectionProductsWrap} id="products">
        <div className={final.collectionProductsHead}>
          <span>THE DROP</span>
          <h2>WEAR {collection.name}.</h2>
        </div>
        <div className={final.collectionProductGrid}>
          {products.map((product) => (
            <Link href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}/${product.sku}`} className={final.productCardCinematic} key={product.shopify_product_id}>
              <div className={final.productStageBlack}>
                {product.primary_image_url ? (
                  <img src={product.primary_image_url} alt={product.title} className={final.productStageImage} />
                ) : (
                  <div className={styles.teeShape}><span>{collection.name}</span><b>{String(product.design_number).padStart(2,"0")}</b></div>
                )}
              </div>
              <div className={final.productCardMeta}><div><strong>{product.title}</strong><span>{product.product_type}</span></div><b>{formatPrice(product.price_cents)}</b></div>
            </Link>
          ))}
        </div>
      </section>

      <footer className={final.collectionFooter}>
        <strong>ICONIC</strong>
        <Link href="/tampa/nightmare-on-channelside/merch">← ALL WORLDS</Link>
        <span>NIGHTMARE ON CHANNELSIDE · TAMPA, FL</span>
      </footer>
    </main>
  );
}
