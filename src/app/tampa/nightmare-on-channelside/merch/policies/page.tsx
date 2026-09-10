import type { Metadata } from "next";
import Link from "next/link";
import premium from "../noc-premium.module.css";
import { StoreFooter, StoreHeader } from "../noc-ui";

const BASE = "/tampa/nightmare-on-channelside/merch";

export const metadata: Metadata = {
  title: "Store Policies — Nightmare on Channelside",
  description: "Shipping, returns, terms, privacy, and customer support policies for Nightmare on Channelside merchandise.",
  alternates: { canonical: `${BASE}/policies` },
  robots: { index: true, follow: true },
};

const sectionStyle = {
  padding: "26px 0",
  borderTop: "1px solid rgba(255,255,255,.12)",
} as const;

const copyStyle = {
  color: "rgba(255,255,255,.68)",
  lineHeight: 1.8,
  fontSize: 14,
  maxWidth: 880,
} as const;

export default function PoliciesPage() {
  return (
    <main className={premium.shell}>
      <StoreHeader />
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "72px 24px 96px" }}>
        <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: ".22em", color: "#ff5a50" }}>CUSTOMER CARE · NOC MERCH</span>
        <h1 style={{ margin: "12px 0 18px", fontFamily: "Georgia,serif", fontSize: "clamp(44px,7vw,86px)", lineHeight: .96 }}>STORE POLICIES.</h1>
        <p style={copyStyle}>Clear rules before checkout. These policies apply to Nightmare on Channelside merchandise purchased through this storefront and its connected Shopify checkout. Merchandise and event admission are separate purchases unless a product expressly says otherwise.</p>

        <section id="returns" style={sectionStyle}>
          <h2>RETURNS & REFUNDS</h2>
          <div style={copyStyle}>
            <p>Eligible merchandise may be returned within 14 days after delivery. Items must be unworn, unwashed, unused, and in their original condition with tags and packaging where applicable. Proof of purchase is required.</p>
            <p>Before returning anything, email <a href="mailto:thekollective00@gmail.com" style={{ color: "#fff" }}>thekollective00@gmail.com</a> with your order number. Returns sent without prior authorization may not be accepted.</p>
            <p>Inspect your order when it arrives. For a damaged, defective, or incorrect item, contact us within 7 days of delivery with the order number and clear photos. When verified, we will arrange an appropriate replacement or refund and will not charge return shipping for our error.</p>
            <p>Exchanges depend on available inventory. Personalized or custom-made items, gift cards, items marked final sale, and merchandise that has been worn, washed, altered, or damaged after delivery are not returnable except where required by law or where the item arrived defective or incorrect.</p>
            <p>Approved refunds are issued to the original payment method through Shopify after the return is received and inspected. Your financial institution controls when the credit appears. Original shipping charges are not refundable unless the return results from our error or applicable law requires otherwise.</p>
            <p>A change to an event does not automatically cancel or refund a merchandise order. Nothing here limits non-waivable consumer rights provided by applicable law.</p>
          </div>
        </section>

        <section id="shipping" style={sectionStyle}>
          <h2>SHIPPING & DELIVERY</h2>
          <div style={copyStyle}>
            <p>Orders begin processing after payment is verified. Event merchandise may be produced on demand or in limited runs and can require production time before shipment.</p>
            <p>Available shipping methods, charges, and delivery estimates are shown by Shopify during checkout when available. Production and carrier transit estimates are not guarantees. Weather, carrier disruptions, high-volume periods, customs processing, and other conditions outside our control can affect delivery.</p>
            <p>Customers are responsible for entering a complete and accurate shipping address. If you notice an error, contact us immediately. We will try to help before fulfillment begins, but an address may not be changeable once an order enters production or ships.</p>
            <p>Tracking is provided when available after the carrier accepts the shipment. International orders may be subject to customs duties, import taxes, brokerage charges, or local fees unless checkout specifically shows them as collected at purchase.</p>
            <p>For a lost or damaged shipment, contact us with your order number and supporting information. We will review the shipment and, where appropriate, work with the carrier or fulfillment provider on a claim or replacement.</p>
          </div>
        </section>

        <section id="terms" style={sectionStyle}>
          <h2>TERMS OF SERVICE</h2>
          <div style={copyStyle}>
            <p>By placing an order, you agree to these terms together with the shipping, return, and privacy policies connected to this store. You must be legally capable of entering a purchase transaction in your jurisdiction and may not use the storefront for fraud, unlawful activity, abusive automated traffic, interference, or infringement.</p>
            <p>We aim to present artwork, colors, descriptions, prices, and availability accurately. Screen settings and normal manufacturing variation can affect appearance. Prices and availability may change before checkout is completed. Orders remain subject to inventory, fraud review, pricing accuracy, fulfillment capability, and applicable law.</p>
            <p>Limited-edition, artist, and event merchandise may sell out and may not be restocked. Buying merchandise does not grant event admission. Payments are processed through Shopify and supported payment providers.</p>
            <p>Store content, branding, artwork, graphics, photographs, product designs, and other materials are protected by applicable intellectual-property laws and may not be commercially copied, reproduced, distributed, or sold without authorization from the applicable rights holder.</p>
            <p>To the maximum extent permitted by law, we are not responsible for indirect or consequential losses arising from events outside our reasonable control. Nothing in these terms excludes liability or consumer rights that cannot legally be excluded.</p>
          </div>
        </section>

        <section id="privacy" style={sectionStyle}>
          <h2>PRIVACY</h2>
          <p style={copyStyle}>Checkout and transaction data are processed through Shopify and applicable service providers. The store&apos;s current Shopify privacy policy is available at checkout. We do not ask customers to send payment-card details by email.</p>
          <a href="https://checkout.shopify.com/75975065791/policies/40298217663.html?locale=en" rel="noopener noreferrer" style={{ color: "#fff", fontWeight: 900 }}>VIEW SHOPIFY PRIVACY POLICY →</a>
        </section>

        <section id="support" style={sectionStyle}>
          <h2>CUSTOMER SUPPORT</h2>
          <p style={copyStyle}>For order support, email <a href="mailto:thekollective00@gmail.com" style={{ color: "#fff" }}>thekollective00@gmail.com</a> and include your order number. Never email passwords or full payment-card information.</p>
          <Link href={`${BASE}/shop`} style={{ color: "#ff5a50", fontWeight: 900 }}>BACK TO THE DROP →</Link>
        </section>
      </div>
      <StoreFooter />
    </main>
  );
}
