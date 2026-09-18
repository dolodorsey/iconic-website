import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title:"Nightmare Marketing Command Center | ICONIC LIVE",
  robots:{index:false,follow:false},
};

const budget=[
  ["Meta / Instagram Paid Media","$12,000"],
  ["TikTok Paid Media","$5,000"],
  ["Influencers + Creators","$7,500"],
  ["Street Teams + City Activations","$7,500"],
  ["Content / Commercial Production","$3,000"],
  ["Podcasts + Culture Media","$4,000"],
  ["Print + Physical Marketing","$7,000"],
  ["Campus + Club Takeovers","$3,000"],
  ["Email + SMS + CRM Delivery","$7,000"],
  ["Rapid Reallocation Reserve","$4,000"],
];

const scenarios=[
  {eyebrow:"LIVE BASE",total:"$60K",label:"FULL CAMPAIGN MINIMUM",paid:"$17K",print:"$7K",crm:"$7K",content:"$3K",status:"AUTHORIZED"},
  {eyebrow:"TARGET",total:"$80K",label:"REGIONAL SATURATION",paid:"$23K",print:"$10K",crm:"$11K",content:"$3K",status:"PERFORMANCE UNLOCK"},
  {eyebrow:"CEILING",total:"$100K",label:"SOUTHEAST TAKEOVER",paid:"$29K",print:"$14K",crm:"$14K",content:"$3K",status:"LOCKED CAPACITY"},
];

const release=[
  ["FOUNDATION","$12K","SEP 22","Initial print / QA / recruitment / deposits / paid tests"],
  ["CHECKPOINT 01","$21K","SEP 28","Validate attribution + early ticket economics"],
  ["CHECKPOINT 02","$36K","OCT 12","Primary reallocation by verified sales / CAC / city / creative"],
  ["SCALE","$48K","OCT 23","Scale proven channels + high-intent CRM"],
  ["FINAL WEEK","$60K","OCT 31","Full approved base capacity"],
];

const print=[
  ["11×17 Posters","1,800","$1,500"],
  ["4×6 Flyers / Handbills","50,000","$1,600"],
  ["Bathroom / Venue Clings","800","$600"],
  ["Club Table Tents / QR Cards","600","$500"],
  ["Promotional Ticket Cards","8,000","$800"],
  ["Campus Palm Cards","10,000","$700"],
  ["Retail Counter Cards","800","$500"],
  ["Partner QR Stickers","1,200","$300"],
  ["Rush Reprint Reserve","ON DEMAND","$500"],
];

const crmCadence=[
  ["SEP 22–28","2–3 segmented email campaigns + selective consented SMS + behavioral recovery"],
  ["SEP 29–OCT 12","3–4 email campaigns weekly + 2 targeted SMS sends + high-intent automations"],
  ["OCT 13–23","4 email campaigns weekly + 2–3 targeted SMS sends + VIP / group / merch branches"],
  ["OCT 24–31","Daily segmented email operation + daily-cap SMS strategy + buyer logistics"],
  ["BEHAVIORAL","15m / 3h / 24h / 48h recovery; buyer suppression; VIP instant + 2h + 24h"],
];

const status=[
  ["Supabase Command Layer","LIVE","$60K / $80K / $100K scenarios + release tranches + print + CRM tables"],
  ["Print Procurement","READY","27 scenario/item rows + five deployment waves + city allocation"],
  ["CRM Messaging Matrix","READY","49 scheduled / triggered sends through Oct 31"],
  ["GHL Blueprint","READY / BLOCKED","27 blueprint objects stored; provider connector still returns 401 IAM/scope"],
  ["Ticket Purchase Verification","BLOCKED","Requires Ticketmaster export/API/provider reconciliation; clickout is never counted as sale"],
  ["Internal Web Dashboard","PREVIEW ONLY","Production route remains blocked until authenticated internal access exists"],
];

function Card({children}:{children:React.ReactNode}) {
  return <article style={{padding:22,border:"1px solid rgba(255,255,255,.11)",borderRadius:18,background:"rgba(255,255,255,.025)"}}>{children}</article>;
}

