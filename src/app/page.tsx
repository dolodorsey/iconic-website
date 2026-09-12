import type { Metadata } from "next";
import HomeExperience from "./_components/HomeExperience";
import { Shell } from "./_components/IconicPage";
import { COLLECTION_ART, NOC_MEDIA } from "./tampa/nightmare-on-channelside/merch/noc-assets";

export const metadata: Metadata = {
  title: "Concerts, Tours & Culture",
  description: "ICONIC LIVE presents Tampa Halloween, Summer Walker — Soul Symphony, DJ Snake — Pardon My French, official event merch, premium hospitality and strategic partnerships.",
};

const merchTiles = [
  { label: "21 SAVAGE", href: "/tampa/nightmare-on-channelside/merch/collection/21-savage", src: COLLECTION_ART["21-savage"] },
  { label: "KODAK BLACK", href: "/tampa/nightmare-on-channelside/merch/collection/kodak-black", src: COLLECTION_ART["kodak-black"] },
  { label: "DABABY", href: "/tampa/nightmare-on-channelside/merch/collection/da-baby", src: COLLECTION_ART["da-baby"] },
  { label: "MEEK MILL", href: "/tampa/nightmare-on-channelside/merch/collection/meek-mill", src: COLLECTION_ART["meek-mill"] },
];

export default function Home(){
  return <Shell><HomeExperience tampa={NOC_MEDIA.headliners} merch={NOC_MEDIA.market} merchTiles={merchTiles}/><div id="national-circuit" aria-hidden="true" /></Shell>;
}
