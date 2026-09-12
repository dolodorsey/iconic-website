import type { Metadata } from "next";
import { Button, C, Hero, Section, Shell } from "@/app/_components/IconicPage";

const MASTER_VISUAL="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-live-concert-series-master.png?v=1789175341";

export const metadata: Metadata={
  title:"Partnerships & Sponsorships",
  description:"Partner with ICONIC LIVE across headline concerts, tours, VIP hospitality, brand activations, content, ticketing and event commerce.",
};

const inventory=[
  ["CATEGORY EXCLUSIVITY","Own a defined category across a property, city, tour leg or custom campaign window."],
  ["ON-SITE ACTIVATION","Build physical moments people use, photograph and remember instead of passive logo walls."],
  ["VIP + HOSPITALITY","Suites, premium seating, hosted arrival, gifting, lounges and partner guest experiences."],
  ["TICKETING + ACCESS","Ticket allocations, presale access, customer rewards and invitation-based audience experiences."],
  ["CONTENT + MEDIA","Branded content, social storytelling, creator moments, recap assets and campaign integration."],
  ["FOOD + BEVERAGE","Integrated product placement, pouring rights, hospitality moments and event-commerce opportunities."],
  ["MERCH + COLLABS","Limited product capsules, co-branded moments and merchandise tied to cities, artists or event worlds."],
  ["CITY TAKEOVERS","Hotels, nightlife, transportation, dining, retail and destination-weekend integrations around the show."],
];

export default function PartnersPage(){return <Shell>
  <Hero visual={MASTER_VISUAL} visualPosition="center 44%" eyebrow="ICONIC LIVE · PARTNERSHIP PLATFORM" title="DON’T JUST SPONSOR THE SHOW. OWN A REAL PART OF THE EXPERIENCE." sub="ICONIC builds partnership inventory into the fan journey — arrival, access, hospitality, commerce, nightlife, content and city-wide cultural moments." visualNote="SPONSORS · BRANDS · VENUES · TALENT · HOSPITALITY">
    <Button href="/access?intent=sponsorship">Request Sponsorship Inventory</Button><Button href="/access?intent=partners" ghost>Strategic Partnerships</Button>
  </Hero>
  <Section eyebrow="Partnership Inventory" title="Useful integration beats passive placement." dark>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>{inventory.map(([title,body],index)=><article key={title} className="glass market-card" style={{padding:28,borderRadius:22,minHeight:240}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".18em"}}>{String(index+1).padStart(2,"0")}</div><h2 style={{fontFamily:"Georgia,serif",fontSize:32,lineHeight:.98,margin:"22px 0 12px"}}>{title}</h2><p style={{color:C.muted,fontSize:13,lineHeight:1.7,margin:0}}>{body}</p></article>)}</div>
  </Section>
  <Section eyebrow="Current Properties" title="Different worlds. Different partnership opportunities.">
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:14}}>
      {[['TAMPA HALLOWEEN','Arena concert + Halloween spectacle + nightlife + official merch','/access?intent=sponsorship&event=tampa-halloween'],['SUMMER WALKER — SOUL SYMPHONY','10-city R&B × orchestral experience + premium hospitality + city weekends','/access?intent=sponsorship&event=summer-walker-soul-symphony'],['DJ SNAKE — PARDON MY FRENCH','5-city stadium platform + destination weekends + global nightlife culture','/access?intent=sponsorship&event=dj-snake-pardon-my-french']].map(([title,body,href])=><div key={title} className="glass" style={{padding:30,borderRadius:24}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".16em"}}>ICONIC PROPERTY</div><h3 style={{fontFamily:"Georgia,serif",fontSize:38,lineHeight:.95,margin:"18px 0 14px"}}>{title}</h3><p style={{color:C.muted,fontSize:13,lineHeight:1.7}}>{body}</p><Button href={href}>Request Inventory</Button></div>)}
    </div>
  </Section>
  <section style={{padding:"120px clamp(22px,6vw,90px)",borderTop:`1px solid ${C.faint}`,textAlign:"center",background:"radial-gradient(circle at 50% 100%,rgba(224,173,69,.18),transparent 38%)"}}><div style={{maxWidth:1000,margin:"0 auto"}}><div style={{color:C.gold2,fontSize:9,fontWeight:900,letterSpacing:".28em"}}>BUILD WITH ICONIC</div><h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(60px,8vw,120px)",lineHeight:.82,letterSpacing:"-.055em",margin:"22px 0 34px"}}>PUT YOUR BRAND INSIDE THE MEMORY.</h2><Button href="/access?intent=sponsorship">Start Sponsorship Request</Button></div></section>
</Shell>}
