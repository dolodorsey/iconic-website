import Link from "next/link";
import type { Metadata } from "next";
import { Button, C, Hero, InfoGrid, Section, Shell, drive } from "./_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC LIVE — Concerts, Tours & Culture",
  description: "ICONIC LIVE presents Tampa Halloween, Summer Walker — Soul Symphony, DJ Snake — Pardon My French, limited merch drops and premium live experiences.",
};

const HOME_HERO=drive("1_EJ4MGIcBT0pFi29cHQoHE_tfrFL-sVe");

const liveSlate=[
  {
    eyebrow:"TAMPA · HALLOWEEN",
    title:"NIGHTMARE ON CHANNELSIDE",
    meta:"21 Savage · Halloween Weekend · Access Open",
    href:"/tampa-halloween",
    src:drive("1vyBkJOCw1uaIsc6KmO6ikJiwXSwT7K2n"),
    position:"center 22%",
  },
  {
    eyebrow:"10-CITY TOUR",
    title:"SUMMER WALKER — SOUL SYMPHONY",
    meta:"R&B × Symphony · Cities Announcing",
    href:"/summer-walker",
    src:drive("1VLMzdfR0ZPM028H6QPjVyzLHakSRG4oX"),
    position:"center 22%",
  },
  {
    eyebrow:"MULTI-CITY TOUR",
    title:"DJ SNAKE — PARDON MY FRENCH",
    meta:"5+ Cities · Access Open",
    href:"/dj-snake-pardon-my-french",
    src:drive("1FqMDPe63LypEQFK3iQW-dJLNJiRTRi9R"),
    position:"center 20%",
  },
  {
    eyebrow:"ICONIC LIVE",
    title:"MERCH VAULT",
    meta:"Event Capsules · City Drops · Limited Runs",
    href:"/merch",
    src:drive("14w6pg3TA_RtOxV7TppU7WbI05MvRyqaN"),
    position:"center center",
  },
];

const ecosystem=[
  {title:"SOUTHLAKE ARENA",meta:"ICONIC venue platform",href:"/southlake-arena"},
  {title:"THE BALL SERIES",meta:"Formal + themed event series",href:"/ball-series"},
  {title:"GROWN-ISH",meta:"21+ concert property",href:"/series/21-plus"},
  {title:"SOUL SESSION",meta:"30+ concert property",href:"/series/30-plus"},
  {title:"NEW YORK",meta:"Resorts World platform",href:"/new-york/resorts-world"},
  {title:"NATIONAL MARKETS",meta:"Las Vegas · DC · Tampa",href:"/#national-circuit"},
];

