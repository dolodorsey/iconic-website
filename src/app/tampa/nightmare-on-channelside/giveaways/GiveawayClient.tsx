"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./giveaway.module.css";

const EDGE="https://wfkohcwxxsrhcxhepfql.supabase.co/functions/v1/noc-giveaway-entry";

type StatusPayload={
  ok?:boolean;
  entry_open?:boolean;
  program_name?:string;
  status?:string;
  starts_at?:string;
  ends_at?:string;
  minimum_age?:number;
  no_purchase_required?:boolean;
  rules_version?:string;
  public_copy?:{headline?:string;subhead?:string;no_purchase?:string};
};

function channelFromSource(src:string|null){
  if(src==="text") return "text_nightmare";
  if(src==="call") return "call_in";
  if(src==="partner") return "radio_podcast";
  return "instagram_comment_dm";
}

function formatDate(value?:string){
  if(!value) return "Pending compliance approval";
  return new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",month:"long",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",timeZoneName:"short"}).format(new Date(value));
}

export default function GiveawayClient(){
  const params=useMemo(()=>typeof window!=="undefined"?new URLSearchParams(window.location.search):new URLSearchParams(),[]);
  const [status,setStatus]=useState<StatusPayload|null>(null);
  const [state,setState]=useState<"idle"|"sending"|"done"|"duplicate"|"error">("idle");
  const [message,setMessage]=useState("");

  useEffect(()=>{
    let live=true;
    fetch(EDGE,{cache:"no-store"})
      .then(r=>r.json())
      .then(data=>{if(live)setStatus(data)})
      .catch(()=>{if(live)setStatus({entry_open:false,status:"unavailable"})});
    return()=>{live=false};
  },[]);

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!status?.entry_open){setState("error");setMessage("Official entries are not open yet.");return}
    setState("sending");setMessage("");
    const fd=new FormData(e.currentTarget);
    const body={
      first_name:String(fd.get("first_name")||""),
      last_name:String(fd.get("last_name")||""),
      email:String(fd.get("email")||""),
      phone:String(fd.get("phone")||""),
      postal_code:String(fd.get("postal_code")||""),
      website:String(fd.get("website")||""),
      age_confirmed:fd.get("age_confirmed")==="yes",
      sweepstakes_consent:fd.get("sweepstakes_consent")==="yes",
      sms_marketing_opt_in:fd.get("sms_marketing_opt_in")==="yes",
      email_marketing_opt_in:fd.get("email_marketing_opt_in")==="yes",
      channel_key:channelFromSource(params.get("src")),
      rules_version:status.rules_version||"",
      source_partner:params.get("partner")||"",
      source_content:params.get("content")||window.location.pathname,
    };
    try{
      const res=await fetch(EDGE,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});
      const data=await res.json().catch(()=>({}));
      if(!res.ok){setState("error");setMessage(data.error||"We could not record your entry.");return}
      setState(data.duplicate?"duplicate":"done");
      setMessage(data.message||"Entry received.");
    }catch{
      setState("error");setMessage("We could not connect. Please try again.");
    }
  }

  if(!status) return <div className={styles.statusCard}><span className={styles.pulse}/>CHECKING OFFICIAL ENTRY STATUS…</div>;

  if(!status.entry_open) return <section className={styles.locked}>
    <div className={styles.lockedGlow}/>
    <div className={styles.kicker}>OFFICIAL GIVEAWAY CONTROL</div>
    <h2>THE DOOR IS<br/>NOT OPEN YET.</h2>
    <p>The giveaway system is built, but entries remain locked until the Official Rules, prize values, required Florida filing/security, inventory approvals and end-to-end QA are complete.</p>
    <div className={styles.lockGrid}>
      <div><span>EARLIEST PLANNED OPEN</span><strong>{formatDate(status.starts_at)}</strong></div>
      <div><span>STATUS</span><strong>{String(status.status||"GATED").replaceAll("_"," ").toUpperCase()}</strong></div>
      <div><span>ENTRY LIMIT</span><strong>1 OFFICIAL ENTRY / PERSON / DAY</strong></div>
    </div>
    <div className={styles.lockFooter}>NO PURCHASE NECESSARY · A PURCHASE WILL NOT INCREASE YOUR CHANCES OF WINNING · WATCH @THEICONICLIVE FOR THE OFFICIAL OPENING.</div>
  </section>;

  if(state==="done"||state==="duplicate") return <section className={styles.success}>
    <div className={styles.kicker}>{state==="duplicate"?"TODAY'S ENTRY ALREADY LOCKED":"ENTRY RECEIVED"}</div>
    <h2>{state==="duplicate"?"YOU'RE ALREADY IN.":"YOU'RE IN THE NIGHTMARE."}</h2>
    <p>{message}</p>
    <p className={styles.small}>One official entry per person per day across the main sweepstakes. Additional channels do not create extra odds.</p>
    <Link href="/tampa/nightmare-on-channelside/tickets" className={styles.secondaryButton}>EXPLORE TICKETS — PURCHASE NOT REQUIRED</Link>
  </section>;

  return <form onSubmit={submit} className={styles.form}>
    <div className={styles.formHead}>
      <div className={styles.kicker}>OFFICIAL ENTRY · {status.rules_version}</div>
      <h2>ENTER THE<br/>NIGHTMARE.</h2>
      <p>Free entry. One official entry per person per day. Complete the form below; your source is tracked for campaign attribution, not extra chances.</p>
    </div>
    <input name="website" tabIndex={-1} autoComplete="off" className={styles.honeypot} aria-hidden="true"/>
    <div className={styles.fieldGrid}>
      <label>FIRST NAME *<input required name="first_name" autoComplete="given-name"/></label>
      <label>LAST NAME *<input required name="last_name" autoComplete="family-name"/></label>
      <label>EMAIL *<input required type="email" name="email" autoComplete="email"/></label>
      <label>MOBILE *<input required name="phone" inputMode="tel" autoComplete="tel"/></label>
      <label>ZIP / POSTAL CODE *<input required name="postal_code" autoComplete="postal-code"/></label>
      <div className={styles.sourceReadout}><span>ENTRY SOURCE</span><strong>{channelFromSource(params.get("src")).replaceAll("_"," ").toUpperCase()}</strong></div>
    </div>

    <label className={styles.check}><input required type="checkbox" name="age_confirmed" value="yes"/><span>I confirm I meet the minimum age requirement stated in the Official Rules.</span></label>
    <label className={styles.check}><input required type="checkbox" name="sweepstakes_consent" value="yes"/><span>I have read and agree to the <Link href="/tampa/nightmare-on-channelside/giveaways/official-rules">Official Rules</Link> and want to submit a free sweepstakes entry.</span></label>

    <div className={styles.optional}>
      <div className={styles.optionalTitle}>OPTIONAL MARKETING — NOT REQUIRED TO ENTER</div>
      <label className={styles.check}><input type="checkbox" name="sms_marketing_opt_in" value="yes"/><span>Send me ICONIC LIVE event and ticket updates by text. Message/data rates may apply. Reply STOP to opt out.</span></label>
      <label className={styles.check}><input type="checkbox" name="email_marketing_opt_in" value="yes"/><span>Send me ICONIC LIVE event and offer updates by email.</span></label>
    </div>

    {state==="error"&&<div className={styles.error}>{message}</div>}
    <button className={styles.submit} disabled={state==="sending"}>{state==="sending"?"LOCKING ENTRY…":"SUBMIT FREE ENTRY →"}</button>
    <p className={styles.legal}>NO PURCHASE NECESSARY. A PURCHASE WILL NOT INCREASE YOUR CHANCES OF WINNING. VOID WHERE PROHIBITED. Subject to the Official Rules. Ticket purchase is separate from entry.</p>
  </form>;
}
