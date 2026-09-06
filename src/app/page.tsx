import Link from "next/link";
import type { Metadata } from "next";
import { Button, C, Hero, InfoGrid, Section, Shell, drive } from "./_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC — Live Entertainment Platform",
  description: "ICONIC produces arena events, recurring concert series and culture-driven live entertainment across Atlanta, New York, Las Vegas, Washington DC and Tampa.",
};

const HOME_HERO=drive("1_EJ4MGIcBT0pFi29cHQoHE_tfrFL-sVe");

const southlakeProperties = [
  { title: "THE BALL SERIES", meta: "6-event formal + themed season", href: "/ball-series", glow: "rgba(240,186,73,.52)" },
  { title: "BRAVO", meta: "New Year's Eve · Southlake Arena", href: "/atlanta/bravo", glow: "rgba(255,216,121,.44)" },
  { title: "GROWN-ISH", meta: "21+ Concert Series · Southlake Arena", href: "/series/21-plus", glow: "rgba(196,137,34,.46)" },
  { title: "SOUL SESSION", meta: "30+ Concert Series · Southlake Arena", href: "/series/30-plus", glow: "rgba(255,197,83,.48)" },
];

const nationalSchedule=[
  {market:"TAMPA",date:"JAN 30",anchor:"WINTER MARKET OPEN",href:"/tampa",glow:"rgba(226,166,55,.44)"},
  {market:"LAS VEGAS",date:"FEB 13",anchor:"VALENTINE'S + PRESIDENTS DAY",href:"/las-vegas",glow:"rgba(255,205,100,.44)"},
  {market:"WASHINGTON DC",date:"MAR 13",anchor:"SPRING MARKET OPEN",href:"/washington-dc",glow:"rgba(203,143,37,.44)"},
  {market:"TAMPA",date:"APR 17",anchor:"SPRING",href:"/tampa",glow:"rgba(226,166,55,.44)"},
  {market:"LAS VEGAS",date:"MAY 29",anchor:"MEMORIAL DAY WEEKEND",href:"/las-vegas",glow:"rgba(255,205,100,.44)"},
  {market:"WASHINGTON DC",date:"JUN 19",anchor:"JUNETEENTH",href:"/washington-dc",glow:"rgba(203,143,37,.44)"},
  {market:"TAMPA",date:"JUL 03",anchor:"INDEPENDENCE DAY WEEKEND",href:"/tampa",glow:"rgba(226,166,55,.44)"},
  {market:"WASHINGTON DC",date:"AUG 28",anchor:"LATE SUMMER / FALL RUNWAY",href:"/washington-dc",glow:"rgba(203,143,37,.44)"},
  {market:"LAS VEGAS",date:"SEP 04",anchor:"LABOR DAY WEEKEND",href:"/las-vegas",glow:"rgba(255,205,100,.44)"},
  {market:"TAMPA",date:"OCT 16",anchor:"FALL / HALLOWEEN RUNWAY",href:"/tampa",glow:"rgba(226,166,55,.44)"},
  {market:"WASHINGTON DC",date:"NOV 13",anchor:"VETERANS WEEK / FALL",href:"/washington-dc",glow:"rgba(203,143,37,.44)"},
  {market:"LAS VEGAS",date:"NOV 27",anchor:"THANKSGIVING WEEKEND",href:"/las-vegas",glow:"rgba(255,205,100,.44)"},
];

const experienceMedia=[
  {kicker:"ARTIST REVEAL",title:"The name enters after the world is built.",src:drive("1LhNOBWdWbzVI4HRD6D4wO_pbWPcGylZ9"),href:"/series/21-plus"},
  {kicker:"LINEUP SYSTEM",title:"Reveal talent without turning the site into a flyer.",src:drive("1mHcSw-4zNUkENmMKDMJL-vMaM-OhfKMn"),href:"/series/21-plus"},
  {kicker:"VENUE REVEAL",title:"The room becomes part of the story.",src:drive("1GAz8_1S31jfsv6HZ4En76yZg_Itsjuo5"),href:"/southlake-arena"},
];

