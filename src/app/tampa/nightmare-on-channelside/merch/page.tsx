import type { Metadata } from "next";
import Link from "next/link";
import { getMerchCatalog } from "./catalog";
import { NOC_MEDIA } from "./noc-assets";
import { ProductCard, StoreFooter, StoreHeader } from "./noc-ui";
import premium from "./noc-premium.module.css";

export const metadata: Metadata = {
  title: "Nightmare on Channelside — Official Merch",
  description: "Official Nightmare on Channelside artist issues, Tampa editions and event merchandise.",
  alternates: { canonical: "/tampa/nightmare-on-channelside/merch" },
};

const BASE = "/tampa/nightmare-on-channelside/merch";

export default async function NightmareMerchPage() {
  const catalog = await getMerchCatalog();
  const featured = catalog.products.slice(0, 4);

  return (
    <main className={premium.shell}>
      <StoreHeader />

      <section className={premium.hero} aria-label="Nightmare on Channelside animated campaign home graphic">
        <img src={NOC_MEDIA.homeHero} alt="Nightmare on Channelside Tampa campaign world" fetchPriority="high" decoding="async" />
      </section>

      <div className={premium.ticker}>
        <b>NIGHTMARE ON CHANNELSIDE</b><span>HALLOWEEN 2026</span><span>TAMPA, FL</span><span>OFFICIAL EVENT MERCH</span>
      </div>

      <div className={premium.container}>
        <section className={premium.intro}>
          <span className={premium.eyebrow}>WELCOME TO THE NIGHTMARE</span>
          <h1 className={premium.display}>THE CONCERT HAS A WORLD.</h1>
          <p className={premium.body}>This is not a product dump. Enter the event through the drop, the artist worlds or the Nightmare Archive.</p>
        </section>

        <section className={premium.portalGrid} aria-label="Nightmare storefront sections">
          <Link href={`${BASE}/shop`} className={premium.portal}>
            <img src={NOC_MEDIA.market} alt="Nightmare on Channelside merch market" loading="lazy" decoding="async" />
            <div className={premium.portalCopy}><span>THE MERCH FLOOR</span><strong>SHOP THE DROP</strong><em>ALL OFFICIAL PIECES →</em></div>
          </Link>
          <Link href={`${BASE}/worlds`} className={premium.portal}>
            <img src={NOC_MEDIA.headliners} alt="Nightmare on Channelside hall of headliners" loading="lazy" decoding="async" />
            <div className={premium.portalCopy}><span>THE HALL OF HEADLINERS</span><strong>ENTER A WORLD</strong><em>SHOP BY ARTIST / CITY / EVENT →</em></div>
          </Link>
          <Link href={`${BASE}/archive`} className={premium.portal}>
            <img src={NOC_MEDIA.archiveFacade} alt="Nightmare Archive Tampa" loading="lazy" decoding="async" />
            <div className={premium.portalCopy}><span>THE VISUAL ARCHIVE</span><strong>SEE THE NIGHT</strong><em>CAMPAIGN / CULTURE / TAMPA →</em></div>
          </Link>
        </section>

        {catalog.source === "unavailable" ? (
          <section className={premium.empty}><div><h1>THE DROP IS RELOADING.</h1><p>Commerce stays hidden when the live Shopify catalog is unavailable. No fake inventory is shown.</p></div></section>
        ) : (
          <section className={premium.section}>
            <div className={premium.sectionHead}>
              <span className={premium.eyebrow}>ON THE FLOOR NOW</span>
              <h2>FIRST LOOK.</h2>
              <p>A short preview from the live drop. The full catalog lives on its own shop page now.</p>
            </div>
            <div className={premium.productGrid}>{featured.map((product) => <ProductCard key={product.shopify_product_id} product={product} />)}</div>
            <div className={premium.more}><Link href={`${BASE}/shop`} className={premium.button}>ENTER THE FULL DROP →</Link></div>
          </section>
        )}
      </div>

      <Link href={`${BASE}/archive`} className={premium.cinemaBand} aria-label="Enter the Nightmare Archive">
        <img src={NOC_MEDIA.hall} alt="Nightmare on Channelside campaign hall" loading="lazy" decoding="async" />
      </Link>

      <StoreFooter />
    </main>
  );
}
