import type { Metadata } from "next";
import { C, Hero, Section } from "@/app/_components/IconicPage";
import PlatformShell from "@/app/_components/PlatformShell";
import AccessForm from "@/app/access/AccessForm";

const MASTER="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-live-concert-series-master.png?v=1789175341";
const SUMMER="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-summer-walker-soul-symphony.jpg?v=1789170574";
const DJ="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-dj-snake-pardon-my-french.jpg?v=1789170586";
export const metadata:Metadata={title:"ICONIC MUSIC",description:"ICONIC MUSIC focuses on artist discovery, development, release strategy, DJ curation and live performance integration."};

const services=[
  ["ARTIST DEVELOPMENT","Build the artist, positioning and next-stage development path."],
  ["PRODUCTION + STUDIO STRATEGY","Connect sound, collaborators and production decisions to the bigger brand direction."],
  ["RELEASE ROLLOUTS","Package releases with campaign thinking, content moments and audience-building mechanics."],
  ["PERFORMANCE + DJ BOOKINGS","Integrate artists and DJs into ICONIC events and aligned external opportunities."],
  ["EVENT SOUND CURATION","Treat music programming as part of the identity of the room, not background filler."],
];

export default function MusicPage(){return <PlatformShell>
  <Hero visual={MASTER} visualPosition="center 46%" eyebrow="ICONIC MUSIC™" title="MUSIC LIVES HIGHER HERE." sub="The music division of ICONIC focuses on artist discovery, development, release strategy, DJ curation and live performance integration across the ICONIC event ecosystem." visualNote="DISCOVERY · DEVELOPMENT · RELEASES · BOOKINGS" />
  <Section eyebrow="ICONIC MUSIC Services" title="Develop the sound. Build the context. Create the stage." dark>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>{services.map(([title,body],i)=><article key={title} className="glass market-card" style={{padding:28,borderRadius:22,minHeight:230}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".18em"}}>{String(i+1).padStart(2,"0")}</div><h2 style={{fontFamily:"Georgia,serif",fontSize:32,lineHeight:.98,margin:"22px 0 12px"}}>{title}</h2><p style={{color:C.muted,fontSize:13,lineHeight:1.7,margin:0}}>{body}</p></article>)}</div>
  </Section>
  <Section eyebrow="Live Integration" title="Music development connects directly to the rooms ICONIC builds.">
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:14}}>
      {[['SOUL SYMPHONY','R&B × live orchestral performance architecture',SUMMER,'/summer-walker'],['PARDON MY FRENCH','Global DJ culture at U.S. stadium scale',DJ,'/dj-snake-pardon-my-french'],['ICONIC LIVE','Concerts, tours and destination properties across the platform',MASTER,'/events']].map(([title,body,src,href])=><a href={href} key={title} style={{position:"relative",minHeight:440,borderRadius:22,overflow:"hidden",border:`1px solid ${C.faint}`,color:C.white,textDecoration:"none"}}><img src={src} alt={title} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.94))"}}/><div style={{position:"absolute",left:24,right:24,bottom:24}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".16em"}}>LIVE INTEGRATION</div><h3 style={{fontFamily:"Georgia,serif",fontSize:38,lineHeight:.94,margin:"12px 0"}}>{title}</h3><p style={{color:C.muted,fontSize:12,lineHeight:1.6}}>{body}</p></div></a>)}
    </div>
  </Section>
  <Section eyebrow="Music Submission" title="Send ICONIC the sound, the market and the next move." dark>
    <div style={{maxWidth:900}}><AccessForm intent="music" event="iconic-music"/></div>
  </Section>
</PlatformShell>}
