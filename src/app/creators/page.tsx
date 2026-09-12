import type { Metadata } from "next";
import { C, Hero, Section } from "@/app/_components/IconicPage";
import PlatformShell from "@/app/_components/PlatformShell";
import AccessForm from "@/app/access/AccessForm";

const CREATOR_VISUAL="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-platform-artist-reveal.png?v=1789179959";
export const metadata:Metadata={title:"Creators",description:"ICONIC Creators is a home for artists, DJs, performers, photographers, videographers, hosts, producers, designers and cultural tastemakers."};

const disciplines=["MUSIC ARTISTS","DJS","PAINTERS + VISUAL ARTISTS","PERFORMERS","PHOTOGRAPHERS","VIDEOGRAPHERS","HOSTS","PRODUCERS","DESIGNERS","CULTURAL TASTEMAKERS"];
export default function CreatorsPage(){return <PlatformShell>
  <Hero visual={CREATOR_VISUAL} visualPosition="center 48%" eyebrow="ICONIC CREATORS™" title="TALENT SHOULD HAVE A HOME BIG ENOUGH FOR THE VISION." sub="ICONIC houses creators across music, art and performance and builds pathways into booking, brand packaging, media capture, sponsor access and live experiences." visualNote="CREATE · DEVELOP · PACKAGE · BOOK · SCALE" />
  <Section eyebrow="Creator Ecosystem" title="More than a roster. A development and opportunity system." dark>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:10}}>{disciplines.map((item,i)=><div className="glass market-card" key={item} style={{padding:24,borderRadius:18,minHeight:145,display:"flex",flexDirection:"column",justifyContent:"space-between"}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".16em"}}>{String(i+1).padStart(2,"0")}</div><h2 style={{fontFamily:"Georgia,serif",fontSize:25,lineHeight:.98,margin:0}}>{item}</h2></div>)}</div>
  </Section>
  <Section eyebrow="What ICONIC Provides" title="Creative identity should connect to real opportunity.">
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:14}}>{[['BOOKING PIPELINES','Connect qualified creators to ICONIC events, partner programming and aligned opportunities.'],['BRAND PACKAGING','Present talent with a stronger commercial identity and clearer market position.'],['MEDIA CAPTURE','Create photography, video and archival proof that grows cultural currency.'],['SPONSOR ACCESS','Build credible pathways to partner alignment when the fit is real.']].map(([title,body])=><div className="glass" key={title} style={{padding:28,borderRadius:22}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".17em"}}>{title}</div><p style={{fontFamily:"Georgia,serif",fontSize:30,lineHeight:1.08,margin:"18px 0 0"}}>{body}</p></div>)}</div>
  </Section>
  <Section eyebrow="Creator Submission" title="Show ICONIC what you create and where you want it to go." dark>
    <div style={{maxWidth:900}}><AccessForm intent="creator" event="iconic-creators"/></div>
  </Section>
</PlatformShell>}
