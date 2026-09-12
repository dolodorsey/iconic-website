import type { Metadata } from "next";
import LivePropertyPage from "@/app/_components/LivePropertyPage";
import { SUMMER_WALKER_SOUL_SYMPHONY_LOGO } from "@/app/_components/tour-brand-assets";
import { SOUL_SYMPHONY_CITIES } from "./cities";

const SUMMER_VISUAL = "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-summer-walker-soul-symphony.jpg?v=1789170574";

export const metadata: Metadata = {
  title: "Summer Walker — Soul Symphony",
  description: "Summer Walker — Soul Symphony, a 10-city premium live experience through ICONIC LIVE. Request tour updates, presale, VIP, merch and partnership access.",
  openGraph: {
    title: "Summer Walker — Soul Symphony | ICONIC LIVE",
    description: "10 cities. One soulful experience. Request presale, VIP and partnership access.",
    type: "website",
    images: [{url:SUMMER_VISUAL}],
  },
};

export default function SummerWalkerPage(){
  return <LivePropertyPage
    eyebrow="ICONIC LIVE PRESENTS"
    title="SUMMER WALKER — SOUL SYMPHONY TOUR"
    brandMarks={[{src:SUMMER_WALKER_SOUL_SYMPHONY_LOGO,alt:"Summer Walker's Soul Symphony Tour",maxWidth:560}]}
    brandMarksAsTitle
    sub="A premium 10-city live experience where modern R&B meets orchestral scale. Raw vocals, live arrangements, intimate staging, premium hospitality and city-wide cultural energy turn each stop into more than a performance."
    visual={SUMMER_VISUAL}
    visualPosition="center 24%"
    status="10 CITIES · ONE SOULFUL EXPERIENCE"
    accent="rgba(151,83,118,1)"
    stats={[
      {label:"Format",value:"10 Cities",body:"A repeatable premium tour system with city-specific activation layers and localized audience capture."},
      {label:"Artist",value:"Summer Walker",body:"A genre-defining voice at the center of an emotion-first live experience."},
      {label:"Experience",value:"Live Vocals + Orchestra",body:"Orchestral textures, intimate staging and contemporary soul in one world."},
      {label:"Commercial",value:"Presale + VIP + Partners",body:"Ticket interest, hospitality requests and sponsorship opportunities are captured separately and tagged to Soul Symphony."},
    ]}
    pillars={[
      {label:"Creative",title:"This is a soulful cultural moment.",body:"The visual world should feel elegant, sensual and emotionally precise — candlelight, roses, orchestra, silhouette, movement and luxury texture rather than generic concert graphics."},
      {label:"Music",title:"A live orchestral experience.",body:"Strings, arrangements, intros, transitions and signature moments should reshape the catalog without losing the intimacy and emotion that make the songs work."},
      {label:"Weekend",title:"The show is one night. The experience owns the weekend.",body:"Arrival, city takeover, Soul Symphony night and curated hospitality turn the tour into a multi-day destination economy around the performance."},
      {label:"Partners",title:"One ticket. Multiple economies.",body:"Ticketing, VIP, suites, merchandise, sponsors, hospitality, food and beverage, afterparties and content all live inside the same tour platform."},
    ]}
    stopsEyebrow="The 10 City Experience"
    stopsTitle="10 cities. One emotional journey."
    stops={SOUL_SYMPHONY_CITIES.map((market)=>({
      city:market.city,
      venue:market.venue,
      meta:`${market.state} · ${market.date}`,
      note:market.positioning,
      href:`/summer-walker/${market.slug}`,
    }))}
    primaryLabel="Get Tour Access"
    primaryHref="/access?intent=presale&event=summer-walker-soul-symphony"
    secondaryLabel="Tour Partnerships"
    secondaryHref="/access?intent=sponsorship&event=summer-walker-soul-symphony"
    merchLabel="Join Tour Drop List"
    merchHref="/access?intent=merch&event=summer-walker-soul-symphony"
    footerEyebrow="MUSIC · PEOPLE · CULTURE · FOREVER"
    footerTitle="REAL MUSIC. REAL PEOPLE. A BIGGER TOMORROW."
  />;
}
