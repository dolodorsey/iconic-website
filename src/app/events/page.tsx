import type { Metadata } from "next";
import Link from "next/link";
import PlatformShell from "@/app/_components/PlatformShell";
import { DJ_SNAKE_AND_FRIENDS_LOGO, PARDON_MY_FRENCH_TOUR_LOGO, SUMMER_WALKER_SOUL_SYMPHONY_LOGO } from "@/app/_components/tour-brand-assets";

export const metadata:Metadata={title:"Events",description:"Explore ICONIC headline concerts, tours, event series and destination experiences."};
const franchises=[
  ["THE BALL SERIES","Formal + themed event series","/ball-series"],
  ["GROWN-ISH","21+ live concert property","/series/21-plus"],
  ["SOUL SESSION","30+ live concert property","/series/30-plus"],
  ["SOUTHLAKE ARENA","ICONIC venue platform","/southlake-arena"],
  ["NEW YORK","Resorts World platform","/new-york/resorts-world"],
  ["ATLANTA","ICONIC Atlanta market","/atlanta"],
] as const;

export default function EventsPage(){return <PlatformShell><main className="cp-page">
  <section className="cp-graphic-hero" style={{background:"linear-gradient(135deg,#090909 0%,#111 60%,#161009 100%)"}}><div><div className="cp-kicker">ICONIC LIVE · EVENTS</div><h1>SOME NIGHTS BECOME LEGACY.</h1><p>Headline concerts, multi-city tours, arena moments and repeatable event properties — each built as its own world under one operating platform.</p><div className="cp-actions"><Link href="/access?intent=presale" className="cp-btn primary">Get Event Access</Link><Link href="/partners" className="cp-btn">Partner With ICONIC</Link></div></div></section>
  <section className="cp-section"><div className="cp-section-head"><div className="cp-kicker">Current Flagships</div><div><h2>Three active worlds. No recycled campaign photography.</h2><p>Brand marks and typography identify the property here; the full photography belongs inside the property itself.</p></div></div><div className="cp-event-worlds">
    <Link href="/tampa-halloween" className="cp-event-world tampa"><span>01 · TAMPA HALLOWEEN</span><strong>NIGHTMARE<br/>ON CHANNELSIDE</strong><p>Arena concert · Halloween spectacle · live merch</p><em>ENTER WORLD →</em></Link>
    <Link href="/summer-walker" className="cp-event-world summer"><span>02 · SOUL SYMPHONY</span><img src={SUMMER_WALKER_SOUL_SYMPHONY_LOGO} alt="Summer Walker Soul Symphony Tour"/><p>10-city soulful experience platform</p><em>ENTER WORLD →</em></Link>
    <Link href="/dj-snake-pardon-my-french" className="cp-event-world pmf"><span>03 · STADIUM PLATFORM</span><div><img src={DJ_SNAKE_AND_FRIENDS_LOGO} alt="DJ Snake and Friends"/><img src={PARDON_MY_FRENCH_TOUR_LOGO} alt="Pardon My French Tour"/></div><p>5 cities · 5 stadiums</p><em>ENTER WORLD →</em></Link>
  </div></section>
  <section className="cp-section alt"><div className="cp-section-head"><div className="cp-kicker">ICONIC Franchises</div><div><h2>The platform is larger than the current tour slate.</h2></div></div><div className="cp-list">{franchises.map(([title,meta,href],i)=><Link className="cp-row" href={href} key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><p>{meta}</p><em>↗</em></Link>)}</div></section>
</main></PlatformShell>}
