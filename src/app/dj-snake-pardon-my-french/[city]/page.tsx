import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LivePropertyPage from "@/app/_components/LivePropertyPage";
import { DJ_SNAKE_AND_FRIENDS_LOGO, PARDON_MY_FRENCH_TOUR_LOGO } from "@/app/_components/tour-brand-assets";
import { getPmfCity, PMF_CITIES } from "../cities";

const HERO = "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-dj-snake-pardon-my-french.jpg?v=1789170586";

export function generateStaticParams(){
  return PMF_CITIES.map((market)=>({city:market.slug}));
}

export async function generateMetadata({params}:{params:Promise<{city:string}>}):Promise<Metadata>{
  const {city}=await params;
  const market=getPmfCity(city);
  if(!market) return {title:"DJ Snake — Pardon My French"};
  const title=`DJ Snake — Pardon My French — ${market.city}`;
  const description=`DJ Snake — Pardon My French at ${market.venue} in ${market.city}. Request city presale, VIP, merch and partnership access through ICONIC LIVE.`;
  return {
    title,
    description,
    openGraph:{title:`${title} | ICONIC LIVE`,description,type:"website",images:[{url:HERO}]},
  };
}

export default async function PmfCityPage({params}:{params:Promise<{city:string}>}){
  const {city}=await params;
  const market=getPmfCity(city);
  if(!market) notFound();
  const eventSlug=`dj-snake-pardon-my-french-${market.slug}`;
  return <LivePropertyPage
    eyebrow={`ICONIC LIVE · ${market.city.toUpperCase()}`}
    title={`${market.city.toUpperCase()}.`}
    brandMarks={[
      {src:DJ_SNAKE_AND_FRIENDS_LOGO,alt:"DJ Snake & Friends",maxWidth:280},
      {src:PARDON_MY_FRENCH_TOUR_LOGO,alt:"Pardon My French Tour",maxWidth:300},
    ]}
    sub={`DJ Snake & Friends brings Pardon My French to ${market.venue}. This one-night-only stadium chapter is built as a destination event with oversized production, premium hospitality, city-specific commerce and partner integrations. ${market.positioning}`}
    visual={HERO}
    visualPosition="center 18%"
    status={`${market.venue.toUpperCase()} · ONE NIGHT ONLY · CITY ACCESS OPEN`}
    accent="rgba(196,21,32,1)"
    stats={[
      {label:"Market",value:market.city,body:`The ${market.state} chapter of the five-city U.S. PMF stadium route.`},
      {label:"Venue",value:market.venue,body:"Stadium in the current Pardon My French U.S. route architecture."},
      {label:"Tour",value:"5 Cities · 5 Stadiums",body:"One market inside the larger Los Angeles, Las Vegas, Dallas, Tampa and New York system."},
      {label:"Access",value:"Presale + VIP + Partners",body:"Fan and commercial requests are captured directly and tagged to this city."},
    ]}
    pillars={[
      {label:"Stadium",title:"Not a DJ set. A stadium event.",body:`${market.venue} should feel transformed by PMF — pyro, scale, lighting, motion, tension and release designed for stadium sightlines and social capture.`},
      {label:"City",title:`Make ${market.city} part of the identity.`,body:"Local visual language, city-coded product and market-specific content give the stop its own reason to travel and collect."},
      {label:"Weekend",title:"The concert is one night. The experience owns the weekend.",body:"Arrival, VIP inventory, hosted areas, city activations, afterparties and partner hospitality create revenue beyond the stadium ticket."},
      {label:"Demand",title:"One night only — until the demand makes it bigger.",body:"Presale velocity, sell-through and market demand determine whether an additional night unlocks instead of diluting scarcity upfront."},
    ]}
    primaryLabel={`${market.city} Access`}
    primaryHref={`/access?intent=presale&event=${eventSlug}`}
    secondaryLabel="City Partnerships"
    secondaryHref={`/access?intent=sponsorship&event=${eventSlug}`}
    merchLabel={`${market.city} Drop List`}
    merchHref={`/access?intent=merch&event=${eventSlug}`}
    footerEyebrow={`PARDON MY FRENCH · ${market.city.toUpperCase()}`}
    footerTitle="ONE CITY. ONE NIGHT. ONE GLOBAL EVENT."
  />;
}
