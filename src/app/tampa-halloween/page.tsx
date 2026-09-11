import type { Metadata } from "next";
import LivePropertyPage from "@/app/_components/LivePropertyPage";
import { drive } from "@/app/_components/IconicPage";
import { COLLECTION_ART, NOC_MEDIA } from "@/app/tampa/nightmare-on-channelside/merch/noc-assets";

export const metadata: Metadata = {
  title: "Nightmare on Channelside — Tampa Halloween",
  description: "ICONIC LIVE presents Nightmare on Channelside, a premium Tampa Halloween concert experience led by 21 Savage. Request presale, VIP, sponsorship and merch access.",
  openGraph: {
    title: "Nightmare on Channelside — Tampa Halloween | ICONIC LIVE",
    description: "Tampa Halloween. 21 Savage. Presale, VIP, sponsorship and official event merch access.",
    type: "website",
    images: [{url:"/api/media/drive/1vyBkJOCw1uaIsc6KmO6ikJiwXSwT7K2n"}],
  },
};

export default function TampaHalloweenPage(){
  return <LivePropertyPage
    eyebrow="ICONIC LIVE · TAMPA HALLOWEEN"
    title="NIGHTMARE ON CHANNELSIDE."
    sub="Tampa gets a full-scale Halloween concert built around music, spectacle, nightlife energy and collectible culture. 21 Savage leads the world with Kodak Black, DaBaby, Meek Mill and Belly Gang Kush across the official event universe."
    visual={drive("1vyBkJOCw1uaIsc6KmO6ikJiwXSwT7K2n")}
    visualPosition="center 22%"
    status="HALLOWEEN 2026 · TAMPA · ACCESS OPEN"
    accent="rgba(197,45,24,1)"
    lineupEyebrow="THE LINEUP"
    lineup={[
      {name:"21 SAVAGE",src:COLLECTION_ART["21-savage"],href:"/tampa/nightmare-on-channelside/merch/collection/21-savage"},
      {name:"KODAK BLACK",src:COLLECTION_ART["kodak-black"],href:"/tampa/nightmare-on-channelside/merch/collection/kodak-black"},
      {name:"DABABY",src:COLLECTION_ART["da-baby"],href:"/tampa/nightmare-on-channelside/merch/collection/da-baby"},
      {name:"MEEK MILL",src:COLLECTION_ART["meek-mill"],href:"/tampa/nightmare-on-channelside/merch/collection/meek-mill"},
      {name:"BELLY GANG KUSH",src:COLLECTION_ART["belly-gang-kush"],href:"/tampa/nightmare-on-channelside/merch/collection/belly-gang-kush"},
    ]}
    stats={[
      {label:"Market",value:"Tampa",body:"A destination Halloween event world built for Florida and fly-in traffic."},
      {label:"Headline",value:"21 Savage",body:"The lead artist anchors a five-name lineup and artist-specific merch worlds."},
      {label:"Access",value:"Presale + VIP",body:"Tickets, premium hospitality and fan access run through dedicated conversion paths."},
      {label:"Commerce",value:"Official Merch",body:"Artist, Tampa, lineup and event collections are live in the connected NOC shop."},
    ]}
    pillars={[
      {label:"Show",title:"A concert with a cinematic horror world.",body:"The event should feel like stepping inside the campaign: dramatic arrival, immersive lighting, heavy stage language, visual reveals and an after-dark Tampa identity."},
      {label:"Weekend",title:"Make Tampa the destination, not just the venue.",body:"Travel, hospitality, nightlife and partner activations extend the value of the concert beyond a single ticket scan."},
      {label:"Merch",title:"The concert becomes a collectible drop.",body:"Each artist gets a dedicated collection alongside Tampa, full-lineup and official-event merchandise."},
      {label:"Partners",title:"Sponsors belong inside the experience.",body:"Partner inventory should live inside arrivals, VIP, content, hospitality, beverage moments and fan capture instead of passive logo walls."},
    ]}
    gallery={[
      {title:"THE GRAND HALL",src:NOC_MEDIA.homeHero},
      {title:"THE NIGHTMARE MARKET",src:NOC_MEDIA.market},
      {title:"THE HALL OF HEADLINERS",src:NOC_MEDIA.headliners},
    ]}
    primaryLabel="Get Tampa Access"
    primaryHref="/access?intent=presale&event=tampa-halloween"
    secondaryLabel="Sponsor Tampa"
    secondaryHref="/access?intent=sponsorship&event=tampa-halloween"
    merchLabel="Shop Tampa Merch"
    merchHref="/tampa/nightmare-on-channelside/merch/shop"
    footerEyebrow="HALLOWEEN · TAMPA"
    footerTitle="SAME CITY. A DARKER PLAYGROUND."
  />;
}
