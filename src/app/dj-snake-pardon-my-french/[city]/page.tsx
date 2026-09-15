import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LivePropertyPage from "@/app/_components/LivePropertyPage";
import { DJ_SNAKE_AND_FRIENDS_LOGO, PARDON_MY_FRENCH_TOUR_LOGO } from "@/app/_components/tour-brand-assets";
import { PMF_VISUAL } from "@/app/_cinematic/assets";
import { getPmfCity, PMF_CITIES } from "../cities";

export function generateStaticParams(){return PMF_CITIES.map((market)=>({city:market.slug}));}
export async function generateMetadata({params}:{params:Promise<{city:string}>}):Promise<Metadata>{const {city}=await params;const market=getPmfCity(city);if(!market)return{title:"DJ Snake — Pardon My French"};const title=`DJ Snake — Pardon My French — ${market.city}`;const description=`Pardon My French ${market.city} stadium concept. Request city updates, VIP, merchandise and partnership information through ICONIC LIVE.`;return{title,description,openGraph:{title:`${title} | ICONIC LIVE`,description,type:"website",images:[{url:PMF_VISUAL}]}};}

export default async function PmfCityPage({params}:{params:Promise<{city:string}>}){
  const {city}=await params;const market=getPmfCity(city);if(!market)notFound();const eventSlug=`dj-snake-pardon-my-french-${market.slug}`;
  return <LivePropertyPage
    eyebrow={`PARDON MY FRENCH · ${market.city.toUpperCase()}`}
    title={`DJ SNAKE & FRIENDS — PARDON MY FRENCH — ${market.city.toUpperCase()}`}
    brandMarks={[{src:DJ_SNAKE_AND_FRIENDS_LOGO,alt:"DJ Snake & Friends",maxWidth:280},{src:PARDON_MY_FRENCH_TOUR_LOGO,alt:"Pardon My French Tour",maxWidth:300}]}
    heroLayout="poster"
    sub={`${market.city} is a stadium-market concept inside the current Pardon My French route plan. ${market.venue} is shown as the venue concept for this chapter, subject to final routing, contracting and announcement. ${market.positioning}`}
    visual={PMF_VISUAL} visualPosition="center top" status={`${market.venue.toUpperCase()} · VENUE CONCEPT · DATE TBA`} accent="rgba(196,21,32,1)"
    stats={[
      {label:"Market",value:market.city,body:`The ${market.state} chapter in the current five-market U.S. concept.`},
      {label:"Date",value:"To Be Announced",body:"No confirmed performance date is published for this market."},
      {label:"Venue Concept",value:market.venue,body:"A stadium concept in current tour materials, subject to final agreement."},
      {label:"Access",value:"Updates + VIP + Partners",body:"Choose the path that matches how you want to be part of this market chapter."},
    ]}
    experienceTitle={`How Pardon My French should take over ${market.city}.`}
    pillars={[
      {label:"Stadium",title:"Built to read from every seat.",body:`The ${market.venue} concept is about scale, light, motion and reveal moments designed for stadium sightlines.`},
      {label:"City",title:`Make ${market.city} part of the identity.`,body:"Local creative and city-specific details give the market its own chapter without breaking the PMF visual language."},
      {label:"Hospitality",title:"Premium access should extend the night.",body:"Arrival, hosted spaces and partner hospitality can create a fuller destination experience around the concert."},
      {label:"Updates",title:"Stay close to the announcement.",body:"City interest is captured now so routing, access and future on-sale information can be shared when confirmed."},
    ]}
    primaryLabel={`${market.city} Updates`} primaryHref={`/access?intent=presale&event=${eventSlug}`}
    secondaryLabel="City Partnerships" secondaryHref={`/access?intent=sponsorship&event=${eventSlug}`}
    merchLabel={`${market.city} Drop List`} merchHref={`/access?intent=merch&event=${eventSlug}`}
    footerEyebrow={`PARDON MY FRENCH · ${market.city.toUpperCase()}`} footerTitle="BE THERE WHEN THE CITY GETS ITS CHAPTER."
  />;
}
