import type { Metadata } from "next";
import Link from "next/link";
import { C, InfoGrid, Section, Shell, drive } from "../../_components/IconicPage";
import { EventActionCenter, EventTracker } from "../../_components/EventActionCenter";

const EVENT_PATH = "/tampa/nightmare-on-channelside";
const EVENT_DESCRIPTION = "Nightmare on Channelside at Benchmark International Arena in Tampa on Saturday, October 31, 2026.";

export const metadata: Metadata = {
  title: "Nightmare on Channelside — Halloween 2026 | Tampa",
  description: EVENT_DESCRIPTION,
  alternates: { canonical: EVENT_PATH },
  openGraph: {
    title: "Nightmare on Channelside — Halloween 2026 | Tampa",
    description: EVENT_DESCRIPTION,
    url: EVENT_PATH,
    type: "website",
  },
};

const TICKETMASTER="https://www.ticketmaster.com/nightmare-on-channelside-tampa-10-31-2026/event/0D006514C6E3B429";
const FLYER=drive("1Ub439rjM3-SwK67udFKh6f2q5SwDF_U1");
const MERCH=drive("1GK8TTIz-1b6QYZ1_RNrIfgfw2PcIffH5");

export default function NightmarePage(){return <Shell>
  <EventTracker eventKey="nightmare_on_channelside_2026"/>

  <section style={{position:"relative",zIndex:2,minHeight:"92vh",padding:"clamp(48px,7vw,96px) clamp(20px,5vw,72px)",display:"grid",gridTemplateColumns:"minmax(0,1.05fr) minmax(320px,.7fr)",gap:"clamp(28px,5vw,72px)",alignItems:"center",background:"radial-gradient(circle at 18% 22%,rgba(196,0,0,.26),transparent 28%),linear-gradient(145deg,#050000,#0d0101 58%,#020202)",borderBottom:"1px solid rgba(255,55,55,.22)"}}>
    <div style={{maxWidth:900}}>
      <div style={{fontSize:9,fontWeight:900,letterSpacing:".28em",textTransform:"uppercase",color:"#ff3b30",marginBottom:18}}>ICONIC · TAMPA · HALLOWEEN 2026</div>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(60px,9vw,132px)",lineHeight:.78,letterSpacing:"-.06em",margin:0,color:"#fff"}}>NIGHTMARE<br/>ON CHANNELSIDE.</h1>
      <p style={{maxWidth:720,fontSize:"clamp(15px,1.6vw,20px)",lineHeight:1.7,color:"rgba(255,255,255,.68)",margin:"30px 0 0"}}>Tampa’s arena-scale Halloween concert. Saturday, October 31, 2026 at Benchmark International Arena. Doors at 6 PM. Show at 7 PM.</p>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:30}}><a href="#access" style={{display:"inline-flex",minHeight:52,alignItems:"center",padding:"0 24px",borderRadius:999,textDecoration:"none",background:"linear-gradient(110deg,#ff3b30,#b30000)",color:"white",fontSize:9,fontWeight:900,letterSpacing:".18em",textTransform:"uppercase",boxShadow:"0 18px 50px rgba(255,0,0,.2)"}}>Tickets + Access</a><Link href="/tampa/nightmare-on-channelside/merch" style={{display:"inline-flex",minHeight:52,alignItems:"center",padding:"0 24px",borderRadius:999,textDecoration:"none",border:"1px solid rgba(255,255,255,.18)",color:"white",fontSize:9,fontWeight:900,letterSpacing:".18em",textTransform:"uppercase"}}>Shop Merch</Link></div>
      <div style={{display:"flex",gap:22,flexWrap:"wrap",marginTop:34,paddingTop:24,borderTop:"1px solid rgba(255,255,255,.11)",fontSize:9,fontWeight:900,letterSpacing:".13em",textTransform:"uppercase",color:"rgba(255,255,255,.55)"}}><span>401 Channelside Dr · Tampa</span><span>21 Savage · Meek Mill · Kodak Black · DaBaby + more</span></div>
    </div>
    <div style={{position:"relative",minHeight:"min(760px,82vh)",display:"grid",placeItems:"center"}}><div style={{position:"absolute",inset:"8% -6%",background:"radial-gradient(circle,#d100002e,transparent 60%)",filter:"blur(30px)"}}/><img src={FLYER} alt="Nightmare on Channelside official promotional flyer" style={{position:"relative",zIndex:1,width:"min(100%,560px)",maxHeight:"80vh",objectFit:"contain",borderRadius:22,boxShadow:"0 40px 100px rgba(0,0,0,.72),0 0 70px rgba(200,0,0,.12)"}}/></div>
  </section>

  <Section eyebrow="The Night" title="One night. One arena. No escape." dark>
    <InfoGrid items={[
      {label:"Date",value:"Oct 31, 2026",body:"Saturday night — Halloween."},
      {label:"Venue",value:"Benchmark International Arena",body:"401 Channelside Dr, Tampa, FL 33602."},
      {label:"Doors",value:"6:00 PM",body:"Doors open one hour before showtime."},
      {label:"Showtime",value:"7:00 PM",body:"Arena show begins at 7 PM."},
    ]}/>
  </Section>

  <section style={{position:"relative",zIndex:2,padding:"96px clamp(22px,6vw,90px)",background:"#050101",borderTop:"1px solid rgba(255,50,50,.18)"}}><div style={{maxWidth:1450,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
    {[
      ["01","HEADLINE SCALE","21 Savage leads an arena-level Halloween bill built for a true concert audience."],
      ["02","TAMPA CULTURE","Channelside becomes part of the event identity — not just the address."],
      ["03","HALLOWEEN WORLD","Red, black, horror, cinematic production and merch all live inside one event universe."],
      ["04","AFTERLIFE","Content, merch, sponsors and audience data extend beyond the night itself."],
    ].map(([n,t,b])=><article key={n} style={{minHeight:270,padding:28,border:"1px solid rgba(255,60,60,.18)",borderRadius:22,background:"linear-gradient(145deg,rgba(140,0,0,.14),rgba(5,2,2,.94))"}}><div style={{fontSize:8,fontWeight:900,letterSpacing:".22em",color:"#ff3b30"}}>{n}</div><h3 style={{fontFamily:"Georgia,serif",fontSize:34,lineHeight:.95,margin:"18px 0 14px"}}>{t}</h3><p style={{margin:0,color:"rgba(255,255,255,.62)",fontSize:13,lineHeight:1.7}}>{b}</p></article>)}
  </div></section>

  <Section eyebrow="Access" title="Tickets are live. Premium and partner lanes stay separate.">
    <EventActionCenter
      eventKey="nightmare_on_channelside_2026"
      eventName="Nightmare on Channelside"
      accent="#ff3b30"
      supportLine="Ticket inventory is handled by Ticketmaster. VIP, sponsorship and partner requests are routed separately so each conversation stays clean."
      actions={[
        {key:"tickets",eyebrow:"Tickets",title:"Get Inside The Nightmare.",body:"Open the official Ticketmaster event page for current ticket inventory and seating.",href:TICKETMASTER,cta:"Buy on Ticketmaster"},
        {key:"vip",eyebrow:"VIP + Hospitality",title:"Make Halloween Premium.",body:"Request premium seating, group hospitality, hosted experiences and high-touch arrival options.",email:"kingdmmanagement@gmail.com",subject:"Nightmare on Channelside — VIP + Hospitality"},
        {key:"sponsors",eyebrow:"Corporate Partnerships",title:"Own Part Of The Experience.",body:"Request sponsorship, hospitality, content, beverage, activation and brand integration inventory.",email:"kingdmmanagement@gmail.com",subject:"Nightmare on Channelside — Corporate Partnership"},
        {key:"merch",eyebrow:"Official Merch",title:"Wear The Nightmare.",body:"Enter the dedicated concert merch universe with separate artist, Tampa and Halloween collections.",href:"/tampa/nightmare-on-channelside/merch",cta:"Enter Merch"},
      ]}
    />
  </Section>

  <section style={{position:"relative",zIndex:2,padding:"90px clamp(22px,6vw,90px)",background:"linear-gradient(180deg,#060101,#020101)",borderTop:"1px solid rgba(255,50,50,.16)"}}><div style={{maxWidth:1450,margin:"0 auto",display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(280px,.72fr)",gap:28,alignItems:"center"}}><div><div style={{fontSize:9,fontWeight:900,letterSpacing:".26em",textTransform:"uppercase",color:"#ff3b30"}}>THE MERCH AFTERLIFE</div><h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(48px,7vw,96px)",lineHeight:.86,margin:"18px 0 24px"}}>THE SHOW LEAVES.<br/>THE NIGHTMARE STAYS.</h2><p style={{maxWidth:680,color:"rgba(255,255,255,.62)",fontSize:14,lineHeight:1.8}}>The concert and merch storefront now work as one funnel: event discovery → ticket purchase → artist collection → limited Halloween product.</p><Link href="/tampa/nightmare-on-channelside/merch" style={{display:"inline-flex",marginTop:12,minHeight:50,alignItems:"center",padding:"0 24px",borderRadius:999,background:"#ff3b30",color:"white",textDecoration:"none",fontSize:9,fontWeight:900,letterSpacing:".16em",textTransform:"uppercase"}}>Shop Nightmare Merch</Link></div><img src={MERCH} alt="Nightmare on Channelside merchandise" style={{width:"100%",maxHeight:560,objectFit:"contain",borderRadius:24}}/></div></section>

  <section style={{position:"relative",zIndex:2,padding:"44px clamp(22px,6vw,90px)",borderTop:"1px solid rgba(255,50,50,.14)",background:"#030101"}}><div style={{maxWidth:1450,margin:"0 auto",display:"flex",justifyContent:"space-between",gap:24,flexWrap:"wrap",fontSize:9,fontWeight:900,letterSpacing:".13em",textTransform:"uppercase",color:"rgba(255,255,255,.5)"}}><span>Partnership Contact · Diesel · (646) 629-7103</span><span>kingdmmanagement@gmail.com</span><span>Lineup subject to change.</span></div></section>
</Shell>}
