"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

const labels: Record<string,string> = {
  presale:"Tickets + Presale", vip:"VIP + Hospitality", travel:"City Weekend", merch:"Merch Vault", partners:"Partners", sponsorship:"Sponsorship", media:"Media + Archive", creator:"Creator Submission", music:"ICONIC MUSIC Submission", booking:"Book ICONIC", contact:"Contact ICONIC",
};

export default function AccessForm({intent,event}:{intent:string;event?:string}){
  const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
  const [error,setError]=useState("");
  const title=useMemo(()=>labels[intent]||"ICONIC Access",[intent]);

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    // Capture the DOM element before awaiting: React currentTarget is not retained.
    const formElement=e.currentTarget;
    setStatus("sending");
    setError("");
    const form=new FormData(formElement);
    const params=new URLSearchParams(window.location.search);
    let sessionId=sessionStorage.getItem("noc_session_id");
    if(!sessionId){sessionId=crypto.randomUUID();sessionStorage.setItem("noc_session_id",sessionId);}
    const promoCode=(params.get("code")||localStorage.getItem("noc_promo_code")||"").toUpperCase().replace(/[^A-Z0-9-]/g,"").slice(0,40);
    if(promoCode) localStorage.setItem("noc_promo_code",promoCode);
    const payload={
      intent,event_slug:event||null,
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
      utm_campaign:params.get("utm_campaign"),
      utm_content:params.get("utm_content"),
      promo_code:promoCode||null,
      session_id:sessionId,
      consent_source:"website_access_form",
    };
    try{
      const res=await fetch("/api/iconic-leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      if(!res.ok){const body=await res.json().catch(()=>({}));throw new Error(body.error||"Request failed");}
      fetch("/api/event-track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({eventKey:event==="tampa-halloween"?"nightmare_on_channelside_2026":event||"iconic-access",action:"lead_submit",label:intent,path:window.location.pathname+window.location.search,promoCode:promoCode||null,sessionId,utmSource:params.get("utm_source"),utmMedium:params.get("utm_medium"),utmCampaign:params.get("utm_campaign"),utmContent:params.get("utm_content"),city:String(form.get("city")||"")}),keepalive:true}).catch(()=>{});
      formElement.reset();
      setStatus("success");
    }catch(err){setStatus("error");setError(err instanceof Error?err.message:"Unable to submit right now.");}
  }
  const inputStyle={width:"100%",boxSizing:"border-box" as const,background:"rgba(255,255,255,.045)",border:"1px solid rgba(255,255,255,.14)",borderRadius:14,color:"#fff",padding:"15px 16px",fontSize:16};
  const labelStyle={display:"block",fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase" as const,color:"#d8b464",marginBottom:8};
  if(status==="success")return <div role="status" style={{padding:30,border:"1px solid rgba(216,180,100,.45)",borderRadius:22,background:"rgba(216,180,100,.08)"}}><div style={{fontSize:12,fontWeight:700,letterSpacing:".12em",color:"#d8b464",textTransform:"uppercase"}}>Request received</div><h3 style={{fontFamily:"Georgia,serif",fontSize:38,lineHeight:1,margin:"14px 0"}}>Thank you for reaching out.</h3><p style={{color:"rgba(255,255,255,.7)",lineHeight:1.7,margin:0}}>Your {title.toLowerCase()} request has been received. The ICONIC team will review your details and follow up.</p></div>;
  const showCompany=["sponsorship","partners","media","booking","contact"].includes(intent);
  const prompt=intent==="creator"?"Tell us your discipline, work, audience, links and what you want to build with ICONIC.":intent==="music"?"Tell us your artist/DJ role, sound, current releases or links, market and what support or booking you are seeking.":intent==="booking"?"Tell us the event type, market, preferred date/window, venue status, audience and what you want ICONIC to produce or program.":event?`Interest in ${event.replaceAll("-"," ")}`:"Add any details that help us route your request.";
  return <form onSubmit={submit} aria-busy={status==="sending"} style={{display:"grid",gap:16,padding:24,border:"1px solid rgba(255,255,255,.12)",borderRadius:24,background:"rgba(255,255,255,.025)"}}>
    <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:"absolute",left:"-9999px",opacity:0}}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(220px,100%),1fr))",gap:14}}>
      <label><span style={labelStyle}>Full Name *</span><input style={inputStyle} name="full_name" required minLength={2} maxLength={120} autoComplete="name"/></label>
      <label><span style={labelStyle}>Email *</span><input style={inputStyle} name="email" required type="email" maxLength={254} autoComplete="email"/></label>
      <label><span style={labelStyle}>Phone</span><input style={inputStyle} name="phone" type="tel" maxLength={40} autoComplete="tel"/></label>
      <label><span style={labelStyle}>City / Market</span><input style={inputStyle} name="city" maxLength={120} autoComplete="address-level2"/></label>
      {showCompany&&<label><span style={labelStyle}>Company / Organization</span><input style={inputStyle} name="company" maxLength={160} autoComplete="organization"/></label>}
    </div>
    <label><span style={labelStyle}>Tell Us What You Need</span><textarea style={{...inputStyle,minHeight:150,resize:"vertical"}} name="message" maxLength={3000} placeholder={prompt}/></label>
    <button disabled={status==="sending"} type="submit" style={{border:0,borderRadius:999,padding:"16px 22px",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",cursor:status==="sending"?"wait":"pointer",background:"#d8b464",color:"#050403"}}>{status==="sending"?"Submitting…":`Submit ${title}`}</button>
    {status==="error"&&<div role="alert" style={{fontSize:14,color:"#ff9c9c"}}>{error}</div>}
    <div style={{fontSize:12,lineHeight:1.6,color:"rgba(255,255,255,.65)"}}>By submitting, you agree that ICONIC LIVE / The Kollective may contact you about this request. See our <Link href="/privacy" style={{color:"#d8b464"}}>Privacy Policy</Link> and <Link href="/terms" style={{color:"#d8b464"}}>Terms of Use</Link>.</div>
  </form>;
}
