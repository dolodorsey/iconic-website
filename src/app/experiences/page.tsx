import type { Metadata } from "next";
import Link from "next/link";
import PlatformShell from "@/app/_components/PlatformShell";

const HERO="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-platform-vip-hospitality.png?v=1789179973";
export const metadata:Metadata={title:"Experiences",description:"ICONIC NIGHTS, ICONIC EXPERIENCES and ICONIC SOCIAL — premium nightlife, immersive cultural environments and invite-level networking."};

const worlds=[
  ["ICONIC NIGHTS™","Prestige nightlife","Strict curation, elevated rooms, intentional guest mix and memorable social energy.","/access?intent=partners"],
  ["ICONIC EXPERIENCES™","Immersive culture","Culture-forward environments built around art direction, sound, arrival, hospitality, performance and commerce.","/events"],
  ["ICONIC SOCIAL™","Invite-level networking","Curated rooms where creators, operators, brands and cultural tastemakers can actually connect.","/social"],
] as const;
const principles=[
  ["ARRIVAL","The experience begins before the main room."],
  ["ROOM DESIGN","Lighting, sound and spatial moments work as one identity."],
  ["PEOPLE","The guest mix is part of the atmosphere."],
  ["HOSPITALITY","VIP and service deepen the world instead of interrupting it."],
  ["CONTENT","Every room creates cultural proof."],
  ["AFTERLIFE","Archive, community and future access extend the night."],
] as const;

export default function ExperiencesPage(){return <PlatformShell><main className="cp-page">
  <section className="cp-hero"><div className="cp-hero-copy"><div className="cp-kicker">ICONIC EXPERIENCES™</div><h1>NOT ATTENDED. REMEMBERED.</h1><p>Nightlife, culture and social connection designed with distinct identity, strict curation and premium execution.</p><div className="cp-actions"><Link href="/social" className="cp-btn primary">Explore ICONIC Social</Link><Link href="/book" className="cp-btn">Book ICONIC</Link></div></div><div className="cp-hero-media"><img src={HERO} alt="ICONIC premium hospitality experience"/></div></section>
  <section className="cp-section"><div className="cp-section-head"><div className="cp-kicker">Experience System</div><div><h2>Three formats. One standard.</h2><p>No giant cards. Each format gets one clear promise and a direct next step.</p></div></div><div className="cp-list">{worlds.map(([title,label,body,href],i)=><Link className="cp-row" href={href} key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><p><b>{label}.</b> {body}</p><em>↗</em></Link>)}</div></section>
  <section className="cp-section alt"><div className="cp-section-head"><div className="cp-kicker">What Makes It ICONIC</div><div><h2>Curation is part of the product.</h2></div></div><div className="cp-grid">{principles.map(([title,body],i)=><article className="cp-tile" key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><p>{body}</p></article>)}</div></section>
</main></PlatformShell>}
