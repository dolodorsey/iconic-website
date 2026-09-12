import type { Metadata } from "next";
import Link from "next/link";
import { C, Hero, Section } from "@/app/_components/IconicPage";
import PlatformShell from "@/app/_components/PlatformShell";

const MASTER="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-platform-concert-series.png?v=1789179952";
const SUMMER="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-summer-walker-soul-symphony.jpg?v=1789170574";
const DJ="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-dj-snake-pardon-my-french.jpg?v=1789170586";

export const metadata:Metadata={title:"Events",description:"Explore ICONIC LIVE headline concerts, tours, event series and destination experiences."};

const current=[
  ["TAMPA HALLOWEEN","Nightmare on Channelside · Arena Event","/tampa-halloween",MASTER],
  ["SUMMER WALKER","Soul Symphony · 10-City Tour","/summer-walker",SUMMER],
  ["DJ SNAKE & FRIENDS","Pardon My French · 5-City Stadium Run","/dj-snake-pardon-my-french",DJ],
];
const franchises=[
  ["THE BALL SERIES","Formal + themed event series","/ball-series"],
  ["GROWN-ISH","21+ live concert property","/series/21-plus"],
  ["SOUL SESSION","30+ live concert property","/series/30-plus"],
  ["SOUTHLAKE ARENA","ICONIC venue platform","/southlake-arena"],
  ["NEW YORK","Resorts World platform","/new-york/resorts-world"],
  ["ATLANTA","ICONIC Atlanta market","/atlanta"],
];

export default function EventsPage(){return <PlatformShell>
  <Hero visual={MASTER} visualPosition="center 47%" eyebrow="ICONIC LIVE · EVENTS" title="SOME NIGHTS BECOME LEGACY." sub="Headline concerts, multi-city tours, arena moments and repeatable event properties — each built as its own world under the ICONIC platform." visualNote="NOT ATTENDED · REMEMBERED" />
  <Section eyebrow="Current Flagships" title="Three active worlds lead the platform." dark>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:14}}>{current.map(([title,meta,href,src])=><Link key={title} href={href} className="visual-banner" style={{position:"relative",minHeight:520,borderRadius:24,overflow:"hidden",border:`1px solid ${C.faint}`,color:C.white,textDecoration:"none"}}><img src={src} alt={title} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(0,0,0,.03) 25%,rgba(0,0,0,.94) 88%)"}}/><div style={{position:"absolute",left:26,right:26,bottom:26}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".18em"}}>ICONIC FLAGSHIP</div><h2 style={{fontFamily:"Georgia,serif",fontSize:42,lineHeight:.92,margin:"12px 0"}}>{title}</h2><div style={{color:C.muted,fontSize:10,fontWeight:900,letterSpacing:".1em",textTransform:"uppercase"}}>{meta} →</div></div></Link>)}</div>
  </Section>
  <Section eyebrow="ICONIC Franchises" title="The platform is bigger than the current tour slate.">
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:12}}>{franchises.map(([title,meta,href],i)=><Link key={title} href={href} className="glass market-card" style={{minHeight:200,padding:26,borderRadius:22,color:C.white,textDecoration:"none",display:"flex",flexDirection:"column",justifyContent:"space-between"}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".18em"}}>{String(i+1).padStart(2,"0")} · ICONIC PROPERTY</div><div><h3 style={{fontFamily:"Georgia,serif",fontSize:34,lineHeight:.96,margin:"0 0 10px"}}>{title}</h3><div style={{color:C.muted,fontSize:10,fontWeight:800,letterSpacing:".08em",textTransform:"uppercase"}}>{meta} →</div></div></Link>)}</div>
  </Section>
</PlatformShell>}
