import type { Metadata } from "next";
import PlatformShell from "@/app/_components/PlatformShell";
import AccessForm from "@/app/access/AccessForm";

export const metadata:Metadata={title:"Book ICONIC",description:"Book ICONIC for corporate events, private celebrations, album releases, exhibitions, brand activations and venue programming."};
const formats=[
  ["CORPORATE EVENTS","Premium company moments, entertainment programming, hospitality and branded experience design."],
  ["PRIVATE CELEBRATIONS","High-touch private events with ICONIC production, nightlife energy and hospitality standards."],
  ["ALBUM + RELEASE EVENTS","Music-led launch moments connecting artist identity, content, performance and guest experience."],
  ["EXHIBITIONS","Culture-forward showcases combining art, music, creators, partners and commerce."],
  ["BRAND ACTIVATIONS","Physical and social moments built around useful integration and audience participation."],
  ["VENUE PROGRAMMING","Repeatable event concepts, calendar strategy and premium live programming for venues."],
] as const;

export default function BookPage(){return <PlatformShell><main className="cp-page">
  <section className="cp-graphic-hero" style={{background:"linear-gradient(145deg,#0c0c0c,#111 58%,#10211c)"}}><div><div className="cp-kicker">BOOK ICONIC</div><h1>GIVE THE ROOM A REASON TO BE REMEMBERED.</h1><p>Corporate events, private celebrations, release moments, exhibitions, brand activations and venue programming built with the same world-building discipline as ICONIC live properties.</p></div></section>
  <section className="cp-section"><div className="cp-section-head"><div className="cp-kicker">What ICONIC Can Build</div><div><h2>Different briefs. One production standard.</h2></div></div><div className="cp-grid">{formats.map(([title,body],i)=><article className="cp-tile" key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><p>{body}</p></article>)}</div></section>
  <section className="cp-section alt"><div className="cp-section-head"><div className="cp-kicker">Start The Brief</div><div><h2>Market. Date window. Room. Ambition.</h2><p>Keep the first submission simple. The operating team can build depth after the brief is routed correctly.</p></div></div><div className="cp-form-wrap"><AccessForm intent="booking" event="book-iconic"/></div></section>
</main></PlatformShell>}
