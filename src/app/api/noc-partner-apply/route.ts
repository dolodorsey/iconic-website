import { NextRequest, NextResponse } from "next/server";
import { PARTNER_REQUESTED_ROLE_MAP } from "@/lib/noc-partner-roles";

const SUPABASE_URL="https://woqlhjodiedyqfvzweoe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="sb_publishable_7nX1-2PnfT2LHuPcBBmNHA_88Pujrx6";

function clean(value:unknown,max:number){
  if(typeof value!=="string") return null;
  const v=value.trim();
  return v?v.slice(0,max):null;
}

function cleanProfile(roleKey:string, value:unknown){
  const role=PARTNER_REQUESTED_ROLE_MAP[roleKey];
  if(!role||!value||typeof value!=="object"||Array.isArray(value)) return {profile:{},missing:[] as string[]};
  const input=value as Record<string,unknown>;
  const profile:Record<string,string|boolean>={};
  const missing:string[]=[];
  for(const field of role.fields){
    const raw=input[field.id];
    if(field.type==="checkbox"){
      const bool=raw===true||raw==="true"||raw==="yes";
      profile[field.id]=bool;
      if(field.required&&!bool) missing.push(field.label);
      continue;
    }
    const normalized=clean(raw,field.type==="textarea"?2500:500);
    if(normalized) profile[field.id]=normalized;
    else if(field.required) missing.push(field.label);
  }
  return {profile,missing};
}

export async function POST(req:NextRequest){
  try{
    const origin=req.headers.get("origin");
    const host=req.headers.get("host");
    if(origin&&host&&new URL(origin).host!==host) return NextResponse.json({error:"Invalid origin"},{status:403});

    const body=await req.json();
    if(body.website) return NextResponse.json({ok:true},{status:201});

    const full_name=clean(body.full_name,120);
    const email=clean(body.email,254)?.toLowerCase()||null;
    const phone=clean(body.phone,40);
    const city=clean(body.city,120);
    const requested_role=clean(body.requested_role,64);
    const consent_to_contact=body.consent_to_contact===true;
    const role=requested_role?PARTNER_REQUESTED_ROLE_MAP[requested_role]:null;

    if(!full_name||!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!phone||!city||!requested_role||!role||!consent_to_contact){
      return NextResponse.json({error:"Complete the required name, email, mobile, city and contact-consent fields."},{status:400});
    }

    const {profile,missing}=cleanProfile(requested_role,body.role_profile);
    if(missing.length){
      return NextResponse.json({error:`Complete the required ${role.title} questions: ${missing.join(", ")}.`},{status:400});
    }

    const application_url=clean(body.application_url,700);
    const payload={
      full_name,
      display_name:clean(body.display_name,160),
      email,
      phone,
      instagram:clean(body.instagram,160),
      tiktok:clean(body.tiktok,160),
      city,
      requested_role,
      availability:clean(body.availability,1500),
      notes:clean(body.notes,2500),
      referral_source:clean(body.referral_source,160),
      source_url:application_url,
      application_url,
      application_version:"partners_v2_20260919",
      future_opportunities_interest:body.future_opportunities_interest!==false,
      role_profile:profile,
      utm_source:clean(body.utm_source,160),
      utm_medium:clean(body.utm_medium,160),
      utm_campaign:clean(body.utm_campaign,160),
      utm_content:clean(body.utm_content,160),
      consent_to_contact:true,
    };

    const result=await fetch(`${SUPABASE_URL}/rest/v1/noc_partner_applications`,{
      method:"POST",
      headers:{apikey:SUPABASE_PUBLISHABLE_KEY,"Content-Type":"application/json",Prefer:"return=minimal"},
      body:JSON.stringify(payload),
      cache:"no-store",
    });

    if(!result.ok){
      console.error("NOC partner intake failed",result.status,await result.text());
      return NextResponse.json({error:"We could not save your application. Please try again."},{status:502});
    }

    return NextResponse.json({ok:true,pipeline:role.pipelineKey},{status:201,headers:{"cache-control":"no-store"}});
  }catch(error){
    console.error("NOC partner intake route error",error);
    return NextResponse.json({error:"We could not save your application. Please try again."},{status:500});
  }
}
