import type { Metadata } from "next";
import { Button, Calendar, C, Hero, InfoGrid, ny21, ny30, Section, Shell } from "../../_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC New York — Resorts World New York City",
  description: "ICONIC New York: a recurring 21+ and 30+ concert program anchored at Resorts World New York City.",
};

export default function ResortsWorldPage() {
  return <Shell>
    <Hero eyebrow="ICONIC · MARKET 02 · NEW YORK CITY" title="RESORTS WORLD." sub="New York becomes ICONIC's second flagship market with the same repeatable concert architecture as Atlanta: a recurring 21+ series, a recurring 30+ series, and major tentpole opportunities." accent="#d2ad55">
      <Button href="#calendar">View 2027 Calendar</Button><Button href="/series/21-plus" ghost>21+ Series</Button><Button href="/series/30-plus" ghost>30+ Series</Button>
    </Hero>

    <Section eyebrow="New York Program" title="A monthly residency model. Not random dates.">
      <InfoGrid items={[
        { label: "Market", value: "New York City", body: "ICONIC flagship market 02." },
        { label: "Venue Partner", value: "Resorts World NYC", body: "Queens-based entertainment and resort destination." },
        { label: "21+ Series", value: "12 Shows / Year", body: "One recurring younger-adult concert property. Final brand name to be assigned." },
        { label: "30+ Series", value: "12 Shows / Year", body: "One recurring grown-audience concert property. Final brand name to be assigned." },
      ]} />
    </Section>

    <Section eyebrow="Market Architecture" title="Same system as Atlanta. New York-specific execution." dark>
      <InfoGrid items={[
        { label: "Programming", value: "Separate Talent", body: "New York booking packages stand on their own rather than simply copying Atlanta lineups." },
        { label: "Marketing", value: "NYC Audience", body: "Separate creative, media buying, local partnerships and audience data for New York." },
        { label: "Revenue", value: "Local + National", body: "Local sponsor packages can sit underneath national ICONIC partnerships spanning multiple markets." },
        { label: "Operations", value: "Dedicated Market", body: "Ticketing, production, staffing, VIP and show operations are run as a standalone New York program." },
      ]} />
    </Section>

    <Section eyebrow="2027 New York" title="Twenty-four recurring concert dates." >
      <div id="calendar" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(330px,1fr))", gap: 16 }}>
        <div><div style={{ marginBottom: 18 }}><div style={{ fontFamily: "Georgia,serif", fontSize: 34 }}>21+ Concert Series</div><div style={{ marginTop: 8, color: C.muted, fontFamily: "Arial,sans-serif", fontSize: 11, lineHeight: 1.6 }}>Working monthly residency structure. Final name and exact venue-approved dates remain to be locked.</div></div><Calendar rows={ny21} /></div>
        <div><div style={{ marginBottom: 18 }}><div style={{ fontFamily: "Georgia,serif", fontSize: 34 }}>30+ Concert Series</div><div style={{ marginTop: 8, color: C.muted, fontFamily: "Arial,sans-serif", fontSize: 11, lineHeight: 1.6 }}>Working monthly residency structure. Final name and exact venue-approved dates remain to be locked.</div></div><Calendar rows={ny30} /></div>
      </div>
    </Section>

    <Section eyebrow="Commercial" title="One market. Multiple revenue lanes." dark>
      <InfoGrid items={[
        { label: "Tickets", value: "General + Premium", body: "Standard admission plus premium-view and hospitality inventory." },
        { label: "VIP", value: "High-Value Inventory", body: "Group packages, hospitality and premium access." },
        { label: "Sponsors", value: "Market Packages", body: "New York-specific sponsorship plus national multi-market packages." },
        { label: "Data", value: "Always-On Audience", body: "Each monthly show feeds the next show instead of restarting customer acquisition every event." },
      ]} />
      <div style={{ marginTop: 34 }}><Button href="mailto:info@thekollectivehospitality.com?subject=ICONIC%20New%20York%20Partnership">Partner With ICONIC New York</Button></div>
    </Section>
  </Shell>;
}
