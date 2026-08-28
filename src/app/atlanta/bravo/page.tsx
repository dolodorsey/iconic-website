import type { Metadata } from "next";
import { Button, C, Hero, InfoGrid, Section, Shell } from "../../_components/IconicPage";

export const metadata: Metadata = {
  title: "BRAVO — ICONIC New Year's Eve | Southlake Arena Atlanta",
  description: "BRAVO by ICONIC — New Year's Eve at Southlake Arena in Atlanta on December 31, 2026.",
};

export default function BravoPage() {
  return <Shell>
    <Hero eyebrow="ICONIC PRESENTS · NEW YEAR'S EVE · ATLANTA" title="BRAVO." sub="ICONIC closes its launch year with an arena-scale New Year's Eve concert and celebration at Southlake Arena." accent={C.gold}>
      <Button href="#tickets">Ticket Alerts</Button><Button href="#vip" ghost>VIP + Hospitality</Button>
    </Hero>

    <Section eyebrow="December 31, 2026" title="Atlanta's year-ending ICONIC moment.">
      <InfoGrid items={[
        { label: "Event", value: "BRAVO", body: "ICONIC's New Year's Eve flagship property." },
        { label: "Venue", value: "Southlake Arena", body: "Atlanta market arena production." },
        { label: "Date", value: "December 31, 2026", body: "New Year's Eve." },
        { label: "Format", value: "Arena Concert", body: "Live talent, countdown, premium hospitality and sponsor integration." },
      ]} />
    </Section>

    <Section eyebrow="Night Architecture" title="Concert first. Celebration all night." dark>
      <InfoGrid items={[
        { label: "Live", value: "Headline Show", body: "The primary ticket driver: a major artist package with full concert production." },
        { label: "Midnight", value: "Countdown Moment", body: "A designed arena-wide midnight sequence built for capture, press and social distribution." },
        { label: "Premium", value: "VIP + Hospitality", body: "Premium seating, group hospitality and high-value sponsor inventory." },
        { label: "Brand", value: "Annual Property", body: "BRAVO is built as a repeatable New Year's Eve brand, not a one-off party." },
      ]} />
    </Section>

    <section id="tickets" style={{ padding: "90px clamp(22px,6vw,90px)", background: C.black, borderTop: `1px solid ${C.faint}` }}><div style={{ maxWidth: 1450, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
      <div style={{ padding: 38, border: `1px solid ${C.faint}`, background: C.panel }}><div style={{ color: C.gold, fontFamily: "Arial,sans-serif", fontSize: 9, fontWeight: 900, letterSpacing: ".22em", textTransform: "uppercase" }}>Tickets</div><h3 style={{ fontFamily: "Georgia,serif", fontSize: 42, margin: "18px 0 14px" }}>Get in first.</h3><p style={{ color: C.muted, fontFamily: "Arial,sans-serif", lineHeight: 1.7 }}>Presale and public on-sale links will be inserted here as inventory opens.</p><Button href="mailto:info@thekollectivehospitality.com?subject=BRAVO%20Ticket%20Alert">Join Ticket Alert</Button></div>
      <div id="vip" style={{ padding: 38, border: `1px solid ${C.faint}`, background: C.panel }}><div style={{ color: C.gold, fontFamily: "Arial,sans-serif", fontSize: 9, fontWeight: 900, letterSpacing: ".22em", textTransform: "uppercase" }}>VIP</div><h3 style={{ fontFamily: "Georgia,serif", fontSize: 42, margin: "18px 0 14px" }}>Premium New Year's Eve.</h3><p style={{ color: C.muted, fontFamily: "Arial,sans-serif", lineHeight: 1.7 }}>Hospitality and premium inventory can be sold separately from standard concert admission.</p><Button href="mailto:info@thekollectivehospitality.com?subject=BRAVO%20VIP">Request VIP</Button></div>
      <div style={{ padding: 38, border: `1px solid ${C.faint}`, background: C.panel }}><div style={{ color: C.gold, fontFamily: "Arial,sans-serif", fontSize: 9, fontWeight: 900, letterSpacing: ".22em", textTransform: "uppercase" }}>Sponsors</div><h3 style={{ fontFamily: "Georgia,serif", fontSize: 42, margin: "18px 0 14px" }}>Close the year with us.</h3><p style={{ color: C.muted, fontFamily: "Arial,sans-serif", lineHeight: 1.7 }}>Naming, countdown, hospitality, beverage, content and experiential sponsor inventory can be packaged around BRAVO.</p><Button href="mailto:info@thekollectivehospitality.com?subject=BRAVO%20Partnership">Request Partnership Deck</Button></div>
    </div></section>
  </Shell>;
}
