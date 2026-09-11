import type { Metadata } from "next";
import LivePropertyPage from "@/app/_components/LivePropertyPage";
import { drive } from "@/app/_components/IconicPage";

export const metadata: Metadata = {
  title: "DJ Snake — Pardon My French | ICONIC LIVE",
  description: "DJ Snake — Pardon My French, a five-city U.S. stadium experience through ICONIC LIVE. Request presale, VIP, merch and partnership access.",
  openGraph: {
    title: "DJ Snake — Pardon My French | ICONIC LIVE",
    description: "Five U.S. stadiums. One-night-only city events. Request presale, VIP, merch and partnership access.",
    type: "website",
    images: [{url:"/api/media/drive/1FqMDPe63LypEQFK3iQW-dJLNJiRTRi9R"}],
  },
};

export default function DjSnakePage(){
  return <LivePropertyPage
    eyebrow="ICONIC LIVE · DJ SNAKE"
    title="PARDON MY FRENCH."
    sub="A five-city U.S. stadium experience built around DJ Snake, Paris attitude, global nightlife, oversized production and one-night-only destination energy. The current route runs Los Angeles, Las Vegas, Dallas, Tampa and New York."
    visual={drive("1FqMDPe63LypEQFK3iQW-dJLNJiRTRi9R")}
    visualPosition="center 18%"
    status="5 CITIES · 5 STADIUMS · ACCESS OPEN"
    accent="rgba(196,21,32,1)"
    stats={[
      {label:"Artist",value:"DJ Snake",body:"Global headline energy with a visual language rooted in Paris and worldwide club culture."},
      {label:"Property",value:"Pardon My French",body:"A tour identity strong enough to live across stages, merch, content and partner activations."},
      {label:"Format",value:"5 Stadium Cities",body:"Los Angeles, Las Vegas, Dallas, Tampa and New York in the current U.S. route architecture."},
      {label:"Revenue",value:"360°",body:"Tickets, VIP, merch, sponsors, hospitality, content and after-event commerce."},
    ]}
    pillars={[
      {label:"Identity",title:"Paris pressure. Global scale.",body:"Use stark typography, red accents, flash photography energy, architecture, transit and street-coded details to make the tour unmistakable without becoming cliché."},
      {label:"Production",title:"Every reveal should hit like a drop.",body:"Build motion, countdowns, lighting, stage architecture and city transitions around tension and release — the same emotional logic that drives a DJ Snake set."},
      {label:"Merch",title:"Streetwear first, souvenir second.",body:"The strongest product should feel wearable without the event context: limited city marks, PMF statements, premium blanks and drop-based scarcity."},
      {label:"Partners",title:"Create integrations people actually photograph.",body:"Automotive, fashion, beverage, tech and nightlife partners should own physical moments, VIP utilities and content mechanics rather than passive placement."},
    ]}
    stopsEyebrow="United States Stadium Route"
    stopsTitle="Five cities. Five stadiums. One-night-only destination events."
    stops={[
      {city:"Los Angeles",venue:"SoFi Stadium",meta:"California",note:"West Coast stadium chapter of the current PMF route."},
      {city:"Las Vegas",venue:"Allegiant Stadium",meta:"Nevada",note:"A nightlife-led destination market built for VIP and hospitality extensions."},
      {city:"Dallas",venue:"Cotton Bowl Stadium",meta:"Texas",note:"Texas stadium chapter with city-specific content, partners and product."},
      {city:"Tampa",venue:"Raymond James Stadium",meta:"Florida",note:"Florida stadium chapter positioned as a full destination weekend."},
      {city:"New York",venue:"Citi Field",meta:"New York",note:"East Coast finale market in the current five-city architecture."},
    ]}
    primaryLabel="Get PMF Access"
    primaryHref="/access?intent=presale&property=dj-snake-pardon-my-french"
    secondaryLabel="Tour Partnerships"
    secondaryHref="/access?intent=sponsorship&property=dj-snake-pardon-my-french"
    merchLabel="Join PMF Drop List"
    merchHref="/access?intent=merch&property=dj-snake-pardon-my-french"
    footerEyebrow="DJ SNAKE · PARDON MY FRENCH"
    footerTitle="NO BORDER. NO SMALL MOMENTS."
  />;
}
