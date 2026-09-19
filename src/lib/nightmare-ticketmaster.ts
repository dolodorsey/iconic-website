export const NIGHTMARE_TICKETMASTER = {
  eventId: "0D006514C6E3B429",
  eventUrl: "https://www.ticketmaster.com/nightmare-on-channelside-tampa-10-31-2026/event/0D006514C6E3B429",
  discoveryBase: "https://app.ticketmaster.com/discovery/v2",
  partnerBase: "https://app.ticketmaster.com/partners/v1",
} as const;

export class TicketmasterConfigError extends Error {}

export function getTicketmasterConsumerKey() {
  const key=process.env.TICKETMASTER_CONSUMER_KEY?.trim();
  if(!key) throw new TicketmasterConfigError("TICKETMASTER_CONSUMER_KEY is not configured.");
  return key;
}

export function getTicketmasterPartnerKey() {
  const key=process.env.TICKETMASTER_PARTNER_API_KEY?.trim();
  if(!key) throw new TicketmasterConfigError("TICKETMASTER_PARTNER_API_KEY is not configured.");
  return key;
}

export async function fetchNightmareDiscoveryEvent(){
  const key=getTicketmasterConsumerKey();
  const url=new URL(`${NIGHTMARE_TICKETMASTER.discoveryBase}/events/${NIGHTMARE_TICKETMASTER.eventId}.json`);
  url.searchParams.set("apikey",key);
  const response=await fetch(url,{cache:"no-store"});
  if(!response.ok) throw new Error(`Ticketmaster Discovery event request failed: ${response.status}`);
  return response.json();
}

export async function fetchPartnerOrder(params:{orderToken?:string;cartId?:string}){
  const key=getTicketmasterPartnerKey();
  if(!params.orderToken&&!params.cartId) throw new Error("orderToken or cartId is required.");
  const url=new URL(`${NIGHTMARE_TICKETMASTER.partnerBase}/orders`);
  url.searchParams.set("apikey",key);
  if(params.orderToken) url.searchParams.set("order_token",params.orderToken);
  if(params.cartId){
    url.searchParams.set("cart_id",params.cartId);
    url.searchParams.set("event_id",NIGHTMARE_TICKETMASTER.eventId);
  }
  const response=await fetch(url,{cache:"no-store"});
  if(!response.ok) throw new Error(`Ticketmaster Partner order request failed: ${response.status}`);
  return response.json();
}
