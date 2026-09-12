import Link from "next/link";
import type { ReactNode } from "react";
import { ICONIC_LOGO } from "./IconicPage";

const nav=[
  ["Home","/"],
  ["Tampa","/tampa-halloween"],
  ["Summer Walker","/summer-walker"],
  ["DJ Snake","/dj-snake-pardon-my-french"],
  ["Merch","/merch"],
  ["About","/about"],
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
    <div className="platform-footer-brand"><img src={ICONIC_LOGO} alt="ICONIC LIVE"/><p>Music · Culture · Experiences · Forever</p><small>Headline concerts, multi-city tours, premium hospitality, official merchandise and strategic partnerships.</small></div>
    <div><span>CURRENT SLATE</span><Link href="/tampa-halloween">Tampa Halloween</Link><Link href="/summer-walker">Summer Walker — Soul Symphony</Link><Link href="/dj-snake-pardon-my-french">DJ Snake — Pardon My French</Link><Link href="/merch">Official Merch</Link></div>
    <div><span>ICONIC PLATFORM</span><Link href="/about">About ICONIC</Link><Link href="/partners">Partnerships</Link><Link href="/access?intent=sponsorship">Sponsorships</Link><Link href="/access?intent=vip">VIP + Hospitality</Link><Link href="/access?intent=media">Media + Content</Link></div>
    <div><span>ACCESS</span><Link href="/access?intent=presale">Tickets + Presale</Link><Link href="/access?intent=partners">Strategic Partners</Link><Link href="/access?intent=travel">Travel + City Weekend</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
  </footer>
</main>}
