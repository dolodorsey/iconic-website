import type { Metadata } from "next";
import { getMerchCatalog } from "../catalog";
import { NOC_MEDIA } from "../noc-assets";
import { StoreFooter, StoreHeader, StoreSubnav, WorldCard } from "../noc-ui";
import premium from "../noc-premium.module.css";

export const metadata: Metadata = {
  title: "Collections — Nightmare on Channelside",
  description: "Shop Nightmare on Channelside merchandise by artist, Tampa, full lineup or official event collection.",
  alternates: { canonical: "/tampa/nightmare-on-channelside/merch/worlds" },
};

export default async function NightmareWorldsPage() {
  const catalog = await getMerchCatalog();
  return (
    <main className={premium.shell}>
      <StoreHeader />
      <section className={`${premium.collectionHero} noc-page-hero-v2`}>
        <img src={NOC_MEDIA.headliners} alt="Nightmare on Channelside artist collections" fetchPriority="high" decoding="async" />
        <div className={`${premium.collectionHeroCopy} noc-page-hero-copy-v2`}>
          <span>SHOP BY ARTIST + COLLECTION</span>
          <h1>WORLDS.</h1>
          <p>Pick the artist, city or official event collection you want. Every page below has its own live Shopify merchandise.</p>
        </div>
      </section>
      <StoreSubnav />
      <div className={premium.container}>
        <section className={premium.section}>
          <div className={premium.sectionHead}>
            <span className={premium.eyebrow}>OFFICIAL NOC COLLECTIONS</span>
            <h2 className="noc-editorial-heading">SHOP BY NAME</h2>
            <p>Simple names. Distinct collections. No recycled collection identity.</p>
          </div>
          {catalog.source === "unavailable" ? (
            <div className={premium.empty}><div><h1>COLLECTIONS ARE RELOADING.</h1><p>The live catalog is unavailable, so the collection pages stay closed until real inventory reconnects.</p></div></div>
          ) : (
            <div className="noc-world-grid-v2">
              {catalog.collections.map((collection) => (
                <WorldCard
                  key={collection.slug}
                  collection={collection}
                  products={catalog.products.filter((product) => product.collection_slug === collection.slug)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
      <StoreFooter />
    </main>
  );
}
