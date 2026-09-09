import type { Metadata } from "next";
import cart from "./cart-cinematic.module.css";
import premium from "../noc-premium.module.css";
import { CartView } from "../shop-client";
import { StoreFooter, StoreHeader } from "../noc-ui";

export const metadata: Metadata = {
  title: "Cart — Nightmare on Channelside Official Merch",
  description: "Review your Nightmare on Channelside pieces and continue to secure checkout.",
  robots: { index: false, follow: false },
};

export default function NightmareCartPage() {
  return (
    <main className={premium.shell}>
      <StoreHeader />
      <section className={`${cart.cartShell} ${premium.cartWrap}`}>
        <div className={cart.cartIntro}>
          <span>YOUR PIECES / YOUR NIGHT</span>
          <h1>TAKE THE NIGHTMARE HOME.</h1>
          <p>Review your selections, make any final changes, then continue into secure Shopify checkout.</p>
        </div>
        <CartView />
      </section>
      <StoreFooter />
    </main>
  );
}
