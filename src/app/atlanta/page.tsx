import Link from "next/link";
import type { Metadata } from "next";
import { C, Hero, Section, Shell } from "../_components/IconicPage";

export const metadata: Metadata = {
  title: "Atlanta",
  description: "ICONIC Atlanta: Nightmare on Channelside, BRAVO, GROWN-ISH and Soul Session.",
};

const properties = [
  { title: "NIGHTMARE ON CHANNELSIDE", meta: "Halloween Concert · October 31, 2026", href: "/atlanta/halloween", glow: "rgba(255,87,34,.5)" },
  { title: "BRAVO", meta: "New Year's Eve · Southlake", href: "/atlanta/bravo", glow: "rgba(241,200,106,.42)" },
  { title: "GROWN-ISH", meta: "21+ Concert Series · 2027", href: "/atlanta/grown-ish", glow: "rgba(255,63,164,.46)" },
  { title: "SOUL SESSION", meta: "30+ Concert Series · 2027", href: "/atlanta/soul-session", glow: "rgba(124,92,255,.50)" },
];

export default function AtlantaPage() {
  return (
    <Shell>
      <Hero eyebrow="ICONIC · MARKET 01" title="ATLANTA." sub="The launch market. Four distinct ICONIC properties spanning major holiday concerts, recurring series and premium nightlife-driven live entertainment." accent="#ff4fa7" />
      <Section eyebrow="Atlanta Properties" title="Four brands. Four reasons to come back.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 }}>
          {properties.map((p) => (
            <Link key={p.title} href={p.href} className="event-card glass" style={{ "--cardGlow": p.glow, minHeight: 360, padding: 30, borderRadius: 24, color: C.white, textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between" } as React.CSSProperties}>
              <div style={{ color: C.muted, fontSize: 9, fontWeight: 900, letterSpacing: ".2em", textTransform: "uppercase" }}>ICONIC ATLANTA</div>
              <div>
                <h2 style={{ margin: 0, fontFamily: "Georgia,serif", fontSize: "clamp(38px,5vw,68px)", lineHeight: .86 }}>{p.title}</h2>
                <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${C.faint}`, color: C.muted, fontSize: 10, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" }}>{p.meta}</div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </Shell>
  );
}
