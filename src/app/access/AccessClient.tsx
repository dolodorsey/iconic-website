"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, C, Section, Shell } from "@/app/_components/IconicPage";

const SUPABASE_URL = "https://woqlhjodiedyqfvzweoe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_7nX1-2PnfT2LHuPcBBmNHA_88Pujrx6";

const intents = {
  presale: { eyebrow:"Tickets + Presale", title:"GET IN BEFORE THE RUSH.", body:"Join the access path for ticket releases, presale windows and on-sale alerts." },
  vip: { eyebrow:"VIP + Hospitality", title:"UPGRADE THE ENTIRE NIGHT.", body:"Request premium seating, hosted tables, suites, hospitality and elevated arrival options." },
  travel: { eyebrow:"City Weekend", title:"BUILD THE WHOLE WEEKEND.", body:"Request travel, hotel, arrival and city-weekend coordination around an ICONIC event." },
  merch: { eyebrow:"Merch Vault", title:"TAKE THE SHOW WITH YOU.", body:"Get release information, event drops and limited product access." },
  partners: { eyebrow:"Partners", title:"BUILD THE NEXT ICONIC MOMENT.", body:"For venues, talent partners, strategic collaborators and commercial relationships." },
  sponsorship: { eyebrow:"Sponsorship", title:"OWN A REAL PART OF THE EXPERIENCE.", body:"Request sponsorship inventory, integrations, hospitality and custom activation opportunities." },
  media: { eyebrow:"Media + Content", title:"KEEP THE MOMENT MOVING.", body:"For media, aftermovie, archive, content licensing and post-event asset requests." },
} as const;

type IntentKey = keyof typeof intents;

const properties: Record<string,string> = {
  "iconic-live":"ICONIC LIVE",
  "tampa-halloween":"Nightmare on Channelside — Tampa Halloween",
  "summer-walker":"Summer Walker — Soul Symphony",
  "dj-snake-pardon-my-french":"DJ Snake — Pardon My French",
  "tampa-merch":"Tampa Halloween Merch",
};

const inputStyle = {
  width:"100%",
  boxSizing:"border-box" as const,
  border:`1px solid ${C.faint}`,
  background:"rgba(255,255,255,.035)",
  color:C.white,
  borderRadius:16,
  padding:"15px 16px",
  fontSize:14,
  outline:"none",
};

