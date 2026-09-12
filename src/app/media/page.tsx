import type { Metadata } from "next";
import PlatformShell from "@/app/_components/PlatformShell";
import AccessForm from "@/app/access/AccessForm";

const HERO="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-platform-aftermovie-archive.png?v=1789179965";
export const metadata:Metadata={title:"Media & Archive",description:"ICONIC archives live events through photography, recap films, editorial documentation and campaign media."};

const archive=[
  ["PHOTOGRAPHY","High-end event and lifestyle photography that preserves people, atmosphere, production and detail."],
  ["RECAP FILMS","Aftermovies and short-form edits that translate the room into something people can feel later."],
  ["EDITORIAL DOCUMENTATION","Structured storytelling around cities, artists, partners, production and cultural impact."],
  ["CAMPAIGN ASSETS","Media built to support announcements, sponsor proof, future sales and the next city."],
] as const;
const uses=[
  ["PRESS + EDITORIAL","Approved imagery, event context and media-request routing."],
  ["PARTNER PROOF","Recaps and documentation that show how brands lived inside an experience."],
  ["LICENSING","Archive and content requests routed separately from general access."],
  ["FUTURE CAMPAIGNS","Past proof becomes creative fuel for the next city, property or partnership."],
] as const;

export default function MediaPage(){return <PlatformShell><main className="cp-page">
  <section className="cp-hero"><div className="cp-hero-copy"><div className="cp-kicker">ICONIC MEDIA + ARCHIVE</div><h1>EVERY MOMENT BECOMES PROOF.</h1><p>Photography, recap films, editorial documentation and campaign media extend the cultural life of an ICONIC event after the room clears.</p></div><div className="cp-hero-media"><img src={HERO} alt="ICONIC media archive and aftermovie"/></div></section>
  <section className="cp-section"><div className="cp-section-head"><div className="cp-kicker">The Archive</div><div><h2>Cultural currency needs documentation.</h2></div></div><div className="cp-list">{archive.map(([title,body],i)=><div className="cp-row" key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><p>{body}</p><em>•</em></div>)}</div></section>
  <section className="cp-section alt"><div className="cp-section-head"><div className="cp-kicker">What The Archive Does</div><div><h2>One capture. Multiple jobs.</h2></div></div><div className="cp-grid">{uses.map(([title,body],i)=><article className="cp-tile" key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><p>{body}</p></article>)}</div></section>
  <section className="cp-section"><div className="cp-section-head"><div className="cp-kicker">Media Request</div><div><h2>Press, licensing, archive and content requests enter here.</h2></div></div><div className="cp-form-wrap"><AccessForm intent="media" event="iconic-media-archive"/></div></section>
</main></PlatformShell>}
