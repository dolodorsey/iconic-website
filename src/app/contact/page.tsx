import type { Metadata } from "next";
import Link from "next/link";
import { C, Hero, Section } from "@/app/_components/IconicPage";
import PlatformShell from "@/app/_components/PlatformShell";
import AccessForm from "@/app/access/AccessForm";

const MASTER="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-live-concert-series-master.png?v=1789175341";
export const metadata:Metadata={title:"Contact",description:"Contact ICONIC LIVE for events, partnerships, creators, music, media, booking and access."};

const routes=[
  ["TICKETS + VIP","/access?intent=presale"],
  ["SPONSORSHIPS","/access?intent=sponsorship"],
  ["CREATORS","/creators"],
  ["ICONIC MUSIC","/music"],
  ["BOOK ICONIC","/book"],
  ["MEDIA + ARCHIVE","/media"],
];
export default function ContactPage(){return <PlatformShell>
  <Hero visual={MASTER} visualPosition="center 46%" eyebrow="CONTACT ICONIC" title="TELL US WHAT YOU’RE BUILDING." sub="Choose the right lane when you can. If your request sits between categories, use the general ICONIC contact form and we’ll preserve the context for routing." visualNote="ONE PLATFORM · SEPARATE OPERATING LANES" />
  <Section eyebrow="Direct Paths" title="Get to the right ICONIC lane faster." dark>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:12}}>{routes.map(([title,href],i)=><Link key={title} href={href} className="glass market-card" style={{minHeight:150,padding:24,borderRadius:20,color:C.white,textDecoration:"none",display:"flex",flexDirection:"column",justifyContent:"space-between"}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".18em"}}>{String(i+1).padStart(2,"0")}</div><h2 style={{fontFamily:"Georgia,serif",fontSize:28,lineHeight:.98,margin:0}}>{title} →</h2></Link>)}</div>
  </Section>
  <Section eyebrow="General Contact" title="If none of those lanes fit, start here."><div style={{maxWidth:900}}><AccessForm intent="contact" event="iconic-contact"/></div></Section>
</PlatformShell>}