export default function CommandCenter(){
  if(process.env.VERCEL_ENV==="production") notFound();

  return <main style={{minHeight:"100vh",background:"radial-gradient(circle at 8% 0%,rgba(164,0,0,.22),transparent 28%),#070707",color:"#f7f3ed",fontFamily:"Arial,sans-serif",padding:"48px clamp(18px,4vw,58px) 100px"}}>
    <div style={{maxWidth:1540,margin:"0 auto"}}>
      <header style={{display:"flex",justifyContent:"space-between",gap:24,alignItems:"end",flexWrap:"wrap",paddingBottom:26,borderBottom:"1px solid rgba(255,255,255,.13)"}}>
        <div>
          <div style={{fontSize:9,fontWeight:900,letterSpacing:".24em",color:"#ff473d"}}>ICONIC LIVE · INTERNAL MARKETING COMMAND</div>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(48px,7vw,92px)",lineHeight:.84,letterSpacing:"-.045em",margin:"15px 0 0"}}>NIGHTMARE<br/>ON CHANNELSIDE.</h1>
        </div>
        <div style={{fontSize:11,lineHeight:1.8,color:"rgba(255,255,255,.58)",textAlign:"right"}}>SATURDAY · OCTOBER 31, 2026<br/>BENCHMARK INTERNATIONAL ARENA · TAMPA<br/>DOORS 6 PM · SHOW 7 PM</div>
      </header>

      <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12,marginTop:24}}>
        {scenarios.map((s,i)=><Card key={s.total}>
          <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"start"}}>
            <div style={{fontSize:9,fontWeight:900,letterSpacing:".2em",color:i===0?"#ff473d":"rgba(255,255,255,.48)"}}>{s.eyebrow}</div>
            <div style={{fontSize:8,fontWeight:900,letterSpacing:".12em",padding:"7px 9px",borderRadius:999,border:"1px solid rgba(255,255,255,.13)",color:"rgba(255,255,255,.66)"}}>{s.status}</div>
          </div>
          <strong style={{display:"block",fontFamily:"Georgia,serif",fontSize:60,lineHeight:.9,marginTop:20}}>{s.total}</strong>
          <div style={{fontSize:11,fontWeight:900,letterSpacing:".12em",marginTop:11}}>{s.label}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginTop:20}}>
            {[["PAID",s.paid],["PRINT",s.print],["CRM",s.crm],["CONTENT",s.content]].map(([k,v])=><div key={k} style={{padding:"12px 13px",borderRadius:12,background:"rgba(255,255,255,.04)"}}><div style={{fontSize:8,letterSpacing:".15em",color:"rgba(255,255,255,.42)"}}>{k}</div><b style={{display:"block",fontSize:17,marginTop:5}}>{v}</b></div>)}
          </div>
        </Card>)}
      </section>

      <section style={{display:"grid",gridTemplateColumns:"minmax(0,1.05fr) minmax(330px,.95fr)",gap:16,marginTop:16}}>
        <Card>
          <div style={{fontSize:9,fontWeight:900,letterSpacing:".18em",color:"#ff473d"}}>$60K LIVE BASE · DISTRIBUTION-HEAVY</div>
          <div style={{marginTop:16}}>{budget.map(([name,value])=><div key={name} style={{display:"flex",justifyContent:"space-between",gap:18,padding:"11px 0",borderBottom:"1px solid rgba(255,255,255,.075)",fontSize:12}}><span>{name}</span><strong>{value}</strong></div>)}</div>
          <div style={{marginTop:16,fontSize:11,lineHeight:1.7,color:"rgba(255,255,255,.55)"}}>Content stays capped at $3K across all scenarios. Incremental capital goes to distribution: paid acquisition, print, CRM, field activity, creators and proven media.</div>
        </Card>

        <Card>
          <div style={{fontSize:9,fontWeight:900,letterSpacing:".18em",color:"#ff473d"}}>CAPITAL RELEASE · $60K BASE</div>
          <div style={{display:"grid",gap:10,marginTop:16}}>{release.map(([stage,cap,date,rule])=><div key={stage} style={{padding:"14px 15px",border:"1px solid rgba(255,255,255,.08)",borderRadius:13}}>
            <div style={{display:"flex",justifyContent:"space-between",gap:12}}><b style={{fontSize:11}}>{stage}</b><strong>{cap}</strong></div>
            <div style={{fontSize:8,letterSpacing:".13em",color:"#ff756d",marginTop:6}}>{date}</div>
            <div style={{fontSize:10,lineHeight:1.55,color:"rgba(255,255,255,.52)",marginTop:6}}>{rule}</div>
          </div>)}</div>
          <div style={{marginTop:14,padding:"14px 15px",borderRadius:13,background:"rgba(255,71,61,.08)",fontSize:11,lineHeight:1.65}}>Above $60K unlocks in <b>$5K tranches</b>. Every tranche must name the channel / market receiving it and show clean attribution, remaining inventory and measurable evidence.</div>
        </Card>
      </section>

      <section style={{display:"grid",gridTemplateColumns:"minmax(0,1.05fr) minmax(330px,.95fr)",gap:16,marginTop:16}}>
        <Card>
          <div style={{fontSize:9,fontWeight:900,letterSpacing:".18em",color:"#ff473d"}}>PRINT PROCUREMENT · $60K BASE SCENARIO</div>
          <div style={{marginTop:16}}>{print.map(([item,qty,budget])=><div key={item} style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) 100px 90px",gap:12,padding:"11px 0",borderBottom:"1px solid rgba(255,255,255,.075)",fontSize:11}}>
            <span>{item}</span><b style={{textAlign:"right"}}>{qty}</b><strong style={{textAlign:"right"}}>{budget}</strong>
          </div>)}</div>
          <div style={{marginTop:14,fontSize:10,lineHeight:1.6,color:"rgba(255,255,255,.5)"}}>Quantities are procurement targets pending vendor quote. Every batch uses city / item / wave attribution and requires timestamped placement proof.</div>
        </Card>

        <Card>
          <div style={{fontSize:9,fontWeight:900,letterSpacing:".18em",color:"#ff473d"}}>CRM / EMAIL / SMS OPERATING CADENCE</div>
          <div style={{display:"grid",gap:10,marginTop:16}}>{crmCadence.map(([period,copy])=><div key={period} style={{padding:"14px 15px",border:"1px solid rgba(255,255,255,.08)",borderRadius:13}}>
            <b style={{fontSize:10,letterSpacing:".08em"}}>{period}</b>
            <div style={{fontSize:10,lineHeight:1.6,color:"rgba(255,255,255,.55)",marginTop:6}}>{copy}</div>
          </div>)}</div>
          <div style={{marginTop:14,fontSize:10,lineHeight:1.65,color:"rgba(255,255,255,.52)"}}>Constant system activity does not mean indiscriminate blasting. Buyer suppression, consent, quiet hours, frequency caps and channel cooldowns govern every marketing send.</div>
        </Card>
      </section>

      <section style={{marginTop:16}}>
        <Card>
          <div style={{fontSize:9,fontWeight:900,letterSpacing:".18em",color:"#ff473d"}}>SYSTEM STATUS</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:10,marginTop:16}}>
            {status.map(([name,state,detail])=><div key={name} style={{padding:"15px",border:"1px solid rgba(255,255,255,.08)",borderRadius:13}}>
              <div style={{display:"flex",justifyContent:"space-between",gap:10}}><b style={{fontSize:11}}>{name}</b><span style={{fontSize:8,fontWeight:900,letterSpacing:".1em",color:state.includes("BLOCKED")?"#ff756d":"rgba(255,255,255,.48)"}}>{state}</span></div>
              <div style={{fontSize:10,lineHeight:1.55,color:"rgba(255,255,255,.5)",marginTop:8}}>{detail}</div>
            </div>)}
          </div>
        </Card>
      </section>

      <section style={{marginTop:16}}>
        <Card>
          <div style={{fontSize:9,fontWeight:900,letterSpacing:".18em",color:"#ff473d"}}>ACTIVE MODULES</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:9,marginTop:16}}>
            {["Budget Scenarios","Budget Release + Unlocks","Ticket Sales + Revenue","Promo Code Leaderboard","City Performance","Paid Media + CAC / ROAS","Print Procurement","Print Market Allocation","CRM Budget","CRM Messaging Calendar","High-Intent Recovery","VIP / Couch / Booth","Promoters + Influencers","Asset Production","44-Day Promo Schedule","Street-Team Proof","Buyer Readiness","Message Cost + Revenue Attribution"].map(x=><div key={x} style={{padding:"14px",border:"1px solid rgba(255,255,255,.075)",borderRadius:12,fontSize:11}}>{x}</div>)}
          </div>
        </Card>
      </section>

      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:26}}>
        <Link href="/tampa/nightmare-on-channelside/tickets" style={{padding:"14px 18px",borderRadius:999,background:"#ff3b30",color:"#fff",textDecoration:"none",fontSize:10,fontWeight:900,letterSpacing:".13em"}}>OPEN TICKET FACE →</Link>
        <Link href="/tampa/nightmare-on-channelside" style={{padding:"14px 18px",borderRadius:999,border:"1px solid rgba(255,255,255,.15)",color:"#fff",textDecoration:"none",fontSize:10,fontWeight:900,letterSpacing:".13em"}}>EVENT PAGE →</Link>
        <a href="https://docs.google.com/spreadsheets/d/1-ZRfke2PPMvMKNd68PP6H7IMqWh1PBfgWobQQd22xI8/edit" target="_blank" rel="noreferrer" style={{padding:"14px 18px",borderRadius:999,border:"1px solid rgba(255,71,61,.28)",color:"#ff8a84",textDecoration:"none",fontSize:10,fontWeight:900,letterSpacing:".13em"}}>OPEN OPERATING SHEET →</a>
      </div>
    </div>
  </main>;
}
