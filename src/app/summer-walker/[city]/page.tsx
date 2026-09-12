import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LivePropertyPage from "@/app/_components/LivePropertyPage";
import { SUMMER_WALKER_SOUL_SYMPHONY_LOGO } from "@/app/_components/tour-brand-assets";
import { getSoulSymphonyCity, SOUL_SYMPHONY_CITIES } from "../cities";

const SUMMER_VISUAL = "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-summer-walker-soul-symphony.jpg?v=1789170574";

export function generateStaticParams(){
  return SOUL_SYMPHONY_CITIES.map((market)=>({city:market.slug}));
}

export async function generateMetadata({params}:{params:Promise<{city:string}>}):Promise<Metadata>{
  const {city}=await params;
  const market=getSoulSymphonyCity(city);
  if(!market) return {title:"Summer Walker — Soul Symphony"};
  const title=`Summer Walker — Soul Symphony — ${market.city}`;
  const description=`Summer Walker — Soul Symphony at ${market.venue} in ${market.city} on ${market.date}. Request city presale, VIP, merch and partnership access through ICONIC LIVE.`;
  return {title,description,openGraph:{title:`${title} | ICONIC LIVE`,description,type:"website",images:[{url:SUMMER_VISUAL}]}};
}

export default async function SoulSymphonyCityPage({params}:{params:Promise<{city:string}>}){
  const {city}=await params;
  const market=getSoulSymphonyCity(city);
  if(!market) notFound();
  const eventSlug=`summer-walker-soul-symphony-${market.slug}`;
  return <LivePropertyPage
    eyebrow={`ICONIC LIVE · ${market.city.toUpperCase()}`}
    title={`${market.city.toUpperCase()}.`}
    brandMarks={[{src:SUMMER_WALKER_SOUL_SYMPHONY_LOGO,alt:"Summer Walker's Soul Symphony Tour",maxWidth:460}]}
    sub={`Summer Walker brings Soul Symphony to ${market.venue} on ${market.date}. This city chapter pairs raw live vocals with orchestral scale, intimate staging, premium hospitality and a localized cultural moment. ${market.positioning}`}
    visual={SUMMER_VISUAL}
    visualPosition="center 24%"
    status={`${market.date.toUpperCase()} · ${market.venue.toUpperCase()} · ACCESS OPEN`}
    accent="rgba(151,83,118,1)"
    stats={[
      {label:"City",value:market.city,body:`The ${market.state} stop in the 10-city Soul Symphony route.`},
      {label:"Date",value:market.date,body:"Current date in the Soul Symphony tour architecture."},
      {label:"Venue",value:market.venue,body:"Arena chapter designed for premium production and hospitality."},
      {label:"Access",value:"Presale + VIP + Partners",body:"Every request is captured and tagged directly to this city."},
    ]}
    pillars={[
      {label:"Music",title:"A live orchestral experience.",body:"Strings, intros, transitions and live arrangement moments reshape the catalog without losing the intimacy and emotion that make the songs work."},
      {label:"City",title:`Give ${market.city} its own chapter.`,body:"Localized creative, content, hospitality and city-coded product make each stop feel collectible instead of copied."},
      {label:"Hospitality",title:"Premium access should feel personal.",body:"Arrival, lounges, gifting, elevated seating and hosted moments deepen the artist world rather than simply raising the ticket price."},
      {label:"Partners",title:"One ticket. Multiple economies.",body:"Sponsorship belongs inside hospitality, gifting, content, fan capture, food and beverage, afterparties and useful on-site moments rather than passive logo placement."},
    ]}
    primaryLabel={`${market.city} Access`}
    primaryHref={`/access?intent=presale&event=${eventSlug}`}
    secondaryLabel="City Partnerships"
    secondaryHref={`/access?intent=sponsorship&event=${eventSlug}`}
    merchLabel={`${market.city} Drop List`}
    merchHref={`/access?intent=merch&event=${eventSlug}`}
    footerEyebrow={`SOUL SYMPHONY · ${market.city.toUpperCase()}`}
    footerTitle="ONE CITY. ONE SOULFUL EXPERIENCE."
  />;
}
