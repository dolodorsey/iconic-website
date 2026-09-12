import type { Metadata } from "next";
import Link from "next/link";
import PlatformShell from "@/app/_components/PlatformShell";
import AccessForm from "@/app/access/AccessForm";

export const metadata:Metadata={title:"ICONIC MUSIC",description:"ICONIC MUSIC focuses on artist discovery, development, release strategy, DJ curation and live performance integration."};

const services=[
  ["ARTIST DEVELOPMENT","Build the artist, positioning and next-stage development path."],
  ["PRODUCTION + STUDIO STRATEGY","Connect sound, collaborators and production decisions to the bigger brand direction."],
  ["RELEASE ROLLOUTS","Package releases with campaign thinking, content moments and audience-building mechanics."],
  ["PERFORMANCE + DJ BOOKINGS","Integrate artists and DJs into ICONIC events and aligned external opportunities."],
  ["EVENT SOUND CURATION","Treat music programming as part of the identity of the room, not background filler."],
] as const;

export default function MusicPage(){return <PlatformShell><main className="cp-page">
  <section className="cp-graphic-hero" style={{background:"linear-gradient(135deg,#0b0b0b 0%,#151515 52%,#241313 100%)"}}><div><div className="cp-kicker">ICONIC MUSIC™</div><h1>MUSIC LIVES HIGHER HERE.</h1><p>Artist discovery, development, release strategy, DJ curation and live performance integration — connected directly to the rooms and audiences ICONIC already builds.</p><div className="cp-actions"><Link href="/access?intent=music&event=iconic-music" className="cp-btn primary">Submit Music</Link><Link href="/events" className="cp-btn">See Live Platform</Link></div></div></section>
  <section className="cp-section"><div className="cp-section-head"><div className="cp-kicker">Services</div><div><h2>Develop the sound. Build the context. Create the stage.</h2></div></div><div className="cp-list">{services.map(([title,body],i)=><div className="cp-row" key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><p>{body}</p><em>•</em></div>)}</div></section>
  <section className="cp-section alt"><div className="cp-section-head"><div className="cp-kicker">Live Integration</div><div><h2>Development connects to real rooms.</h2><p>Soul Symphony, Pardon My French and ICONIC LIVE remain separate properties; ICONIC MUSIC provides a development and programming lane that can feed qualified talent into opportunities.</p></div></div><div className="cp-route-grid"><Link className="cp-route" href="/summer-walker"><span>R&B × ORCHESTRAL</span><strong>Soul Symphony</strong><em>↗</em></Link><Link className="cp-route" href="/dj-snake-pardon-my-french"><span>GLOBAL DJ CULTURE</span><strong>Pardon My French</strong><em>↗</em></Link><Link className="cp-route" href="/events"><span>CONCERTS + TOURS</span><strong>ICONIC LIVE</strong><em>↗</em></Link></div></section>
  <section className="cp-section"><div className="cp-section-head"><div className="cp-kicker">Music Submission</div><div><h2>Send the sound, the market and the next move.</h2></div></div><div className="cp-form-wrap"><AccessForm intent="music" event="iconic-music"/></div></section>
</main></PlatformShell>}
