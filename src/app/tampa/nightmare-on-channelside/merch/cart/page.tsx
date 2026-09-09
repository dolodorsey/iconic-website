import type { Metadata } from "next";
import Link from "next/link";
import styles from "../merch.module.css";
import upgrade from "../merch-upgrade.module.css";
import { BagIndicator, CartView } from "../shop-client";

export const metadata: Metadata = {
  title: "Cart — Nightmare on Channelside Official Merch",
  description: "Review official Nightmare on Channelside merch and continue to secure Shopify checkout.",
  robots: { index: false, follow: false },
};

export default function NightmareCartPage() {
  return (
    <main className={`${styles.shell} ${upgrade.shell}`}>
      <div className={styles.noise} />
      <header className={`${styles.storeHeader} ${upgrade.storeHeader}`}>
        <Link href="/" className={`${styles.logo} ${upgrade.logo}`}>ICONIC</Link>
        <nav className={styles.desktopNav} aria-label="Store navigation">
          <Link href="/tampa/nightmare-on-channelside/merch">MERCH HOME</Link>
          <Link href="/tampa/nightmare-on-channelside">EVENT</Link>
        </nav>
        <div className={styles.headerTools}><BagIndicator /></div>
      </header>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(64px,9vw,120px) clamp(20px,5vw,64px) 120px" }}>
        <div style={{ marginBottom: 42 }}>
          <span style={{ color: "#ff3b30", fontSize: 9, fontWeight: 900, letterSpacing: ".24em" }}>OFFICIAL NOC MERCH / SHOPIFY CHECKOUT</span>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(54px,8vw,110px)", lineHeight: .84, margin: "18px 0 20px" }}>YOUR<br/>NIGHTMARE.</h1>
          <p style={{ maxWidth: 650, color: "rgba(255,255,255,.58)", lineHeight: 1.75 }}>Every item and variant in this cart is validated against the live Nightmare on Channelside Shopify collection. Payment, taxes and shipping are completed securely through Shopify.</p>
        </div>
        <CartView />
      </section>
    </main>
  );
}
