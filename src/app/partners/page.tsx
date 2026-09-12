import type { Metadata } from "next";
import Link from "next/link";
import PlatformShell from "@/app/_components/PlatformShell";

const HERO="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-live-concert-series-master.png?v=1789175341";
export const metadata:Metadata={title:"Partnerships & Sponsorships",description:"Partner with ICONIC across headline concerts, tours, VIP hospitality, brand activations, content, ticketing and event commerce."};

const inventory=[
  ["CATEGORY EXCLUSIVITY","Own a defined category across a property, city, tour leg or campaign window."],
  ["ON-SITE ACTIVATION","Build physical moments people use, photograph and remember."],
  ["VIP + HOSPITALITY","Suites, premium seating, hosted arrival, gifting and partner guest experiences."],
  ["TICKETING + ACCESS","Allocations, presale access, rewards and invitation-based audience experiences."],
  ["CONTENT + MEDIA","Branded storytelling, creator moments, recap assets and campaign integration."],
  ["FOOD + BEVERAGE","Pouring rights, hospitality moments and event-commerce opportunities."],
  ["MERCH + COLLABS","Limited capsules and co-branded product tied to artists, cities or event worlds."],
  ["CITY TAKEOVERS","Hotels, nightlife, transportation, dining, retail and destination-weekend integrations."],
] as const;
const properties=[
  ["TAMPA HALLOWEEN","Arena concert + Halloween spectacle + official merch","/access?intent=sponsorship&event=tampa-halloween"],
  ["SOUL SYMPHONY","10-city R&B × orchestral platform + premium hospitality","/access?intent=sponsorship&event=summer-walker-soul-symphony"],
  ["PARDON MY FRENCH","5-city stadium platform + destination-weekend culture","/access?intent=sponsorship&event=dj-snake-pardon-my-french"],
] as const;

export default function PartnersPage(){return <PlatformShell><main className="cp-page">
  <section className="cp-hero"><div className="cp-hero-copy"><div className="cp-kicker">ICONIC · PARTNERSHIP PLATFORM</div><h1>DON’T JUST SPONSOR THE SHOW.</h1><p>Own a real part of the fan journey — arrival, access, hospitality, commerce, content and city-wide cultural moments.</p><div className="cp-actions"><Link href="/access?intent=sponsorship" className="cp-btn primary">Request Inventory</Link><Link href="/access?intent=partners" className="cp-btn">Strategic Partnerships</Link></div></div><div className="cp-hero-media"><img src={HERO} alt="ICONIC partnership platform"/></div></section>
  <section className="cp-section"><div className="cp-section-head"><div className="cp-kicker">Partnership Inventory</div><div><h2>Useful integration beats passive placement.</h2></div></div><div className="cp-grid">{inventory.map(([title,body],i)=><article className="cp-tile" key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><p>{body}</p></article>)}</div></section>
  <section className="cp-section alt"><div className="cp-section-head"><div className="cp-kicker">Current Properties</div><div><h2>Different worlds. Different inventory.</h2></div></div><div className="cp-list">{properties.map(([title,body,href],i)=><Link className="cp-row" href={href} key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><p>{body}</p><em>↗</em></Link>)}</div></section>
</main></PlatformShell>}
