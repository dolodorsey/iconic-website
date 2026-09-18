import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title:"Nightmare Marketing Command Center | ICONIC LIVE",
  robots:{index:false,follow:false},
};

const budget=[
["Meta Paid Media","$11,000"],["Influencers + Creators","$7,500"],["Street Teams + City Activations","$7,500"],["TikTok Paid Media","$5,000"],["Content Production","$4,500"],["Podcasts + Culture Media","$4,000"],["Print + Physical Placement","$3,000"],["Campus + Club Takeovers","$2,500"],["CRM + SMS + Email Ops","$1,500"],["Rapid Reallocation Reserve","$3,500"],
];

const kpis=[
["BASE MARKETING BUDGET","$50,000"],["PROMO CALENDAR","44 DAYS"],["ASSET QUEUE","59"],["MARKET PLANS","11"],["SEED TRACKING CODES","12"],["GHL BLUEPRINT OBJECTS","11"],
];

export default function CommandCenter(){
  if(process.env.VERCEL_ENV==="production") notFound();
  return <main style={{minHeight:"100vh",background:"#070707",color:"#f7f3ed",fontFamily:"Arial,sans-serif",padding:"48px clamp(18px,4vw,58px) 90px"}}>
    <div style={{maxWidth:1500,margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",gap:20,alignItems:"end",flexWrap:"wrap",paddingBottom:24,borderBottom:"1px solid rgba(255,255,255,.13)"}}>
        <div><div style={{fontSize:9,fontWeight:900,letterSpacing:".22em",color:"#ff473d"}}>ICONIC LIVE · INTERNAL MARKETING COMMAND</div><h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(44px,7vw,88px)",lineHeight:.86,margin:"14px 0 0"}}>NIGHTMARE ON CHANNELSIDE.</h1></div>
        <div style={{fontSize:11,lineHeight:1.7,color:"rgba(255,255,255,.58)"}}>OCT 31, 2026 · BENCHMARK INTERNATIONAL ARENA<br/>TAMPA, FL · DOORS 6 PM · SHOW 7 PM</div>
      </div>

      <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10,marginTop:24}}>
        {kpis.map(([label,value])=><article key={label} style={{padding:20,border:"1px solid rgba(255,255,255,.11)",borderRadius:16,background:"rgba(255,255,255,.025)"}}><div style={{fontSize:8,fontWeight:900,letterSpacing:".16em",color:"rgba(255,255,255,.5)"}}>{label}</div><strong style={{display:"block",fontSize:27,marginTop:10}}>{value}</strong></article>)}
      </section>

      <section style={{display:"grid",gridTemplateColumns:"minmax(0,1.2fr) minmax(320px,.8fr)",gap:18,marginTop:18}}>
        <article style={{padding:24,border:"1px solid rgba(255,255,255,.11)",borderRadius:18}}>
          <div style={{fontSize:9,fontWeight:900,letterSpacing:".18em",color:"#ff473d"}}>BASE BUDGET · $50K FLOOR</div>
          <div style={{marginTop:18}}>{budget.map(([name,value])=><div key={name} style={{display:"flex",justifyContent:"space-between",gap:20,padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.08)",fontSize:12}}><span>{name}</span><strong>{value}</strong></div>)}</div>
        </article>

        <article style={{padding:24,border:"1px solid rgba(255,71,61,.2)",borderRadius:18,background:"linear-gradient(145deg,rgba(150,0,0,.1),rgba(255,255,255,.02))"}}>
          <div style={{fontSize:9,fontWeight:900,letterSpacing:".18em",color:"#ff473d"}}>SYSTEM STATUS</div>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:34,lineHeight:1,margin:"18px 0"}}>Tracking first. Spend second.</h2>
          <div style={{display:"grid",gap:12,fontSize:12,lineHeight:1.6,color:"rgba(255,255,255,.67)"}}>
            <div><b style={{color:"#fff"}}>Ticket Face:</b> branch implementation built for code-before-Ticketmaster attribution.</div>
            <div><b style={{color:"#fff"}}>Supabase:</b> campaign, budget, city, code, schedule, asset, partner, KPI and GHL-blueprint tables created.</div>
            <div><b style={{color:"#fff"}}>Ticket Purchase Reconciliation:</b> requires Ticketmaster provider export/API or verified order import; clickout is not counted as a sale.</div>
            <div><b style={{color:"#fff"}}>HighLevel:</b> provider materialization is blocked by current connector 401 auth/scope; full pipeline/workflow blueprint is stored and ready.</div>
          </div>
        </article>
      </section>

      <section style={{marginTop:18,padding:24,border:"1px solid rgba(255,255,255,.11)",borderRadius:18}}>
        <div style={{fontSize:9,fontWeight:900,letterSpacing:".18em",color:"#ff473d"}}>DASHBOARD MODULES</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10,marginTop:18}}>
          {["Ticket Sales + Revenue","Promo Code Leaderboard","City Performance","Paid Media + CAC / ROAS","Promoters + Influencers","Budget / Commitments / Spend","Asset Production","44-Day Promo Schedule","VIP / Couch / Booth","CRM + GHL Status","Street-Team Proof","Email + SMS Performance"].map(x=><div key={x} style={{padding:16,border:"1px solid rgba(255,255,255,.08)",borderRadius:12,fontSize:12}}>{x}</div>)}
        </div>
      </section>

      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:26}}>
        <Link href="/tampa/nightmare-on-channelside/tickets" style={{padding:"14px 18px",borderRadius:999,background:"#ff3b30",color:"#fff",textDecoration:"none",fontSize:10,fontWeight:900,letterSpacing:".13em"}}>OPEN TICKET FACE →</Link>
        <Link href="/tampa/nightmare-on-channelside" style={{padding:"14px 18px",borderRadius:999,border:"1px solid rgba(255,255,255,.15)",color:"#fff",textDecoration:"none",fontSize:10,fontWeight:900,letterSpacing:".13em"}}>EVENT PAGE →</Link>
      </div>
    </div>
  </main>;
}
