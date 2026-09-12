import type { Metadata } from "next";
import { C, Hero, Section } from "@/app/_components/IconicPage";
import PlatformShell from "@/app/_components/PlatformShell";
import AccessForm from "@/app/access/AccessForm";

const SOCIAL_VISUAL="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-platform-vip-hospitality.png?v=1789179973";
export const metadata:Metadata={title:"ICONIC Social",description:"ICONIC Social is invite-level power networking for creators, operators, brands and cultural tastemakers."};

export default function SocialPage(){return <PlatformShell>
  <Hero visual={SOCIAL_VISUAL} visualPosition="center 48%" eyebrow="ICONIC SOCIAL™" title="THE RIGHT ROOM CHANGES WHAT HAPPENS NEXT." sub="Invite-level power networking for creators, operators, brands and cultural tastemakers — curated for real connection without conference energy." visualNote="CURATED PEOPLE · CULTURAL CAPITAL · REAL CONNECTION" />
  <Section eyebrow="The Room" title="Networking should feel like culture, not obligation." dark>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:14}}>{[['CURATED ACCESS','The guest mix is intentional. Attendance is not the product; the room is.'],['CROSS-DISCIPLINE','Music, art, hospitality, media, design, brand, technology and culture can meet inside one ecosystem.'],['REAL UTILITY','The point is collaboration, booking, sponsorship, opportunity and trusted introduction — not collecting badges.'],['PRESTIGE SOCIAL ENERGY','The format should still feel like an ICONIC night: premium, visual, relaxed and memorable.']].map(([title,body],i)=><div className="glass market-card" key={title} style={{padding:28,borderRadius:22,minHeight:230}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".18em"}}>{String(i+1).padStart(2,"0")}</div><h2 style={{fontFamily:"Georgia,serif",fontSize:34,lineHeight:.96,margin:"20px 0 12px"}}>{title}</h2><p style={{color:C.muted,fontSize:13,lineHeight:1.7,margin:0}}>{body}</p></div>)}</div>
  </Section>
  <Section eyebrow="Request Access" title="Tell ICONIC why you belong in the room.">
    <div style={{maxWidth:850}}><AccessForm intent="partners" event="iconic-social"/></div>
  </Section>
</PlatformShell>}
