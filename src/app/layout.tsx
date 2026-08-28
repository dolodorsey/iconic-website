import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://iconic-atl.com"),
  title: {
    default: "ICONIC — Concerts, Festivals & Arena Events",
    template: "%s | ICONIC",
  },
  description: "ICONIC is the live entertainment platform behind headline concerts, recurring series and arena-scale cultural events in Atlanta, New York and Las Vegas.",
  applicationName: "ICONIC",
  keywords: ["ICONIC", "concerts", "festivals", "arena events", "Atlanta concerts", "New York concerts", "Resorts World", "Las Vegas entertainment", "GROWN-ISH", "Soul Session", "ENCORE", "Funny Business", "BRAVO", "Nightmare on Channelside"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "ICONIC",
    title: "ICONIC — Concerts, Festivals & Arena Events",
    description: "Headline concerts. Recurring series. Arena-scale cultural moments. Atlanta · New York · Las Vegas coming soon.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ICONIC — Live Entertainment",
    description: "Headline concerts. Recurring series. Arena-scale cultural moments.",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ICONIC",
    url: "https://iconic-atl.com",
    description: "Live entertainment company producing concerts, festivals, comedy, recurring concert series and arena-scale events.",
    areaServed: ["Atlanta", "New York City", "Las Vegas"],
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
