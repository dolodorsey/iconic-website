import type { Metadata } from "next";
import Link from "next/link";
import { getMerchCatalog } from "./catalog";
import { NOC_MEDIA } from "./noc-assets";
import { ProductCard, StoreFooter, StoreHeader } from "./noc-ui";
import premium from "./noc-premium.module.css";

export const metadata: Metadata = {
  title: "Nightmare on Channelside — Official Merch",
  description: "Official Nightmare on Channelside artist collections, Tampa editions and event merchandise.",
  alternates: { canonical: "/tampa/nightmare-on-channelside/merch" },
};

const BASE = "/tampa/nightmare-on-channelside/merch";

export default async function NightmareMerchPage() {
  const catalog = await getMerchCatalog();
  const featured = catalog.products.slice(0, 4);

  return (
    <main className={premium.shell}>
      <StoreHeader />

      <section className="noc-video-hero" aria-label="Nightmare on Channelside home animation">
        <video autoPlay muted loop playsInline preload="auto" poster={NOC_MEDIA.homeHero}>
          <source src={NOC_MEDIA.homeAnimation} type="video/mp4" />
        </video>
      </section>

      <div className={premium.ticker}>
        <b>NIGHTMARE ON CHANNELSIDE</b><span>HALLOWEEN 2026</span><span>TAMPA, FL</span><span>OFFICIAL EVENT MERCH</span>
      </div>

      <div className={premium.container}>
        <section className={premium.intro}>
          <span className={premium.eyebrow}>OFFICIAL NIGHTMARE ON CHANNELSIDE MERCH</span>
          <h1 className={`${premium.display} noc-editorial-display`}>SHOP THE NIGHT.</h1>
          <p className={premium.body}>Official artist collections, Tampa editions and Nightmare on Channelside event pieces.</p>
        </section>

        <section className="noc-portal-grid" aria-label="Nightmare storefront sections">
          <Link href={`${BASE}/shop`} className={premium.portal}>
            <img src={NOC_MEDIA.market} alt="Nightmare on Channelside merch market" loading="lazy" decoding="async" />
            <div className={premium.portalCopy}><span>OFFICIAL MERCH</span><strong>SHOP ALL</strong><em>ALL PIECES →</em></div>
          </Link>
          <Link href={`${BASE}/worlds`} className={premium.portal}>
            <img src={NOC_MEDIA.headliners} alt="Nightmare on Channelside artist collections" loading="lazy" decoding="async" />
            <div className={premium.portalCopy}><span>COLLECTIONS</span><strong>SHOP BY ARTIST</strong><em>21 SAVAGE / KODAK / MEEK / MORE →</em></div>
          </Link>
          <Link href="/tampa/nightmare-on-channelside" className={premium.portal}>
            <img src={NOC_MEDIA.hall} alt="Nightmare on Channelside Tampa event" loading="lazy" decoding="async" />
            <div className={premium.portalCopy}><span>HALLOWEEN 2026</span><strong>THE EVENT</strong><em>CONCERT DETAILS + TICKETS →</em></div>
          </Link>
        </section>

        {catalog.source === "unavailable" ? (
          <section className={premium.empty}><div><h1>THE DROP IS RELOADING.</h1><p>Commerce stays hidden when the live Shopify catalog is unavailable. No fake inventory is shown.</p></div></section>
        ) : (
          <section className={premium.section}>
            <div className={premium.sectionHead}>
              <span className={premium.eyebrow}>FEATURED MERCH</span>
              <h2 className="noc-editorial-heading">FIRST LOOK</h2>
              <p>Front and back at a glance. Open any piece for sizes, variants and checkout.</p>
            </div>
            <div className={premium.productGrid}>{featured.map((product) => <ProductCard key={product.shopify_product_id} product={product} />)}</div>
            <div className={premium.more}><Link href={`${BASE}/shop`} className={premium.button}>SHOP THE FULL DROP →</Link></div>
          </section>
        )}
      </div>

      <Link href="/tampa/nightmare-on-channelside" className="noc-campaign-exit" aria-label="Return to the Nightmare on Channelside event">
        <img src={NOC_MEDIA.archiveFacade} alt="Nightmare on Channelside Tampa event world" loading="lazy" decoding="async" />
        <span>ONE NIGHT · ONE ARENA · TAMPA</span>
      </Link>

      <StoreFooter />
    </main>
  );
}
