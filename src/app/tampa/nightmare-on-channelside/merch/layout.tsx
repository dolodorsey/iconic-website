import type { Metadata } from "next";
import { NOC_MEDIA } from "./noc-assets";
import "./noc-top-tier.css";
import "./noc-refinement.css";
import "./noc-artist-fixes.css";
import "./noc-cart-hardening.css";

const BASE = "/tampa/nightmare-on-channelside/merch";

export const metadata: Metadata = {
  description: "Official Nightmare on Channelside Halloween 2026 merchandise, artist collections, Tampa editions and event collectibles.",
  openGraph: {
    type: "website",
    siteName: "ICONIC",
    title: "Nightmare on Channelside — Official Merch",
    description: "Shop the official Nightmare on Channelside Halloween 2026 merch — artist collections, Tampa editions and event pieces.",
    url: BASE,
    images: [{ url: NOC_MEDIA.homeHero, alt: "Nightmare on Channelside official merch" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nightmare on Channelside — Official Merch",
    description: "Official Halloween 2026 artist collections, Tampa editions and event merchandise from ICONIC.",
    images: [NOC_MEDIA.homeHero],
  },
};

export default function NightmareMerchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="noc-top-tier">{children}</div>;
}
