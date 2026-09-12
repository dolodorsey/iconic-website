import type { Metadata } from "next";
import Link from "next/link";
import { C, Hero, Section } from "@/app/_components/IconicPage";
import PlatformShell from "@/app/_components/PlatformShell";

const EXPERIENCE_VISUAL="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-platform-vip-hospitality.png?v=1789179973";
export const metadata:Metadata={title:"Experiences",description:"ICONIC NIGHTS, ICONIC EXPERIENCES and ICONIC SOCIAL — premium nightlife, immersive cultural environments and invite-level networking."};

const worlds=[
  ["ICONIC NIGHTS™","PRESTIGE NIGHTLIFE","Strict curation, elevated rooms, intentional guest mix and memorable social energy. Nightlife is treated as a cultural product, not a generic party.","/access?intent=partners"],
  ["ICONIC EXPERIENCES™","IMMERSIVE CULTURE","Culture-forward environments built around art direction, sound, arrival, hospitality, performance, commerce and memory.","/events"],
  ["ICONIC SOCIAL™","INVITE-LEVEL NETWORKING","Power networking without conference energy — curated rooms where creators, operators, brands and cultural tastemakers can actually connect.","/social"],
];

export default function ExperiencesPage(){return <PlatformShell>
  <Hero visual={EXPERIENCE_VISUAL} visualPosition="center 48%" eyebrow="ICONIC EXPERIENCES™" title="NOT ATTENDED. REMEMBERED." sub="ICONIC turns nightlife, culture and social connection into designed experiences with distinct identity, strict curation and premium execution." visualNote="NIGHTS · EXPERIENCES · SOCIAL" />
  <Section eyebrow="Experience System" title="Three formats. One standard." dark>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:14}}>{worlds.map(([title,label,body,href],i)=><Link key={title} href={href} className="glass market-card" style={{minHeight:360,padding:30,borderRadius:24,color:C.white,textDecoration:"none",display:"flex",flexDirection:"column",justifyContent:"space-between"}}><div><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".2em"}}>{String(i+1).padStart(2,"0")} · {label}</div><h2 style={{fontFamily:"Georgia,serif",fontSize:46,lineHeight:.9,margin:"24px 0 18px"}}>{title}</h2><p style={{color:C.muted,fontSize:14,lineHeight:1.75,margin:0}}>{body}</p></div><span style={{color:C.gold2,fontSize:9,fontWeight:900,letterSpacing:".14em"}}>ENTER WORLD →</span></Link>)}</div>
  </Section>
  <Section eyebrow="What Makes It ICONIC" title="Curation is part of the product.">
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:12}}>{[['ARRIVAL','The experience begins before the main room.'],['ROOM DESIGN','Lighting, sound, visual identity and spatial moments work together.'],['PEOPLE','Guest mix matters; access is part of the atmosphere.'],['HOSPITALITY','VIP and service should deepen the world, not interrupt it.'],['CONTENT','Every experience creates media and cultural proof.'],['AFTERLIFE','The night continues through archive, merch, community and future access.']].map(([title,body],i)=><div key={title} className="glass" style={{padding:26,borderRadius:20}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".18em"}}>{String(i+1).padStart(2,"0")}</div><h3 style={{fontFamily:"Georgia,serif",fontSize:30,margin:"18px 0 10px"}}>{title}</h3><p style={{color:C.muted,fontSize:12,lineHeight:1.65,margin:0}}>{body}</p></div>)}</div>
  </Section>
</PlatformShell>}
