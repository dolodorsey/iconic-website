import Link from "next/link";
import type { ReactNode } from "react";
import { ICONIC_LOGO } from "./IconicPage";

const nav=[
  ["Events","/events"],
  ["Experiences","/experiences"],
  ["Creators","/creators"],
  ["ICONIC Music","/music"],
  ["Media","/media"],
  ["Merch","/merch"],
  ["Partners","/partners"],
] as const;

export default function PlatformShell({children}:{children:ReactNode}){return <main className="platform-shell">
  <header className="platform-header">
    <Link href="/" className="platform-logo"><img src={ICONIC_LOGO} alt="ICONIC LIVE"/></Link>
    <nav className="platform-nav" aria-label="ICONIC LIVE primary navigation">{nav.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}</nav>
    <Link href="/access?intent=presale" className="platform-access">Access →</Link>
  </header>
  {children}
  <footer className="platform-footer">
    <div className="platform-footer-brand"><img src={ICONIC_LOGO} alt="ICONIC LIVE"/><p>Music · Culture · Experiences · Forever</p><small>Premium nightlife, immersive cultural experiences, creators, music, headline concerts, multi-city tours, hospitality, official merchandise and strategic partnerships.</small></div>
    <div><span>CURRENT SLATE</span><Link href="/tampa-halloween">Tampa Halloween</Link><Link href="/summer-walker">Summer Walker — Soul Symphony</Link><Link href="/dj-snake-pardon-my-french">DJ Snake — Pardon My French</Link><Link href="/events">All Events</Link><Link href="/merch">Official Merch</Link></div>
    <div><span>ICONIC ECOSYSTEM</span><Link href="/about">About ICONIC</Link><Link href="/experiences">Experiences</Link><Link href="/social">ICONIC Social</Link><Link href="/creators">Creators</Link><Link href="/music">ICONIC MUSIC</Link><Link href="/media">Media + Archive</Link></div>
    <div><span>WORK WITH ICONIC</span><Link href="/partners">Partnerships + Sponsorships</Link><Link href="/book">Book ICONIC</Link><Link href="/contact">Contact</Link><Link href="/access?intent=vip">VIP + Hospitality</Link><Link href="/access?intent=travel">Travel + City Weekend</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
  </footer>
</main>}
