"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DJ_SNAKE_AND_FRIENDS_LOGO, PARDON_MY_FRENCH_TOUR_LOGO, SUMMER_WALKER_SOUL_SYMPHONY_LOGO } from "./tour-brand-assets";

const SUMMER="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-summer-walker-soul-symphony.jpg?v=1789170574";
const DJ="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-dj-snake-pardon-my-french.jpg?v=1789170586";

export default function HomeExperience({tampa,merch,merchTiles}:{tampa:string;merch:string;merchTiles:{label:string;href:string;src:string}[]}){
  const slides=useMemo(()=>[
    {key:"tampa",eyebrow:"ICONIC LIVE · TAMPA",headline:"MORE THAN A CONCERT.",subhead:"NIGHTMARE ON CHANNELSIDE",body:"A Halloween arena world built around headline talent, horror spectacle, VIP, nightlife energy, collectible merch and city-scale culture.",image:tampa,primary:"/tampa-halloween",primaryLabel:"Enter Tampa Halloween",secondary:"/tampa/nightmare-on-channelside/merch/shop",secondaryLabel:"Shop Official Merch"},
    {key:"summer",eyebrow:"ICONIC LIVE PRESENTS",headline:"10 CITIES. ONE SOULFUL EXPERIENCE.",subhead:"SUMMER WALKER — SOUL SYMPHONY TOUR",body:"Live vocals, orchestral arrangements, intimate staging, premium hospitality and a city-by-city cultural experience built to own the weekend.",image:SUMMER,primary:"/summer-walker",primaryLabel:"Enter Soul Symphony",secondary:"/access?intent=sponsorship&event=summer-walker-soul-symphony",secondaryLabel:"Tour Partnerships",marks:[SUMMER_WALKER_SOUL_SYMPHONY_LOGO]},
    {key:"dj",eyebrow:"ICONIC LIVE PRESENTS",headline:"5 CITIES. 5 STADIUMS.",subhead:"DJ SNAKE & FRIENDS · PARDON MY FRENCH",body:"One-night-only stadium events with oversized production, destination weekends, scarcity, premium hospitality and city-wide activation.",image:DJ,primary:"/dj-snake-pardon-my-french",primaryLabel:"Enter Pardon My French",secondary:"/access?intent=sponsorship&event=dj-snake-pardon-my-french",secondaryLabel:"Tour Partnerships",marks:[DJ_SNAKE_AND_FRIENDS_LOGO,PARDON_MY_FRENCH_TOUR_LOGO]},
  ],[tampa]);
  const [active,setActive]=useState(0);
  useEffect(()=>{const id=window.setInterval(()=>setActive(v=>(v+1)%slides.length),8000);return()=>window.clearInterval(id)},[slides.length]);
  const hero=slides[active];
  return <div className="ih-page">
    <section className="ih-hero" aria-label="ICONIC LIVE current slate">
      {slides.map((slide,index)=><img key={slide.key} src={slide.image} alt="" className={`ih-hero-bg ${index===active?"is-active":""}`} />)}
      <div className="ih-hero-shade" />
      <div className="ih-hero-inner">
        <div className="ih-hero-copy">
          <div className="ih-kicker">{hero.eyebrow}</div>
          {hero.marks?.length?<div className={`ih-hero-marks ${hero.marks.length>1?"dual":""}`}>{hero.marks.map(src=><img key={src} src={src} alt="Tour logo" />)}</div>:null}
          <h1>{hero.headline}</h1>
          <h2>{hero.subhead}</h2>
          <p>{hero.body}</p>
          <div className="ih-actions"><Link href={hero.primary} className="ih-btn">{hero.primaryLabel} →</Link><Link href={hero.secondary} className="ih-btn ghost">{hero.secondaryLabel}</Link></div>
        </div>
        <div className="ih-hero-index">
          {slides.map((slide,index)=><button key={slide.key} onClick={()=>setActive(index)} className={index===active?"is-active":""} aria-label={`Show ${slide.subhead}`}><span>0{index+1}</span><b>{slide.key==="tampa"?"TAMPA":slide.key==="summer"?"SOUL SYMPHONY":"PARDON MY FRENCH"}</b></button>)}
        </div>
      </div>
    </section>

    <section className="ih-slate-strip">
      <div><span>CURRENT SLATE</span><b>ICONIC LIVE</b></div>
      <Link href="/tampa-halloween"><span>TAMPA</span><b>Halloween Arena Event</b></Link>
      <Link href="/summer-walker"><span>SUMMER WALKER</span><b>10-City Soul Symphony</b></Link>
      <Link href="/dj-snake-pardon-my-french"><span>DJ SNAKE</span><b>5-City Stadium Run</b></Link>
      <Link href="/merch"><span>COMMERCE</span><b>Official Event Merch</b></Link>
    </section>

    <section className="ih-intro ih-shell">
      <div className="ih-kicker">THE ICONIC PLATFORM</div>
      <div className="ih-intro-grid"><h2>WE DON’T JUST BOOK SHOWS. WE BUILD WORLDS AROUND THEM.</h2><div><p>ICONIC LIVE is the live-entertainment arm for headline concerts, multi-city tours, stadium experiences, premium hospitality, merchandise, sponsorship, nightlife extensions and city-wide cultural moments.</p><Link href="/access?intent=partners" className="ih-text-link">Partner with ICONIC →</Link></div></div>
    </section>

    <section className="ih-world ih-world-tampa">
      <img src={tampa} alt="Nightmare on Channelside Tampa" />
      <div className="ih-world-overlay" />
      <div className="ih-world-copy">
        <div className="ih-kicker">WORLD 01 · TAMPA HALLOWEEN</div>
        <h2>NIGHTMARE ON CHANNELSIDE.</h2>
        <p>One night. One arena. No escape. A headline Halloween concert built to extend into VIP, nightlife, sponsors, content and collectible culture.</p>
        <div className="ih-metric-row"><div><span>HEADLINE WORLD</span><b>21 SAVAGE + LINEUP</b></div><div><span>FORMAT</span><b>HALLOWEEN ARENA EVENT</b></div><div><span>COMMERCE</span><b>LIVE MERCH SHOP</b></div></div>
        <div className="ih-actions"><Link href="/tampa-halloween" className="ih-btn">Event + Access →</Link><Link href="/tampa/nightmare-on-channelside/merch/shop" className="ih-btn ghost">Shop Merch</Link></div>
      </div>
    </section>

    <section className="ih-tour-world ih-summer-world">
      <div className="ih-tour-art"><img className="ih-tour-photo" src={SUMMER} alt="Summer Walker Soul Symphony"/><div className="ih-tour-art-shade"/><img className="ih-tour-logo solo" src={SUMMER_WALKER_SOUL_SYMPHONY_LOGO} alt="Summer Walker's Soul Symphony Tour"/></div>
      <div className="ih-tour-copy">
        <div className="ih-kicker">WORLD 02 · SUMMER WALKER</div>
        <h2>10 CITIES.<br/>ONE SOULFUL EXPERIENCE.</h2>
        <p>Emotion-first R&B at orchestral scale. Live vocals, strings, intimate staging and premium hospitality turn each city into a destination experience.</p>
        <div className="ih-tour-pillars"><div><span>01</span><b>LIVE VOCALS</b><small>Raw emotion. No shortcuts.</small></div><div><span>02</span><b>ORCHESTRAL TEXTURES</b><small>Strings and arrangements reshape the catalog.</small></div><div><span>03</span><b>OWN THE WEEKEND</b><small>Arrival, city takeover, show night and recovery.</small></div><div><span>04</span><b>MULTIPLE ECONOMIES</b><small>Tickets, VIP, suites, merch, partners, F&B and content.</small></div></div>
        <div className="ih-actions"><Link href="/summer-walker" className="ih-btn">Explore Soul Symphony →</Link><Link href="/access?intent=vip&event=summer-walker-soul-symphony" className="ih-btn ghost">VIP Access</Link></div>
      </div>
    </section>

    <section className="ih-tour-world ih-dj-world">
      <div className="ih-tour-copy">
        <div className="ih-kicker">WORLD 03 · DJ SNAKE</div>
        <div className="ih-inline-marks"><img src={DJ_SNAKE_AND_FRIENDS_LOGO} alt="DJ Snake & Friends"/><img src={PARDON_MY_FRENCH_TOUR_LOGO} alt="Pardon My French Tour"/></div>
        <h2>5 CITIES.<br/>5 STADIUMS.</h2>
        <p>Paris attitude at U.S. stadium scale: oversized production, one-night-only scarcity, city takeovers, premium arrival and a demand engine built to unlock more nights.</p>
        <div className="ih-tour-pillars"><div><span>01</span><b>STADIUM PRODUCTION</b><small>Pyro, lasers, 360 visuals and signature finale.</small></div><div><span>02</span><b>CITY TAKEOVER</b><small>The concert is one night. The experience owns the weekend.</small></div><div><span>03</span><b>SCARCITY</b><small>One night only until demand proves otherwise.</small></div><div><span>04</span><b>GLOBAL CULTURE</b><small>Music, people and culture without borders.</small></div></div>
        <div className="ih-actions"><Link href="/dj-snake-pardon-my-french" className="ih-btn">Explore Pardon My French →</Link><Link href="/access?intent=vip&event=dj-snake-pardon-my-french" className="ih-btn ghost">VIP Access</Link></div>
      </div>
      <div className="ih-tour-art"><img className="ih-tour-photo" src={DJ} alt="DJ Snake Pardon My French"/><div className="ih-tour-art-shade"/></div>
    </section>

    <section className="ih-economy ih-shell">
      <div className="ih-kicker">THE ICONIC ECONOMY</div>
      <div className="ih-section-head"><h2>ONE AUDIENCE. MULTIPLE REVENUE LANES.</h2><p>The show creates the audience. ICONIC builds the ecosystem around that attention.</p></div>
      <div className="ih-economy-grid">
        {[['TICKETING','Core event revenue','/access?intent=presale'],['PREMIUM VIP','Elevated fan experience','/access?intent=vip'],['SUITES','Premium hospitality','/access?intent=vip'],['MERCHANDISE','Event + artist collections','/merch'],['SPONSORS','Strategic partnerships','/access?intent=sponsorship'],['HOSPITALITY','Travel + stay packages','/access?intent=travel'],['AFTERPARTIES','Nightlife + culture','/access?intent=partners'],['FOOD + BEVERAGE','On-site revenue','/access?intent=partners'],['BRAND ACTIVATIONS','Immersive engagement','/access?intent=sponsorship'],['CONTENT','Media + streaming IP','/access?intent=media']].map(([title,body,href],i)=><Link href={href} key={title}><span>{String(i+1).padStart(2,'0')}</span><b>{title}</b><small>{body}</small><em>↗</em></Link>)}
      </div>
    </section>

    <section className="ih-merch">
      <div className="ih-shell ih-merch-grid">
        <div className="ih-merch-copy"><div className="ih-kicker">ICONIC MERCH</div><h2>WEAR THE CULTURE.</h2><p>Official artist, event and city collections built to live after the stage goes dark.</p><div className="ih-actions"><Link href="/merch" className="ih-btn">Enter Merch Vault →</Link><Link href="/tampa/nightmare-on-channelside/merch/shop" className="ih-btn ghost">Shop Tampa</Link></div></div>
        <div className="ih-merch-gallery">{merchTiles.map(item=><Link href={item.href} key={item.label}><img src={item.src} alt={item.label}/><span>{item.label}</span></Link>)}</div>
        <div className="ih-merch-scene"><img src={merch} alt="ICONIC merch world"/><div><span>THE NIGHTMARE MARKET</span><b>EVENT COMMERCE AS AN EXPERIENCE.</b></div></div>
      </div>
    </section>

    <section className="ih-partners">
      <div className="ih-partners-inner"><div className="ih-kicker">TALENT · VENUES · SPONSORS · BRANDS</div><h2>BUILD THE NEXT ICONIC MOMENT.</h2><p>ICONIC is building a repeatable platform for concerts, tours, destination weekends and sponsor-led experiences across major markets.</p><div className="ih-actions"><Link href="/access?intent=sponsorship" className="ih-btn">Sponsorship Access →</Link><Link href="/access?intent=partners" className="ih-btn ghost">Strategic Partnerships</Link></div></div>
    </section>
  </div>
}
