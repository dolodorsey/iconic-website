import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./mobile-polish.css";
import { SITE_URL } from "../lib/site-url";

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ICONIC LIVE — Concerts, Tours & Culture",
    template: "%s | ICONIC LIVE",
  },
  description: "ICONIC LIVE produces headline concerts, multi-city tours, arena and stadium experiences, premium hospitality and event merchandise. Current slate: Tampa Halloween, Summer Walker — Soul Symphony and DJ Snake — Pardon My French.",
  applicationName: "ICONIC LIVE",
  keywords: ["ICONIC LIVE", "concerts", "concert tours", "stadium concerts", "arena events", "Tampa concerts", "Summer Walker", "Soul Symphony", "DJ Snake", "Pardon My French", "21 Savage", "Nightmare on Channelside", "concert merch", "VIP hospitality", "concert sponsorships"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "ICONIC LIVE",
    title: "ICONIC LIVE — Concerts, Tours & Culture",
    description: "Tampa Halloween. Summer Walker — Soul Symphony. DJ Snake — Pardon My French. Tickets, VIP, sponsorships and merch under one live-entertainment platform.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ICONIC LIVE — Concerts, Tours & Culture",
    description: "Headline concerts, multi-city tours, VIP, sponsorships and event merchandise.",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ICONIC LIVE",
    url: SITE_URL,
    description: "Live entertainment platform producing headline concerts, multi-city tours, arena and stadium experiences, premium hospitality and event merchandise.",
    areaServed: ["Atlanta", "Tampa", "Los Angeles", "Las Vegas", "Dallas", "New York City", "Washington DC"],
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
