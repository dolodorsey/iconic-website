import type { Metadata } from "next";
import LivePropertyPage from "@/app/_components/LivePropertyPage";
import { drive } from "@/app/_components/IconicPage";

export const metadata: Metadata = {
  title: "DJ Snake — Pardon My French | ICONIC LIVE",
  description: "DJ Snake — Pardon My French, a multi-city ICONIC LIVE experience. Join for city announcements, presale, VIP, merch and partnership access.",
};

export default function DjSnakePage(){
  return <LivePropertyPage
    eyebrow="ICONIC LIVE · DJ SNAKE"
    title="PARDON MY FRENCH."
    sub="A high-impact multi-city DJ Snake experience built around Paris attitude, global nightlife, oversized production and a visual system that moves from street language to festival-scale spectacle."
    visual={drive("1FqMDPe63LypEQFK3iQW-dJLNJiRTRi9R")}
    visualPosition="center 18%"
    status="MULTI-CITY TOUR · ACCESS OPEN"
    accent="rgba(196,21,32,1)"
    stats={[
      {label:"Artist",value:"DJ Snake",body:"Global headline energy with a visual language rooted in Paris and worldwide club culture."},
      {label:"Property",value:"Pardon My French",body:"A tour identity strong enough to live across stages, merch, content and partner activations."},
      {label:"Format",value:"5+ Cities",body:"A scalable multi-market run with city-specific creative and operating layers."},
      {label:"Revenue",value:"360°",body:"Tickets, VIP, merch, sponsors, hospitality, content and after-event commerce."},
    ]}
    pillars={[
      {label:"Identity",title:"Paris pressure. Global scale.",body:"Use stark typography, red accents, flash photography energy, architecture, transit and street-coded details to make the tour unmistakable without becoming cliché."},
      {label:"Production",title:"Every reveal should hit like a drop.",body:"Build motion, countdowns, lighting, stage architecture and city transitions around tension and release — the same emotional logic that drives a DJ Snake set."},
      {label:"Merch",title:"Streetwear first, souvenir second.",body:"The strongest product should feel wearable without the event context: limited city marks, PMF statements, premium blanks and drop-based scarcity."},
      {label:"Partners",title:"Create integrations people actually photograph.",body:"Automotive, fashion, beverage, tech and nightlife partners should own physical moments, VIP utilities and content mechanics rather than passive placement."},
    ]}
    primaryLabel="Get PMF Access"
    primaryHref="/access?intent=presale&event=dj-snake-pardon-my-french"
    secondaryLabel="Tour Partnerships"
    secondaryHref="/access?intent=sponsorship&event=dj-snake-pardon-my-french"
    footerEyebrow="DJ SNAKE · PARDON MY FRENCH"
    footerTitle="NO BORDER. NO SMALL MOMENTS."
  />;
}
