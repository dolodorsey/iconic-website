"use client";

import { FormEvent, useMemo, useState } from "react";

const labels: Record<string,string> = {
  presale:"Tickets + Presale",
  vip:"VIP + Hospitality",
  travel:"City Weekend",
  merch:"Merch Vault",
  partners:"Partners",
  sponsorship:"Sponsorship",
  media:"Media + Archive",
};

export default function AccessForm({intent,event}:{intent:string;event?:string}){
  const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
  const [error,setError]=useState("");
  const title=useMemo(()=>labels[intent]||"ICONIC Access",[intent]);

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form=new FormData(e.currentTarget);
    const payload={
      intent,
      event_slug:event||null,
      full_name:String(form.get("full_name")||"").trim(),
      email:String(form.get("email")||"").trim(),
      phone:String(form.get("phone")||"").trim()||null,
      company:String(form.get("company")||"").trim()||null,
      city:String(form.get("city")||"").trim()||null,
      message:String(form.get("message")||"").trim()||null,
      website:String(form.get("website")||""),
      page_path:window.location.pathname+window.location.search,
      utm_source:new URLSearchParams(window.location.search).get("utm_source"),
      utm_medium:new URLSearchParams(window.location.search).get("utm_medium"),
      utm_campaign:new URLSearchParams(window.location.search).get("utm_campaign"),
    };
    try{
      const res=await fetch("/api/iconic-leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      if(!res.ok){ const body=await res.json().catch(()=>({})); throw new Error(body.error||"Request failed"); }
      setStatus("success");
      e.currentTarget.reset();
    }catch(err){
      setStatus("error");
      setError(err instanceof Error?err.message:"Unable to submit right now.");
    }
  }

  const inputStyle={width:"100%",boxSizing:"border-box" as const,background:"rgba(255,255,255,.045)",border:"1px solid rgba(255,255,255,.14)",borderRadius:14,color:"#fff",padding:"15px 16px",fontSize:14,outline:"none"};
  const labelStyle={display:"block",fontSize:8,fontWeight:900,letterSpacing:".17em",textTransform:"uppercase" as const,color:"#d8b464",marginBottom:8};

  if(status==="success") return <div style={{padding:30,border:"1px solid rgba(216,180,100,.45)",borderRadius:22,background:"rgba(216,180,100,.08)"}}><div style={{fontSize:9,fontWeight:900,letterSpacing:".2em",color:"#d8b464",textTransform:"uppercase"}}>Request received</div><h3 style={{fontFamily:"Georgia,serif",fontSize:38,lineHeight:1,margin:"14px 0"}}>You’re on the ICONIC list.</h3><p style={{color:"rgba(255,255,255,.7)",lineHeight:1.7,margin:0}}>Your {title.toLowerCase()} request has been captured. Our team can now route it by event and access type.</p></div>;

  return <form onSubmit={submit} style={{display:"grid",gap:16,padding:24,border:"1px solid rgba(255,255,255,.12)",borderRadius:24,background:"rgba(255,255,255,.025)"}}>
    <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:"absolute",left:"-9999px",opacity:0}} />
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14}}>
      <label><span style={labelStyle}>Full Name *</span><input style={inputStyle} name="full_name" required minLength={2} maxLength={120} autoComplete="name" /></label>
      <label><span style={labelStyle}>Email *</span><input style={inputStyle} name="email" required type="email" maxLength={254} autoComplete="email" /></label>
      <label><span style={labelStyle}>Phone</span><input style={inputStyle} name="phone" type="tel" maxLength={40} autoComplete="tel" /></label>
      <label><span style={labelStyle}>City</span><input style={inputStyle} name="city" maxLength={120} autoComplete="address-level2" /></label>
      {(intent==="sponsorship"||intent==="partners"||intent==="media")&&<label><span style={labelStyle}>Company / Organization</span><input style={inputStyle} name="company" maxLength={160} autoComplete="organization" /></label>}
    </div>
    <label><span style={labelStyle}>Tell Us What You Need</span><textarea style={{...inputStyle,minHeight:130,resize:"vertical"}} name="message" maxLength={3000} placeholder={event?`Interest in ${event.replaceAll("-"," ")}`:"Add any details that help us route your request."}/></label>
    <button disabled={status==="sending"} type="submit" style={{border:0,borderRadius:999,padding:"16px 22px",fontWeight:900,letterSpacing:".12em",textTransform:"uppercase",cursor:status==="sending"?"wait":"pointer",background:"#d8b464",color:"#050403"}}>{status==="sending"?"Submitting…":`Submit ${title}`}</button>
    {status==="error"&&<div role="alert" style={{fontSize:12,color:"#ff9c9c"}}>{error}</div>}
    <div style={{fontSize:10,lineHeight:1.6,color:"rgba(255,255,255,.45)"}}>By submitting, you agree that ICONIC LIVE / The Kollective may contact you about this request and related event access.</div>
  </form>;
}
