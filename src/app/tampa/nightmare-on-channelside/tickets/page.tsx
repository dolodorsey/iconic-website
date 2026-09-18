import type { Metadata } from "next";
import TicketFaceClient from "./TicketFaceClient";

const TICKETMASTER="https://www.ticketmaster.com/nightmare-on-channelside-tampa-10-31-2026/event/0D006514C6E3B429";

export const metadata: Metadata = {
  title:"Nightmare on Channelside Tickets | ICONIC LIVE",
  description:"Start with ICONIC LIVE, apply your promoter or campaign tracking code, then continue to the official Ticketmaster event inventory.",
  alternates:{canonical:"/tampa/nightmare-on-channelside/tickets"},
};

export default function NightmareTicketFace(){
  return <TicketFaceClient ticketmasterUrl={TICKETMASTER}/>;
}
