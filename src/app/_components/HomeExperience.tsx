"use client";

import Link from "next/link";
import { SUMMER_WALKER_SOUL_SYMPHONY_LOGO } from "./tour-brand-assets";

const PLATFORM="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-platform-concert-series.png?v=1789179952";

// APPROVED PROPERTY VISUALS — use the same official imagery as each property's destination page.
// Do not substitute stock, generic, recycled, or cross-property imagery on ICONIC cards.
const TAMPA_VISUAL="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-01.png?v=1788994167";
const SUMMER_VISUAL="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-summer-walker-soul-symphony.jpg?v=1789170574";
const PMF_VISUAL="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-dj-snake-pardon-my-french.jpg?v=1789170586";

const divisions=[
  ["LIVE","Concerts, tours and arena-scale moments.","/events"],
  ["EXPERIENCES","Nightlife, hospitality and cultural worlds.","/experiences"],
  ["MUSIC","Artists, DJs, releases and programming.","/music"],
  ["CREATORS","Talent, development and opportunity.","/creators"],
  ["MEDIA","Campaigns, archive and cultural proof.","/media"],
  ["MERCH","Collectible culture connected to the event.","/merch"],
] as const;

export default function HomeExperience(_: {tampa:string;archive:string;merchTiles:{label:string;href:string;src:string}[]}){
  return <div className="ir-home">
    {/* NON-NEGOTIABLE: homepage animation/hero is visual-only. No HTML/CSS copy, CTA, badge or label may overlay it. */}
    <section className="ir-home-hero ir-home-hero-corporate" aria-label="ICONIC live entertainment platform">
      <img src={PLATFORM} alt="ICONIC live entertainment platform"/>
      <div className="ir-home-hero-shade"/>
    </section>

    {/* All homepage headline/copy/CTAs live BELOW the animation canvas, never on top of it. */}
    <section className="ir-home-section" style={{paddingTop:"56px",paddingBottom:"64px"}}>
      <div className="ir-section-heading" style={{maxWidth:"980px"}}>
        <span>ICONIC</span>
        <h1 style={{fontSize:"clamp(54px,7vw,108px)",lineHeight:.88,letterSpacing:"-.045em",margin:"14px 0 24px"}}>WE BUILD MOMENTS PEOPLE REMEMBER.</h1>
        <p style={{maxWidth:"760px",fontSize:"clamp(16px,1.5vw,21px)",lineHeight:1.55,opacity:.76,margin:"0 0 28px"}}>Live entertainment, culture, creators, music, media and commerce — built around experiences worth showing up for.</p>
        <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}><Link href="/events" className="ir-primary">Explore Events</Link><Link href="/partners" className="ir-secondary">Partner With ICONIC</Link></div>
      </div>
    </section>

    <section className="ir-home-section ir-slate">
      <div className="ir-section-heading"><span>Current Slate</span><h2>Three flagship worlds. Three different identities.</h2></div>
      <div className="ir-slate-grid">
        <Link href="/tampa-halloween" aria-label="Enter Nightmare on Channelside" className="ir-slate-card ir-slate-graphic tampa" style={{backgroundImage:`linear-gradient(180deg,rgba(0,0,0,.02) 38%,rgba(0,0,0,.84) 100%),url("${TAMPA_VISUAL}")`,backgroundSize:"cover",backgroundPosition:"center 22%"}}><div className="ir-slate-copy"><small>ICONIC LIVE · TAMPA</small><span>Nightmare on Channelside →</span></div></Link>
        <Link href="/summer-walker" aria-label="Enter Summer Walker Soul Symphony" className="ir-slate-card ir-slate-graphic summer" style={{backgroundImage:`linear-gradient(180deg,rgba(0,0,0,.02) 38%,rgba(0,0,0,.72) 100%),url("${SUMMER_VISUAL}")`,backgroundSize:"cover",backgroundPosition:"center 24%"}}><div className="ir-slate-copy"><small>ICONIC LIVE · SOUL</small><span>Soul Symphony · 10-city platform →</span></div></Link>
        <Link href="/dj-snake-pardon-my-french" aria-label="Enter DJ Snake Pardon My French" className="ir-slate-card ir-slate-graphic pmf" style={{backgroundImage:`linear-gradient(180deg,rgba(0,0,0,.02) 38%,rgba(0,0,0,.78) 100%),url("${PMF_VISUAL}")`,backgroundSize:"cover",backgroundPosition:"center 18%"}}><div className="ir-slate-copy"><small>ICONIC LIVE · STADIUM</small><span>Pardon My French · 5-city platform →</span></div></Link>
      </div>
    </section>

    <section className="ir-division-strip">{divisions.map(([title,,href])=><Link href={href} key={title}>{title}<span>↗</span></Link>)}</section>

    <section className="ir-feature ir-feature-editorial">
      <div className="ir-feature-copy">
        <span>Featured World</span>
        <img src={SUMMER_WALKER_SOUL_SYMPHONY_LOGO} alt="Summer Walker Soul Symphony Tour"/>
        <p>Modern R&B meets orchestral scale. Soul Symphony has its own visual language, hospitality system and market architecture.</p>
        <Link href="/summer-walker">Enter Soul Symphony →</Link>
      </div>
      <div className="ir-feature-number">10</div>
      <div className="ir-feature-caption">CITIES · ONE SOULFUL EXPERIENCE</div>
    </section>

    <section className="ir-home-section ir-ecosystem">
      <div className="ir-section-heading"><span>The Platform</span><h2>ICONIC is bigger than the stage.</h2></div>
      <div className="ir-ecosystem-list">{divisions.map(([title,body,href],index)=><Link href={href} key={title}><span>0{index+1}</span><strong>{title}</strong><p>{body}</p><em>↗</em></Link>)}</div>
    </section>

    <section className="ir-partner-band"><div><span>Partnerships</span><h2>PUT YOUR BRAND INSIDE CULTURE.</h2><p>Activation, hospitality, content, merchandise, city takeovers and fan access should feel native to the experience — not pasted onto it.</p><Link href="/partners">Explore Partnerships →</Link></div></section>

    <section className="ir-home-section ir-archive">
      <div className="ir-section-heading"><span>Explore ICONIC</span><h2>Move through the platform without visual clutter.</h2></div>
      <div className="ir-archive-text-grid">
        <Link href="/media" className="ir-archive-text-card"><span>01</span><strong>MEDIA + ARCHIVE</strong><p>Campaigns, aftermovies, photography and cultural proof.</p><em>↗</em></Link>
        <Link href="/creators" className="ir-archive-text-card"><span>02</span><strong>CREATORS</strong><p>Talent development, booking, packaging and opportunity.</p><em>↗</em></Link>
        <Link href="/merch" className="ir-archive-text-card"><span>03</span><strong>MERCH</strong><p>Live event commerce and official product worlds.</p><em>↗</em></Link>
        <Link href="/book" className="ir-archive-text-card"><span>04</span><strong>BOOK ICONIC</strong><p>Private, corporate, brand and venue programming.</p><em>↗</em></Link>
      </div>
    </section>
  </div>;
}
