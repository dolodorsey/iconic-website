import Link from "next/link";
import type { Metadata } from "next";
import { Button, C, Hero, InfoGrid, Section, Shell } from "../_components/IconicPage";

export const metadata: Metadata = {
  title: "Southlake Arena — ICONIC Home Venue",
  description: "Southlake Arena is the home venue for The Ball Series, BRAVO New Year's Eve, GROWN-ISH 21+ Concert Series and Soul Session 30+ Concert Series.",
};

const properties=[
  {title:"THE BALL SERIES",meta:"6 formal + themed properties",href:"/ball-series",glow:"rgba(184,151,255,.50)"},
  {title:"BRAVO",meta:"New Year's Eve · December 31",href:"/atlanta/bravo",glow:"rgba(241,200,106,.46)"},
  {title:"GROWN-ISH",meta:"21+ Concert Series · Southlake Arena",href:"/series/21-plus",glow:"rgba(255,63,164,.48)"},
  {title:"SOUL SESSION",meta:"30+ Concert Series · Southlake Arena",href:"/series/30-plus",glow:"rgba(124,92,255,.52)"},
];

export default function SouthlakeArenaPage(){return <Shell>
  <Hero eyebrow="ICONIC · HOME VENUE" title="SOUTHLAKE ARENA." sub="The flagship arena home for four major ICONIC properties: The Ball Series, BRAVO New Year's Eve, GROWN-ISH 21+ Concert Series and Soul Session 30+ Concert Series." accent="#d4b7ff">
    <Button href="#properties">Explore Properties</Button><Button href="/#national-circuit" ghost>National Circuit</Button>
  </Hero>
  <Section eyebrow="Venue Strategy" title="Four properties. One consistent arena home.">
    <InfoGrid items={[
      {label:"Ball Series",value:"6 Events",body:"A six-property formal and themed event season."},
      {label:"New Year's Eve",value:"BRAVO",body:"ICONIC's annual arena-scale year-ending flagship."},
      {label:"21+ Concerts",value:"GROWN-ISH",body:"A recurring young-adult hip-hop and R&B concert series."},
      {label:"30+ Concerts",value:"Soul Session",body:"A recurring premium R&B, soul and legacy-catalog concert series."},
    ]}/>
  </Section>
  <Section eyebrow="Southlake Portfolio" title="Built as distinct brands, presented under ICONIC." dark>
    <div id="properties" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
      {properties.map((p)=><Link key={p.title} href={p.href} className="event-card glass" style={{"--cardGlow":p.glow,minHeight:350,padding:30,borderRadius:24,color:C.white,textDecoration:"none",display:"flex",flexDirection:"column",justifyContent:"space-between"} as React.CSSProperties}><div style={{fontSize:9,fontWeight:900,letterSpacing:".22em",textTransform:"uppercase",color:C.muted}}>SOUTHLAKE ARENA</div><div><h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(38px,5vw,70px)",lineHeight:.86,margin:0}}>{p.title}</h2><div style={{marginTop:22,paddingTop:18,borderTop:`1px solid ${C.faint}`,fontSize:10,fontWeight:800,letterSpacing:".1em",textTransform:"uppercase",color:C.muted}}>{p.meta} ↗</div></div></Link>)}
    </div>
  </Section>
  <Section eyebrow="Operating Model" title="Southlake is the flagship home. Expansion stays market-specific.">
    <InfoGrid items={[
      {label:"Las Vegas",value:"4 Events",body:"A four-event ICONIC market program."},
      {label:"Washington DC",value:"4 Events",body:"A four-event ICONIC market program."},
      {label:"Tampa",value:"4 Events",body:"A four-event ICONIC market program."},
      {label:"New York",value:"Resorts World",body:"ENCORE and Funny Business remain distinct New York properties."},
    ]}/>
  </Section>
</Shell>}
