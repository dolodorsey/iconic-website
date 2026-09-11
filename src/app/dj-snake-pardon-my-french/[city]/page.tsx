import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LivePropertyPage from "@/app/_components/LivePropertyPage";
import { drive } from "@/app/_components/IconicPage";
import { getPmfCity, PMF_CITIES } from "../cities";

const HERO = drive("1FqMDPe63LypEQFK3iQW-dJLNJiRTRi9R");

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
    openGraph:{
      title:`${title} | ICONIC LIVE`,
      description,
      type:"website",
      images:[{url:"/api/media/drive/1FqMDPe63LypEQFK3iQW-dJLNJiRTRi9R"}],
    },
  };
}

export default async function PmfCityPage({params}:{params:Promise<{city:string}>}){
  const {city}=await params;
  const market=getPmfCity(city);
  if(!market) notFound();
  const eventSlug=`dj-snake-pardon-my-french-${market.slug}`;

  return <LivePropertyPage
    eyebrow={`PARDON MY FRENCH · ${market.state.toUpperCase()}`}
    title={`${market.city.toUpperCase()}.`}
    sub={`DJ Snake brings Pardon My French to ${market.venue}. This one-night-only stadium chapter is built as a destination event with oversized production, premium hospitality, city-specific commerce and partner integrations. ${market.positioning}`}
    visual={HERO}
    visualPosition="center 18%"
    status={`${market.venue.toUpperCase()} · CITY ACCESS OPEN`}
    accent="rgba(196,21,32,1)"
    stats={[
      {label:"Market",value:market.city,body:`The ${market.state} chapter of the five-city U.S. PMF stadium route.`},
      {label:"Venue",value:market.venue,body:"Verified stadium in the current Pardon My French U.S. route architecture."},
      {label:"Tour",value:"5 Cities · 5 Stadiums",body:"One market inside the larger Los Angeles, Las Vegas, Dallas, Tampa and New York system."},
      {label:"Access",value:"Presale + VIP + Partners",body:"Fan and commercial requests are captured directly and tagged to this city."},
    ]}
    pillars={[
      {label:"Stadium",title:"Build for the size of the room.",body:`${market.venue} should feel transformed by PMF — scale, lighting, motion, tension and release designed for stadium sightlines and social capture.`},
      {label:"City",title:`Make ${market.city} part of the identity.`,body:"Local visual language, city-coded product and market-specific content give the stop its own reason to travel and collect."},
      {label:"Hospitality",title:"Turn access into a premium product.",body:"Arrival, VIP inventory, hosted areas, partner hospitality and post-show extensions create revenue beyond general admission."},
      {label:"Partners",title:"Sell useful integration, not passive logos.",body:"Brands can enter through fan utilities, hospitality, physical activations, beverage moments, content, ticketing and city-specific experiences."},
    ]}
    primaryLabel={`${market.city} Access`}
    primaryHref={`/access?intent=presale&event=${eventSlug}`}
    secondaryLabel="City Partnerships"
    secondaryHref={`/access?intent=sponsorship&event=${eventSlug}`}
    merchLabel={`${market.city} Drop List`}
    merchHref={`/access?intent=merch&event=${eventSlug}`}
    footerEyebrow={`DJ SNAKE · ${market.city.toUpperCase()}`}
    footerTitle="ONE CITY. ONE STADIUM. ONE NIGHT."
  />;
}
