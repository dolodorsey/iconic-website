import Link from "next/link";
import type { Metadata } from "next";
import { Button, C, Hero, InfoGrid, Section, Shell } from "./_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC — Live Entertainment Platform",
  description: "ICONIC produces arena events, recurring concert series and culture-driven live entertainment across Southlake Arena, New York, Las Vegas, Washington DC and Tampa.",
};

const southlakeProperties = [
  { title: "THE BALL SERIES", meta: "6-event formal + themed season", href: "/ball-series", glow: "rgba(184,151,255,.52)" },
  { title: "BRAVO", meta: "New Year's Eve · Southlake Arena", href: "/atlanta/bravo", glow: "rgba(241,200,106,.46)" },
  { title: "GROWN-ISH", meta: "21+ Concert Series · Southlake Arena", href: "/series/21-plus", glow: "rgba(255,63,164,.50)" },
  { title: "SOUL SESSION", meta: "30+ Concert Series · Southlake Arena", href: "/series/30-plus", glow: "rgba(124,92,255,.54)" },
];

const circuit = [
  { market: "LAS VEGAS", count: "04", href: "/las-vegas", body: "Four 2027 planning holds on major leisure weekends." },
  { market: "WASHINGTON DC", count: "04", href: "/washington-dc", body: "Four 2027 planning holds built for the DMV market." },
  { market: "TAMPA", count: "04", href: "/tampa", body: "Four 2027 planning holds distributed across the full year." },
];

const nationalSchedule=[
  {market:"TAMPA",date:"JAN 30",anchor:"WINTER MARKET OPEN",href:"/tampa",glow:"rgba(255,109,103,.44)"},
  {market:"LAS VEGAS",date:"FEB 13",anchor:"VALENTINE'S + PRESIDENTS DAY",href:"/las-vegas",glow:"rgba(168,85,247,.44)"},
  {market:"WASHINGTON DC",date:"MAR 13",anchor:"SPRING MARKET OPEN",href:"/washington-dc",glow:"rgba(91,140,255,.44)"},
  {market:"TAMPA",date:"APR 17",anchor:"SPRING",href:"/tampa",glow:"rgba(255,109,103,.44)"},
  {market:"LAS VEGAS",date:"MAY 29",anchor:"MEMORIAL DAY WEEKEND",href:"/las-vegas",glow:"rgba(168,85,247,.44)"},
  {market:"WASHINGTON DC",date:"JUN 19",anchor:"JUNETEENTH",href:"/washington-dc",glow:"rgba(91,140,255,.44)"},
  {market:"TAMPA",date:"JUL 03",anchor:"INDEPENDENCE DAY WEEKEND",href:"/tampa",glow:"rgba(255,109,103,.44)"},
  {market:"WASHINGTON DC",date:"AUG 28",anchor:"LATE SUMMER / FALL RUNWAY",href:"/washington-dc",glow:"rgba(91,140,255,.44)"},
  {market:"LAS VEGAS",date:"SEP 04",anchor:"LABOR DAY WEEKEND",href:"/las-vegas",glow:"rgba(168,85,247,.44)"},
  {market:"TAMPA",date:"OCT 16",anchor:"FALL / HALLOWEEN RUNWAY",href:"/tampa",glow:"rgba(255,109,103,.44)"},
  {market:"WASHINGTON DC",date:"NOV 13",anchor:"VETERANS WEEK / FALL",href:"/washington-dc",glow:"rgba(91,140,255,.44)"},
  {market:"LAS VEGAS",date:"NOV 27",anchor:"THANKSGIVING WEEKEND",href:"/las-vegas",glow:"rgba(168,85,247,.44)"},
];

