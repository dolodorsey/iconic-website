import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL="https://woqlhjodiedyqfvzweoe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="sb_publishable_7nX1-2PnfT2LHuPcBBmNHA_88Pujrx6";
const roles=new Set(["promoter_commission","promoter_comp","ambassador_model","podcast_partner","dj_promo","host_promo","dj_performance","host_performance","street_team"]);

function clean(value:unknown,max:number){
  if(typeof value!=="string") return null;
  const v=value.trim();
  return v?v.slice(0,max):null;
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
    const city=clean(body.city,120);
    const requested_role=clean(body.requested_role,64);
    const consent_to_contact=body.consent_to_contact===true;

    if(!full_name||!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!city||!requested_role||!roles.has(requested_role)||!consent_to_contact){
      return NextResponse.json({error:"Complete the required name, email, city, role and contact-consent fields."},{status:400});
    }

    const payload={
      full_name,
      display_name:clean(body.display_name,160),
      email,
      phone:clean(body.phone,40),
      instagram:clean(body.instagram,160),
      tiktok:clean(body.tiktok,160),
      city,
      requested_role,
      availability:clean(body.availability,500),
      notes:clean(body.notes,2000),
      referral_source:clean(body.referral_source,160),
      source_url:clean(body.source_url,500),
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
      return NextResponse.json({error:"We could not save your intake. Please try again."},{status:502});
    }

    return NextResponse.json({ok:true},{status:201,headers:{"cache-control":"no-store"}});
  }catch(error){
    console.error("NOC partner intake route error",error);
    return NextResponse.json({error:"We could not save your intake. Please try again."},{status:500});
  }
}
