import type { Metadata } from "next";
import Link from "next/link";
import PlatformShell from "@/app/_components/PlatformShell";

const HERO="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-live-concert-series-master.png?v=1789175341";
const TAMPA="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-01.png?v=1788994167";
const SUMMER="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-summer-walker-soul-symphony.jpg?v=1789170574";
const DJ="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-dj-snake-pardon-my-french.jpg?v=1789170586";

export const metadata:Metadata={title:"Events",description:"Explore ICONIC headline concerts, tours, event series and destination experiences."};

const current=[
  {title:"TAMPA HALLOWEEN",meta:"Nightmare on Channelside · Arena World",href:"/tampa-halloween",src:TAMPA},
  {title:"SUMMER WALKER",meta:"Soul Symphony · 10-City Platform",href:"/summer-walker",src:SUMMER},
  {title:"DJ SNAKE & FRIENDS",meta:"Pardon My French · 5 Stadium Cities",href:"/dj-snake-pardon-my-french",src:DJ},
];
const franchises=[
  ["THE BALL SERIES","Formal + themed event series","/ball-series"],
  ["GROWN-ISH","21+ live concert property","/series/21-plus"],
  ["SOUL SESSION","30+ live concert property","/series/30-plus"],
  ["SOUTHLAKE ARENA","ICONIC venue platform","/southlake-arena"],
  ["NEW YORK","Resorts World platform","/new-york/resorts-world"],
  ["ATLANTA","ICONIC Atlanta market","/atlanta"],
] as const;

export default function EventsPage(){return <PlatformShell><main className="cp-page">
  <section className="cp-hero"><div className="cp-hero-copy"><div className="cp-kicker">ICONIC LIVE · EVENTS</div><h1>SOME NIGHTS BECOME LEGACY.</h1><p>Headline concerts, multi-city tours, arena moments and repeatable event properties — each built as its own world under one operating platform.</p><div className="cp-actions"><Link href="/access?intent=presale" className="cp-btn primary">Get Event Access</Link><Link href="/partners" className="cp-btn">Partner With ICONIC</Link></div></div><div className="cp-hero-media"><img src={HERO} alt="ICONIC live event platform"/></div></section>
  <section className="cp-section"><div className="cp-section-head"><div className="cp-kicker">Current Flagships</div><div><h2>Three active worlds. No shared visual identity.</h2><p>Each property gets its own creative language, audience, commerce and conversion path.</p></div></div><div className="cp-feature-grid">{current.map(item=><Link className="cp-feature" href={item.href} key={item.title}><img src={item.src} alt={item.title}/><div><strong>{item.title}</strong><span>{item.meta} →</span></div></Link>)}</div></section>
  <section className="cp-section alt"><div className="cp-section-head"><div className="cp-kicker">ICONIC Franchises</div><div><h2>The platform is larger than the current tour slate.</h2></div></div><div className="cp-list">{franchises.map(([title,meta,href],i)=><Link className="cp-row" href={href} key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><p>{meta}</p><em>↗</em></Link>)}</div></section>
</main></PlatformShell>}
