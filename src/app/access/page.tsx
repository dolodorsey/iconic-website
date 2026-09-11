import type { Metadata } from "next";
import Link from "next/link";
import { C, Section, Shell } from "@/app/_components/IconicPage";
import AccessForm from "./AccessForm";

export const metadata: Metadata = {
  title: "Access | ICONIC LIVE",
  description: "Tickets, presale, VIP, travel, merch and partnership access for ICONIC live entertainment.",
};

const intents = {
  presale: { eyebrow:"Tickets + Presale", title:"GET IN BEFORE THE RUSH.", body:"Join the access path for ticket releases, presale windows and on-sale alerts." },
  vip: { eyebrow:"VIP + Hospitality", title:"UPGRADE THE ENTIRE NIGHT.", body:"Request premium seating, hosted tables, suites, hospitality and elevated arrival options." },
  travel: { eyebrow:"City Weekend", title:"BUILD THE WHOLE WEEKEND.", body:"Request travel, hotel, arrival and city-weekend coordination around an ICONIC event." },
  merch: { eyebrow:"Merch Vault", title:"TAKE THE SHOW WITH YOU.", body:"Request merch release information, event drops and limited product access." },
  partners: { eyebrow:"Partners", title:"BUILD THE NEXT ICONIC MOMENT.", body:"For sponsors, venues, brand partners, talent partners and strategic collaborations." },
  sponsorship: { eyebrow:"Sponsorship", title:"OWN A REAL PART OF THE EXPERIENCE.", body:"Request sponsorship inventory, integrations, hospitality and custom activation opportunities." },
  media: { eyebrow:"Media + Archive", title:"KEEP THE MOMENT MOVING.", body:"For media, aftermovie, archive, content licensing and post-event asset requests." },
} as const;

type IntentKey = keyof typeof intents;

export default async function AccessPage({searchParams}:{searchParams?:Promise<{intent?:string;event?:string}>|{intent?:string;event?:string}}){
  const params=await Promise.resolve(searchParams||{});
  const raw=params.intent||"presale";
  const key:IntentKey = raw in intents ? raw as IntentKey : "presale";
  const current = intents[key];
  const event=params.event||undefined;
  return <Shell>
    <section style={{position:"relative",zIndex:2,minHeight:"64vh",padding:"clamp(90px,12vw,160px) clamp(22px,6vw,90px) 64px",display:"flex",alignItems:"end",background:"radial-gradient(circle at 80% 20%,rgba(224,173,69,.18),transparent 28%),#050403"}}>
      <div style={{maxWidth:1200}}>
        <div style={{fontSize:9,fontWeight:900,letterSpacing:".28em",textTransform:"uppercase",color:C.gold2,marginBottom:18}}>{current.eyebrow}</div>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(54px,9vw,128px)",lineHeight:.84,letterSpacing:"-.05em",margin:0,maxWidth:1100}}>{current.title}</h1>
        <p style={{maxWidth:720,fontSize:"clamp(14px,1.4vw,18px)",lineHeight:1.75,color:C.muted,margin:"28px 0 0"}}>{current.body}</p>
        {event&&<div style={{marginTop:18,fontSize:9,fontWeight:900,letterSpacing:".16em",textTransform:"uppercase",color:C.gold2}}>Routing to: {event.replaceAll("-"," ")}</div>}
      </div>
    </section>

    <Section eyebrow="Submit Your Request" title="Now your request actually enters the ICONIC system." dark>
      <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.15fr) minmax(280px,.85fr)",gap:24,alignItems:"start"}}>
        <AccessForm intent={key} event={event}/>
        <div className="glass" style={{padding:28,borderRadius:24}}>
          <div style={{fontSize:8,fontWeight:900,letterSpacing:".18em",textTransform:"uppercase",color:C.gold2}}>What happens next</div>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:38,lineHeight:1,margin:"14px 0 18px"}}>One request. Correct lane.</h2>
          <div style={{display:"grid",gap:14,color:C.muted,fontSize:13,lineHeight:1.65}}>
            <div>01 — Your information is captured securely in the ICONIC LIVE backend.</div>
            <div>02 — It is tagged by access type and event so presale, VIP, sponsor and merch requests stay separate.</div>
            <div>03 — Campaign source and UTM data are preserved so we know which promotion generated the lead.</div>
          </div>
        </div>
      </div>
    </Section>

    <Section eyebrow="Choose Your Path" title="One brand. Separate conversion lanes.">
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:12}}>{Object.entries(intents).map(([slug,item])=><Link key={slug} href={`/access?intent=${slug}${event?`&event=${encodeURIComponent(event)}`:""}`} className="glass market-card" style={{padding:24,borderRadius:20,color:C.white,textDecoration:"none"}}><div style={{fontSize:8,fontWeight:900,letterSpacing:".18em",textTransform:"uppercase",color:C.gold2}}>{item.eyebrow}</div><div style={{fontFamily:"Georgia,serif",fontSize:28,lineHeight:1.02,marginTop:12}}>{item.eyebrow}</div><p style={{fontSize:12,lineHeight:1.65,color:C.muted,margin:"12px 0 0"}}>{item.body}</p></Link>)}</div>
    </Section>
  </Shell>
}
