import type { Metadata } from "next";
import Link from "next/link";
import { Button, C, Section, Shell } from "@/app/_components/IconicPage";

export const metadata: Metadata = {
  title: "Access",
  description: "Tickets, presale, VIP, travel, merch and partnership access for ICONIC live entertainment.",
};

const intents = {
  presale: { eyebrow:"Tickets + Presale", title:"GET IN BEFORE THE RUSH.", body:"Join the access path for ticket releases, presale windows and on-sale alerts.", subject:"ICONIC — Tickets + Presale Request" },
  vip: { eyebrow:"VIP + Hospitality", title:"UPGRADE THE ENTIRE NIGHT.", body:"Request premium seating, hosted tables, suites, hospitality and elevated arrival options.", subject:"ICONIC — VIP + Hospitality Request" },
  travel: { eyebrow:"City Weekend", title:"BUILD THE WHOLE WEEKEND.", body:"Request travel, hotel, arrival and city-weekend coordination around an ICONIC event.", subject:"ICONIC — City Weekend Request" },
  merch: { eyebrow:"Merch Vault", title:"TAKE THE SHOW WITH YOU.", body:"Request merch release information, event drops and limited product access.", subject:"ICONIC — Merch Request" },
  partners: { eyebrow:"Partners", title:"BUILD THE NEXT ICONIC MOMENT.", body:"For sponsors, venues, brand partners, talent partners and strategic collaborations.", subject:"ICONIC — Partnership Request" },
  sponsorship: { eyebrow:"Sponsorship", title:"OWN A REAL PART OF THE EXPERIENCE.", body:"Request sponsorship inventory, integrations, hospitality and custom activation opportunities.", subject:"ICONIC — Sponsorship Request" },
  media: { eyebrow:"Media + Archive", title:"KEEP THE MOMENT MOVING.", body:"For media, aftermovie, archive, content licensing and post-event asset requests.", subject:"ICONIC — Media + Archive Request" },
} as const;

type IntentKey = keyof typeof intents;

export default function AccessPage({searchParams}:{searchParams?:{intent?:string}}){
  const raw = searchParams?.intent || "presale";
  const key:IntentKey = raw in intents ? raw as IntentKey : "presale";
  const current = intents[key];
  const mail = `mailto:info@thekollectivehospitality.com?subject=${encodeURIComponent(current.subject)}`;
  return <Shell>
    <section style={{position:"relative",zIndex:2,minHeight:"72vh",padding:"clamp(90px,12vw,160px) clamp(22px,6vw,90px) 72px",display:"flex",alignItems:"end",background:"radial-gradient(circle at 80% 20%,rgba(224,173,69,.18),transparent 28%),#050403"}}>
      <div style={{maxWidth:1200}}>
        <div style={{fontSize:9,fontWeight:900,letterSpacing:".28em",textTransform:"uppercase",color:C.gold2,marginBottom:18}}>{current.eyebrow}</div>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(54px,9vw,128px)",lineHeight:.84,letterSpacing:"-.05em",margin:0,maxWidth:1100}}>{current.title}</h1>
        <p style={{maxWidth:720,fontSize:"clamp(14px,1.4vw,18px)",lineHeight:1.75,color:C.muted,margin:"28px 0"}}>{current.body}</p>
        <Button href={mail}>Start Request</Button><Button href="/" ghost>Back to ICONIC</Button>
      </div>
    </section>
    <Section eyebrow="Choose Your Path" title="One brand. Separate conversion lanes." dark>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:12}}>{Object.entries(intents).map(([slug,item])=><Link key={slug} href={`/access?intent=${slug}`} className="glass market-card" style={{padding:24,borderRadius:20,color:C.white,textDecoration:"none"}}><div style={{fontSize:8,fontWeight:900,letterSpacing:".18em",textTransform:"uppercase",color:C.gold2}}>{item.eyebrow}</div><div style={{fontFamily:"Georgia,serif",fontSize:28,lineHeight:1.02,marginTop:12}}>{item.eyebrow}</div><p style={{fontSize:12,lineHeight:1.65,color:C.muted,margin:"12px 0 0"}}>{item.body}</p></Link>)}</div>
    </Section>
  </Shell>
}
