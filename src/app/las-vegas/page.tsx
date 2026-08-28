import type { Metadata } from "next";
import { Button, C, Hero, InfoGrid, Section, Shell } from "../_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC Las Vegas — Coming Soon",
  description: "ICONIC is expanding to Las Vegas. Concerts, festivals, arena events and live entertainment coming soon.",
};

export default function LasVegasPage() {
  return (
    <Shell>
      <Hero
        eyebrow="ICONIC · MARKET 03"
        title="LAS VEGAS"
        sub="ICONIC is coming to Las Vegas. A new market for major concerts, festivals, arena events and culture-driven live entertainment. Event properties, venues and launch dates will be announced separately."
      >
        <Button href="#coming-soon">Coming Soon</Button>
        <Button href="/" ghost>Explore ICONIC</Button>
      </Hero>

      <Section eyebrow="Market 03" title="The next ICONIC city." dark>
        <InfoGrid
          items={[
            { label: "Market", value: "Las Vegas", body: "ICONIC's third announced flagship market." },
            { label: "Status", value: "Coming Soon", body: "Venue, properties, talent and dates remain intentionally unannounced." },
            { label: "Format", value: "Large Format", body: "Concerts, festivals, arena events and signature ICONIC experiences." },
            { label: "Platform", value: "ICONIC", body: "A distinct local market operating under the national ICONIC live entertainment brand." },
          ]}
        />
      </Section>

      <section id="coming-soon" style={{ padding: "110px clamp(22px,6vw,90px)", borderTop: `1px solid ${C.faint}`, background: C.black }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: C.gold, fontFamily: "Arial,sans-serif", fontSize: 10, fontWeight: 900, letterSpacing: ".34em", textTransform: "uppercase" }}>Las Vegas</div>
          <h2 style={{ margin: "20px 0", fontFamily: "Georgia,serif", fontSize: "clamp(56px,9vw,130px)", lineHeight: .86 }}>COMING<br/>SOON.</h2>
          <p style={{ maxWidth: 650, margin: "28px auto 0", color: C.muted, fontFamily: "Arial,sans-serif", fontSize: 15, lineHeight: 1.8 }}>
            No placeholder event names. No premature venue claims. ICONIC Las Vegas launches when the first property is ready to be announced.
          </p>
        </div>
      </section>
    </Shell>
  );
}
