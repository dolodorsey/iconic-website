import type { Metadata } from "next";
import LivePropertyPage from "@/app/_components/LivePropertyPage";
import { SUMMER_WALKER_SOUL_SYMPHONY_LOGO } from "@/app/_components/tour-brand-assets";
import { SUMMER_VISUAL } from "@/app/_cinematic/assets";
import { SOUL_SYMPHONY_CITIES } from "./cities";

const SUMMER_ROUTE = "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-soul-symphony-10-city-journey.png?v=1789175223";
const SUMMER_LIVE = "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-soul-symphony-live-orchestral-experience.png?v=1789175231";
const SUMMER_ECONOMY = "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-soul-symphony-multiple-economies.png?v=1789175240";

export const metadata: Metadata = {
  title: "Summer Walker — Soul Symphony",
  description: "Soul Symphony is an orchestra-led Summer Walker live-experience concept through ICONIC. Explore the current tour concept and request updates, VIP, merchandise and partnership information.",
  openGraph: {title:"Summer Walker — Soul Symphony | ICONIC",description:"Modern R&B with an orchestral point of view. Explore the tour concept and request updates.",type:"website",images:[{url:SUMMER_VISUAL}]},
};

export default function SummerWalkerPage(){
  return <LivePropertyPage
    eyebrow="ICONIC LIVE · SOUL SYMPHONY"
    title="SUMMER WALKER — SOUL SYMPHONY TOUR"
    brandMarks={[{src:SUMMER_WALKER_SOUL_SYMPHONY_LOGO,alt:"Summer Walker's Soul Symphony Tour",maxWidth:560}]}
    brandMarksAsTitle
    heroLayout="poster"
    sub="A candlelit, orchestra-led live experience built around Summer Walker’s catalog, raw vocal presence and a room designed for feeling. The current concept spans a 10-city format; routing, dates and venue commitments remain subject to announcement."
    visual={SUMMER_VISUAL}
    visualPosition="center top"
    status="TOUR CONCEPT · ROUTING + DATES TO BE ANNOUNCED"
    accent="rgba(151,83,118,1)"
    stats={[
      {label:"Artist",value:"Summer Walker",body:"The voice and catalog at the center of the Soul Symphony creative direction."},
      {label:"Format",value:"10-City Concept",body:"A multi-city live format with selected venue concepts currently in development."},
      {label:"Sound",value:"Live Vocals + Orchestra",body:"Strings, live arrangements and contemporary R&B presented with intimacy and scale."},
      {label:"Access",value:"Updates + VIP + Partners",body:"Separate interest paths for fans, hospitality, merchandise and aligned partnerships."},
    ]}
    experienceTitle="Modern R&B, reframed for a room built to feel everything."
    pillars={[
      {label:"Music",title:"The songs stay intimate — the room gets bigger.",body:"Live vocals, strings and new arrangements can add scale without losing the emotional detail that makes the catalog connect."},
      {label:"Atmosphere",title:"Candlelight. Texture. A softer kind of spectacle.",body:"Soul Symphony should feel elegant and close even at larger scale: warm light, roses, orchestra, silhouette and deliberate pacing."},
      {label:"City",title:"Every stop gets its own chapter.",body:"Local details, arrival moments and city-specific storytelling give each market a reason to feel distinct rather than copied."},
      {label:"Hospitality",title:"Premium access without interrupting the music.",body:"VIP and hosted experiences should extend the tone of the show through arrival, seating, lounges and thoughtful service."},
    ]}
    galleryTitle="The visual language moves with the music."
    gallery={[
      {title:"10 CITIES · ONE EMOTIONAL JOURNEY",src:SUMMER_ROUTE},
      {title:"A LIVE ORCHESTRAL EXPERIENCE",src:SUMMER_LIVE},
      {title:"THE SOUL SYMPHONY EXPERIENCE",src:SUMMER_ECONOMY},
    ]}
    stopsEyebrow="Current Venue Concepts"
    stopsTitle="Selected markets inside the larger 10-city concept."
    stops={SOUL_SYMPHONY_CITIES.map((market)=>({city:market.city,venue:market.venue,meta:`${market.state} · DATE TBA`,note:market.positioning,href:`/summer-walker/${market.slug}`}))}
    primaryLabel="Get Tour Updates"
    primaryHref="/access?intent=presale&event=summer-walker-soul-symphony"
    secondaryLabel="Tour Partnerships"
    secondaryHref="/access?intent=sponsorship&event=summer-walker-soul-symphony"
    merchLabel="Join Tour Drop List"
    merchHref="/access?intent=merch&event=summer-walker-soul-symphony"
    footerEyebrow="SOUL SYMPHONY"
    footerTitle="A BIGGER ROOM. THE SAME FEELING."
  />;
}
