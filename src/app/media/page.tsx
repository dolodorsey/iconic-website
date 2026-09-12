import type { Metadata } from "next";
import { C, Hero, Section } from "@/app/_components/IconicPage";
import PlatformShell from "@/app/_components/PlatformShell";
import AccessForm from "@/app/access/AccessForm";

const MASTER="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-live-concert-series-master.png?v=1789175341";
const SUMMER="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-soul-symphony-live-orchestral-experience.png?v=1789175231";
const PMF="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-pmf-stadium-event.png?v=1789175259";
export const metadata:Metadata={title:"Media & Archive",description:"ICONIC archives live events through photography, recap reels, editorial documentation and campaign media."};

export default function MediaPage(){return <PlatformShell>
  <Hero visual={MASTER} visualPosition="center 45%" eyebrow="ICONIC MEDIA + ARCHIVE" title="EVERY MOMENT BECOMES PROOF." sub="ICONIC events are archived through high-end photography, recap reels, editorial documentation and campaign media so the cultural life of the event continues after the room clears." visualNote="PHOTOGRAPHY · VIDEO · EDITORIAL · ARCHIVE" />
  <Section eyebrow="The Archive" title="Cultural currency needs documentation." dark>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:14}}>{[['PHOTOGRAPHY','High-end event and lifestyle photography that preserves people, atmosphere, production and detail.'],['RECAP FILMS','Aftermovies and short-form edits that translate the room into something people can feel after the fact.'],['EDITORIAL DOCUMENTATION','Structured visual storytelling around cities, artists, partners, production and cultural impact.'],['CAMPAIGN ASSETS','Media built to support announcements, recaps, sponsor proof, future sales and the next city.']].map(([title,body],i)=><article key={title} className="glass market-card" style={{padding:28,borderRadius:22,minHeight:225}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".18em"}}>{String(i+1).padStart(2,"0")}</div><h2 style={{fontFamily:"Georgia,serif",fontSize:34,lineHeight:.96,margin:"22px 0 12px"}}>{title}</h2><p style={{color:C.muted,fontSize:13,lineHeight:1.7,margin:0}}>{body}</p></article>)}</div>
  </Section>
  <Section eyebrow="Current Visual Worlds" title="The archive starts while the campaign is still alive.">
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:14}}>{[['ICONIC LIVE','Master live-entertainment platform',MASTER],['SOUL SYMPHONY','Live orchestral experience',SUMMER],['PARDON MY FRENCH','Stadium-event world',PMF]].map(([title,body,src])=><figure key={title} style={{margin:0,border:`1px solid ${C.faint}`,borderRadius:22,overflow:"hidden",background:"#080603"}}><img src={src} alt={title} style={{width:"100%",aspectRatio:"1/1",objectFit:"cover",display:"block"}}/><figcaption style={{padding:20}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".16em"}}>{title}</div><div style={{fontFamily:"Georgia,serif",fontSize:26,marginTop:9}}>{body}</div></figcaption></figure>)}</div>
  </Section>
  <Section eyebrow="Media Request" title="Press, licensing, archive and content requests enter here." dark><div style={{maxWidth:900}}><AccessForm intent="media" event="iconic-media-archive"/></div></Section>
</PlatformShell>}
