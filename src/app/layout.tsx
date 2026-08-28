import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICONIC — Concerts, Festivals & Arena Events",
  description: "ICONIC produces major concerts, festivals, arena events and recurring city concert series in Atlanta, New York and beyond.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#050505" }}>{children}</body>
    </html>
  );
}
