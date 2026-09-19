import { NextResponse } from "next/server";
import { fetchNightmareDiscoveryEvent, NIGHTMARE_TICKETMASTER, TicketmasterConfigError } from "@/lib/nightmare-ticketmaster";

export const dynamic="force-dynamic";

export async function GET(){
  try{
    const event=await fetchNightmareDiscoveryEvent();
    return NextResponse.json({
      ok:true,
      eventId:NIGHTMARE_TICKETMASTER.eventId,
      eventUrl:NIGHTMARE_TICKETMASTER.eventUrl,
      event,
    },{headers:{"cache-control":"no-store"}});
  }catch(error){
    if(error instanceof TicketmasterConfigError){
      return NextResponse.json({
        ok:false,
        status:"awaiting_api_key",
        eventId:NIGHTMARE_TICKETMASTER.eventId,
        eventUrl:NIGHTMARE_TICKETMASTER.eventUrl,
      },{status:503,headers:{"cache-control":"no-store"}});
    }
    console.error("Nightmare Ticketmaster event sync error",error);
    return NextResponse.json({ok:false,status:"ticketmaster_unavailable"},{status:502,headers:{"cache-control":"no-store"}});
  }
}
