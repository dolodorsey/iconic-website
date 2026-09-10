import type { Metadata } from "next";
import Link from "next/link";
import { getMerchCatalog } from "../catalog";
import { NOC_MEDIA } from "../noc-assets";
import { StoreFooter, StoreHeader, StoreSubnav } from "../noc-ui";
import ShopGrid from "./shop-grid";
import premium from "../noc-premium.module.css";

export const metadata: Metadata = {
  title: "The Drop — Nightmare on Channelside",
  description: "Shop the official Nightmare on Channelside live merchandise drop.",
  alternates: { canonical: "/tampa/nightmare-on-channelside/merch/shop" },
};

export default async function NightmareShopPage() {
  const catalog = await getMerchCatalog();
  return (
    <main className={premium.shell}>
      <StoreHeader />
      <section className={premium.collectionHero}>
        <img src={NOC_MEDIA.market} alt="Nightmare on Channelside merch market" fetchPriority="high" decoding="async" />
        <div className={premium.collectionHeroCopy}>
          <span>THE MERCH FLOOR</span>
          <h1>THE DROP.</h1>
          <p>Official event pieces, artist issues and Tampa editions. Everything here resolves to the live NOC Shopify catalog.</p>
        </div>
      </section>
      <StoreSubnav />
      <div className={premium.container}>
        {catalog.source === "unavailable" ? (
          <section className={premium.empty}><div><h1>THE FLOOR IS CLOSED.</h1><p>The live Shopify catalog is unavailable, so the storefront is intentionally hiding inventory instead of fabricating products.</p></div></section>
        ) : (
          <section className={premium.section}>
            <div className={premium.sectionHead}>
              <span className={premium.eyebrow}>LIVE EVENT MERCH</span>
              <h2>WEAR THE BILL.</h2>
              <p>Search the drop, filter by world or garment, and sort without loading all 93 product images at once.</p>
            </div>
            <nav className={premium.subnav} aria-label="Shop collection shortcuts">
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
