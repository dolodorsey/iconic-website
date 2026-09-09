import type { Metadata } from "next";
import Link from "next/link";
import styles from "../merch.module.css";
import upgrade from "../merch-upgrade.module.css";
import final from "../merch-final.module.css";
import { BagIndicator, CartView } from "../shop-client";

export const metadata: Metadata = {
  title: "Cart — Nightmare on Channelside Official Merch",
  description: "Review your Nightmare on Channelside pieces and continue to secure checkout.",
  robots: { index: false, follow: false },
};

export default function NightmareCartPage() {
  return (
    <main className={`${styles.shell} ${upgrade.shell} ${final.cinematicShell}`}>
      <div className={styles.noise} />
      <header className={`${styles.storeHeader} ${upgrade.storeHeader} ${final.cleanHeader}`}>
        <Link href="/" className={`${styles.logo} ${upgrade.logo}`}>ICONIC</Link>
        <nav className={styles.desktopNav} aria-label="Store navigation">
          <Link href="/tampa/nightmare-on-channelside/merch">MERCH HOME</Link>
          <Link href="/tampa/nightmare-on-channelside">EVENT</Link>
        </nav>
        <div className={styles.headerTools}><BagIndicator /></div>
      </header>

      <section className={final.cartShell}>
        <div className={final.cartIntro}>
          <span>YOUR PIECES / YOUR NIGHT</span>
          <h1>TAKE THE NIGHTMARE HOME.</h1>
          <p>Review your selections, make any final changes, then continue into secure checkout.</p>
        </div>
        <CartView />
      </section>
    </main>
  );
}
