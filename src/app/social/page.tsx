import type { Metadata } from "next";
import PlatformShell from "@/app/_components/PlatformShell";
import AccessForm from "@/app/access/AccessForm";

export const metadata:Metadata={title:"ICONIC Social",description:"ICONIC Social is invite-level power networking for creators, operators, brands and cultural tastemakers."};
const principles=[
  ["CURATED ACCESS","The guest mix is intentional. Attendance is not the product; the room is."],
  ["CROSS-DISCIPLINE","Music, art, hospitality, media, design, brand, technology and culture meet inside one ecosystem."],
  ["REAL UTILITY","Collaboration, booking, sponsorship, opportunity and trusted introduction matter more than badges."],
  ["PRESTIGE SOCIAL ENERGY","The format still feels like an ICONIC night: premium, visual, relaxed and memorable."],
] as const;

export default function SocialPage(){return <PlatformShell><main className="cp-page">
  <section className="cp-graphic-hero" style={{background:"linear-gradient(135deg,#0b0b0b 0%,#141414 52%,#16111b 100%)"}}><div><div className="cp-kicker">ICONIC SOCIAL™</div><h1>THE RIGHT ROOM CHANGES WHAT HAPPENS NEXT.</h1><p>Invite-level power networking for creators, operators, brands and cultural tastemakers — curated for real connection without conference energy.</p></div></section>
  <section className="cp-section alt"><div className="cp-section-head"><div className="cp-kicker">The Room</div><div><h2>Networking should feel like culture, not obligation.</h2></div></div><div className="cp-list">{principles.map(([title,body],i)=><div className="cp-row" key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><p>{body}</p><em>•</em></div>)}</div></section>
  <section className="cp-section"><div className="cp-section-head"><div className="cp-kicker">Request Access</div><div><h2>Tell ICONIC why you belong in the room.</h2></div></div><div className="cp-form-wrap"><AccessForm intent="partners" event="iconic-social"/></div></section>
</main></PlatformShell>}
