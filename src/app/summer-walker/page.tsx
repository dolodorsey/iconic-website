import type { Metadata } from "next";
import LivePropertyPage from "@/app/_components/LivePropertyPage";
import { drive } from "@/app/_components/IconicPage";

export const metadata: Metadata = {
  title: "Summer Walker — Soul Symphony | ICONIC LIVE",
  description: "Summer Walker — Soul Symphony, a multi-city premium live experience presented through ICONIC LIVE. Join for city announcements, presale, VIP and partnership access.",
};

export default function SummerWalkerPage(){
  return <LivePropertyPage
    eyebrow="ICONIC LIVE · SUMMER WALKER"
    title="SOUL SYMPHONY."
    sub="Summer Walker in a premium multi-city live format where modern R&B meets orchestral scale. The experience is intimate in emotion and arena-level in production — built for cinematic reveals, elevated hospitality and a city-by-city cultural moment."
    visual={drive("1VLMzdfR0ZPM028H6QPjVyzLHakSRG4oX")}
    visualPosition="center 24%"
    status="10-CITY TOUR · CITIES ANNOUNCING"
    accent="rgba(151,83,118,1)"
    stats={[
      {label:"Format",value:"10 Cities",body:"A repeatable premium tour system with city-specific activation layers."},
      {label:"Artist",value:"Summer Walker",body:"A vocal-first experience designed around intimacy, emotion and scale."},
      {label:"Experience",value:"R&B × Symphony",body:"Orchestral language, cinematic staging and contemporary soul in one world."},
      {label:"Access",value:"Presale + VIP",body:"City alerts, premium inventory and partner opportunities release in phases."},
    ]}
    pillars={[
      {label:"Creative",title:"Soft power at arena scale.",body:"The visual world should feel elegant, sensual and emotionally precise — strings, silhouette, movement, texture and light rather than generic concert graphics."},
      {label:"Music",title:"Build the arrangements into the identity.",body:"The symphonic layer is not decoration. It should shape intros, transitions, interludes, visual pacing and the way each city experiences the catalog."},
      {label:"Hospitality",title:"Premium without losing intimacy.",body:"VIP should feel closer to the artist world through arrival, lounges, gifting, photo moments and elevated seating — not merely a higher ticket price."},
      {label:"Partners",title:"Brands enter through emotion and ritual.",body:"Beauty, fashion, beverage, travel and lifestyle partners fit best when they enhance the audience journey instead of interrupting the performance."},
    ]}
    primaryLabel="Get Tour Access"
    primaryHref="/access?intent=presale"
    secondaryLabel="Tour Partnerships"
    secondaryHref="/access?intent=sponsorship"
    footerEyebrow="SUMMER WALKER · SOUL SYMPHONY"
    footerTitle="HEAR THE SONGS BIGGER THAN BEFORE."
  />;
}
