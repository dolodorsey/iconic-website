import type { Metadata } from "next";
import { Button, C, Hero, InfoGrid, Section, Shell } from "../../_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC Halloween — Atlanta | October 31, 2026",
  description: "ICONIC launches in Atlanta with its Halloween concert event on October 31, 2026.",
};

export default function HalloweenPage() {
  return <Shell>
    <Hero eyebrow="ICONIC PRESENTS · ATLANTA · 2026" title="HALLOWEEN." sub="The opening statement. ICONIC begins with a major Halloween concert built to become an annual Atlanta tentpole." accent="#a34a18">
      <Button href="#tickets">Ticket Alerts</Button><Button href="#vip" ghost>VIP + Tables</Button>
    </Hero>

    <Section eyebrow="The Event" title="One night built to become tradition.">
      <InfoGrid items={[
        { label: "Date", value: "October 31, 2026", body: "Halloween night in Atlanta." },
        { label: "Market", value: "Atlanta", body: "ICONIC flagship market 01." },
        { label: "Format", value: "Major Concert", body: "Headline talent, premium production, VIP and sponsor integrations." },
        { label: "Status", value: "Lineup Announcing", body: "Talent, venue and ticket details roll out through the official ICONIC channels." },
      ]} />
    </Section>

    <Section eyebrow="Experience" title="Not another Halloween party." dark>
      <InfoGrid items={[
        { label: "01", value: "Main Stage", body: "Large-format artist production designed around the headline performance." },
        { label: "02", value: "Premium Entry", body: "Fast-lane, premium viewing and hospitality inventory." },
        { label: "03", value: "VIP + Tables", body: "High-value hospitality packages for groups, brands and partners." },
        { label: "04", value: "Brand Activations", body: "Integrated sponsor moments built into the live experience instead of added as an afterthought." },
      ]} />
    </Section>

    <section id="tickets" style={{ padding: "90px clamp(22px,6vw,90px)", background: C.black, borderTop: `1px solid ${C.faint}` }}><div style={{ maxWidth: 1450, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
      <div style={{ padding: 38, border: `1px solid ${C.faint}`, background: C.panel }}><div style={{ color: C.gold, fontFamily: "Arial,sans-serif", fontSize: 9, fontWeight: 900, letterSpacing: ".22em", textTransform: "uppercase" }}>Tickets</div><h3 style={{ fontFamily: "Georgia,serif", fontSize: 42, margin: "18px 0 14px" }}>Be first in.</h3><p style={{ color: C.muted, fontFamily: "Arial,sans-serif", lineHeight: 1.7 }}>Ticket URL will replace this alert CTA as soon as inventory is live.</p><Button href="mailto:info@thekollectivehospitality.com?subject=ICONIC%20Halloween%20Ticket%20Alert">Join Ticket Alert</Button></div>
      <div id="vip" style={{ padding: 38, border: `1px solid ${C.faint}`, background: C.panel }}><div style={{ color: C.gold, fontFamily: "Arial,sans-serif", fontSize: 9, fontWeight: 900, letterSpacing: ".22em", textTransform: "uppercase" }}>VIP</div><h3 style={{ fontFamily: "Georgia,serif", fontSize: 42, margin: "18px 0 14px" }}>Upgrade the night.</h3><p style={{ color: C.muted, fontFamily: "Arial,sans-serif", lineHeight: 1.7 }}>Premium entry, hospitality, group inventory and table packages will open separately.</p><Button href="mailto:info@thekollectivehospitality.com?subject=ICONIC%20Halloween%20VIP">Request VIP</Button></div>
      <div style={{ padding: 38, border: `1px solid ${C.faint}`, background: C.panel }}><div style={{ color: C.gold, fontFamily: "Arial,sans-serif", fontSize: 9, fontWeight: 900, letterSpacing: ".22em", textTransform: "uppercase" }}>Partners</div><h3 style={{ fontFamily: "Georgia,serif", fontSize: 42, margin: "18px 0 14px" }}>Own the moment.</h3><p style={{ color: C.muted, fontFamily: "Arial,sans-serif", lineHeight: 1.7 }}>Sponsorship, activation, media and hospitality packages are available for select partners.</p><Button href="mailto:info@thekollectivehospitality.com?subject=ICONIC%20Halloween%20Partnership">Partner With ICONIC</Button></div>
    </div></section>
  </Shell>;
}