const conversionMedia=[
  {kicker:"PRESALE + TICKETING",title:"Access before the public rush.",src:drive("1aq2ltX2swXKFSnE_wzr51gEPgRf3qCR8")},
  {kicker:"VIP + HOSPITALITY",title:"Premium rooms inside the show.",src:drive("1jsL325rOkWzSb2jTCy_1B-oZtmYrQxUp")},
  {kicker:"CITY WEEKEND",title:"Flight. Hotel. Arrival. Show. After.",src:drive("1-L8O7HBPmDjKf5CW51zd1Js6LxzZ7GHK")},
  {kicker:"MERCH VAULT",title:"The show becomes an object.",src:drive("1o86B30vOmZfHAEVAevSmSBkIvx3ukoDv")},
  {kicker:"PARTNERS",title:"Built into the experience—not pasted on.",src:drive("1iE79XNRpZDKZ-ulbpE6Z-m0X6LGIrXdq")},
  {kicker:"AFTERMOVIE + ARCHIVE",title:"The stage goes dark. The asset keeps moving.",src:drive("1Q-_y4Z7ySuxKk0mvs29BqAHU9C-m2l1W")},
];

const brandWorld=[
  {kicker:"ICONIC WOMAN",title:"Fashion, movement and premium culture live inside the same visual system.",src:drive("16ua2rckhMdQrc_LWzmRQOK1O68aeG5kC")},
  {kicker:"THE CROWN",title:"A recognizable symbol that can live beyond any single show.",src:drive("1O4g8c8pby__FxJW92zGCZQM9Xsh3ou8c")},
  {kicker:"THE CITY",title:"ICONIC should feel like its own future-facing entertainment district.",src:drive("1szufhmYBmnITMbatHxKr_mZAa0hCI71d")},
  {kicker:"THE PORTAL",title:"Transitions become part of the experience—not dead space between sections.",src:drive("16LSerYaPKZYZncPbLeM_RG7EEZA2IHwL")},
  {kicker:"THE SIGNAL",title:"The heartbeat is the connective tissue across music, culture and cities.",src:drive("1CtxrxlopetUKW65iJA51_1kQdfosCqLn")},
];

const marketVisuals=[
  {market:"ATLANTA",meta:"FLAGSHIP MARKET · CONCEPT VISUAL",src:drive("1LS4BTwHoxI7OlTv_5cPocbzkBbRAqA7d"),href:"/southlake-arena"},
  {market:"LAS VEGAS",meta:"2027 MARKET · VENUE + TALENT TBD",src:drive("1RnHCTmytNkYt2V2Fu938_a4bRwXt1E0q"),href:"/las-vegas"},
  {market:"WASHINGTON DC",meta:"2027 MARKET · VENUE + TALENT TBD",src:drive("1_Ks8CqO1RVSmLf7m644guTcVSkXcqnyt"),href:"/washington-dc"},
  {market:"TAMPA",meta:"2027 MARKET · VENUE + TALENT TBD",src:drive("1KqgHvJA4IdolRHTM5AOJ3ARpd2ViIVvN"),href:"/tampa"},
];

const mediaCard=(item:{kicker:string;title:string;src:string;href?:string},index:number)=>{
  const body=<><div style={{position:"absolute",inset:0}}><img src={item.src} alt={item.kicker} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .7s cubic-bezier(.16,1,.3,1)"}}/></div><div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(0,0,0,.02) 32%,rgba(0,0,0,.92))"}}/><div style={{position:"absolute",left:26,right:26,bottom:26}}><div style={{fontSize:8,fontWeight:900,letterSpacing:".25em",color:C.gold2,marginBottom:10}}>{String(index+1).padStart(2,"0")} / {item.kicker}</div><h3 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,3vw,48px)",lineHeight:.95,margin:0,maxWidth:560}}>{item.title}</h3></div></>;
  return item.href?<Link key={item.kicker} href={item.href} className="iconic-media-card" style={{position:"relative",minHeight:500,overflow:"hidden",border:`1px solid ${C.faint}`,borderRadius:22,color:C.white,textDecoration:"none"}}>{body}</Link>:<article key={item.kicker} className="iconic-media-card" style={{position:"relative",minHeight:430,overflow:"hidden",border:`1px solid ${C.faint}`,borderRadius:22}}>{body}</article>;
};

