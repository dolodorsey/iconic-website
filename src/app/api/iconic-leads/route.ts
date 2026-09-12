import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL="https://woqlhjodiedyqfvzweoe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="sb_publishable_7nX1-2PnfT2LHuPcBBmNHA_88Pujrx6";
const intents=new Set(["presale","vip","travel","merch","partners","sponsorship","media","creator","music","booking","contact"]);

function clean(value:unknown,max:number){
  if(typeof value!=="string") return null;
  const v=value.trim();
  return v?v.slice(0,max):null;
}

export async function POST(req:NextRequest){
  try{
    const origin=req.headers.get("origin");
    const host=req.headers.get("host");
    if(origin&&host){
      const originHost=new URL(origin).host;
      if(originHost!==host) return NextResponse.json({error:"Invalid origin"},{status:403});
    }

    const body=await req.json();
    if(body.website) return NextResponse.json({ok:true});
    const intent=typeof body.intent==="string"?body.intent:"";
    const full_name=clean(body.full_name,120);
    const email=clean(body.email,254)?.toLowerCase()||null;
    if(!intents.has(intent)||!full_name||!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({error:"Please provide a valid name and email."},{status:400});

    const record={
      intent,
      event_slug:clean(body.event_slug,120),
      full_name,
      email,
      phone:clean(body.phone,40),
      company:clean(body.company,160),
      city:clean(body.city,120),
      message:clean(body.message,3000),
      source:"iconic-website-ten.vercel.app",
      page_path:clean(body.page_path,500),
      utm_source:clean(body.utm_source,160),
      utm_medium:clean(body.utm_medium,160),
      utm_campaign:clean(body.utm_campaign,160),
    };

    const result=await fetch(`${SUPABASE_URL}/rest/v1/iconic_live_leads`,{
      method:"POST",
      headers:{
        apikey:SUPABASE_PUBLISHABLE_KEY,
        "Content-Type":"application/json",
        Prefer:"return=minimal",
      },
      body:JSON.stringify(record),
      cache:"no-store",
    });
    if(!result.ok){
      console.error("ICONIC lead insert failed",result.status,await result.text());
      return NextResponse.json({error:"We could not save your request. Please try again."},{status:502});
    }
    return NextResponse.json({ok:true},{status:201});
  }catch(error){
    console.error("ICONIC lead route error",error);
    return NextResponse.json({error:"We could not save your request. Please try again."},{status:500});
  }
}
