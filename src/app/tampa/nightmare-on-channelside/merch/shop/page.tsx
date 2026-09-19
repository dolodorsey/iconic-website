import type { Metadata } from "next";
import { getMerchCatalog } from "../catalog";
import { NOC_MEDIA } from "../noc-assets";
import { StoreFooter, StoreHeader, StoreSubnav } from "../noc-ui";
import ShopGrid from "./shop-grid";
import premium from "../noc-premium.module.css";

export const metadata: Metadata = {
  title: "Shop — Nightmare on Channelside",
  description: "Shop the official Nightmare on Channelside live merchandise collection.",
  alternates: { canonical: "/tampa/nightmare-on-channelside/merch/shop" },
};

export default async function NightmareShopPage() {
  const catalog = await getMerchCatalog();
  return (
    <main className={premium.shell}>
      <StoreHeader />
      <section className={`${premium.collectionHero} noc-page-hero-v2`}>
        <img src={NOC_MEDIA.market} alt="Nightmare on Channelside official merch floor" fetchPriority="high" decoding="async" />
        <div className={`${premium.collectionHeroCopy} noc-page-hero-copy-v2`}>
          <span>ICONIC LIVE PRESENTS · TAMPA HALLOWEEN</span>
          <h1>SHOP THE DROP.</h1>
          <p>Official event merchandise connected directly to the live NOC Shopify catalog. Browse the products themselves—no unverified artist grouping.</p>
        </div>
      </section>
      <StoreSubnav />
      <div className={premium.container}>
        {catalog.source === "unavailable" ? (
          <section className={premium.empty}><div><h1>THE SHOP IS RELOADING.</h1><p>The live Shopify catalog is unavailable, so the storefront is intentionally hiding inventory instead of fabricating products.</p></div></section>
        ) : (
          <>
            <section className={premium.section} style={{borderTop:"1px solid rgba(255,255,255,.08)"}}>
              <div className={premium.sectionHead}>
                <span className={premium.eyebrow}>LIVE EVENT MERCH</span>
                <h2 className="noc-editorial-heading">THE DROP.</h2>
                <p>Search the live product catalog by product name or garment. Every card resolves directly to the real product page and secure Shopify checkout.</p>
              </div>
              <ShopGrid products={catalog.products} />
            </section>
          </>
        )}
      </div>
      <StoreFooter />
    </main>
  );
}
