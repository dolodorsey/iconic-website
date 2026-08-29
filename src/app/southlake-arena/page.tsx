import Link from "next/link";
import type { Metadata } from "next";
import { Button, C, Hero, InfoGrid, Section, Shell } from "../_components/IconicPage";

export const metadata: Metadata = {
  title: "Southlake Arena — ICONIC Flagship Home",
  description: "Southlake Arena is ICONIC's flagship home for The Ball Series, BRAVO New Year's Eve, GROWN-ISH 21+ Concert Series and Soul Session 30+ Concert Series.",
};

const properties=[
  {title:"THE BALL SERIES",meta:"6 formal + themed properties",href:"/ball-series",glow:"rgba(184,151,255,.50)"},
  {title:"BRAVO",meta:"New Year's Eve · December 31",href:"/atlanta/bravo",glow:"rgba(241,200,106,.46)"},
  {title:"GROWN-ISH",meta:"21+ Concert Series · Southlake Arena",href:"/series/21-plus",glow:"rgba(255,63,164,.48)"},
  {title:"SOUL SESSION",meta:"30+ Concert Series · Southlake Arena",href:"/series/30-plus",glow:"rgba(124,92,255,.52)"},
];

export default function SouthlakeArenaPage(){return <Shell>
  <Hero eyebrow="ICONIC · FLAGSHIP HOME" title="SOUTHLAKE ARENA." sub="The arena home where ICONIC compounds four distinct properties into one repeatable venue platform: The Ball Series, BRAVO New Year's Eve, GROWN-ISH 21+ Concert Series and Soul Session 30+ Concert Series." accent="#d4b7ff">
    <Button href="#properties">Explore Properties</Button><Button href="/#national-circuit" ghost>National Circuit</Button>
  </Hero>

  <section className="venue-monolith-wrap"><div className="venue-monolith glass">
    <div><div className="venue-kicker">ICONIC · SOUTHLAKE · FLAGSHIP VENUE</div><div className="venue-title">SOUTHLAKE</div><p className="venue-subtitle">One arena relationship. Four independent event brands. Separate audiences, separate funnels and separate creative identities — backed by one consistent production and hospitality standard.</p></div>
    <div className="venue-property-rail"><div className="venue-property-chip">The Ball Series</div><div className="venue-property-chip">BRAVO · NYE</div><div className="venue-property-chip">GROWN-ISH · 21+</div><div className="venue-property-chip">Soul Session · 30+</div></div>
  </div></section>

  <Section eyebrow="Venue Strategy" title="A home-base model built for repetition, not one-off events.">
    <InfoGrid items={[
      {label:"Ball Series",value:"6 Events",body:"A six-property formal and themed event season with its own creative language."},
      {label:"New Year's Eve",value:"BRAVO",body:"ICONIC's annual arena-scale year-ending flagship."},
      {label:"21+ Concerts",value:"GROWN-ISH",body:"Young-adult hip-hop and R&B concert programming with a dedicated audience funnel."},
      {label:"30+ Concerts",value:"Soul Session",body:"Premium R&B, soul and legacy-catalog concert programming for the mature audience."},
    ]}/>
  </Section>
  <Section eyebrow="Southlake Portfolio" title="Four brands. Four audiences. One arena standard." dark>
    <div id="properties" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
      {properties.map((p)=><Link key={p.title} href={p.href} className="event-card glass" style={{"--cardGlow":p.glow,minHeight:390,padding:30,borderRadius:26,color:C.white,textDecoration:"none",display:"flex",flexDirection:"column",justifyContent:"space-between"} as React.CSSProperties}><div style={{display:"flex",justifyContent:"space-between",gap:16}}><span style={{fontSize:9,fontWeight:900,letterSpacing:".22em",textTransform:"uppercase",color:C.muted}}>SOUTHLAKE ARENA</span><span style={{fontSize:22}}>↗</span></div><div><h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(40px,5vw,72px)",lineHeight:.84,letterSpacing:"-.04em",margin:0}}>{p.title}</h2><div style={{marginTop:24,paddingTop:18,borderTop:`1px solid ${C.faint}`,fontSize:10,fontWeight:800,letterSpacing:".1em",textTransform:"uppercase",color:C.muted}}>{p.meta}</div></div></Link>)}
    </div>
  </Section>
  <Section eyebrow="Arena Operating Model" title="The venue gets smarter every time ICONIC returns.">
    <InfoGrid items={[
      {label:"Production",value:"Repeatable Build",body:"Reusable show architecture, technical standards and venue playbooks lower friction across properties."},
      {label:"Hospitality",value:"Premium Inventory",body:"VIP, suites, groups and sponsor hospitality become an always-on revenue layer."},
      {label:"Audience",value:"Separate CRM",body:"Each property retains its own buyer and remarketing data while ICONIC measures the total venue ecosystem."},
      {label:"Partners",value:"Annual Platform",body:"Sponsors can buy one property or build a Southlake-wide relationship without collapsing the brands."},
    ]}/>
  </Section>
  <Section eyebrow="National Expansion" title="Southlake is the flagship. Every other market stays locally engineered." dark>
    <InfoGrid items={[
      {label:"Las Vegas",value:"4 Events",body:"2027 planning holds across four major leisure windows."},
      {label:"Washington DC",value:"4 Events",body:"2027 planning holds built around DMV cultural and seasonal demand."},
      {label:"Tampa",value:"4 Events",body:"2027 planning holds distributed across the full year."},
      {label:"New York",value:"Resorts World",body:"ENCORE and Funny Business remain distinct New York properties."},
    ]}/>
  </Section>
</Shell>}
