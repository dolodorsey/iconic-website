"use client";

import { FormEvent, useState } from "react";
import type { PartnerRole, PartnerField } from "@/lib/noc-partner-roles";
import s from "./form.module.css";

const cities=["Tampa","Orlando","Atlanta","Miami / South Florida","Washington DC","Jacksonville","Tallahassee","Gainesville","South Georgia","Lakeland / Sarasota / Fort Myers","Charlotte / Nashville / Alabama","Other Target Market"];

export default function PartnerRoleForm({role}:{role:PartnerRole}){
  const [state,setState]=useState<"idle"|"sending"|"done"|"error">("idle");
  const [error,setError]=useState("");

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setState("sending"); setError("");
    const form=new FormData(event.currentTarget);
    const role_profile:Record<string,string|boolean>={};

    for(const field of role.fields){
      const raw=form.get(field.id);
      role_profile[field.id]=field.type==="checkbox" ? raw==="yes" : String(raw||"").trim();
    }

    const params=new URLSearchParams(window.location.search);
    const payload={
      full_name:String(form.get("full_name")||"").trim(),
      display_name:String(form.get("display_name")||"").trim(),
      email:String(form.get("email")||"").trim(),
      phone:String(form.get("phone")||"").trim(),
      instagram:String(form.get("instagram")||"").trim(),
      tiktok:String(form.get("tiktok")||"").trim(),
      city:String(form.get("city")||"").trim(),
      requested_role:role.requestedRole,
      availability:String(form.get("availability")||"").trim(),
      notes:String(form.get("notes")||"").trim(),
      referral_source:String(form.get("referral_source")||"").trim(),
      consent_to_contact:form.get("consent_to_contact")==="yes",
      future_opportunities_interest:form.get("future_opportunities_interest")==="yes",
      application_url:window.location.href,
      role_profile,
      utm_source:params.get("utm_source")||"",
      utm_medium:params.get("utm_medium")||"",
      utm_campaign:params.get("utm_campaign")||"noc_personnel_recruitment",
      utm_content:params.get("utm_content")||role.slug,
    };

    const response=await fetch("/api/noc-partner-apply",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});
    const data=await response.json().catch(()=>({}));
    if(!response.ok){
      setError(data.error||"We could not save your application. Please review the form and try again.");
      setState("error");
      return;
    }
    setState("done");
    window.scrollTo({top:0,behavior:"smooth"});
  }

  if(state==="done"){
    return <section className={s.success}>
      <span>APPLICATION RECEIVED</span>
      <h2>You are in the correct pipeline.</h2>
      <p>Partner Ops will review this application for the <strong>{role.title}</strong> lane. If approved, the next step is your role packet, compensation terms, tracking code/link, assets and campaign schedule.</p>
      <div className={s.successGrid}>
        <div><b>01</b><span>Review</span></div><div><b>02</b><span>Terms</span></div><div><b>03</b><span>Activation</span></div><div><b>04</b><span>Execution</span></div>
      </div>
      <a href="/partners" className={s.doneLink}>Back to ICONIC LIVE Partners →</a>
    </section>;
  }

  return <form className={s.form} onSubmit={submit}>
    <div className={s.formHead}>
      <div><span className={s.stepLabel}>STEP 01</span><h2>Who are you?</h2></div>
      <p>Use real operational contact information. This becomes the starting record for your campaign packet if approved.</p>
    </div>
    <div className={s.grid}>
      <Field label="LEGAL NAME *"><input required name="full_name" autoComplete="name" placeholder="Full legal name"/></Field>
      <Field label="DISPLAY / PUBLIC NAME"><input name="display_name" placeholder="Public name, show, outlet or company"/></Field>
      <Field label="EMAIL *"><input required type="email" name="email" autoComplete="email" placeholder="name@email.com"/></Field>
      <Field label="MOBILE *"><input required name="phone" autoComplete="tel" placeholder="Best campaign contact number"/></Field>
      <Field label="INSTAGRAM"><input name="instagram" placeholder="@handle"/></Field>
      <Field label="TIKTOK"><input name="tiktok" placeholder="@handle"/></Field>
      <Field label="PRIMARY MARKET *"><select required name="city" defaultValue=""><option value="" disabled>Select your market</option>{cities.map(city=><option key={city}>{city}</option>)}</select></Field>
      <Field label="REFERRAL / WHO CONNECTED YOU"><input name="referral_source" placeholder="Name, team, promoter, DJ, host, partner, etc."/></Field>
    </div>

    <div className={s.divider}/>
    <div className={s.formHead}>
      <div><span className={s.stepLabel}>STEP 02</span><h2>Show us your lane.</h2></div>
      <p>These questions are specific to <strong>{role.title}</strong>. We use them to review fit and route you into the correct operating pipeline.</p>
    </div>
    <div className={s.roleFields}>{role.fields.map(field=><RoleField key={field.id} field={field}/>)}</div>

    <div className={s.divider}/>
    <div className={s.formHead}>
      <div><span className={s.stepLabel}>STEP 03</span><h2>Availability + future interest.</h2></div>
      <p>Good execution can create a path into future ICONIC LIVE cities. Tell us what you can realistically commit to.</p>
    </div>
    <Field label="CAMPAIGN AVAILABILITY *"><textarea required name="availability" rows={4} placeholder="Availability between now and October 31, travel ability, event-day availability, final-week schedule, shift availability or performance schedule."/></Field>
    <Field label="ANYTHING PARTNER OPS SHOULD KNOW"><textarea name="notes" rows={4} placeholder="Existing commitments, team support, travel notes, special circumstances or other useful context."/></Field>

    <label className={s.check}>
      <input type="checkbox" name="future_opportunities_interest" value="yes" defaultChecked/>
      <span><strong>Keep me in the ICONIC LIVE network.</strong>I want to be considered for future cities, tours and relevant live-event opportunities if I execute this campaign well.</span>
    </label>
    <label className={s.check}>
      <input required type="checkbox" name="consent_to_contact" value="yes"/>
      <span><strong>Operational contact consent.</strong>I authorize ICONIC LIVE / campaign operations to contact me about this application, onboarding, campaign duties, scheduling, codes, credentials, proof requirements and payments.</span>
    </label>

    {state==="error"&&<div className={s.error}>{error}</div>}
    <button className={s.submit} disabled={state==="sending"}>{state==="sending"?"SUBMITTING APPLICATION…":`SUBMIT ${role.title.toUpperCase()} APPLICATION →`}</button>
    <p className={s.legal}>Submitting an application does not create a booking, employment relationship, guaranteed payment, ticket allocation, credential, stage appearance or future opportunity. If approved, your signed role-specific agreement and compensation sheet control your actual assignment.</p>
  </form>;
}

function Field({label,children}:{label:string;children:React.ReactNode}){
  return <label className={s.field}><span>{label}</span>{children}</label>;
}

function RoleField({field}:{field:PartnerField}){
  const common={name:field.id,required:field.required} as const;
  return <Field label={`${field.label}${field.required?" *":""}`}>
    {field.type==="textarea"?<textarea {...common} rows={4} placeholder={field.placeholder}/>:
     field.type==="select"?<select {...common} defaultValue=""><option value="" disabled>Select one</option>{field.options?.map(option=><option key={option}>{option}</option>)}</select>:
     field.type==="checkbox"?<label className={s.inlineCheck}><input {...common} type="checkbox" value="yes"/><span>{field.help||field.placeholder}</span></label>:
     <input {...common} type={field.type==="number"?"number":field.type==="url"?"url":"text"} placeholder={field.placeholder}/>}
    {field.help&&field.type!=="checkbox"&&<small>{field.help}</small>}
  </Field>;
}
