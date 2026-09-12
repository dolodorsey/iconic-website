import Link from "next/link";
import { Shell } from "./IconicPage";

type Stat = { label: string; value: string; body?: string };
type Pillar = { label: string; title: string; body: string };
type Stop = { city: string; venue: string; meta?: string; note?: string; href?: string };
type LineupItem = { name: string; src: string; href?: string };
type GalleryItem = { title: string; src: string };
type BrandMark = { src: string; alt: string; maxWidth?: number };

type LivePropertyPageProps = {
  eyebrow: string;
  title: string;
  sub: string;
  visual: string;
  visualPosition?: string;
  status: string;
  accent: string;
  stats: Stat[];
  pillars: Pillar[];
  brandMarks?: BrandMark[];
  brandMarksAsTitle?: boolean;
  lineup?: LineupItem[];
  lineupEyebrow?: string;
  gallery?: GalleryItem[];
  stops?: Stop[];
  stopsEyebrow?: string;
  stopsTitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  merchLabel?: string;
  merchHref?: string;
  footerEyebrow?: string;
  footerTitle?: string;
};

const visuallyHidden = {
  position: "absolute" as const,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap" as const,
  border: 0,
};

function BrandLockup({marks,compact=false}:{marks:BrandMark[];compact?:boolean}){
  return <div style={{display:"flex",alignItems:"center",gap:compact?14:18,flexWrap:"wrap",margin:compact?"10px 0 18px":"14px 0 18px"}}>
    {marks.map((mark)=><img
      key={mark.src}
      src={mark.src}
      alt={mark.alt}
      style={{
        width:`min(${compact?Math.min(mark.maxWidth||320,260):mark.maxWidth||360}px, ${compact?"38vw":"76vw"})`,
        maxHeight:compact?105:210,
        height:"auto",
        objectFit:"contain",
        filter:"drop-shadow(0 14px 28px rgba(0,0,0,.58))",
      }}
    />)}
  </div>;
}

