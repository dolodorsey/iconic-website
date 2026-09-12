import type { Metadata } from "next";
import PlatformShell from "@/app/_components/PlatformShell";
import AccessForm from "@/app/access/AccessForm";

const HERO="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-platform-artist-reveal.png?v=1789179959";
export const metadata:Metadata={title:"Creators",description:"ICONIC Creators is a home for artists, DJs, performers, photographers, videographers, hosts, producers, designers and cultural tastemakers."};

const disciplines=["MUSIC ARTISTS","DJS","PAINTERS + VISUAL ARTISTS","PERFORMERS","PHOTOGRAPHERS","VIDEOGRAPHERS","HOSTS","PRODUCERS","DESIGNERS","CULTURAL TASTEMAKERS"];
const system=[
  ["BOOKING PIPELINES","Qualified creators connect to ICONIC events, partner programming and aligned opportunities."],
  ["BRAND PACKAGING","Talent gets clearer commercial positioning and stronger presentation."],
  ["MEDIA CAPTURE","Photography, video and archive create proof that travels beyond one room."],
  ["SPONSOR ACCESS","Partnership pathways are built when creator, audience and brand actually fit."],
] as const;

export default function CreatorsPage(){return <PlatformShell><main className="cp-page">
  <section className="cp-hero"><div className="cp-hero-copy"><div className="cp-kicker">ICONIC CREATORS™</div><h1>TALENT NEEDS A HOME BIG ENOUGH FOR THE VISION.</h1><p>Artists, DJs, performers, photographers, videographers, hosts, producers, designers and cultural tastemakers — connected to development, media, booking and live opportunity.</p></div><div className="cp-hero-media"><img src={HERO} alt="ICONIC creator reveal"/></div></section>
  <section className="cp-section"><div className="cp-section-head"><div className="cp-kicker">Creator Ecosystem</div><div><h2>More than a roster.</h2><p>Disciplines stay visible without turning the page into ten oversized cards.</p></div></div><div className="cp-grid">{disciplines.map((item,i)=><article className="cp-tile" key={item}><span>{String(i+1).padStart(2,"0")}</span><strong>{item}</strong></article>)}</div></section>
  <section className="cp-section alt"><div className="cp-section-head"><div className="cp-kicker">What ICONIC Provides</div><div><h2>Creative identity connects to real opportunity.</h2></div></div><div className="cp-list">{system.map(([title,body],i)=><div className="cp-row" key={title}><span>{String(i+1).padStart(2,"0")}</span><strong>{title}</strong><p>{body}</p><em>•</em></div>)}</div></section>
  <section className="cp-section"><div className="cp-section-head"><div className="cp-kicker">Creator Submission</div><div><h2>Show ICONIC what you create and where you want it to go.</h2></div></div><div className="cp-form-wrap"><AccessForm intent="creator" event="iconic-creators"/></div></section>
</main></PlatformShell>}
