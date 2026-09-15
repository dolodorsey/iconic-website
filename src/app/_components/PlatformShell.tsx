import Link from "next/link";
import type { ReactNode } from "react";
import { ICONIC_LOGO } from "./IconicPage";

const nav=[
  ["Events","/events"],
  ["Experiences","/experiences"],
  ["Music","/music"],
  ["Creators","/creators"],
  ["Merch","/merch"],
  ["Partners","/partners"],
] as const;

export default function PlatformShell({children}:{children:ReactNode}){
  return <div className="ir-shell">
    <a className="ir-skip" href="#iconic-content">Skip to content</a>
    <header className="ir-header">
      <Link href="/" className="ir-logo" aria-label="ICONIC home"><img src={ICONIC_LOGO} alt="ICONIC"/></Link>
      <nav className="ir-nav" aria-label="ICONIC primary navigation">{nav.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}</nav>
      <div className="ir-header-actions">
        <Link href="/access?intent=presale" className="ir-access">Get Access</Link>
        <details className="ir-mobile-menu">
          <summary aria-label="Open ICONIC navigation">Menu</summary>
          <div className="ir-mobile-panel">
            {nav.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}
            <Link href="/media">Media</Link>
            <Link href="/about">About</Link>
            <Link href="/book">Book ICONIC</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </details>
      </div>
    </header>
    {children}
    <footer className="ir-footer">
      <div className="ir-footer-brand"><img src={ICONIC_LOGO} alt="ICONIC"/><p>Live entertainment, culture and experiences built to be remembered.</p></div>
      <div className="ir-footer-grid">
        <div><span>Current</span><Link href="/tampa-halloween">Tampa Halloween</Link><Link href="/summer-walker">Soul Symphony</Link><Link href="/dj-snake-pardon-my-french">Pardon My French</Link><Link href="/merch">Merch</Link></div>
        <div><span>Platform</span><Link href="/events">Events</Link><Link href="/experiences">Experiences</Link><Link href="/music">Music</Link><Link href="/creators">Creators</Link><Link href="/media">Media</Link></div>
        <div><span>Work With Us</span><Link href="/partners">Partners</Link><Link href="/book">Book ICONIC</Link><Link href="/contact">Contact</Link><Link href="/access?intent=vip">VIP</Link></div>
      </div>
      <div className="ir-footer-bottom"><span>ICONIC</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
    </footer>
  </div>;
}
