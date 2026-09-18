import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL="https://woqlhjodiedyqfvzweoe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="sb_publishable_7nX1-2PnfT2LHuPcBBmNHA_88Pujrx6";
const clean=(value:unknown,max=80)=>typeof value==="string"?value.replace(/[^a-zA-Z0-9_\-/. ?=&]/g,"").slice(0,max):"";

export async function POST(req:NextRequest){
  try{
    const origin=req.headers.get("origin");
    const host=req.headers.get("host");
    if(origin&&host){
      const originHost=new URL(origin).host;
      if(originHost!==host) return NextResponse.json({ok:false},{status:403});
    }

    const body=await req.json();
    const record={
      event_key:clean(body?.eventKey,64),
      action:clean(body?.action,64),
      label:clean(body?.label,160)||null,
      path:clean(body?.path,500)||null,
      source:"iconic-atl.com",
      promo_code:clean(body?.promoCode,40).toUpperCase()||null,
      utm_source:clean(body?.utmSource,80)||null,
      utm_medium:clean(body?.utmMedium,80)||null,
      utm_campaign:clean(body?.utmCampaign,120)||null,
      utm_content:clean(body?.utmContent,120)||null,
      city:clean(body?.city,80)||null,
      ticket_type:clean(body?.ticketType,80)||null,
      session_id:clean(body?.sessionId,64)||null,
    };
    if(!record.event_key||!record.action) return NextResponse.json({ok:false},{status:400,headers:{"cache-control":"no-store"}});

    // Privacy-minimized event telemetry only: no names, emails, phones, cookies or raw IP addresses.
    const result=await fetch(`${SUPABASE_URL}/rest/v1/iconic_live_events`,{
      method:"POST",
      headers:{apikey:SUPABASE_PUBLISHABLE_KEY,"Content-Type":"application/json",Prefer:"return=minimal"},
      body:JSON.stringify(record),
      cache:"no-store",
    });
    if(!result.ok){
      console.error("ICONIC event insert failed",result.status,await result.text());
      return NextResponse.json({ok:false},{status:502,headers:{"cache-control":"no-store"}});
    }
    return NextResponse.json({ok:true},{headers:{"cache-control":"no-store"}});
  }catch(error){
    console.error("ICONIC event route error",error);
    return NextResponse.json({ok:false},{status:400,headers:{"cache-control":"no-store"}});
  }
}
