import type { Metadata } from "next";
import Link from "next/link";
import PlatformShell from "@/app/_components/PlatformShell";

export const metadata:Metadata={title:"About ICONIC",description:"ICONIC is a live-entertainment and experiential platform producing headline concerts, tours, premium hospitality, merchandise, sponsorships and cultural moments."};
const platform=[
  ["LIVE EVENTS","Headline concerts, arena and stadium events designed as branded worlds rather than isolated dates."],
  ["TOURS","Repeatable multi-city systems with localized creative, venue strategy, premium access and market-specific activation."],
  ["EXPERIENCES","Arrival, nightlife, hospitality, afterparties, food and beverage and destination-weekend extensions."],
  ["PARTNERSHIPS","Sponsorship inventory, brand integration, hospitality, content, ticket allocation and custom activations."],
  ["MERCH + COMMERCE","Artist, event and city collections that extend the cultural and commercial life of the show."],
  ["CONTENT + IP","Campaign worlds, media capture and post-event assets built to keep the experience moving after doors close."],
] as const;

export default function AboutPage(){return <PlatformShell><main className="cp-page">
  <section className="cp-graphic-hero" style={{background:"linear-gradient(145deg,#0a0a0a,#111 58%,#15150d)"}}><div><div className="cp-kicker">ABOUT ICONIC</div><h1>MAKE THE MOMENT LAST LONGER THAN THE NIGHT.</h1><p>ICONIC operates at the intersection of culture, live entertainment, experience design and strategic partnerships. The goal is not simply attendance; it is memory, repeatability and scale.</p><div className="cp-actions"><Link href="/partners" className="cp-btn primary">Build With ICONIC</Link><Link href="/events" className="cp-btn">Current Events</Link></div></div></section>
  <section className="cp-section"><div className="cp-section-head"><div className="cp-kicker">The Platform</div><div><h2>Not a promoter tag. An operating system for culture.</h2></div></div><div className="cp-grid">{platform.map(([title,body],i)=><article className="cp-tile" key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><p>{body}</p></article>)}</div></section>
  <section className="cp-section alt"><div className="cp-section-head"><div className="cp-kicker">The Standard</div><div><h2>Premium presentation. Cultural relevance. Operational clarity.</h2></div></div><div className="cp-list">{[
    ["MEMORABLE BY DESIGN","Every experience should create moments worth photographing, retelling and comparing."],
    ["WORLD-BUILDING OVER FLYERS","Strong properties have visual language, arrival ritual, merch, content and city-specific story."],
    ["REVENUE BEYOND THE TICKET","VIP, suites, sponsors, hospitality, merchandise, F&B and content are built in from the start."],
    ["SEPARATE WORLDS. ONE PLATFORM.","Tampa Halloween, Soul Symphony and Pardon My French stay distinct while sharing ICONIC infrastructure."],
  ].map(([title,body],i)=><div className="cp-row" key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><p>{body}</p><em>•</em></div>)}</div></section>
</main></PlatformShell>}
