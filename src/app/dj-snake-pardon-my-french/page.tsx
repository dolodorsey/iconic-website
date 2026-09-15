import type { Metadata } from "next";
import LivePropertyPage from "@/app/_components/LivePropertyPage";
import { DJ_SNAKE_AND_FRIENDS_LOGO, PARDON_MY_FRENCH_TOUR_LOGO } from "@/app/_components/tour-brand-assets";
import { PMF_VISUAL } from "@/app/_cinematic/assets";

const PMF_ROUTE = "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-pmf-five-cities-five-stadiums.png?v=1789175250";
const PMF_STADIUM = "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-pmf-stadium-event.png?v=1789175259";
const PMF_ECONOMY = "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-pmf-multiple-economies.png?v=1789175269";

export const metadata: Metadata = {title:"DJ Snake — Pardon My French",description:"Pardon My French is a five-market U.S. stadium-tour concept through ICONIC LIVE. Request tour updates, VIP, merchandise and partnership information.",openGraph:{title:"DJ Snake — Pardon My French | ICONIC LIVE",description:"Global sound, stadium scale and a distinct Pardon My French world. Request tour updates and access.",type:"website",images:[{url:PMF_VISUAL}]}};

export default function DjSnakePage(){return <LivePropertyPage
  eyebrow="ICONIC LIVE · PARDON MY FRENCH"
  title="DJ SNAKE & FRIENDS — PARDON MY FRENCH TOUR"
  brandMarks={[{src:DJ_SNAKE_AND_FRIENDS_LOGO,alt:"DJ Snake & Friends",maxWidth:330},{src:PARDON_MY_FRENCH_TOUR_LOGO,alt:"Pardon My French Tour",maxWidth:350}]}
  heroLayout="poster"
  sub="A five-market U.S. stadium concept built around DJ Snake & Friends, global nightlife energy and a visual world that feels unmistakably Pardon My French. Los Angeles, Las Vegas, Dallas, Tampa and New York anchor the current route concept; dates and venue commitments remain subject to announcement."
  visual={PMF_VISUAL} visualPosition="center top" status="5-MARKET STADIUM CONCEPT · DATES TO BE ANNOUNCED" accent="rgba(196,21,32,1)"
  stats={[
    {label:"Artist",value:"DJ Snake & Friends",body:"The artist identity at the center of the current Pardon My French tour concept."},
    {label:"Route",value:"5 U.S. Markets",body:"Los Angeles, Las Vegas, Dallas, Tampa and New York in the current planning architecture."},
    {label:"Experience",value:"Stadium Scale",body:"Large-format production, a distinct visual world and premium guest experiences."},
    {label:"Access",value:"Updates + VIP + Partners",body:"Separate paths for fan updates, premium access, merchandise interest and partnership inquiries."},
  ]}
  experienceTitle="A global sound with a world big enough to match it."
  pillars={[
    {label:"Identity",title:"Paris attitude. Global sound.",body:"Electronic, hip-hop and nightlife energy live inside one visual language that can move city to city without losing identity."},
    {label:"Production",title:"Designed for stadium sightlines.",body:"Scale, lighting, motion and reveal moments should read from the floor to the upper bowl and still create close-up social moments."},
    {label:"City",title:"Every market gets its own chapter.",body:"Local creative, arrival and city-specific details give each stop a reason to feel different while staying inside the PMF world."},
    {label:"Hospitality",title:"Access beyond the seat.",body:"Premium arrival, hosted spaces and partner experiences can extend the night without overwhelming the concert itself."},
  ]}
  galleryTitle="One identity, translated at stadium scale."
  gallery={[{title:"5 CITIES · 5 STADIUMS",src:PMF_ROUTE},{title:"A STADIUM-SCALE EXPERIENCE",src:PMF_STADIUM},{title:"THE PARDON MY FRENCH WORLD",src:PMF_ECONOMY}]}
  stopsEyebrow="Current U.S. Route Concept" stopsTitle="Five markets inside the current tour architecture."
  stops={[
    {city:"Los Angeles",venue:"SoFi Stadium",meta:"California · CONCEPT",note:"West Coast venue concept in the current route plan.",href:"/dj-snake-pardon-my-french/los-angeles"},
    {city:"Las Vegas",venue:"Allegiant Stadium",meta:"Nevada · CONCEPT",note:"Las Vegas venue concept with premium and hospitality potential.",href:"/dj-snake-pardon-my-french/las-vegas"},
    {city:"Dallas",venue:"Cotton Bowl Stadium",meta:"Texas · CONCEPT",note:"Texas venue concept in the current route plan.",href:"/dj-snake-pardon-my-french/dallas"},
    {city:"Tampa",venue:"Raymond James Stadium",meta:"Florida · CONCEPT",note:"Florida venue concept in the current route plan.",href:"/dj-snake-pardon-my-french/tampa"},
    {city:"New York",venue:"Citi Field",meta:"New York · CONCEPT",note:"East Coast venue concept in the current route plan.",href:"/dj-snake-pardon-my-french/new-york"},
  ]}
  primaryLabel="Get PMF Updates" primaryHref="/access?intent=presale&event=dj-snake-pardon-my-french"
  secondaryLabel="Tour Partnerships" secondaryHref="/access?intent=sponsorship&event=dj-snake-pardon-my-french"
  merchLabel="Join PMF Drop List" merchHref="/access?intent=merch&event=dj-snake-pardon-my-french"
  footerEyebrow="PARDON MY FRENCH" footerTitle="ONE WORLD. FIVE MARKET CHAPTERS."
/>;}
