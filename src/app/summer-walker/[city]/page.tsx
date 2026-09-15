import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LivePropertyPage from "@/app/_components/LivePropertyPage";
import { SUMMER_WALKER_SOUL_SYMPHONY_LOGO } from "@/app/_components/tour-brand-assets";
import { SUMMER_VISUAL } from "@/app/_cinematic/assets";
import { getSoulSymphonyCity, SOUL_SYMPHONY_CITIES } from "../cities";

export function generateStaticParams(){return SOUL_SYMPHONY_CITIES.map((market)=>({city:market.slug}));}
export async function generateMetadata({params}:{params:Promise<{city:string}>}):Promise<Metadata>{const {city}=await params;const market=getSoulSymphonyCity(city);if(!market)return{title:"Summer Walker — Soul Symphony"};const title=`Summer Walker — Soul Symphony — ${market.city}`;const description=`Soul Symphony ${market.city} venue concept. Request city updates, VIP, merchandise and partnership information through ICONIC.`;return{title,description,openGraph:{title:`${title} | ICONIC`,description,type:"website",images:[{url:SUMMER_VISUAL}]}};}

export default async function SoulSymphonyCityPage({params}:{params:Promise<{city:string}>}){
  const {city}=await params;const market=getSoulSymphonyCity(city);if(!market)notFound();const eventSlug=`summer-walker-soul-symphony-${market.slug}`;
  return <LivePropertyPage
    eyebrow={`SOUL SYMPHONY · ${market.city.toUpperCase()}`}
    title={`SUMMER WALKER — SOUL SYMPHONY — ${market.city.toUpperCase()}`}
    brandMarks={[{src:SUMMER_WALKER_SOUL_SYMPHONY_LOGO,alt:"Summer Walker's Soul Symphony Tour",maxWidth:460}]}
    heroLayout="poster"
    sub={`${market.city} is presented as a venue concept inside the larger Soul Symphony tour plan. The creative direction pairs live vocals and orchestral arrangements with intimate staging and premium hospitality. ${market.positioning} A performance date has not been announced for this market.`}
    visual={SUMMER_VISUAL}
    visualPosition="center top"
    status={`${market.venue.toUpperCase()} · VENUE CONCEPT · DATE TBA`}
    accent="rgba(151,83,118,1)"
    stats={[
      {label:"Market",value:market.city,body:`A ${market.state} chapter included in the current Soul Symphony planning materials.`},
      {label:"Date",value:"To Be Announced",body:"No confirmed performance date is published for this city."},
      {label:"Venue Concept",value:market.venue,body:"A venue concept in the current planning deck, subject to final routing and contracting."},
      {label:"Access",value:"Updates + VIP + Partners",body:"Choose the path that matches how you want to be part of this city chapter."},
    ]}
    experienceTitle={`How Soul Symphony should feel in ${market.city}.`}
    pillars={[
      {label:"Music",title:"The catalog, opened up by live arrangement.",body:"Strings, intros, transitions and live performance moments create a larger frame without losing intimacy."},
      {label:"City",title:`Give ${market.city} its own chapter.`,body:"Local creative, hospitality and city-coded details can make the stop feel collectible instead of copied."},
      {label:"Hospitality",title:"Premium access should feel personal.",body:"Arrival, lounges and hosted moments should deepen the artist world rather than distract from it."},
      {label:"Updates",title:"Stay close to the announcement.",body:"City interest is captured now so routing, access and future on-sale information can be shared when confirmed."},
    ]}
    primaryLabel={`${market.city} Updates`} primaryHref={`/access?intent=presale&event=${eventSlug}`}
    secondaryLabel="City Partnerships" secondaryHref={`/access?intent=sponsorship&event=${eventSlug}`}
    merchLabel={`${market.city} Drop List`} merchHref={`/access?intent=merch&event=${eventSlug}`}
    footerEyebrow={`SOUL SYMPHONY · ${market.city.toUpperCase()}`} footerTitle="BE THERE WHEN THE CITY GETS ITS CHAPTER."
  />;
}
