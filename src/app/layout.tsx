import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import "./mobile-polish.css";
import "./visual-overhaul.css";
import "./visual-overhaul-responsive.css";
import "./iconic-home.css";
import "./platform-shell.css";
import "./qa-polish.css";
import "./iconic-rebuild.css";
import "./iconic-refinement.css";
import { SITE_URL } from "../lib/site-url";
import Analytics from "./_components/Analytics";

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ICONIC — Live Entertainment, Experiences, Creators & Music",
    template: "%s | ICONIC",
  },
  description: "ICONIC is a multi-vertical entertainment group spanning headline concerts, multi-city tours, premium nightlife, immersive experiences, creators, ICONIC MUSIC, media, merchandise, hospitality, bookings and strategic partnerships.",
  applicationName: "ICONIC",
  keywords: ["ICONIC", "ICONIC LIVE", "ICONIC MUSIC", "ICONIC Social", "ICONIC Creators", "live entertainment", "concerts", "concert tours", "stadium concerts", "arena events", "premium nightlife", "immersive experiences", "creator development", "music development", "event production", "Tampa concerts", "Summer Walker", "Soul Symphony", "DJ Snake", "Pardon My French", "21 Savage", "Nightmare on Channelside", "concert merch", "VIP hospitality", "event sponsorships"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "ICONIC",
    title: "ICONIC — Live Entertainment, Experiences, Creators & Music",
    description: "Events. Experiences. Creators. ICONIC MUSIC. Media. Merchandise. Partnerships. A full entertainment ecosystem built around culture and memorable live moments.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ICONIC — Live Entertainment, Experiences, Creators & Music",
    description: "Headline concerts, tours, premium experiences, creators, music, media, merchandise and strategic partnerships.",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ICONIC",
    url: SITE_URL,
    description: "Multi-vertical entertainment group producing premium nightlife, immersive cultural experiences, headline concerts, multi-city tours, creator development, music programming, media, merchandise and strategic partnerships.",
    areaServed: ["Atlanta", "Houston", "Los Angeles", "Tampa", "Las Vegas", "Dallas", "New York City", "Washington DC"],
    knowsAbout: ["Live Entertainment","Concert Production","Experiential Events","Nightlife","Creator Development","Music Development","Artist Bookings","Sponsorships","VIP Hospitality","Event Merchandise","Media and Archive"],
  };

  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}><Analytics/></Suspense>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
