import type { Metadata } from "next";
import LivePropertyPage from "@/app/_components/LivePropertyPage";
import { drive } from "@/app/_components/IconicPage";

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
    eyebrow="ICONIC LIVE · TAMPA · HALLOWEEN"
    title="NIGHTMARE ON CHANNELSIDE."
    sub="Tampa gets a full-scale Halloween concert built around music, spectacle, nightlife energy and collectible culture. 21 Savage leads the world; special guests, ticketing details and final venue information release through the ICONIC access system."
    visual={drive("1vyBkJOCw1uaIsc6KmO6ikJiwXSwT7K2n")}
    visualPosition="center 22%"
    status="TAMPA · HALLOWEEN WEEKEND · ACCESS OPEN"
    accent="rgba(197,45,24,1)"
    stats={[
      {label:"Market",value:"Tampa",body:"A destination Halloween weekend built for Florida and fly-in traffic."},
      {label:"Lead Artist",value:"21 Savage",body:"Headline creative direction with special guests released in campaign phases."},
      {label:"Access",value:"Tickets + VIP",body:"Presale, premium hospitality and final event details flow through the live ICONIC intake system."},
      {label:"Commerce",value:"Live Merch Shop",body:"The existing Nightmare storefront is connected directly to the current ICONIC slate."},
    ]}
    pillars={[
      {label:"Show",title:"A concert with a cinematic horror world.",body:"The event should feel like stepping inside the campaign: dramatic arrival, immersive lighting, heavy stage language, visual reveals and an after-dark Tampa identity."},
      {label:"Weekend",title:"Make Tampa the destination, not just the venue.",body:"Build travel, hospitality, nightlife and partner activations around the concert so the economic value extends beyond the ticket itself."},
      {label:"Merch",title:"The concert becomes a collectible drop.",body:"Artist, city and Halloween capsules create multiple product lanes without flattening the show into generic tour merchandise."},
      {label:"Partners",title:"Sponsors are integrated into the experience.",body:"Partner inventory should live inside arrivals, VIP, content, hospitality, beverage moments, fan capture and post-event media instead of logo walls."},
    ]}
    primaryLabel="Join Tampa Presale"
    primaryHref="/access?intent=presale&event=tampa-halloween"
    secondaryLabel="Sponsor Tampa"
    secondaryHref="/access?intent=sponsorship&event=tampa-halloween"
    merchLabel="Shop Tampa Merch"
    merchHref="/tampa/nightmare-on-channelside/merch/shop"
    footerEyebrow="HALLOWEEN · TAMPA"
    footerTitle="ONE NIGHT SHOULD FEEL LIKE A WHOLE WORLD."
  />;
}
