import type { Metadata } from "next";
import { Suspense } from "react";
import AccessClient from "./AccessClient";

export const metadata: Metadata = {
  title: "Access",
  description: "Tickets, presale, VIP, sponsorship, merch, media and partnership access for ICONIC LIVE concerts and tours.",
  openGraph: {
    title: "Access | ICONIC LIVE",
    description: "Request tickets, VIP, sponsorship, merch, media or partnership access for ICONIC LIVE.",
    type: "website",
  },
};

function AccessFallback(){
  return <main style={{minHeight:"100vh",background:"#050403"}} />;
}

export default function AccessPage(){
  return <Suspense fallback={<AccessFallback />}><AccessClient /></Suspense>;
}
