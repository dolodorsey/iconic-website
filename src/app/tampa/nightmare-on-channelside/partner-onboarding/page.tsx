import type { Metadata } from "next";
import Link from "next/link";
import PartnerOnboardingClient from "./PartnerOnboardingClient";

export const metadata:Metadata={
  title:"Nightmare on Channelside Partner Intake | ICONIC LIVE",
  description:"ICONIC LIVE personnel onboarding for Nightmare on Channelside — promoters, ambassadors, models, podcasts, DJs, hosts and street team.",
  robots:{index:false,follow:false},
};

export default function PartnerOnboardingPage(){
  return <main style={{minHeight:"100vh",background:"radial-gradient(circle at 50% -10%,rgba(128,10,4,.28),transparent 35%),linear-gradient(160deg,#050302,#0e0907 55%,#030202)",color:"#fff",fontFamily:"Arial,sans-serif"}}>
    <div style={{maxWidth:1050,margin:"0 auto",padding:"60px 22px 100px"}}>
      <div style={{display:"flex",justifyContent:"space-between",gap:16,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{fontSize:10,fontWeight:1000,letterSpacing:".2em",color:"#d7ad4a"}}>ICONIC LIVE · NIGHTMARE ON CHANNELSIDE · PERSONNEL</div>
        <Link href="/tampa/nightmare-on-channelside" style={{color:"rgba(255,255,255,.6)",fontSize:10,fontWeight:900,letterSpacing:".12em"}}>EVENT HOME ↗</Link>
      </div>
      <header style={{padding:"46px 0 34px",borderBottom:"1px solid rgba(201,145,25,.25)",marginBottom:32}}>
        <div style={{fontSize:10,fontWeight:900,letterSpacing:".18em",color:"rgba(255,255,255,.48)"}}>CAMPAIGN START · SEPTEMBER 19, 2026</div>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(56px,9vw,104px)",lineHeight:.82,letterSpacing:"-.055em",margin:"18px 0 22px"}}>GET ONBOARDED.<br/><span style={{color:"#c99119"}}>GET ACTIVATED.</span></h1>
        <p style={{maxWidth:780,color:"rgba(255,255,255,.67)",fontSize:15,lineHeight:1.8}}>Complete this once. Partner Ops uses it to build your personalized role packet, compensation lane, tracking code, campaign link, merch benefit, posting schedule, credentials and payment milestones.</p>
      </header>
      <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:10,marginBottom:28}}>
        {["1 · INTAKE","2 · ROLE + CITY","3 · AGREEMENT","4 · CODE + LINK","5 · ASSETS + SCHEDULE","6 · PROOF + PAYMENT"].map(x=><div key={x} style={{padding:"14px 15px",border:"1px solid rgba(255,255,255,.09)",borderRadius:12,background:"rgba(255,255,255,.025)",fontSize:9,fontWeight:1000,letterSpacing:".11em"}}>{x}</div>)}
      </section>
      <PartnerOnboardingClient/>
    </div>
  </main>;
}
