import type { Metadata } from "next";
import { getMerchCatalog } from "../catalog";
import { NOC_MEDIA } from "../noc-assets";
import { StoreFooter, StoreHeader, StoreSubnav, WorldCard } from "../noc-ui";
import premium from "../noc-premium.module.css";

export const metadata: Metadata = {
  title: "Artist Worlds — Nightmare on Channelside",
  description: "Enter the artist, Tampa and official event worlds of Nightmare on Channelside.",
};

export default async function NightmareWorldsPage() {
  const catalog = await getMerchCatalog();
  return (
    <main className={premium.shell}>
      <StoreHeader />
      <section className={premium.collectionHero}>
        <img src={NOC_MEDIA.headliners} alt="Nightmare on Channelside Hall of Headliners" />
        <div className={premium.collectionHeroCopy}>
          <span>THE HALL OF HEADLINERS</span>
          <h1>CHOOSE YOUR NIGHTMARE.</h1>
          <p>Each live collection gets its own world. Enter through the artist, the city, the full bill or the official event issue.</p>
        </div>
      </section>
      <StoreSubnav />
      <div className={premium.container}>
        <section className={premium.section}>
          <div className={premium.sectionHead}>
            <span className={premium.eyebrow}>THE NIGHT HAS SIDES</span>
            <h2>ENTER A WORLD.</h2>
            <p>No generic collection tiles. Each door leads to a dedicated live Shopify edit.</p>
          </div>
          {catalog.source === "unavailable" ? (
            <div className={premium.empty}><div><h1>THE HALL IS DARK.</h1><p>The live catalog is unavailable. Collection worlds stay closed until the real inventory reconnects.</p></div></div>
          ) : (
            <div className={premium.worldGrid}>{catalog.collections.map((collection) => <WorldCard key={collection.slug} collection={collection} />)}</div>
          )}
        </section>
      </div>
      <StoreFooter />
    </main>
  );
}
