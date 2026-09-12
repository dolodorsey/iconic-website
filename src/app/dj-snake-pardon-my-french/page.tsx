import type { Metadata } from "next";
import LivePropertyPage from "@/app/_components/LivePropertyPage";
import { DJ_SNAKE_AND_FRIENDS_LOGO, PARDON_MY_FRENCH_TOUR_LOGO } from "@/app/_components/tour-brand-assets";

const DJ_VISUAL = "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-dj-snake-pardon-my-french.jpg?v=1789170586";

export const metadata: Metadata = {
  title: "DJ Snake — Pardon My French",
  description: "DJ Snake — Pardon My French, a five-city U.S. stadium experience through ICONIC LIVE. Request presale, VIP, merch and partnership access.",
  openGraph: {
    title: "DJ Snake — Pardon My French | ICONIC LIVE",
    description: "5 cities. 5 stadiums. One-night-only destination events. Request presale, VIP, merch and partnership access.",
    type: "website",
    images: [{url:DJ_VISUAL}],
  },
};

export default function DjSnakePage(){
  return <LivePropertyPage
    eyebrow="ICONIC LIVE PRESENTS"
    title="DJ SNAKE & FRIENDS — PARDON MY FRENCH TOUR"
    brandMarks={[
      {src:DJ_SNAKE_AND_FRIENDS_LOGO,alt:"DJ Snake & Friends",maxWidth:330},
      {src:PARDON_MY_FRENCH_TOUR_LOGO,alt:"Pardon My French Tour",maxWidth:350},
    ]}
    brandMarksAsTitle
    sub="A limited-engagement U.S. stadium experience built around DJ Snake, Paris attitude, global nightlife, oversized production and one-night-only destination energy. Los Angeles, Las Vegas, Dallas, Tampa and New York anchor the current route."
    visual={DJ_VISUAL}
    visualPosition="center 18%"
    status="5 CITIES · 5 STADIUMS · ONE NIGHT ONLY"
    accent="rgba(196,21,32,1)"
    stats={[
      {label:"Artist",value:"DJ Snake & Friends",body:"A global icon surrounded by a curated friends-stage and city-specific event world."},
      {label:"Property",value:"Pardon My French",body:"A tour identity designed to live across stages, merch, content, nightlife and partner activations."},
      {label:"Format",value:"5 Stadium Cities",body:"Los Angeles, Las Vegas, Dallas, Tampa and New York in the current U.S. route architecture."},
      {label:"Revenue",value:"Multiple Economies",body:"Tickets, premium, VIP, suites, merch, sponsors, hospitality, afterparties, food and beverage, content and potential second nights."},
    ]}
    pillars={[
      {label:"Identity",title:"No translation required. The sound is global.",body:"Electronic, hip-hop, Latin, pop, nightlife and festival energy meet a Paris-rooted visual world built to travel city to city without losing identity."},
      {label:"Production",title:"Not a DJ set. A stadium event.",body:"Pyro, laser grids, 360° visuals, friends-stage moments, VIP sightlines and a signature finale make the production unmistakably stadium scale."},
      {label:"Weekend",title:"The concert is one night. The experience owns the weekend.",body:"Welcome, city takeover, stadium night and encore programming create a destination system around every market rather than a single show-and-go date."},
      {label:"Demand",title:"Don’t announce everything. Make them chase it.",body:"Tease, reveal, presale, sell, feed demand and unlock additional nights only when the market earns them. Scarcity is part of the campaign architecture."},
    ]}
    stopsEyebrow="United States Stadium Route"
    stopsTitle="5 cities. 5 stadiums. One global event."
    stops={[
      {city:"Los Angeles",venue:"SoFi Stadium",meta:"California",note:"West Coast stadium chapter of the current PMF route.",href:"/dj-snake-pardon-my-french/los-angeles"},
      {city:"Las Vegas",venue:"Allegiant Stadium",meta:"Nevada",note:"A nightlife-led destination market built for VIP and hospitality extensions.",href:"/dj-snake-pardon-my-french/las-vegas"},
      {city:"Dallas",venue:"Cotton Bowl Stadium",meta:"Texas",note:"Texas stadium chapter with city-specific content, partners and product.",href:"/dj-snake-pardon-my-french/dallas"},
      {city:"Tampa",venue:"Raymond James Stadium",meta:"Florida",note:"Florida stadium chapter positioned as a full destination weekend.",href:"/dj-snake-pardon-my-french/tampa"},
      {city:"New York",venue:"Citi Field",meta:"New York",note:"East Coast finale market in the current five-city architecture.",href:"/dj-snake-pardon-my-french/new-york"},
    ]}
    primaryLabel="Get PMF Access"
    primaryHref="/access?intent=presale&event=dj-snake-pardon-my-french"
    secondaryLabel="Tour Partnerships"
    secondaryHref="/access?intent=sponsorship&event=dj-snake-pardon-my-french"
    merchLabel="Join PMF Drop List"
    merchHref="/access?intent=merch&event=dj-snake-pardon-my-french"
    footerEyebrow="MUSIC · PEOPLE · CULTURE · UNITES US"
    footerTitle="ONE CITY. ONE NIGHT. ONE GLOBAL EVENT."
  />;
}
