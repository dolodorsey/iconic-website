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
      if(originHost!==host&&!originHost.endsWith(".vercel.app")) return NextResponse.json({ok:false},{status:403});
    }

    const body=await req.json();
    const record={
      event_key:clean(body?.eventKey,64),
      action:clean(body?.action,64),
      label:clean(body?.label,160)||null,
      path:clean(body?.path,500)||null,
      source:"iconic-atl.com",
    };
    if(!record.event_key||!record.action) return NextResponse.json({ok:false},{status:400,headers:{"cache-control":"no-store"}});

    // Deliberately excludes names, emails, phone numbers, form notes, cookies and raw IP addresses.
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
