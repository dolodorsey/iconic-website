import type { Metadata } from "next";
import Link from "next/link";
import { getMerchCatalog } from "../catalog";
import { NOC_MEDIA } from "../noc-assets";
import { ProductCard, StoreFooter, StoreHeader, StoreSubnav } from "../noc-ui";
import premium from "../noc-premium.module.css";

export const metadata: Metadata = {
  title: "The Drop — Nightmare on Channelside",
  description: "Shop the official Nightmare on Channelside live merchandise drop.",
};

export default async function NightmareShopPage() {
  const catalog = await getMerchCatalog();
  return (
    <main className={premium.shell}>
      <StoreHeader />
      <section className={premium.collectionHero}>
        <img src={NOC_MEDIA.market} alt="Nightmare on Channelside merch market" />
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
              <p>Browse the full drop or jump into an artist world for a tighter edit.</p>
            </div>
            <nav className={premium.subnav} aria-label="Shop collection shortcuts">
              {catalog.collections.map((collection) => <Link key={collection.slug} href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`}>{collection.name}</Link>)}
            </nav>
            <div className={premium.productGrid} style={{marginTop: 34}}>
              {catalog.products.map((product) => <ProductCard key={product.shopify_product_id} product={product} />)}
            </div>
          </section>
        )}
      </div>
      <StoreFooter />
    </main>
  );
}