export default function Home(){return <Shell>
  <Hero visual={HOME_HERO} eyebrow="ICONIC · LIVE ENTERTAINMENT" title="A HIGHER CLASS OF LIVE." sub="The graphics are now the environment—not decoration. ICONIC moves through concerts, cities, hospitality, travel, fashion, reveals and archive with one premium black-and-gold visual language.">
    <Button href="#world">Enter ICONIC</Button><Button href="#national-circuit" ghost>2027 National Circuit</Button>
  </Hero>

  <section style={{position:"relative",zIndex:2,padding:"30px clamp(22px,6vw,90px) 90px"}}><div style={{maxWidth:1450,margin:"0 auto"}}><InfoGrid items={[
    {label:"Flagship Venue",value:"Southlake Arena",body:"Home venue for four major ICONIC properties."},
    {label:"Southlake Portfolio",value:"4 Properties",body:"Ball Series, BRAVO, GROWN-ISH and Soul Session."},
    {label:"2027 Expansion",value:"12 Holds",body:"Four in Las Vegas, four in Washington DC and four in Tampa."},
    {label:"Experience Layer",value:"Full Journey",body:"Reveal, ticketing, VIP, travel, merch, partners and archive all live inside the product."},
  ]}/></div></section>

  <Section eyebrow="The ICONIC World" title="The heartbeat becomes an entire visual universe." dark>
    <div id="world" className="brand-world-grid">{brandWorld.map(mediaCard)}</div>
  </Section>

  <Section eyebrow="The Live System" title="The show starts before the artist walks out.">
    <div id="experience" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:12}}>{experienceMedia.map(mediaCard)}</div>
  </Section>

  <Section eyebrow="Flagship Home" title="Southlake Arena is the center of the ICONIC calendar." dark>
    <div id="southlake" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:14}}>
      {southlakeProperties.map((p)=><Link key={p.title} href={p.href} className="event-card glass" style={{"--cardGlow":p.glow,minHeight:420,padding:30,borderRadius:26,color:C.white,textDecoration:"none",display:"flex",flexDirection:"column",justifyContent:"space-between"} as React.CSSProperties}>
        <div style={{display:"flex",justifyContent:"space-between",gap:16,alignItems:"center"}}><span style={{color:C.gold2,fontSize:9,fontWeight:900,letterSpacing:".20em",textTransform:"uppercase"}}>SOUTHLAKE ARENA</span><span style={{fontSize:20}}>↗</span></div>
        <div><h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(42px,5.4vw,76px)",lineHeight:.84,letterSpacing:"-.04em",margin:0}}>{p.title}</h2><div style={{marginTop:24,paddingTop:18,borderTop:`1px solid ${C.faint}`,color:C.muted,fontSize:10,fontWeight:800,letterSpacing:".1em",textTransform:"uppercase"}}>{p.meta}</div></div>
      </Link>)}
    </div>
    <div style={{marginTop:30}}><Button href="/southlake-arena">Open Southlake Venue Hub</Button></div>
  </Section>

  <Section eyebrow="Conversion Architecture" title="Tickets are only one part of the business.">
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:12}}>{conversionMedia.map(mediaCard)}</div>
  </Section>

  <Section eyebrow="Market Identity" title="Every city gets its own world without breaking the master brand." dark>
    <div id="national-circuit" className="market-visual-grid">{marketVisuals.map((m)=><Link href={m.href} key={m.market} className="market-visual-card" style={{color:C.white,textDecoration:"none"}}><img src={m.src} alt={`ICONIC ${m.market}`}/><div className="market-visual-shade"/><div className="market-visual-copy"><span>{m.meta}</span><h3>{m.market}</h3></div></Link>)}</div>
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

  <section className="iconic-closing"><div><div>Talent · Sponsors · Venues · Partners</div><h2>Build the next<br/>ICONIC moment.</h2><Button href="mailto:info@thekollectivehospitality.com?subject=ICONIC%20Partnership">Partner With ICONIC</Button></div></section>
</Shell>}