export default function AccessClient(){
  const params = useSearchParams();
  const rawIntent = params.get("intent") || "presale";
  const intent:IntentKey = rawIntent in intents ? rawIntent as IntentKey : "presale";
  const propertyKey = params.get("property") || "iconic-live";
  const propertyName = properties[propertyKey] || propertyKey.replaceAll("-"," ").replace(/\b\w/g,(c)=>c.toUpperCase());
  const current = intents[intent];
  const [state,setState] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [error,setError] = useState("");
  const showBusiness = intent === "sponsorship" || intent === "partners" || intent === "media";

  const heading = useMemo(()=> propertyKey === "iconic-live" ? current.title : `${current.title} ${propertyName.toUpperCase()}`,[current.title,propertyKey,propertyName]);

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setError("");
    setState("sending");
    const form = new FormData(event.currentTarget);
    if(String(form.get("website") || "").trim()) { setState("success"); return; }

    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const city = String(form.get("city") || "").trim();
    const company = String(form.get("company") || "").trim();
    const role = String(form.get("role") || "").trim();
    const timeline = String(form.get("timeline") || "").trim();
    const note = String(form.get("message") || "").trim();
    const marketingConsent = form.get("marketing_consent") === "on";

    if(name.length < 2 || !email.includes("@")){
      setError("Add your name and a valid email so we know where to send access details.");
      setState("error");
      return;
    }

    const message = note || `${current.eyebrow} interest for ${propertyName}.`;
    const payload = {
      brand_key:"iconic-live",
      form_type:intent,
      name,
      email,
      phone:phone || null,
      city:city || null,
      company:company || null,
      role:role || null,
      message,
      source_url:window.location.href.slice(0,1000),
      user_agent:navigator.userAgent.slice(0,500),
      status:"new",
      intent,
      timeline:timeline || "Updates",
      property_key:propertyKey,
      marketing_consent:marketingConsent,
      metadata:{
        referrer:document.referrer.slice(0,1000),
        utm_source:params.get("utm_source"),
        utm_medium:params.get("utm_medium"),
        utm_campaign:params.get("utm_campaign"),
      },
    };

    try{
      const response = await fetch(`${SUPABASE_URL}/rest/v1/website_leads`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "apikey":SUPABASE_PUBLISHABLE_KEY,
          "Prefer":"return=minimal",
        },
        body:JSON.stringify(payload),
      });
      if(!response.ok) throw new Error(`Request failed (${response.status})`);
      event.currentTarget.reset();
      setState("success");
    }catch(err){
      setError("Your request did not save. Please try again in a moment.");
      setState("error");
      console.error("ICONIC access request failed",err);
    }
  }

  return <Shell>
    <section style={{position:"relative",zIndex:2,minHeight:"66vh",padding:"clamp(90px,12vw,160px) clamp(22px,6vw,90px) 64px",display:"flex",alignItems:"end",background:"radial-gradient(circle at 80% 20%,rgba(224,173,69,.18),transparent 28%),#050403"}}>
      <div style={{maxWidth:1180}}>
        <div style={{fontSize:9,fontWeight:900,letterSpacing:".28em",textTransform:"uppercase",color:C.gold2,marginBottom:18}}>{current.eyebrow} · {propertyName}</div>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(50px,8vw,112px)",lineHeight:.86,letterSpacing:"-.05em",margin:0,maxWidth:1120}}>{heading}</h1>
        <p style={{maxWidth:760,fontSize:"clamp(14px,1.4vw,18px)",lineHeight:1.75,color:C.muted,margin:"28px 0 0"}}>{current.body} Your request now goes directly into the ICONIC LIVE intake system instead of opening an email draft.</p>
      </div>
    </section>

    <Section eyebrow="Direct Intake" title="Tell us what you need. We route the opportunity correctly." dark>
      <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.25fr) minmax(280px,.75fr)",gap:18,alignItems:"start"}} className="access-grid">
        <form onSubmit={submit} className="glass" style={{padding:"clamp(24px,4vw,42px)",borderRadius:26}}>
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:"absolute",left:"-9999px",opacity:0}} />
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:14}} className="access-fields">
            <label style={{fontSize:10,fontWeight:900,letterSpacing:".12em",textTransform:"uppercase",color:C.muted}}>Name<input name="name" required minLength={2} autoComplete="name" style={{...inputStyle,marginTop:8}} /></label>
            <label style={{fontSize:10,fontWeight:900,letterSpacing:".12em",textTransform:"uppercase",color:C.muted}}>Email<input name="email" required type="email" autoComplete="email" style={{...inputStyle,marginTop:8}} /></label>
            <label style={{fontSize:10,fontWeight:900,letterSpacing:".12em",textTransform:"uppercase",color:C.muted}}>Phone<input name="phone" autoComplete="tel" style={{...inputStyle,marginTop:8}} /></label>
            <label style={{fontSize:10,fontWeight:900,letterSpacing:".12em",textTransform:"uppercase",color:C.muted}}>City<input name="city" autoComplete="address-level2" style={{...inputStyle,marginTop:8}} /></label>
            {showBusiness && <label style={{fontSize:10,fontWeight:900,letterSpacing:".12em",textTransform:"uppercase",color:C.muted}}>Company<input name="company" autoComplete="organization" style={{...inputStyle,marginTop:8}} /></label>}
            {showBusiness && <label style={{fontSize:10,fontWeight:900,letterSpacing:".12em",textTransform:"uppercase",color:C.muted}}>Role / Title<input name="role" autoComplete="organization-title" style={{...inputStyle,marginTop:8}} /></label>}
            <label style={{fontSize:10,fontWeight:900,letterSpacing:".12em",textTransform:"uppercase",color:C.muted}}>Response Timing<select name="timeline" defaultValue="Updates" style={{...inputStyle,marginTop:8}}><option>ASAP</option><option>This week</option><option>Next 30 days</option><option>Updates</option></select></label>
          </div>
          <label style={{display:"block",fontSize:10,fontWeight:900,letterSpacing:".12em",textTransform:"uppercase",color:C.muted,marginTop:14}}>Details<textarea name="message" rows={6} placeholder={intent === "sponsorship" ? "Brand, market, activation goals, budget range or inventory you want to discuss." : "Anything we should know about your request?"} style={{...inputStyle,marginTop:8,resize:"vertical"}} /></label>
          <label style={{display:"flex",gap:10,alignItems:"flex-start",marginTop:16,color:C.muted,fontSize:12,lineHeight:1.5}}><input name="marketing_consent" type="checkbox" style={{marginTop:3}} /><span>Send me future ICONIC LIVE ticket, tour and merch announcements in addition to this request.</span></label>
          {error && <div style={{marginTop:18,color:"#ff9b8e",fontSize:12}}>{error}</div>}
          {state === "success" ? <div style={{marginTop:22,padding:18,border:`1px solid ${C.gold2}`,borderRadius:16,color:C.white,fontWeight:800}}>REQUEST RECEIVED. ICONIC LIVE now has your information.</div> : <button disabled={state === "sending"} type="submit" style={{marginTop:22,border:0,borderRadius:999,padding:"15px 22px",background:C.gold2,color:"#080604",fontSize:10,fontWeight:950,letterSpacing:".14em",textTransform:"uppercase",cursor:state === "sending"?"wait":"pointer",opacity:state === "sending"?.65:1}}>{state === "sending" ? "Saving Request…" : "Submit Request"}</button>}
        </form>

        <aside className="glass" style={{padding:28,borderRadius:24,position:"sticky",top:100}}>
          <div style={{fontSize:8,fontWeight:900,letterSpacing:".2em",color:C.gold2}}>CURRENT REQUEST</div>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:34,lineHeight:.98,margin:"18px 0 12px"}}>{current.eyebrow}</h2>
          <p style={{color:C.muted,fontSize:13,lineHeight:1.7}}>{propertyName}</p>
          <div style={{height:1,background:C.faint,margin:"24px 0"}} />
          <p style={{color:C.muted,fontSize:12,lineHeight:1.7}}>Your submission is tagged by property and request type so presale, VIP, sponsorship, media and merch inquiries do not get mixed together.</p>
          <div style={{marginTop:22}}><Button href="/" ghost>Back to ICONIC LIVE</Button></div>
        </aside>
      </div>
      <style jsx global>{`@media(max-width:860px){.access-grid{grid-template-columns:1fr!important}.access-fields{grid-template-columns:1fr!important}.access-grid aside{position:static!important}}`}</style>
    </Section>
  </Shell>;
}
