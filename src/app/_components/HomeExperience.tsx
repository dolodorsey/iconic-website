"use client";

import Link from "next/link";
import { DJ_SNAKE_AND_FRIENDS_LOGO, PARDON_MY_FRENCH_TOUR_LOGO, SUMMER_WALKER_SOUL_SYMPHONY_LOGO } from "./tour-brand-assets";

const SUMMER="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-summer-walker-soul-symphony.jpg?v=1789170574";
const DJ="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-dj-snake-pardon-my-french.jpg?v=1789170586";
const PLATFORM="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-platform-concert-series.png?v=1789179952";

const slate=[
  {label:"Tampa Halloween",meta:"Nightmare on Channelside",href:"/tampa-halloween",src:PLATFORM,theme:"red"},
  {label:"Summer Walker",meta:"Soul Symphony · 10-city platform",href:"/summer-walker",src:SUMMER,theme:"plum",logo:SUMMER_WALKER_SOUL_SYMPHONY_LOGO},
  {label:"DJ Snake",meta:"Pardon My French · 5-city stadium run",href:"/dj-snake-pardon-my-french",src:DJ,theme:"red",logos:[DJ_SNAKE_AND_FRIENDS_LOGO,PARDON_MY_FRENCH_TOUR_LOGO]},
];

const divisions=[
  ["LIVE","Concerts, tours and arena-scale moments.","/events"],
  ["EXPERIENCES","Nightlife, hospitality and cultural worlds.","/experiences"],
  ["MUSIC","Artists, DJs, releases and programming.","/music"],
  ["CREATORS","Talent, development and opportunity.","/creators"],
  ["MEDIA","Campaigns, archive and cultural proof.","/media"],
  ["MERCH","Collectible culture connected to the event.","/merch"],
] as const;

export default function HomeExperience({tampa,archive,merchTiles}:{tampa:string;archive:string;merchTiles:{label:string;href:string;src:string}[]}){
  return <div className="ir-home">
    <section className="ir-home-hero">
      <img src={tampa} alt="ICONIC live experience"/>
      <div className="ir-home-hero-shade"/>
      <div className="ir-home-hero-copy">
        <span>ICONIC</span>
        <h1>WE BUILD MOMENTS PEOPLE REMEMBER.</h1>
        <p>Live entertainment, culture, creators, music, media and commerce — built around experiences worth showing up for.</p>
        <div><Link href="/events" className="ir-primary">Explore Events</Link><Link href="/partners" className="ir-secondary">Partner With ICONIC</Link></div>
      </div>
    </section>

    <section className="ir-home-section ir-slate">
      <div className="ir-section-heading"><span>Current Slate</span><h2>Three flagship worlds. Three completely different identities.</h2></div>
      <div className="ir-slate-grid">
        {slate.map(item=><Link href={item.href} className={`ir-slate-card ${item.theme}`} key={item.label}>
          <img className="ir-slate-image" src={item.src} alt=""/>
          <div className="ir-slate-shade"/>
          <div className="ir-slate-copy">
            {item.logo?<img className="ir-slate-logo solo" src={item.logo} alt=""/>:null}
            {item.logos?<div className="ir-slate-logos">{item.logos.map(src=><img src={src} alt="" key={src}/>)}</div>:null}
            {!item.logo&&!item.logos?<strong>{item.label}</strong>:null}
            <span>{item.meta}</span>
          </div>
        </Link>)}
      </div>
    </section>

    <section className="ir-division-strip">
      {divisions.map(([title,,href])=><Link href={href} key={title}>{title}<span>↗</span></Link>)}
    </section>

    <section className="ir-feature">
      <img src={SUMMER} alt="Summer Walker Soul Symphony"/>
      <div className="ir-feature-shade"/>
      <div className="ir-feature-copy">
        <span>Featured World</span>
        <img src={SUMMER_WALKER_SOUL_SYMPHONY_LOGO} alt="Summer Walker Soul Symphony Tour"/>
        <p>Modern R&B meets orchestral scale. Built as a premium city-by-city experience — not another generic tour landing page.</p>
        <Link href="/summer-walker">Enter Soul Symphony →</Link>
      </div>
    </section>

    <section className="ir-home-section ir-ecosystem">
      <div className="ir-section-heading"><span>The Platform</span><h2>ICONIC is bigger than the stage.</h2></div>
      <div className="ir-ecosystem-list">
        {divisions.map(([title,body,href],index)=><Link href={href} key={title}><span>0{index+1}</span><strong>{title}</strong><p>{body}</p><em>↗</em></Link>)}
      </div>
    </section>

    <section className="ir-partner-band">
      <div><span>Partnerships</span><h2>PUT YOUR BRAND INSIDE CULTURE.</h2><p>Activation, hospitality, content, merchandise, city takeovers and fan access should feel native to the experience — not pasted onto it.</p><Link href="/partners">Explore Partnerships →</Link></div>
    </section>

    <section className="ir-home-section ir-archive">
      <div className="ir-section-heading"><span>Latest / Archive</span><h2>The campaign should look alive before the doors open.</h2></div>
      <div className="ir-archive-grid">
        <figure className="wide"><img src={archive} alt="ICONIC archive"/><figcaption>ICONIC LIVE</figcaption></figure>
        {merchTiles.map(tile=><Link href={tile.href} key={tile.label}><img src={tile.src} alt={tile.label}/><span>{tile.label}</span></Link>)}
      </div>
    </section>
  </div>;
}
