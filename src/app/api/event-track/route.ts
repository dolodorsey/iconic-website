import { NextRequest, NextResponse } from "next/server";

const clean=(value:unknown,max=80)=>typeof value==="string"?value.replace(/[^a-zA-Z0-9_\-/. ]/g,"").slice(0,max):"";

export async function POST(req:NextRequest){
  try{
    const body=await req.json();
    const event={
      type:"iconic_event",
      eventKey:clean(body?.eventKey,64),
      action:clean(body?.action,64),
      label:clean(body?.label,80),
      path:clean(body?.path,140),
      ts:new Date().toISOString(),
    };
    // Deliberately excludes names, emails, phone numbers, IP addresses and form notes.
    console.info("ICONIC_EVENT",JSON.stringify(event));
    return NextResponse.json({ok:true},{headers:{"cache-control":"no-store"}});
  }catch{
    return NextResponse.json({ok:false},{status:400,headers:{"cache-control":"no-store"}});
  }
}
