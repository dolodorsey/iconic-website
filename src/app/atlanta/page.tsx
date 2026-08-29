import Link from "next/link";
import type { Metadata } from "next";
import { C, Hero, InfoGrid, Section, Shell } from "../_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC Atlanta — Southlake Arena",
  description: "ICONIC Atlanta is anchored at Southlake Arena by The Ball Series, BRAVO New Year's Eve, GROWN-ISH 21+ and Soul Session 30+.",
};

const properties = [
  { title: "THE BALL SERIES", meta: "6-event season · Southlake Arena", href: "/ball-series", glow: "rgba(184,151,255,.50)" },
  { title: "BRAVO", meta: "New Year's Eve · Southlake Arena", href: "/atlanta/bravo", glow: "rgba(241,200,106,.42)" },
  { title: "GROWN-ISH", meta: "21+ Concert Series · Southlake Arena", href: "/series/21-plus", glow: "rgba(255,63,164,.46)" },
  { title: "SOUL SESSION", meta: "30+ Concert Series · Southlake Arena", href: "/series/30-plus", glow: "rgba(124,92,255,.50)" },
];

export default function AtlantaPage() {
  return (
    <Shell>
      <Hero eyebrow="ICONIC · FLAGSHIP MARKET" title="ATLANTA." sub="ICONIC's flagship Atlanta platform is now anchored at Southlake Arena by four distinct properties: The Ball Series, BRAVO New Year's Eve, GROWN-ISH 21+ Concert Series and Soul Session 30+ Concert Series." accent="#ff4fa7" />
      <Section eyebrow="Southlake Arena" title="Four properties. One flagship arena home.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 }}>
          {properties.map((p) => (
            <Link key={p.title} href={p.href} className="event-card glass" style={{ "--cardGlow": p.glow, minHeight: 360, padding: 30, borderRadius: 24, color: C.white, textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between" } as React.CSSProperties}>
              <div style={{ color: C.muted, fontSize: 9, fontWeight: 900, letterSpacing: ".2em", textTransform: "uppercase" }}>ICONIC · SOUTHLAKE ARENA</div>
              <div>
                <h2 style={{ margin: 0, fontFamily: "Georgia,serif", fontSize: "clamp(38px,5vw,68px)", lineHeight: .86 }}>{p.title}</h2>
                <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${C.faint}`, color: C.muted, fontSize: 10, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" }}>{p.meta}</div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <Section eyebrow="National Circuit" title="The flagship market feeds a larger ICONIC footprint." dark>
        <InfoGrid items={[
          {label:"Las Vegas",value:"4 Events",body:"Four ICONIC dates planned for the Las Vegas market."},
          {label:"Washington DC",value:"4 Events",body:"Four ICONIC dates planned for the Washington DC market."},
          {label:"Tampa",value:"4 Events",body:"Four ICONIC dates planned for the Tampa market."},
          {label:"New York",value:"Resorts World",body:"ENCORE and Funny Business remain distinct New York properties."},
        ]}/>
      </Section>
    </Shell>
  );
}
