import type { Metadata } from "next";
import { Button, C, Hero, Section, Shell, drive } from "@/app/_components/IconicPage";

export const metadata: Metadata = {
  title: "Merch Vault | ICONIC LIVE",
  description: "ICONIC LIVE event merchandise, city capsules and limited tour drops. Join the merch access list for release alerts.",
};

const drops=[
  {eyebrow:"TAMPA HALLOWEEN",title:"21 SAVAGE CAPSULE",src:drive("14w6pg3TA_RtOxV7TppU7WbI05MvRyqaN"),status:"DROP IN DEVELOPMENT"},
  {eyebrow:"TAMPA HALLOWEEN",title:"CITY + CULTURE",src:drive("1ctLFS3dy1zU-nKtB5fV-7-5dIpZc2xc2"),status:"LIMITED EVENT DROP"},
  {eyebrow:"TAMPA HALLOWEEN",title:"NIGHTMARE EDITION",src:drive("1FAGgotyr8ybyuIO4HjzlWXf2eK4aX3Ge"),status:"HALLOWEEN CAPSULE"},
  {eyebrow:"ICONIC LIVE",title:"VAULT EXCLUSIVES",src:drive("1YNtG29MKb9N3vGpsy2ehv1xvBteW_nh7"),status:"ACCESS LIST FIRST"},
];

export default function MerchPage(){return <Shell>
  <Hero visual={drive("1Gio-wmfrqQyKh8JSQIhvg_3K7VaQSuh8")} visualPosition="center 35%" eyebrow="ICONIC LIVE · MERCH VAULT" title="WEAR THE MOMENT." sub="Event capsules should feel like real streetwear — not disposable concert souvenirs. The ICONIC merch vault houses limited city drops, artist-led capsules and pieces that continue selling after the stage goes dark." visualNote="LIMITED DROPS · ACCESS LIST FIRST">
    <Button href="/access?intent=merch">Join Merch Access</Button><Button href="/tampa-halloween" ghost>Explore Tampa</Button>
  </Hero>

  <Section eyebrow="Current Vault" title="The first drop starts with Tampa Halloween." dark>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
      {drops.map((drop)=><article key={drop.title} className="iconic-media-card" style={{position:"relative",minHeight:520,overflow:"hidden",border:`1px solid ${C.faint}`,borderRadius:24}}>
        <img src={drop.src} alt={drop.title} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(0,0,0,.02) 30%,rgba(0,0,0,.95))"}}/>
        <div style={{position:"absolute",left:26,right:26,bottom:26}}>
          <div style={{fontSize:8,fontWeight:900,letterSpacing:".22em",color:C.gold2,marginBottom:10}}>{drop.eyebrow}</div>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(34px,4vw,58px)",lineHeight:.9,letterSpacing:"-.04em",margin:0}}>{drop.title}</h2>
          <div style={{marginTop:16,fontSize:8,fontWeight:900,letterSpacing:".16em",color:C.muted}}>{drop.status}</div>
        </div>
      </article>)}
    </div>
  </Section>

  <Section eyebrow="Drop System" title="Every show creates more than one product lane.">
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(235px,1fr))",gap:14}}>
      {[
        ["01","ARTIST","Artist-led graphics and official concert capsule pieces."],
        ["02","CITY","Tampa-specific marks, dates, culture references and location drops."],
        ["03","EVENT","Nightmare on Channelside and Halloween-specific collectible product."],
        ["04","ICONIC","Master-brand essentials that travel across every ICONIC LIVE property."],
      ].map(([n,title,body])=><div key={title} className="glass market-card" style={{padding:28,borderRadius:22}}><div style={{color:C.gold2,fontSize:9,fontWeight:900,letterSpacing:".2em"}}>{n}</div><h3 style={{fontFamily:"Georgia,serif",fontSize:34,margin:"18px 0 12px"}}>{title}</h3><p style={{color:C.muted,fontSize:13,lineHeight:1.7,margin:0}}>{body}</p></div>)}
    </div>
    <div style={{marginTop:30}}><Button href="/access?intent=merch">Get Drop Alerts</Button></div>
  </Section>
</Shell>}