export default function Home(){return <Shell>
  <Hero visual={HOME_HERO} eyebrow="ICONIC LIVE · CURRENT SLATE" title="THE NEXT ICONIC ERA IS LIVE." sub="Four active lanes now lead the platform: Tampa Halloween, Summer Walker — Soul Symphony, DJ Snake — Pardon My French and the ICONIC merch vault. Every property keeps its own creative world, funnel and commercial architecture under one master live-entertainment platform." visualNote="CONCERTS · TOURS · MERCH · PARTNERSHIPS">
    <Button href="#current-slate">Explore The Slate</Button><Button href="/access?intent=presale" ghost>Get First Access</Button>
  </Hero>

  <section style={{position:"relative",zIndex:2,padding:"30px clamp(22px,6vw,90px) 90px"}}><div style={{maxWidth:1450,margin:"0 auto"}}><InfoGrid items={[
    {label:"Priority 01",value:"Tampa Halloween",body:"Immediate concert, ticketing, sponsorship and merch conversion lane."},
    {label:"Priority 02",value:"Summer Walker",body:"10-city premium Soul Symphony tour platform."},
    {label:"Priority 03",value:"DJ Snake",body:"Pardon My French multi-city tour platform."},
    {label:"Priority 04",value:"Merch Vault",body:"Event drops, city capsules and evergreen ICONIC product."},
  ]}/></div></section>

  <Section eyebrow="Now On ICONIC" title="Four properties. Four distinct worlds." dark>
    <div id="current-slate" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))",gap:14}}>
      {liveSlate.map((item,index)=><Link key={item.title} href={item.href} className="iconic-media-card" style={{position:"relative",minHeight:index<2?620:540,overflow:"hidden",border:`1px solid ${C.faint}`,borderRadius:26,color:C.white,textDecoration:"none"}}>
        <img src={item.src} alt={item.title} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:item.position,transition:"transform .7s cubic-bezier(.16,1,.3,1)"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(0,0,0,.05) 25%,rgba(0,0,0,.94) 87%)"}}/>
        <div style={{position:"absolute",left:28,right:28,bottom:28}}>
          <div style={{display:"flex",justifyContent:"space-between",gap:16,alignItems:"center",marginBottom:14}}><span style={{fontSize:8,fontWeight:900,letterSpacing:".22em",color:C.gold2}}>{item.eyebrow}</span><span style={{fontSize:19}}>↗</span></div>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(38px,4.5vw,66px)",lineHeight:.87,letterSpacing:"-.045em",margin:0}}>{item.title}</h2>
          <div style={{marginTop:20,paddingTop:16,borderTop:`1px solid ${C.faint}`,fontSize:9,fontWeight:900,letterSpacing:".11em",textTransform:"uppercase",color:C.muted}}>{item.meta}</div>
        </div>
      </Link>)}
    </div>
  </Section>

  <Section eyebrow="Conversion System" title="Every page should move somebody to a next action.">
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:14}}>
      {[
        ["TICKETS + PRESALE","Get release alerts before the public rush.","/access?intent=presale"],
        ["VIP + HOSPITALITY","Premium seating, hosted moments and elevated arrival.","/access?intent=vip"],
        ["SPONSORSHIPS","Build brand integrations into the actual fan journey.","/access?intent=sponsorship"],
        ["MERCH DROPS","Get first access to limited event and city capsules.","/access?intent=merch"],
      ].map(([title,body,href])=><Link key={title} href={href} className="glass market-card" style={{padding:30,borderRadius:24,color:C.white,textDecoration:"none",minHeight:230,display:"flex",flexDirection:"column",justifyContent:"space-between"}}><div style={{fontSize:8,fontWeight:900,letterSpacing:".2em",color:C.gold2}}>{title}</div><div><p style={{fontFamily:"Georgia,serif",fontSize:30,lineHeight:1.02,margin:"0 0 18px"}}>{body}</p><span style={{fontSize:20}}>↗</span></div></Link>)}
    </div>
  </Section>

  <Section eyebrow="The Wider ICONIC Platform" title="Current priorities lead. Existing properties stay connected." dark>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(245px,1fr))",gap:12}}>
      {ecosystem.map((item)=><Link key={item.title} href={item.href} className="glass market-card" style={{padding:26,borderRadius:22,color:C.white,textDecoration:"none",minHeight:180,display:"flex",flexDirection:"column",justifyContent:"space-between"}}><div style={{fontSize:8,fontWeight:900,letterSpacing:".17em",color:C.gold2}}>ICONIC PROPERTY</div><div><h3 style={{fontFamily:"Georgia,serif",fontSize:31,lineHeight:.96,margin:"0 0 10px"}}>{item.title}</h3><div style={{fontSize:10,fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",color:C.muted}}>{item.meta}</div></div></Link>)}
    </div>
  </Section>

  <section id="national-circuit" style={{position:"relative",zIndex:2,padding:"120px clamp(22px,6vw,90px)",borderTop:`1px solid ${C.faint}`,overflow:"hidden"}}>
    <div style={{position:"absolute",left:"20%",right:"20%",bottom:-120,height:300,background:"rgba(224,173,69,.2)",filter:"blur(150px)"}}/>
    <div style={{position:"relative",maxWidth:1180,margin:"0 auto",textAlign:"center"}}>
      <div style={{color:C.gold2,fontSize:9,fontWeight:900,letterSpacing:".3em",textTransform:"uppercase",marginBottom:18}}>Talent · Sponsors · Venues · Partners</div>
      <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(54px,8vw,124px)",lineHeight:.82,letterSpacing:"-.055em",margin:"0 0 30px"}}>BUILD THE NEXT ICONIC MOMENT.</h2>
      <Button href="/access?intent=presale">Get Access</Button><Button href="/access?intent=partners" ghost>Partner With ICONIC</Button>
    </div>
  </section>
</Shell>}
