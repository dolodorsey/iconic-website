import { NextRequest, NextResponse } from "next/server";

function normalizeCode(value:string){
  return value.toUpperCase().replace(/[^A-Z0-9-]/g,"").slice(0,40);
}

export function GET(req:NextRequest,{params}:{params:Promise<{code:string}>}){
  return params.then(({code})=>{
    const promoCode=normalizeCode(code||"");
    const destination=new URL("/tampa/nightmare-on-channelside/tickets",req.url);
    if(promoCode) destination.searchParams.set("code",promoCode);

    for(const key of ["utm_source","utm_medium","utm_campaign","utm_content"]){
      const value=req.nextUrl.searchParams.get(key);
      if(value) destination.searchParams.set(key,value.slice(0,160));
    }

    if(!destination.searchParams.has("utm_source")) destination.searchParams.set("utm_source","ambassador");
    if(!destination.searchParams.has("utm_medium")) destination.searchParams.set("utm_medium","partner_link");
    if(!destination.searchParams.has("utm_campaign")) destination.searchParams.set("utm_campaign","nightmare_on_channelside_2026");

    return NextResponse.redirect(destination,{status:302});
  });
}
