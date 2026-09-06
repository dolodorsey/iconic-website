"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type EventAction = {
  key: string;
  eyebrow: string;
  title: string;
  body: string;
  href?: string;
  email?: string;
  subject?: string;
  cta?: string;
};

type Props = {
  eventKey: string;
  eventName: string;
  accent?: string;
  supportLine?: string;
  actions: EventAction[];
};

async function track(eventKey:string, action:string, label?:string){
  try{
    const payload = JSON.stringify({eventKey, action, label, path:window.location.pathname});
    if(navigator.sendBeacon){
      navigator.sendBeacon("/api/event-track", new Blob([payload], {type:"application/json"}));
      return;
    }
    await fetch("/api/event-track", {method:"POST",headers:{"content-type":"application/json"},body:payload,keepalive:true});
  }catch{}
}

export function EventTracker({eventKey}:{eventKey:string}){
  useEffect(()=>{ track(eventKey,"page_view"); },[eventKey]);
  return null;
}

export function EventActionCenter({eventKey,eventName,accent="#e0ad45",supportLine,actions}:Props){
  const [active,setActive]=useState<EventAction|null>(null);
  const [submitted,setSubmitted]=useState(false);
  const [copied,setCopied]=useState(false);

  const actionColor = useMemo(()=>({"--event-accent":accent} as React.CSSProperties),[accent]);

  const openAction=(item:EventAction)=>{
    track(eventKey,"cta_click",item.key);
    if(item.href){ window.location.href=item.href; return; }
    setSubmitted(false); setCopied(false); setActive(item); track(eventKey,"form_open",item.key);
  };

  const submit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!active) return;
    const data = new FormData(e.currentTarget);
    const name=String(data.get("name")||"");
    const email=String(data.get("email")||"");
    const phone=String(data.get("phone")||"");
    const city=String(data.get("city")||"");
    const notes=String(data.get("notes")||"");
    const subject=active.subject||`${eventName} — ${active.eyebrow}`;
    const body=[
      `${eventName} — ${active.eyebrow}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `City: ${city}`,
      "",
      "Request / Notes:",notes,
    ].join("\n");
    track(eventKey,"lead_intent_submit",active.key);
    setSubmitted(true);
    const target=active.email||"info@thekollectivehospitality.com";
    window.location.href=`mailto:${target}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const copyRequest=async()=>{
    if(!active) return;
    const el=document.getElementById("event-request-form") as HTMLFormElement|null;
    if(!el) return;
    const data=new FormData(el);
    const text=[`${eventName} — ${active.eyebrow}`,`Name: ${data.get("name")||""}`,`Email: ${data.get("email")||""}`,`Phone: ${data.get("phone")||""}`,`City: ${data.get("city")||""}`,`Notes: ${data.get("notes")||""}`].join("\n");
    try{await navigator.clipboard.writeText(text);setCopied(true);track(eventKey,"request_copy",active.key);}catch{}
  };

  return <>
    <div id="access" style={{...actionColor,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(245px,1fr))",gap:12}}>
      {actions.map((item)=><button key={item.key} onClick={()=>openAction(item)} style={{textAlign:"left",minHeight:260,padding:28,borderRadius:22,border:"1px solid color-mix(in srgb,var(--event-accent) 30%,transparent)",background:"linear-gradient(145deg,color-mix(in srgb,var(--event-accent) 9%,#090603),rgba(7,5,3,.96))",color:"#fffaf0",cursor:"pointer",boxShadow:"0 28px 70px rgba(0,0,0,.28)"}}>
        <div style={{fontSize:8,fontWeight:900,letterSpacing:".22em",textTransform:"uppercase",color:"var(--event-accent)"}}>{item.eyebrow}</div>
        <h3 style={{fontFamily:"Georgia,serif",fontSize:36,lineHeight:.95,margin:"18px 0 14px"}}>{item.title}</h3>
        <p style={{margin:0,color:"rgba(255,244,219,.67)",fontSize:12,lineHeight:1.7}}>{item.body}</p>
        <div style={{marginTop:26,fontSize:9,fontWeight:900,letterSpacing:".16em",textTransform:"uppercase",color:"var(--event-accent)"}}>{item.cta|| (item.href?"Open":"Start Request")} →</div>
      </button>)}
    </div>
    {supportLine&&<div style={{marginTop:18,fontSize:10,lineHeight:1.7,color:"rgba(255,244,219,.54)"}}>{supportLine}</div>}

    {active&&!active.href&&<div onMouseDown={(e)=>{if(e.currentTarget===e.target)setActive(null)}} style={{position:"fixed",inset:0,zIndex:1000,display:"grid",placeItems:"center",padding:18,background:"rgba(0,0,0,.78)",backdropFilter:"blur(18px)"}}>
      <div style={{...actionColor,width:"min(720px,100%)",maxHeight:"92vh",overflow:"auto",borderRadius:26,border:"1px solid color-mix(in srgb,var(--event-accent) 35%,transparent)",background:"linear-gradient(160deg,#120d07,#050403 62%)",boxShadow:"0 40px 120px rgba(0,0,0,.72)",padding:"clamp(24px,4vw,42px)"}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:20,alignItems:"start"}}><div><div style={{fontSize:8,fontWeight:900,letterSpacing:".24em",textTransform:"uppercase",color:"var(--event-accent)"}}>{active.eyebrow}</div><h3 style={{fontFamily:"Georgia,serif",fontSize:"clamp(38px,6vw,64px)",lineHeight:.88,margin:"14px 0 10px"}}>{active.title}</h3></div><button onClick={()=>setActive(null)} aria-label="Close" style={{border:"1px solid rgba(255,255,255,.16)",background:"transparent",color:"#fff",borderRadius:999,width:40,height:40,cursor:"pointer",fontSize:18}}>×</button></div>
        <p style={{color:"rgba(255,244,219,.67)",fontSize:13,lineHeight:1.7,maxWidth:580}}>{active.body}</p>
        <form id="event-request-form" onSubmit={submit} style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:12,marginTop:24}}>
          {[['name','Name'],['email','Email'],['phone','Phone'],['city','City']].map(([name,label])=><label key={name} style={{display:"grid",gap:7,fontSize:8,fontWeight:900,letterSpacing:".16em",textTransform:"uppercase",color:"rgba(255,244,219,.58)"}}>{label}<input required={name==='name'||name==='email'} name={name} type={name==='email'?'email':name==='phone'?'tel':'text'} style={{width:"100%",minHeight:48,borderRadius:12,border:"1px solid rgba(255,255,255,.12)",background:"rgba(255,255,255,.045)",color:"#fff",padding:"0 14px",fontSize:14,outline:"none"}}/></label>)}
          <label style={{gridColumn:"1/-1",display:"grid",gap:7,fontSize:8,fontWeight:900,letterSpacing:".16em",textTransform:"uppercase",color:"rgba(255,244,219,.58)"}}>Request / Notes<textarea name="notes" rows={4} style={{width:"100%",borderRadius:12,border:"1px solid rgba(255,255,255,.12)",background:"rgba(255,255,255,.045)",color:"#fff",padding:14,fontSize:14,outline:"none",resize:"vertical"}}/></label>
          <div style={{gridColumn:"1/-1",display:"flex",gap:10,flexWrap:"wrap",marginTop:6}}><button type="submit" style={{minHeight:48,border:0,borderRadius:999,padding:"0 22px",background:"var(--event-accent)",color:"#090603",fontSize:9,fontWeight:900,letterSpacing:".16em",textTransform:"uppercase",cursor:"pointer"}}>Prepare Request</button><button type="button" onClick={copyRequest} style={{minHeight:48,border:"1px solid rgba(255,255,255,.14)",borderRadius:999,padding:"0 22px",background:"transparent",color:"#fff",fontSize:9,fontWeight:900,letterSpacing:".16em",textTransform:"uppercase",cursor:"pointer"}}>{copied?"Copied":"Copy Details"}</button></div>
          {submitted&&<div style={{gridColumn:"1/-1",fontSize:11,lineHeight:1.6,color:"var(--event-accent)"}}>Your request is prepared in your email app. Send it to complete the request.</div>}
        </form>
      </div>
    </div>}
  </>;
}
