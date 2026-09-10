import type { Metadata } from "next";
import Link from "next/link";
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
          <span>OFFICIAL NIGHTMARE ON CHANNELSIDE MERCH</span>
          <h1>SHOP.</h1>
          <p>Artist pieces, Tampa editions and official event merch. Every item below resolves to the live NOC Shopify catalog.</p>
        </div>
      </section>
      <StoreSubnav />
      <div className={premium.container}>
        {catalog.source === "unavailable" ? (
          <section className={premium.empty}><div><h1>THE SHOP IS RELOADING.</h1><p>The live Shopify catalog is unavailable, so the storefront is intentionally hiding inventory instead of fabricating products.</p></div></section>
        ) : (
          <section className={premium.section}>
            <div className={premium.sectionHead}>
              <span className={premium.eyebrow}>LIVE EVENT MERCH</span>
              <h2 className="noc-editorial-heading">THE DROP</h2>
              <p>Search by artist, collection or garment. Product cards show front and back at a glance whenever both Shopify views are available.</p>
            </div>
            <nav className={`${premium.subnav} noc-collection-shortcuts`} aria-label="Shop collection shortcuts">
              {catalog.collections.map((collection) => <Link key={collection.slug} href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`}>{collection.name}</Link>)}
            </nav>
            <ShopGrid products={catalog.products} collections={catalog.collections} />
          </section>
        )}
      </div>
      <StoreFooter />
    </main>
  );
}
