import type { Metadata } from "next";
import Link from "next/link";
import PlatformShell from "@/app/_components/PlatformShell";
import AccessForm from "./AccessForm";

export const metadata:Metadata={title:"Access",description:"Tickets, presale, VIP, sponsorship, creator, music, booking, merch, media and partnership access for ICONIC."};
const intents={
  presale:{eyebrow:"Tickets + Presale",title:"GET IN BEFORE THE RUSH.",body:"Ticket releases, presale windows and on-sale alerts."},
  vip:{eyebrow:"VIP + Hospitality",title:"UPGRADE THE ENTIRE NIGHT.",body:"Premium seating, suites, hosted hospitality and elevated arrival."},
  travel:{eyebrow:"City Weekend",title:"BUILD THE WHOLE WEEKEND.",body:"Travel, hotel, arrival and destination coordination around an ICONIC event."},
  merch:{eyebrow:"Merch Vault",title:"TAKE THE SHOW WITH YOU.",body:"Event drops, limited product and release access."},
  partners:{eyebrow:"Partners",title:"BUILD THE NEXT ICONIC MOMENT.",body:"Sponsors, venues, talent partners and strategic collaborations."},
  sponsorship:{eyebrow:"Sponsorship",title:"OWN A REAL PART OF THE EXPERIENCE.",body:"Inventory, integration, hospitality and activation opportunities."},
  media:{eyebrow:"Media + Archive",title:"KEEP THE MOMENT MOVING.",body:"Press, archive, licensing and post-event asset requests."},
  creator:{eyebrow:"Creators",title:"ENTER THE CREATOR ECOSYSTEM.",body:"Creator onboarding, booking and development opportunities."},
  music:{eyebrow:"ICONIC MUSIC",title:"MOVE THE SOUND FORWARD.",body:"Artist development, DJ curation, bookings and music opportunities."},
  booking:{eyebrow:"Book ICONIC",title:"BUILD THE ROOM. BUILD THE MEMORY.",body:"Corporate, private, release, exhibition and venue programming requests."},
  contact:{eyebrow:"Contact",title:"TELL ICONIC WHAT YOU’RE BUILDING.",body:"General inquiries routed to the correct operating lane."},
} as const;
type IntentKey=keyof typeof intents;

export default async function AccessPage({searchParams}:{searchParams?:Promise<{intent?:string;event?:string}>|{intent?:string;event?:string}}){
  const params=await Promise.resolve(searchParams||{});const raw=params.intent||"presale";const key:IntentKey=raw in intents?raw as IntentKey:"presale";const current=intents[key];const event=params.event||undefined;
  return <PlatformShell><main className="cp-page">
    <section className="cp-graphic-hero" style={{background:"linear-gradient(145deg,#0a0a0a,#111 56%,#11190b)"}}><div><div className="cp-kicker">{current.eyebrow}</div><h1>{current.title}</h1><p>{current.body}</p>{event?<div className="cp-note" style={{marginTop:20,maxWidth:520}}>Routing property: {event.replaceAll("-"," ")}</div>:null}</div></section>
    <section className="cp-section"><div className="cp-section-head"><div className="cp-kicker">Submit Request</div><div><h2>One request. Correct operating lane.</h2><p>The form preserves access type, event property and campaign attribution without forcing every inquiry through the same funnel.</p></div></div><div style={{display:"grid",gridTemplateColumns:"minmax(0,1.35fr) minmax(260px,.65fr)",gap:22,alignItems:"start"}}><AccessForm intent={key} event={event}/><aside className="cp-note"><b style={{color:"#f5f5f3"}}>WHAT HAPPENS NEXT</b><br/><br/>01 — Request is captured securely.<br/><br/>02 — It is tagged by access type and property.<br/><br/>03 — Campaign source and UTM attribution are preserved.<br/><br/>04 — The request stays attached to its operating lane for follow-up.</aside></div></section>
    <section className="cp-section alt"><div className="cp-section-head"><div className="cp-kicker">Choose Your Path</div><div><h2>Tickets are only one way into ICONIC.</h2></div></div><div className="cp-route-grid">{Object.entries(intents).map(([slug,item],i)=><Link className="cp-route" key={slug} href={`/access?intent=${slug}${event?`&event=${encodeURIComponent(event)}`:""}`}><span>{String(i+1).padStart(2,"0")} · {item.eyebrow}</span><strong>{item.eyebrow}</strong><em>↗</em></Link>)}</div></section>
  </main></PlatformShell>;
}
