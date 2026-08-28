import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ICONIC — Concerts, Festivals & Arena Events",
  description: "ICONIC produces major concerts, festivals, arena events and recurring city concert series in Atlanta, New York and Las Vegas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
