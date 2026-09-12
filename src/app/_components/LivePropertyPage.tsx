import Link from "next/link";
import PlatformShell from "./PlatformShell";

type Stat = { label: string; value: string; body?: string };
type Pillar = { label: string; title: string; body: string };
type Stop = { city: string; venue: string; meta?: string; note?: string; href?: string };
type LineupItem = { name: string; src: string; href?: string };
type GalleryItem = { title: string; src: string };
type BrandMark = { src: string; alt: string; maxWidth?: number };

type Props = {
  eyebrow:string; title:string; sub:string; visual:string; visualPosition?:string; status:string; accent:string;
  stats:Stat[]; pillars:Pillar[]; brandMarks?:BrandMark[]; brandMarksAsTitle?:boolean; lineup?:LineupItem[];
  lineupEyebrow?:string; gallery?:GalleryItem[]; stops?:Stop[]; stopsEyebrow?:string; stopsTitle?:string;
  primaryLabel?:string; primaryHref?:string; secondaryLabel?:string; secondaryHref?:string; merchLabel?:string; merchHref?:string;
  footerEyebrow?:string; footerTitle?:string;
};

function themeFor(title:string){
  const t=title.toLowerCase();
  if(t.includes("summer walker")) return "summer";
  if(t.includes("dj snake")||t.includes("pardon my french")) return "pmf";
  if(t.includes("nightmare")||t.includes("tampa")) return "tampa";
  return "iconic";
}

export default function LivePropertyPage({
  eyebrow,title,sub,visual,visualPosition="center center",status,stats,pillars,brandMarks,lineup,lineupEyebrow="Lineup",gallery,stops,stopsEyebrow="Tour Architecture",stopsTitle="The route becomes part of the campaign.",
  primaryLabel="Get Access",primaryHref="/access?intent=presale",secondaryLabel="Partnerships",secondaryHref="/access?intent=sponsorship",merchLabel="Merch",merchHref="/merch",footerEyebrow="ICONIC LIVE",footerTitle="BE THERE BEFORE EVERYONE ELSE.",
}:Props){
  const theme=themeFor(title);
  return <PlatformShell><article className={`ir-property ir-theme-${theme}`}>
    <section className="ir-property-hero">
      <img src={visual} alt={title} style={{objectPosition:visualPosition}}/>
      <div className="ir-property-hero-shade"/>
      <div className="ir-property-hero-copy">
        <span>{eyebrow}</span>
        {brandMarks?.length?<div className="ir-property-marks">{brandMarks.map(mark=><img key={mark.src} src={mark.src} alt={mark.alt}/>)}</div>:<h1>{title}</h1>}
        <p>{sub}</p>
        <div className="ir-property-actions"><Link href={primaryHref}>{primaryLabel}</Link><Link href={secondaryHref}>{secondaryLabel}</Link><Link href={merchHref}>{merchLabel}</Link></div>
      </div>
      <div className="ir-property-status">{status}</div>
    </section>

    <section className="ir-property-stats">{stats.map(stat=><div key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong>{stat.body?<p>{stat.body}</p>:null}</div>)}</section>

    {lineup?.length?<section className="ir-property-section ir-lineup-section"><div className="ir-property-heading"><span>{lineupEyebrow}</span><h2>The people carrying the night.</h2></div><div className="ir-lineup-grid">{lineup.map(artist=>artist.href?<Link href={artist.href} key={artist.name}><img src={artist.src} alt={artist.name}/><span>{artist.name}</span></Link>:<div key={artist.name}><img src={artist.src} alt={artist.name}/><span>{artist.name}</span></div>)}</div></section>:null}

    <section className="ir-property-section ir-experience-section"><div className="ir-property-heading"><span>The Experience</span><h2>One clear world. No filler.</h2></div><div className="ir-experience-list">{pillars.map((pillar,index)=><article key={pillar.title}><span>0{index+1}</span><div><small>{pillar.label}</small><h3>{pillar.title}</h3><p>{pillar.body}</p></div></article>)}</div></section>

    {gallery?.length?<section className="ir-property-section ir-gallery-section"><div className="ir-property-heading"><span>Visual World</span><h2>The campaign has to feel alive.</h2></div><div className="ir-gallery-grid">{gallery.map((item,index)=><figure className={index===0?"wide":""} key={item.title}><img src={item.src} alt={item.title}/><figcaption>{item.title}</figcaption></figure>)}</div></section>:null}

    {stops?.length?<section className="ir-property-section ir-stops-section"><div className="ir-property-heading"><span>{stopsEyebrow}</span><h2>{stopsTitle}</h2></div><div className="ir-stop-list">{stops.map((stop,index)=>{const inner=<><span>0{index+1}</span><div><strong>{stop.city}</strong><p>{stop.venue}{stop.meta?` · ${stop.meta}`:""}</p>{stop.note?<small>{stop.note}</small>:null}</div><em>↗</em></>;return stop.href?<Link href={stop.href} key={`${stop.city}-${stop.venue}`}>{inner}</Link>:<div key={`${stop.city}-${stop.venue}`}>{inner}</div>})}</div></section>:null}

    <section className="ir-property-close"><img src={visual} alt="" style={{objectPosition:visualPosition}}/><div/><div className="ir-property-close-copy"><span>{footerEyebrow}</span><h2>{footerTitle}</h2><div><Link href={primaryHref}>{primaryLabel} →</Link><Link href={merchHref}>{merchLabel}</Link></div></div></section>
  </article></PlatformShell>;
}
