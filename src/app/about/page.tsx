import type { Metadata } from "next";
import Link from "next/link";
import { Button, C, Hero, Section } from "@/app/_components/IconicPage";
import PlatformShell from "@/app/_components/PlatformShell";

const MASTER_VISUAL="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-live-concert-series-master.png?v=1789175341";

export const metadata: Metadata={
  title:"About ICONIC LIVE",
  description:"ICONIC LIVE is a live-entertainment and experiential platform producing headline concerts, tours, premium hospitality, merchandise, sponsorships and city-scale cultural moments.",
};

const platform=[
  ["LIVE EVENTS","Headline concerts, arena and stadium events designed as branded worlds rather than isolated dates."],
  ["TOURS","Repeatable multi-city systems with localized creative, venue strategy, premium access and market-specific activation."],
  ["EXPERIENCES","Arrival, nightlife, hospitality, afterparties, food and beverage, city takeovers and destination-weekend extensions."],
  ["PARTNERSHIPS","Sponsorship inventory, brand integration, hospitality, content, ticket allocation and custom physical activations."],
  ["MERCH + COMMERCE","Artist, event and city collections built to extend the cultural and commercial life of the show."],
  ["CONTENT + IP","Campaign worlds, media capture, social moments and post-event assets built to keep the experience moving after the doors close."],
];

export default function AboutPage(){return <PlatformShell>
  <Hero visual={MASTER_VISUAL} visualPosition="center 44%" eyebrow="ICONIC LIVE · THE PLATFORM" title="MAKE THE MOMENT LAST LONGER THAN THE NIGHT." sub="ICONIC operates at the intersection of culture, live entertainment, experiential design and strategic partnerships. We build events that are meant to be remembered, shared, revisited and scaled." visualNote="MUSIC · CULTURE · EXPERIENCES · FOREVER">
    <Button href="/access?intent=partners">Build With ICONIC</Button><Button href="/" ghost>Current Slate</Button>
  </Hero>
  <Section eyebrow="What ICONIC Is" title="Not a promoter tag. A full live-entertainment platform." dark>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>{platform.map(([title,body],index)=><article key={title} className="glass market-card" style={{minHeight:250,padding:28,borderRadius:22}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".18em"}}>{String(index+1).padStart(2,"0")}</div><h2 style={{fontFamily:"Georgia,serif",fontSize:36,lineHeight:.98,margin:"24px 0 14px"}}>{title}</h2><p style={{color:C.muted,fontSize:13,lineHeight:1.72,margin:0}}>{body}</p></article>)}</div>
  </Section>
  <Section eyebrow="The Standard" title="Premium presentation. Cultural relevance. Operational clarity.">
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:14}}>
      {[['MEMORABLE BY DESIGN','Every experience should create moments worth photographing, retelling and comparing long after the event ends.'],['WORLD-BUILDING OVER FLYERS','The strongest properties have a visual language, arrival ritual, merchandise system, content engine and city-specific story.'],['REVENUE BEYOND THE TICKET','VIP, suites, sponsors, hospitality, merchandise, food and beverage, afterparties and content are built into the model from the start.'],['SEPARATE WORLDS. ONE PLATFORM.','Tampa Halloween, Soul Symphony and Pardon My French remain distinct properties while benefiting from shared ICONIC production, partnership and audience infrastructure.']].map(([title,body])=><div className="glass" key={title} style={{padding:28,borderRadius:22}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".16em"}}>{title}</div><p style={{fontFamily:"Georgia,serif",fontSize:30,lineHeight:1.08,margin:"18px 0 0"}}>{body}</p></div>)}
    </div>
  </Section>
  <section style={{padding:"110px clamp(22px,6vw,90px)",borderTop:`1px solid ${C.faint}`,textAlign:"center"}}><div style={{maxWidth:960,margin:"0 auto"}}><div style={{color:C.gold2,fontSize:9,fontWeight:900,letterSpacing:".28em"}}>TALENT · VENUES · SPONSORS · BRANDS</div><h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(58px,8vw,118px)",lineHeight:.84,letterSpacing:"-.05em",margin:"22px 0 30px"}}>DON’T JUST HOST IT. MAKE IT LAST.</h2><Button href="/partners">Explore Partnerships</Button><Link href="/access?intent=partners" style={{color:C.gold2,textDecoration:"none",fontSize:9,fontWeight:900,letterSpacing:".16em"}}>START A CONVERSATION →</Link></div></section>
</PlatformShell>}
