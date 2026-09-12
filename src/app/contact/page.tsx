import type { Metadata } from "next";
import Link from "next/link";
import PlatformShell from "@/app/_components/PlatformShell";
import AccessForm from "@/app/access/AccessForm";

export const metadata:Metadata={title:"Contact",description:"Contact ICONIC for events, partnerships, creators, music, media, booking and access."};
const routes=[
  ["TICKETS + VIP","/access?intent=presale"],
  ["SPONSORSHIPS","/access?intent=sponsorship"],
  ["CREATORS","/creators"],
  ["ICONIC MUSIC","/music"],
  ["BOOK ICONIC","/book"],
  ["MEDIA + ARCHIVE","/media"],
] as const;

export default function ContactPage(){return <PlatformShell><main className="cp-page">
  <section className="cp-graphic-hero" style={{background:"linear-gradient(135deg,#0a0a0a 0%,#111 65%,#1b1b1b 100%)"}}><div><div className="cp-kicker">CONTACT ICONIC</div><h1>TELL US WHAT YOU’RE BUILDING.</h1><p>Choose the right operating lane when you can. If the request sits between categories, use general contact and keep the context intact.</p></div></section>
  <section className="cp-section"><div className="cp-section-head"><div className="cp-kicker">Direct Paths</div><div><h2>Get to the right team faster.</h2></div></div><div className="cp-route-grid">{routes.map(([title,href],i)=><Link className="cp-route" href={href} key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><em>↗</em></Link>)}</div></section>
  <section className="cp-section alt"><div className="cp-section-head"><div className="cp-kicker">General Contact</div><div><h2>If none of those lanes fit, start here.</h2></div></div><div className="cp-form-wrap"><AccessForm intent="contact" event="iconic-contact"/></div></section>
</main></PlatformShell>}
