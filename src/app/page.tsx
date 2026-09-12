import type { Metadata } from "next";
import HomeExperience from "./_components/HomeExperience";
import PlatformShell from "./_components/PlatformShell";
import { COLLECTION_ART, NOC_MEDIA } from "./tampa/nightmare-on-channelside/merch/noc-assets";

export const metadata: Metadata = {
  title: "ICONIC — Live Entertainment & Culture",
  description: "ICONIC builds concerts, tours, experiences, music, creators, media, merchandise and brand partnerships around moments people remember.",
};

const merchTiles = [
  { label: "21 SAVAGE", href: "/tampa/nightmare-on-channelside/merch/collection/21-savage", src: COLLECTION_ART["21-savage"] },
  { label: "KODAK BLACK", href: "/tampa/nightmare-on-channelside/merch/collection/kodak-black", src: COLLECTION_ART["kodak-black"] },
  { label: "DABABY", href: "/tampa/nightmare-on-channelside/merch/collection/da-baby", src: COLLECTION_ART["da-baby"] },
  { label: "MEEK MILL", href: "/tampa/nightmare-on-channelside/merch/collection/meek-mill", src: COLLECTION_ART["meek-mill"] },
];

export default function Home(){
  return <PlatformShell><HomeExperience tampa={NOC_MEDIA.headliners} archive={NOC_MEDIA.homeHero} merchTiles={merchTiles}/></PlatformShell>;
}
