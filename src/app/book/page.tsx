import type { Metadata } from "next";
import { C, Hero, Section } from "@/app/_components/IconicPage";
import PlatformShell from "@/app/_components/PlatformShell";
import AccessForm from "@/app/access/AccessForm";

const BOOK_VISUAL="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-platform-vip-hospitality.png?v=1789179973";
export const metadata:Metadata={title:"Book ICONIC",description:"Book ICONIC LIVE for corporate events, private celebrations, album releases, exhibitions, brand activations and venue programming."};

const formats=[
  ["CORPORATE EVENTS","Premium company moments, entertainment programming, hospitality and branded experience design."],
  ["PRIVATE CELEBRATIONS","High-touch private events built with ICONIC production, nightlife energy and hospitality standards."],
  ["ALBUM + RELEASE EVENTS","Music-led launch moments that connect artist identity, content, performance and guest experience."],
  ["EXHIBITIONS","Culture-forward showcases that can combine art, music, creators, partners and commerce."],
  ["BRAND ACTIVATIONS","Physical and social moments built around useful integration, content capture and audience participation."],
  ["VENUE PROGRAMMING","Repeatable event concepts, calendar strategy and premium live programming for venues and destination partners."],
];

export default function BookPage(){return <PlatformShell>
  <Hero visual={BOOK_VISUAL} visualPosition="center 48%" eyebrow="BOOK ICONIC" title="DON’T JUST FILL THE ROOM. GIVE IT A REASON TO BE REMEMBERED." sub="ICONIC produces corporate events, private celebrations, album releases, exhibitions, brand activations and venue programming with the same world-building standard used across our live properties." visualNote="PRODUCTION · PROGRAMMING · EXPERIENCE DESIGN" />
  <Section eyebrow="What ICONIC Can Build" title="Different briefs. The same premium standard." dark>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:14}}>{formats.map(([title,body],i)=><article key={title} className="glass market-card" style={{padding:28,borderRadius:22,minHeight:235}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".18em"}}>{String(i+1).padStart(2,"0")}</div><h2 style={{fontFamily:"Georgia,serif",fontSize:34,lineHeight:.96,margin:"22px 0 12px"}}>{title}</h2><p style={{color:C.muted,fontSize:13,lineHeight:1.7,margin:0}}>{body}</p></article>)}</div>
  </Section>
  <Section eyebrow="Start The Brief" title="Tell ICONIC the market, date window, room and ambition.">
    <div style={{maxWidth:950}}><AccessForm intent="booking" event="book-iconic"/></div>
  </Section>
</PlatformShell>}
