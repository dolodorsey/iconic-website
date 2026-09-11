import type { Metadata } from "next";
import Link from "next/link";
import { Button, C, Hero, Section, Shell, drive } from "@/app/_components/IconicPage";

export const metadata: Metadata = {
  title: "Merch Vault",
  description: "Shop ICONIC LIVE event merchandise and join Summer Walker and DJ Snake tour drop lists.",
  openGraph: {
    title: "Merch Vault | ICONIC LIVE",
    description: "Event capsules, city drops and limited tour merchandise from ICONIC LIVE.",
    type: "website",
    images: [{url:"/api/media/drive/1Gio-wmfrqQyKh8JSQIhvg_3K7VaQSuh8"}],
  },
};

const drops=[
  {eyebrow:"TAMPA HALLOWEEN",title:"21 SAVAGE CAPSULE",src:drive("14w6pg3TA_RtOxV7TppU7WbI05MvRyqaN"),status:"SHOP LIVE",href:"/tampa/nightmare-on-channelside/merch/shop"},
  {eyebrow:"TAMPA HALLOWEEN",title:"CITY + CULTURE",src:drive("1ctLFS3dy1zU-nKtB5fV-7-5dIpZc2xc2"),status:"EVENT SHOP",href:"/tampa/nightmare-on-channelside/merch/shop"},
  {eyebrow:"TAMPA HALLOWEEN",title:"NIGHTMARE EDITION",src:drive("1FAGgotyr8ybyuIO4HjzlWXf2eK4aX3Ge"),status:"HALLOWEEN SHOP",href:"/tampa/nightmare-on-channelside/merch/shop"},
  {eyebrow:"ICONIC LIVE",title:"VAULT EXCLUSIVES",src:drive("1YNtG29MKb9N3vGpsy2ehv1xvBteW_nh7"),status:"ACCESS LIST FIRST",href:"/access?intent=merch&property=iconic-live"},
  {eyebrow:"SUMMER WALKER",title:"SOUL SYMPHONY DROP",src:drive("1VLMzdfR0ZPM028H6QPjVyzLHakSRG4oX"),status:"JOIN DROP LIST",href:"/access?intent=merch&property=summer-walker"},
  {eyebrow:"DJ SNAKE",title:"PARDON MY FRENCH DROP",src:drive("1FqMDPe63LypEQFK3iQW-dJLNJiRTRi9R"),status:"JOIN DROP LIST",href:"/access?intent=merch&property=dj-snake-pardon-my-french"},
];

export default function MerchPage(){return <Shell>
  <Hero visual={drive("1Gio-wmfrqQyKh8JSQIhvg_3K7VaQSuh8")} visualPosition="center 35%" eyebrow="ICONIC LIVE · MERCH VAULT" title="WEAR THE MOMENT." sub="Event capsules should feel like real streetwear — not disposable concert souvenirs. The ICONIC merch vault now connects the live Tampa storefront with separate Summer Walker, DJ Snake and master-brand drop lists." visualNote="LIVE SHOP · LIMITED DROPS · TOUR WAITLISTS">
    <Button href="/tampa/nightmare-on-channelside/merch/shop">Shop Tampa Halloween</Button><Button href="/access?intent=merch&property=iconic-live" ghost>Join Vault Access</Button>
  </Hero>

  <Section eyebrow="Current Vault" title="Shop what is live. Join what is next." dark>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
      {drops.map((drop)=><Link key={drop.title} href={drop.href} className="iconic-media-card" style={{position:"relative",minHeight:520,overflow:"hidden",border:`1px solid ${C.faint}`,borderRadius:24,color:C.white,textDecoration:"none"}}>
        <img src={drop.src} alt={drop.title} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(0,0,0,.02) 30%,rgba(0,0,0,.95))"}}/>
        <div style={{position:"absolute",left:26,right:26,bottom:26}}>
          <div style={{display:"flex",justifyContent:"space-between",gap:16,alignItems:"center",marginBottom:10}}><span style={{fontSize:8,fontWeight:900,letterSpacing:".22em",color:C.gold2}}>{drop.eyebrow}</span><span style={{fontSize:18}}>↗</span></div>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(34px,4vw,58px)",lineHeight:.9,letterSpacing:"-.04em",margin:0}}>{drop.title}</h2>
          <div style={{marginTop:16,fontSize:8,fontWeight:900,letterSpacing:".16em",color:C.muted}}>{drop.status}</div>
        </div>
      </Link>)}
    </div>
  </Section>

  <Section eyebrow="Commerce System" title="Each property keeps its own product lane.">
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(235px,1fr))",gap:14}}>
      {[
        ["01","ARTIST","Artist-led graphics and official concert capsule pieces."],
        ["02","CITY","Market-specific marks, dates, culture references and location drops."],
        ["03","EVENT","Show-specific collectible product tied to the actual live world."],
        ["04","ICONIC","Master-brand essentials that travel across every ICONIC LIVE property."],
      ].map(([n,title,body])=><div key={title} className="glass market-card" style={{padding:28,borderRadius:22}}><div style={{color:C.gold2,fontSize:9,fontWeight:900,letterSpacing:".2em"}}>{n}</div><h3 style={{fontFamily:"Georgia,serif",fontSize:34,margin:"18px 0 12px"}}>{title}</h3><p style={{color:C.muted,fontSize:13,lineHeight:1.7,margin:0}}>{body}</p></div>)}
    </div>
    <div style={{marginTop:30,display:"flex",gap:10,flexWrap:"wrap"}}><Button href="/tampa/nightmare-on-channelside/merch/shop">Open Live Shop</Button><Button href="/access?intent=merch&property=iconic-live" ghost>Get Drop Alerts</Button></div>
  </Section>
</Shell>}
