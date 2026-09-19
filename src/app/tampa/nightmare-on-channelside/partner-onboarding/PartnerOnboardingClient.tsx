"use client";

import { FormEvent, useMemo, useState } from "react";

const roleOptions=[
  ["promoter_commission","Promoter — 10% Commission"],
  ["promoter_comp","Promoter — Comp Tickets"],
  ["ambassador_model","Ambassador / Model"],
  ["podcast_partner","Podcast Partner"],
  ["dj_promo","DJ — Promo Only"],
  ["host_promo","Host — Promo Only"],
  ["dj_performance","DJ — Performance Set"],
  ["host_performance","Host — Stage / Performance"],
  ["street_team","Street Team — Paid"],
] as const;

const cityOptions=["Tampa","Orlando","Atlanta","Miami / South Florida","Washington DC","Jacksonville","Tallahassee","Gainesville","South Georgia","Lakeland / Sarasota / Fort Myers","Charlotte / Nashville / Alabama","Other Target Market"];

export default function PartnerOnboardingClient(){
  const params=useMemo(()=>typeof window!=="undefined"?new URLSearchParams(window.location.search):new URLSearchParams(),[]);
  const [state,setState]=useState<"idle"|"sending"|"done"|"error">("idle");
  const [error,setError]=useState("");

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    setState("sending");setError("");
    const form=new FormData(e.currentTarget);
    const body=Object.fromEntries(form.entries()) as Record<string,unknown>;
    body.consent_to_contact=form.get("consent_to_contact")==="yes";
    body.source_url=window.location.href;
    body.utm_source=params.get("utm_source")||"";
    body.utm_medium=params.get("utm_medium")||"";
    body.utm_campaign=params.get("utm_campaign")||"noc_partner_onboarding";
    body.utm_content=params.get("utm_content")||"";
    const res=await fetch("/api/noc-partner-apply",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});
    const data=await res.json().catch(()=>({}));
    if(!res.ok){setError(data.error||"Could not submit intake.");setState("error");return;}
    setState("done");
  }

  if(state==="done") return <section style={{minHeight:"70vh",display:"grid",placeItems:"center",padding:28}}>
    <div style={{maxWidth:720,textAlign:"center",border:"1px solid rgba(201,145,25,.35)",borderRadius:24,padding:"46px 30px",background:"rgba(255,255,255,.035)"}}>
      <div style={{fontSize:11,fontWeight:900,letterSpacing:".22em",color:"#d7ad4a"}}>INTAKE RECEIVED</div>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(44px,7vw,76px)",lineHeight:.95,margin:"16px 0"}}>YOU'RE IN THE<br/>OPERATIONS QUEUE.</h1>
      <p style={{color:"rgba(255,255,255,.68)",lineHeight:1.7}}>ICONIC LIVE Partner Ops will verify your role, agreement, compensation lane, tracking code, link, merch benefit and approved asset kit. Do not post or imply a performance/hosting role until your personalized packet confirms it.</p>
    </div>
  </section>;

  return <form onSubmit={submit} style={{display:"grid",gap:18}}>
    <input name="website" tabIndex={-1} autoComplete="off" style={{position:"absolute",left:-9999}} aria-hidden="true"/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:14}}>
      <Field label="LEGAL NAME *"><input required name="full_name" placeholder="Legal name"/></Field>
      <Field label="DISPLAY / OUTLET NAME"><input name="display_name" placeholder="Public name, podcast or outlet"/></Field>
      <Field label="EMAIL *"><input required type="email" name="email" placeholder="name@email.com"/></Field>
      <Field label="MOBILE"><input name="phone" placeholder="Best mobile number"/></Field>
      <Field label="INSTAGRAM"><input name="instagram" placeholder="@handle"/></Field>
      <Field label="TIKTOK"><input name="tiktok" placeholder="@handle"/></Field>
      <Field label="CITY / MARKET *"><select required name="city" defaultValue={params.get("city")||""}><option value="" disabled>Select market</option>{cityOptions.map(x=><option key={x} value={x}>{x}</option>)}</select></Field>
      <Field label="ROLE *"><select required name="requested_role" defaultValue={params.get("role")||""}><option value="" disabled>Select assigned / requested role</option>{roleOptions.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></Field>
    </div>
    <Field label="AVAILABILITY / SCHEDULE"><textarea name="availability" rows={3} placeholder="Best days/times, event-day availability, travel availability, shift availability, etc."/></Field>
    <Field label="REFERRAL / WHO CONNECTED YOU"><input name="referral_source" defaultValue={params.get("ref")||""} placeholder="Name / team / partner"/></Field>
    <Field label="NOTES"><textarea name="notes" rows={4} placeholder="Anything Partner Ops needs to know to activate you correctly."/></Field>

    <label style={{display:"flex",gap:12,alignItems:"flex-start",padding:"16px 18px",border:"1px solid rgba(255,255,255,.12)",borderRadius:14,background:"rgba(255,255,255,.025)",fontSize:12,lineHeight:1.6}}>
      <input required type="checkbox" name="consent_to_contact" value="yes" style={{marginTop:3}}/>
      <span>I authorize ICONIC LIVE / its campaign operations team to contact me about this event partnership, onboarding, deliverables, scheduling, codes, credentials and payments.</span>
    </label>

    {state==="error"&&<div style={{padding:"12px 14px",border:"1px solid rgba(255,70,60,.4)",borderRadius:12,color:"#ff8b84",fontSize:12}}>{error}</div>}
    <button disabled={state==="sending"} style={{minHeight:58,border:0,borderRadius:999,background:"#c99119",color:"#080604",fontWeight:1000,letterSpacing:".14em",textTransform:"uppercase",cursor:"pointer",opacity:state==="sending"?.65:1}}>
      {state==="sending"?"SUBMITTING…":"SUBMIT PERSONNEL INTAKE →"}
    </button>
    <p style={{margin:0,color:"rgba(255,255,255,.48)",fontSize:10,lineHeight:1.65}}>Submitting this intake does not create a stage booking, artist access, backstage access or guaranteed compensation. Your signed personalized role packet controls your specific duties, access and compensation.</p>
  </form>;
}

function Field({label,children}:{label:string;children:React.ReactNode}){
  return <label style={{display:"grid",gap:7,fontSize:9,fontWeight:900,letterSpacing:".15em",color:"#d7ad4a"}}>{label}<span className="noc-field">{children}</span><style jsx>{`
    .noc-field :global(input),.noc-field :global(select),.noc-field :global(textarea){width:100%;box-sizing:border-box;border:1px solid rgba(255,255,255,.13);border-radius:13px;background:#100b09;color:#fff;padding:15px 16px;font:600 14px/1.4 Arial,sans-serif;outline:none}
    .noc-field :global(input:focus),.noc-field :global(select:focus),.noc-field :global(textarea:focus){border-color:rgba(201,145,25,.8);box-shadow:0 0 0 3px rgba(201,145,25,.12)}
    .noc-field :global(select){min-height:51px}
  `}</style></label>;
}