export default function LivePropertyPage({
  eyebrow,
  title,
  sub,
  visual,
  visualPosition = "center center",
  status,
  accent,
  stats,
  pillars,
  brandMarks,
  brandMarksAsTitle = false,
  lineup,
  lineupEyebrow = "THE LINEUP",
  gallery,
  stops,
  stopsEyebrow = "Tour Architecture",
  stopsTitle = "The route becomes part of the campaign.",
  primaryLabel = "Get First Access",
  primaryHref = "/access?intent=presale",
  secondaryLabel = "Partnership Access",
  secondaryHref = "/access?intent=sponsorship",
  merchLabel = "Shop Merch",
  merchHref = "/merch",
  footerEyebrow = "ICONIC LIVE",
  footerTitle = "BE THERE BEFORE EVERYONE ELSE.",
}: LivePropertyPageProps) {
  return (
    <Shell>
      <div className="ov-page">
        <section className="ov-live-hero">
          <img src={visual} alt={title} style={{objectPosition: visualPosition}} fetchPriority="high" />
          <div className="ov-live-hero-inner">
            <div className="ov-live-hero-copy">
              <div className="ov-kicker">{eyebrow}</div>
              {brandMarks?.length ? <BrandLockup marks={brandMarks}/> : null}
              <h1 className="ov-display" style={brandMarksAsTitle?visuallyHidden:undefined}>{title}</h1>
              <p className="ov-copy">{sub}</p>
              <div className="ov-actions">
                <Link className="ov-btn" href={primaryHref}>{primaryLabel} →</Link>
                <Link className="ov-btn ghost" href={secondaryHref}>{secondaryLabel}</Link>
                <Link className="ov-btn ghost" href={merchHref}>{merchLabel}</Link>
              </div>
            </div>
            <aside className="ov-live-media-card" style={{boxShadow:`inset 0 0 80px ${accent}18`}}>
              <div className="ov-kicker">CURRENT STATUS</div>
              <strong>{status}</strong>
              <p className="ov-copy">Tickets, premium access, merch and partner opportunities live on separate conversion paths so the event can grow without flattening into one generic page.</p>
              <Link className="ov-btn ghost" href={primaryHref}>Open Access →</Link>
            </aside>
          </div>
        </section>

        {lineup && lineup.length > 0 ? (
          <section className="ov-lineup">
            <div className="ov-shell">
              <div className="ov-section-label"><span>{lineupEyebrow}</span><small>ARTIST-SPECIFIC WORLDS</small></div>
              <div className="ov-lineup-grid">
                {lineup.map((artist) => {
                  const card = <><img src={artist.src} alt={artist.name}/><strong>{artist.name}</strong></>;
                  return artist.href ? <Link className="ov-lineup-card" href={artist.href} key={artist.name}>{card}</Link> : <div className="ov-lineup-card" key={artist.name}>{card}</div>;
                })}
              </div>
            </div>
          </section>
        ) : null}

        <div className="ov-shell">
          <div className="ov-stat-row">
            {stats.map((stat) => <div className="ov-stat-card" key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong>{stat.body ? <p>{stat.body}</p> : null}</div>)}
          </div>
        </div>

        <section style={{borderTop:"1px solid rgba(226,176,74,.26)",borderBottom:"1px solid rgba(226,176,74,.26)",background:"rgba(226,176,74,.015)"}}>
          <div className="ov-shell">
            <div style={{paddingTop:30}}><div className="ov-kicker">THE EXPERIENCE</div><h2 className="ov-display" style={{fontSize:"clamp(44px,5vw,76px)",maxWidth:880,marginTop:14}}>BUILT AS A WORLD — NOT JUST A DATE ON A FLYER.</h2></div>
            <div className="ov-pillar-grid">
              {pillars.map((pillar,index) => <article className="ov-pillar-card" key={pillar.title} style={{boxShadow:`inset 0 0 65px ${accent}10`}}><span>{String(index+1).padStart(2,"0")} / {pillar.label}</span><h3>{pillar.title}</h3><p>{pillar.body}</p></article>)}
            </div>
          </div>
        </section>

        {gallery && gallery.length > 0 ? (
          <section style={{paddingTop:30}}>
            <div className="ov-shell">
              <div className="ov-section-label"><span>THE VISUAL WORLD</span><small>CAMPAIGN · CITY · MERCH · CULTURE</small></div>
              <div className="ov-gallery-grid">
                {gallery.map((item) => <article className="ov-gallery-card" key={item.title}><img src={item.src} alt={item.title}/><strong>{item.title}</strong></article>)}
              </div>
            </div>
          </section>
        ) : null}

        {stops && stops.length > 0 ? (
          <section style={{padding:"34px 0",borderTop:"1px solid rgba(226,176,74,.26)"}}>
            <div className="ov-shell">
              <div className="ov-kicker">{stopsEyebrow}</div>
              <h2 className="ov-display" style={{fontSize:"clamp(42px,5vw,72px)",maxWidth:900,margin:"14px 0 24px"}}>{stopsTitle}</h2>
              <div className="ov-pillar-grid">
                {stops.map((stop,index) => {
                  const content = <><span>{String(index+1).padStart(2,"0")}{stop.meta ? ` / ${stop.meta}` : ""}</span><h3>{stop.city}</h3><p><b style={{color:"#fff7e7"}}>{stop.venue}</b>{stop.note ? ` — ${stop.note}` : ""}</p></>;
                  return stop.href ? <Link href={stop.href} className="ov-pillar-card" style={{color:"inherit",textDecoration:"none"}} key={`${stop.city}-${stop.venue}`}>{content}</Link> : <article className="ov-pillar-card" key={`${stop.city}-${stop.venue}`}>{content}</article>;
                })}
              </div>
            </div>
          </section>
        ) : null}

        <section className="ov-feature-band" style={{minHeight:380,borderTop:"1px solid rgba(226,176,74,.26)"}}>
          <img src={visual} alt="" style={{objectPosition:visualPosition}} />
          <div className="ov-feature-band-copy">
            <div className="ov-kicker">{footerEyebrow}</div>
            {brandMarks?.length ? <BrandLockup marks={brandMarks} compact/> : null}
            <h2 className="ov-display">{footerTitle}</h2>
            <div className="ov-actions"><Link className="ov-btn" href={primaryHref}>{primaryLabel} →</Link><Link className="ov-btn ghost" href={merchHref}>{merchLabel}</Link></div>
          </div>
        </section>
      </div>
    </Shell>
  );
}
