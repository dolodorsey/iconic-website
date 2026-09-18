"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const EVENT_KEY="nightmare_on_channelside_2026";
const STORAGE_CODE="noc_promo_code";
const STORAGE_SESSION="noc_session_id";

function normalizeCode(value:string){
  return value.toUpperCase().replace(/[^A-Z0-9-]/g,"").slice(0,40);
}

export default function TicketFaceClient({ticketmasterUrl}:{ticketmasterUrl:string}){
  const [code,setCode]=useState("");
  const [applied,setApplied]=useState("");
  const [sessionId,setSessionId]=useState("");
  const [message,setMessage]=useState("");

  const params=useMemo(()=>typeof window!=="undefined"?new URLSearchParams(window.location.search):new URLSearchParams(),[]);

  const context=useMemo(()=>({
    utmSource:params.get("utm_source")||"",
    utmMedium:params.get("utm_medium")||"",
    utmCampaign:params.get("utm_campaign")||"",
    utmContent:params.get("utm_content")||"",
  }),[params]);

  const track=async(action:string,label?:string,ticketType?:string,promoOverride?:string)=>{
    try{
      const payload={
        eventKey:EVENT_KEY,
        action,
        label,
        path:window.location.pathname,
        promoCode:promoOverride ?? applied ?? code,
        sessionId,
        city:"Tampa",
        ticketType,
        ...context,
      };
      await fetch("/api/event-track",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload),keepalive:true});
    }catch{}
  };

  useEffect(()=>{
    const incoming=normalizeCode(params.get("code")||"");
    const saved=normalizeCode(localStorage.getItem(STORAGE_CODE)||"");
    const sid=sessionStorage.getItem(STORAGE_SESSION)||crypto.randomUUID();
    sessionStorage.setItem(STORAGE_SESSION,sid);
    setSessionId(sid);
    if(incoming||saved){
      const resolved=incoming||saved;
      setCode(resolved);
      setApplied(resolved);
      localStorage.setItem(STORAGE_CODE,resolved);
    }
    void fetch("/api/event-track",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({
      eventKey:EVENT_KEY,action:"ticket_face_view",label:"ticket-face",path:window.location.pathname,
      promoCode:incoming||saved||null,sessionId:sid,city:"Tampa",
      utmSource:params.get("utm_source")||"",utmMedium:params.get("utm_medium")||"",
      utmCampaign:params.get("utm_campaign")||"",utmContent:params.get("utm_content")||"",
    }),keepalive:true}).catch(()=>{});
  },[params]);

  const applyCode=async()=>{
    const normalized=normalizeCode(code);
    if(!normalized){setApplied("");localStorage.removeItem(STORAGE_CODE);setMessage("Tracking code cleared.");return;}
    setCode(normalized);
    setApplied(normalized);
    localStorage.setItem(STORAGE_CODE,normalized);
    setMessage(`Code ${normalized} applied for ICONIC LIVE attribution.`);
    await track("code_apply","ticket-face",undefined,normalized);
  };

  const continueToTicketmaster=async()=>{
    await track("ticketmaster_clickout","official-inventory","official-ticketmaster-inventory");
    window.location.assign(ticketmasterUrl);
  };

  return <main style={{minHeight:"100vh",background:"radial-gradient(circle at 16% 12%,rgba(179,0,0,.3),transparent 30%),linear-gradient(150deg,#050000,#0c0101 55%,#020202)",color:"#fff",fontFamily:"Arial,sans-serif"}}>
    <section style={{maxWidth:1240,margin:"0 auto",padding:"70px 22px 100px"}}>
      <div style={{fontSize:9,fontWeight:900,letterSpacing:".24em",textTransform:"uppercase",color:"#ff473d"}}>ICONIC LIVE · NIGHTMARE ON CHANNELSIDE · OCT 31, 2026</div>
      <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(54px,9vw,118px)",lineHeight:.82,letterSpacing:"-.055em",margin:"18px 0 22px"}}>CHOOSE THE NIGHT.<br/>TRACK THE SOURCE.</h1>
      <p style={{maxWidth:760,color:"rgba(255,255,255,.68)",fontSize:16,lineHeight:1.7}}>Benchmark International Arena · 401 Channelside Dr · Tampa · Doors 6 PM · Show 7 PM.</p>

      <section style={{marginTop:40,padding:"24px",border:"1px solid rgba(255,70,60,.24)",borderRadius:24,background:"rgba(255,255,255,.035)",display:"grid",gap:14}}>
        <div style={{fontSize:9,fontWeight:900,letterSpacing:".2em",textTransform:"uppercase",color:"#ff473d"}}>PROMO / TRACKING CODE</div>
        <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) auto",gap:10}}>
          <input value={code} onChange={e=>setCode(normalizeCode(e.target.value))} placeholder="EX: TPA-STREET" aria-label="Promo or tracking code" style={{minHeight:56,borderRadius:14,border:"1px solid rgba(255,255,255,.16)",background:"#0b0505",color:"#fff",padding:"0 16px",fontSize:16,fontWeight:800,letterSpacing:".08em"}}/>
          <button onClick={applyCode} style={{minHeight:56,border:0,borderRadius:14,padding:"0 22px",background:"#ff3b30",color:"#fff",fontWeight:900,letterSpacing:".12em",textTransform:"uppercase",cursor:"pointer"}}>Apply Code</button>
        </div>
        <p style={{margin:0,color:"rgba(255,255,255,.5)",fontSize:11,lineHeight:1.6}}>ICONIC LIVE captures this code before Ticketmaster so promoter, creator, city, QR and campaign attribution can be measured. A Ticketmaster presale/offer code, when applicable, is entered separately on Ticketmaster.</p>
        {message&&<div style={{fontSize:11,color:"#ff8b84",fontWeight:800}}>{message}</div>}
      </section>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14,marginTop:22}}>
        <article style={{minHeight:330,padding:28,border:"1px solid rgba(255,70,60,.24)",borderRadius:24,background:"linear-gradient(145deg,rgba(130,0,0,.18),rgba(8,3,3,.96))",display:"flex",flexDirection:"column"}}>
          <div style={{fontSize:9,fontWeight:900,letterSpacing:".2em",textTransform:"uppercase",color:"#ff473d"}}>OFFICIAL TICKET INVENTORY</div>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:40,lineHeight:.95,margin:"18px 0 12px"}}>Ticketmaster Seats + Prices</h2>
          <p style={{color:"rgba(255,255,255,.62)",fontSize:13,lineHeight:1.7}}>Current seating, live inventory and final Ticketmaster pricing load after you continue. Your ICONIC promo attribution stays captured before the handoff.</p>
          <button onClick={continueToTicketmaster} style={{marginTop:"auto",minHeight:54,border:0,borderRadius:999,background:"#ff3b30",color:"#fff",fontSize:10,fontWeight:900,letterSpacing:".16em",textTransform:"uppercase",cursor:"pointer"}}>Continue to Ticketmaster →</button>
        </article>

        <article style={{minHeight:330,padding:28,border:"1px solid rgba(255,255,255,.12)",borderRadius:24,background:"rgba(255,255,255,.035)",display:"flex",flexDirection:"column"}}>
          <div style={{fontSize:9,fontWeight:900,letterSpacing:".2em",textTransform:"uppercase",color:"#ff9d98"}}>VIP + HOSPITALITY</div>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:40,lineHeight:.95,margin:"18px 0 12px"}}>Premium / Couch / Booth</h2>
          <p style={{color:"rgba(255,255,255,.62)",fontSize:13,lineHeight:1.7}}>Premium seating, group hospitality and high-touch access remain a separate concierge lane so higher-value inquiries are not treated like GA checkout.</p>
          <Link href="/access?intent=vip&event=tampa-halloween" onClick={()=>void track("vip_inquiry","ticket-face-vip","vip")} style={{marginTop:"auto",minHeight:54,border:"1px solid rgba(255,255,255,.18)",borderRadius:999,color:"#fff",display:"grid",placeItems:"center",textDecoration:"none",fontSize:10,fontWeight:900,letterSpacing:".16em",textTransform:"uppercase"}}>Request VIP →</Link>
        </article>

        <article style={{minHeight:330,padding:28,border:"1px solid rgba(255,255,255,.12)",borderRadius:24,background:"rgba(255,255,255,.035)",display:"flex",flexDirection:"column"}}>
          <div style={{fontSize:9,fontWeight:900,letterSpacing:".2em",textTransform:"uppercase",color:"#ff9d98"}}>OFFICIAL MERCH</div>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:40,lineHeight:.95,margin:"18px 0 12px"}}>Wear The Nightmare</h2>
          <p style={{color:"rgba(255,255,255,.62)",fontSize:13,lineHeight:1.7}}>Official event, Tampa and artist collection merchandise is already connected to the Nightmare storefront.</p>
          <Link href="/tampa/nightmare-on-channelside/merch" onClick={()=>void track("merch_click","ticket-face-merch","merch")} style={{marginTop:"auto",minHeight:54,border:"1px solid rgba(255,255,255,.18)",borderRadius:999,color:"#fff",display:"grid",placeItems:"center",textDecoration:"none",fontSize:10,fontWeight:900,letterSpacing:".16em",textTransform:"uppercase"}}>Shop Merch →</Link>
        </article>
      </div>

      <div style={{marginTop:36,display:"flex",gap:16,flexWrap:"wrap",fontSize:10,color:"rgba(255,255,255,.48)"}}>
        <Link href="/tampa/nightmare-on-channelside" style={{color:"inherit"}}>← Event Home</Link>
        <span>Applied code: {applied||"NONE"}</span>
        <span>Attribution session: {sessionId?sessionId.slice(0,8):"…"}</span>
      </div>
    </section>
  </main>;
}
