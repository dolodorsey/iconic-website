"use client";

import Link from "next/link";
import { DJ_SNAKE_AND_FRIENDS_LOGO, PARDON_MY_FRENCH_TOUR_LOGO, SUMMER_WALKER_SOUL_SYMPHONY_LOGO } from "./tour-brand-assets";

const PLATFORM="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-platform-concert-series.png?v=1789179952";

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
    <section className="ir-home-hero ir-home-hero-corporate">
      <img src={PLATFORM} alt="ICONIC live entertainment platform"/>
      <div className="ir-home-hero-shade"/>
      <div className="ir-home-hero-copy">
        <span>ICONIC</span>
        <h1>WE BUILD MOMENTS PEOPLE REMEMBER.</h1>
        <p>Live entertainment, culture, creators, music, media and commerce — built around experiences worth showing up for.</p>
        <div><Link href="/events" className="ir-primary">Explore Events</Link><Link href="/partners" className="ir-secondary">Partner With ICONIC</Link></div>
      </div>
    </section>

    <section className="ir-home-section ir-slate">
      <div className="ir-section-heading"><span>Current Slate</span><h2>Three flagship worlds. Three different identities.</h2></div>
      <div className="ir-slate-grid">
        <Link href="/tampa-halloween" className="ir-slate-card ir-slate-graphic tampa"><div className="ir-slate-copy"><small>ICONIC LIVE · TAMPA</small><strong>NIGHTMARE<br/>ON CHANNELSIDE</strong><span>Halloween arena world →</span></div></Link>
        <Link href="/summer-walker" className="ir-slate-card ir-slate-graphic summer"><div className="ir-slate-copy"><small>ICONIC LIVE · SOUL</small><img className="ir-slate-logo solo" src={SUMMER_WALKER_SOUL_SYMPHONY_LOGO} alt="Summer Walker Soul Symphony Tour"/><span>10-city experience platform →</span></div></Link>
        <Link href="/dj-snake-pardon-my-french" className="ir-slate-card ir-slate-graphic pmf"><div className="ir-slate-copy"><small>ICONIC LIVE · STADIUM</small><div className="ir-slate-logos"><img src={DJ_SNAKE_AND_FRIENDS_LOGO} alt="DJ Snake and Friends"/><img src={PARDON_MY_FRENCH_TOUR_LOGO} alt="Pardon My French Tour"/></div><span>5-city stadium platform →</span></div></Link>
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