export default function Home(){return <Shell>
  <Hero eyebrow="ICONIC · LIVE ENTERTAINMENT PLATFORM" title="ICONIC." sub="A multi-market live entertainment platform built around repeatable event properties, arena-scale production and distinct audience brands. Southlake Arena is the flagship home. New York remains active at Resorts World. Las Vegas, Washington DC and Tampa now have a locked 12-date 2027 planning framework." accent="#9b5cff">
    <Button href="#southlake">Explore Southlake</Button><Button href="#national-circuit" ghost>2027 National Circuit</Button>
  </Hero>

  <section style={{position:"relative",zIndex:2,padding:"30px clamp(22px,6vw,90px) 90px"}}><div style={{maxWidth:1450,margin:"0 auto"}}><InfoGrid items={[
    {label:"Flagship Venue",value:"Southlake Arena",body:"Home venue for four major ICONIC properties."},
    {label:"Southlake Portfolio",value:"4 Properties",body:"Ball Series, BRAVO, GROWN-ISH and Soul Session."},
    {label:"2027 Expansion",value:"12 Holds",body:"Four in Las Vegas, four in Washington DC and four in Tampa."},
    {label:"Active Markets",value:"5 Markets",body:"Southlake/Atlanta, New York, Las Vegas, Washington DC and Tampa."},
  ]}/></div></section>

  <Section eyebrow="Flagship Home" title="Southlake Arena is the center of the ICONIC calendar.">
    <div id="southlake" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:14}}>
      {southlakeProperties.map((p)=><Link key={p.title} href={p.href} className="event-card glass" style={{"--cardGlow":p.glow,minHeight:420,padding:30,borderRadius:26,color:C.white,textDecoration:"none",display:"flex",flexDirection:"column",justifyContent:"space-between"} as React.CSSProperties}>
        <div style={{display:"flex",justifyContent:"space-between",gap:16,alignItems:"center"}}><span style={{color:C.muted,fontSize:9,fontWeight:900,letterSpacing:".20em",textTransform:"uppercase"}}>SOUTHLAKE ARENA</span><span style={{fontSize:20}}>↗</span></div>
        <div><h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(42px,5.4vw,76px)",lineHeight:.84,letterSpacing:"-.04em",margin:0}}>{p.title}</h2><div style={{marginTop:24,paddingTop:18,borderTop:`1px solid ${C.faint}`,color:C.muted,fontSize:10,fontWeight:800,letterSpacing:".1em",textTransform:"uppercase"}}>{p.meta}</div></div>
      </Link>)}
    </div>
    <div style={{marginTop:30}}><Button href="/southlake-arena">Open Southlake Venue Hub</Button></div>
  </Section>

  <Section eyebrow="National Circuit" title="Three expansion markets. Four events in each." dark>
    <div id="national-circuit" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
      {circuit.map((m)=><Link key={m.market} href={m.href} className="glass market-card" style={{minHeight:360,padding:30,borderRadius:24,color:C.white,textDecoration:"none",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",gap:20}}><span style={{color:"#cdbfff",fontSize:9,fontWeight:900,letterSpacing:".22em",textTransform:"uppercase"}}>ICONIC MARKET</span><strong style={{fontFamily:"Georgia,serif",fontSize:52,lineHeight:.8}}>{m.count}</strong></div>
        <div><h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(42px,5vw,70px)",lineHeight:.86,margin:"0 0 18px"}}>{m.market}</h2><p style={{color:C.muted,fontSize:13,lineHeight:1.7,margin:0}}>{m.body}</p></div>
      </Link>)}
    </div>
  </Section>

  <Section eyebrow="2027 Planning Framework" title="Twelve holds. Staggered into a national operating rhythm.">
    <p style={{maxWidth:760,color:C.muted,fontSize:14,lineHeight:1.8,margin:"-12px 0 34px"}}>These are strategic planning holds — not public confirmed events. Venue and talent remain property-specific until contracted.</p>
    <div className="circuit-calendar-grid">{nationalSchedule.map((e)=><Link key={`${e.market}-${e.date}`} href={e.href} className="circuit-date-card" style={{"--marketGlow":e.glow,color:C.white,textDecoration:"none"} as React.CSSProperties}><div className="circuit-date-market">{e.market}</div><div className="circuit-date-day">{e.date}</div><div className="circuit-date-anchor">{e.anchor}</div><div className="circuit-status">2027 · Planning Hold</div></Link>)}</div>
  </Section>

  <Section eyebrow="New York" title="Resorts World remains its own ICONIC platform." dark>
    <InfoGrid items={[
      {label:"Venue Platform",value:"Resorts World",body:"ICONIC's New York venue relationship and operating platform."},
      {label:"Concert Property",value:"ENCORE",body:"A distinct recurring concert property for the New York market."},
      {label:"Comedy Property",value:"Funny Business",body:"A distinct comedy series with its own programming and sales path."},
      {label:"Operating Rule",value:"Keep Brands Separate",body:"Every property keeps its own identity, audience, creative direction and funnel under ICONIC."},
    ]}/>
    <div style={{marginTop:30}}><Button href="/new-york/resorts-world">Explore New York</Button></div>
  </Section>

  <Section eyebrow="The Model" title="ICONIC is the platform. The properties are the products.">
    <InfoGrid items={[
      {label:"Brand",value:"Independent Identity",body:"Every event property has its own visual language, positioning and audience."},
      {label:"Market",value:"Local Operating Layer",body:"Each city develops dedicated demand, partner and buyer data instead of one blended national list."},
      {label:"Venue",value:"Right Room",body:"Southlake is the flagship home while expansion-market venues remain event-specific until confirmed."},
      {label:"Scale",value:"Repeatable System",body:"Programming, ticketing, sponsorship, VIP, CRM and post-event retention are designed to repeat."},
    ]}/>
  </Section>

  <section style={{padding:"120px clamp(22px,6vw,90px)",textAlign:"center",borderTop:`1px solid ${C.faint}`}}><div style={{maxWidth:950,margin:"0 auto"}}><div style={{color:"#d1c5ff",fontSize:9,fontWeight:900,letterSpacing:".34em",textTransform:"uppercase"}}>Talent · Sponsors · Venues · Partners</div><h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(54px,8vw,112px)",lineHeight:.86,margin:"20px 0 28px"}}>Build the next<br/>ICONIC moment.</h2><Button href="mailto:info@thekollectivehospitality.com?subject=ICONIC%20Partnership">Partner With ICONIC</Button></div></section>
</Shell>}
