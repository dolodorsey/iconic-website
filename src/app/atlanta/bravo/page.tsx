import type { Metadata } from "next";
import { C, Hero, InfoGrid, Section, Shell, drive } from "../../_components/IconicPage";
import { EventActionCenter, EventTracker } from "../../_components/EventActionCenter";

export const metadata: Metadata = {
  title: "BRAVO — ICONIC New Year's Eve | Southlake Arena Atlanta",
  description: "BRAVO by ICONIC — New Year's Eve at Southlake Arena in Atlanta on December 31, 2026.",
};

const BRAVO_VISUAL=drive("1OUIoMaNUNhEA00l6HtLqQdzl62rDktq3");

export default function BravoPage() {
  return <Shell>
    <EventTracker eventKey="bravo_nye_atl_2026"/>

    <Hero visual={BRAVO_VISUAL} visualPosition="center center" eyebrow="ICONIC PRESENTS · NEW YEAR'S EVE · ATLANTA" title="BRAVO." sub="An arena-scale New Year's Eve concert and celebration at Southlake Arena — live talent, premium hospitality, a designed midnight moment and an annual property built to grow year after year.">
      <a href="#access" style={{display:"inline-flex",minHeight:50,alignItems:"center",justifyContent:"center",padding:"0 26px",marginRight:10,marginBottom:10,borderRadius:999,textDecoration:"none",border:"1px solid rgba(255,221,139,.34)",background:"linear-gradient(110deg,#fff2bd,#d89f34 44%,#ffdf7d)",color:C.black,fontSize:9,fontWeight:900,letterSpacing:".17em",textTransform:"uppercase",boxShadow:"0 14px 44px rgba(201,143,40,.22)"}}>Tickets + VIP</a>
      <a href="#night" style={{display:"inline-flex",minHeight:50,alignItems:"center",justifyContent:"center",padding:"0 26px",marginRight:10,marginBottom:10,borderRadius:999,textDecoration:"none",border:`1px solid ${C.faint}`,background:"rgba(255,214,119,.055)",color:C.white,fontSize:9,fontWeight:900,letterSpacing:".17em",textTransform:"uppercase"}}>Explore The Night</a>
    </Hero>

    <Section eyebrow="December 31, 2026" title="Atlanta's year-ending ICONIC moment.">
      <InfoGrid items={[
        { label: "Event", value: "BRAVO", body: "ICONIC's annual New Year's Eve flagship property." },
        { label: "Venue", value: "Southlake Arena", body: "Atlanta arena-scale concert and celebration." },
        { label: "Date", value: "December 31, 2026", body: "New Year's Eve." },
        { label: "Format", value: "Concert + Countdown", body: "Live talent, midnight production, hospitality and sponsor integration." },
      ]} />
    </Section>

    <section id="night" style={{position:"relative",zIndex:2,padding:"100px clamp(22px,6vw,90px)",background:"radial-gradient(circle at 50% 105%,rgba(224,173,69,.15),transparent 42%),#050403",borderTop:`1px solid ${C.faint}`}}><div style={{maxWidth:1450,margin:"0 auto"}}>
      <div style={{fontSize:9,fontWeight:900,letterSpacing:".28em",textTransform:"uppercase",color:C.gold2,marginBottom:16}}>Night Architecture</div>
      <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(50px,7vw,100px)",lineHeight:.84,letterSpacing:"-.045em",margin:"0 0 44px"}}>CONCERT FIRST.<br/>CELEBRATION ALL NIGHT.</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>
        {[
          ["01","HEADLINE SHOW","The artist package is the primary ticket driver — full concert production before the midnight moment."],
          ["02","THE COUNTDOWN","A designed arena-wide midnight sequence built for capture, press, sponsor integration and social distribution."],
          ["03","VIP + HOSPITALITY","Premium seating, hosted experiences, group hospitality and elevated arrival options live as their own revenue lane."],
          ["04","ANNUAL PROPERTY","BRAVO is built to become Atlanta's repeat New Year's Eve arena brand — not a one-off party."],
        ].map(([n,t,b])=><article key={n} className="glass" style={{minHeight:300,padding:30,borderRadius:24}}><div style={{fontSize:8,fontWeight:900,letterSpacing:".22em",color:C.gold2}}>{n}</div><h3 style={{fontFamily:"Georgia,serif",fontSize:36,lineHeight:.95,margin:"18px 0 14px"}}>{t}</h3><p style={{margin:0,color:C.muted,fontSize:13,lineHeight:1.72}}>{b}</p></article>)}
      </div>
    </div></section>

    <Section eyebrow="BRAVO Access" title="Separate lanes for tickets, premium guests and brand partners." dark>
      <EventActionCenter
        eventKey="bravo_nye_atl_2026"
        eventName="BRAVO New Year's Eve — Atlanta"
        accent="#ffd97a"
        supportLine="Talent and public on-sale information will be added only when confirmed. Ticket alerts, VIP, sponsors and strategic partner interest are kept as separate conversations."
        actions={[
          {key:"ticket_alert",eyebrow:"Tickets + Presale",title:"Get In First.",body:"Join the BRAVO ticket-alert lane for presale timing, public on-sale updates and event release information.",email:"info@thekollectivehospitality.com",subject:"BRAVO NYE Atlanta — Ticket Alert"},
          {key:"vip",eyebrow:"VIP + Hospitality",title:"Upgrade New Year's Eve.",body:"Request premium seating, hospitality, hosted tables, group experiences and high-touch arrival options.",email:"info@thekollectivehospitality.com",subject:"BRAVO NYE Atlanta — VIP + Hospitality"},
          {key:"sponsors",eyebrow:"Sponsorship",title:"Own The Midnight Moment.",body:"Request countdown, beverage, content, hospitality, naming, experiential and custom activation inventory.",email:"info@thekollectivehospitality.com",subject:"BRAVO NYE Atlanta — Sponsorship"},
          {key:"partners",eyebrow:"Strategic Partners",title:"Build BRAVO With Us.",body:"For talent, venue, media, travel, hotel, production and strategic operating partnerships around the Atlanta property.",email:"info@thekollectivehospitality.com",subject:"BRAVO NYE Atlanta — Strategic Partnership"},
        ]}
      />
    </Section>

    <Section eyebrow="Premium Inventory" title="New Year's Eve has more monetization layers than a seat." >
      <InfoGrid items={[
        {label:"Premium Seating",value:"High-Value Inventory",body:"Premium seats and hosted zones can be packaged separately from standard admission."},
        {label:"Hospitality",value:"Groups + Hosts",body:"Corporate groups, curated hosts and high-value guests receive their own experience path."},
        {label:"Sponsors",value:"Countdown + Content",body:"The midnight moment creates premium naming, media and experiential inventory."},
        {label:"Travel",value:"Atlanta Weekend",body:"Hotel, arrival, dining and city-weekend partnerships can extend the event beyond the arena."},
      ]}/>
    </Section>

    <section style={{position:"relative",zIndex:2,padding:"120px clamp(22px,6vw,90px)",textAlign:"center",background:"radial-gradient(circle at 50% 110%,rgba(224,173,69,.18),transparent 42%),#040301",borderTop:`1px solid ${C.faint}`}}><div style={{maxWidth:980,margin:"0 auto"}}><div style={{fontSize:9,fontWeight:900,letterSpacing:".3em",textTransform:"uppercase",color:C.gold2}}>ATLANTA · DECEMBER 31, 2026</div><h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(58px,9vw,128px)",lineHeight:.82,letterSpacing:"-.05em",margin:"20px 0 28px"}}>END THE YEAR<br/>AT A DIFFERENT LEVEL.</h2><a href="#access" style={{display:"inline-flex",minHeight:52,alignItems:"center",padding:"0 26px",borderRadius:999,textDecoration:"none",background:"linear-gradient(110deg,#fff2bd,#d89f34 44%,#ffdf7d)",color:C.black,fontSize:9,fontWeight:900,letterSpacing:".17em",textTransform:"uppercase"}}>Enter BRAVO Access</a></div></section>
  </Shell>;
}
