import Link from "next/link";
import type { Metadata } from "next";
import { Shell } from "./_components/IconicPage";
import { DJ_SNAKE_AND_FRIENDS_LOGO, PARDON_MY_FRENCH_TOUR_LOGO, SUMMER_WALKER_SOUL_SYMPHONY_LOGO } from "./_components/tour-brand-assets";
import { COLLECTION_ART, NOC_MEDIA } from "./tampa/nightmare-on-channelside/merch/noc-assets";

export const metadata: Metadata = {
  title: "Concerts, Tours & Culture",
  description: "ICONIC LIVE presents Tampa Halloween, Summer Walker — Soul Symphony, DJ Snake — Pardon My French, live concert merch and premium fan and partner experiences.",
};

const TAMPA = NOC_MEDIA.headliners;
const SUMMER = "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-summer-walker-soul-symphony.jpg?v=1789170574";
const DJ = "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-dj-snake-pardon-my-french.jpg?v=1789170586";
const MERCH = NOC_MEDIA.market;

const properties = [
  { title: "TAMPA HALLOWEEN", meta: "Nightmare on Channelside", href: "/tampa-halloween", src: TAMPA },
  { title: "SUMMER WALKER", meta: "10 Cities · One Soulful Experience", href: "/summer-walker", src: SUMMER, marks:[{src:SUMMER_WALKER_SOUL_SYMPHONY_LOGO,alt:"Summer Walker's Soul Symphony Tour"}] },
  { title: "DJ SNAKE", meta: "5 Cities · 5 Stadiums", href: "/dj-snake-pardon-my-french", src: DJ, marks:[{src:DJ_SNAKE_AND_FRIENDS_LOGO,alt:"DJ Snake & Friends"},{src:PARDON_MY_FRENCH_TOUR_LOGO,alt:"Pardon My French Tour"}] },
  { title: "MERCH", meta: "ICONIC Live Collections", href: "/merch", src: MERCH },
];

const merchTiles = [
  { label: "21 SAVAGE", href: "/tampa/nightmare-on-channelside/merch/collection/21-savage", src: COLLECTION_ART["21-savage"] },
  { label: "KODAK BLACK", href: "/tampa/nightmare-on-channelside/merch/collection/kodak-black", src: COLLECTION_ART["kodak-black"] },
  { label: "DABABY", href: "/tampa/nightmare-on-channelside/merch/collection/da-baby", src: COLLECTION_ART["da-baby"] },
  { label: "MEEK MILL", href: "/tampa/nightmare-on-channelside/merch/collection/meek-mill", src: COLLECTION_ART["meek-mill"] },
];

export default function Home() {
  return (
    <Shell>
      <div className="ov-page">
        <section className="ov-home-hero">
          <img src={TAMPA} alt="Nightmare on Channelside at Tampa Halloween" fetchPriority="high" />
          <div className="ov-home-hero-copy">
            <div className="ov-kicker">ICONIC LIVE PRESENTS</div>
            <h1 className="ov-display">MORE THAN A CONCERT.</h1>
            <h2>A WORLD OF ICONIC EXPERIENCES.</h2>
            <p className="ov-copy">Music, culture, premium hospitality, collectible merch and city-scale live moments — built as distinct worlds under one ICONIC platform.</p>
            <div className="ov-actions">
              <Link className="ov-btn" href="/tampa-halloween">Explore Tampa Halloween →</Link>
              <Link className="ov-btn ghost" href="/access?intent=presale">Get First Access</Link>
            </div>
          </div>
          <div className="ov-hero-note">LEGENDS LIVE FOREVER</div>
          <div className="ov-hero-rail" aria-hidden="true"><span/><span/><span/><span/></div>
        </section>

        <section className="ov-featured-section">
          <div className="ov-shell">
            <div className="ov-section-label"><span>FEATURED PROPERTIES</span><small>FOUR WORLDS · ONE ICONIC PLATFORM</small></div>
            <div className="ov-property-strip">
              {properties.map((property) => (
                <Link className="ov-property-card" href={property.href} key={property.title}>
                  <img src={property.src} alt={property.title} />
                  {property.marks?.length ? <div style={{position:"absolute",left:18,right:18,top:18,zIndex:2,display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>{property.marks.map((mark)=><img key={mark.src} src={mark.src} alt={mark.alt} style={{position:"static",width:property.marks.length>1?"min(42%,170px)":"min(76%,260px)",height:"auto",maxHeight:112,objectFit:"contain",filter:"drop-shadow(0 10px 22px rgba(0,0,0,.72))"}}/>)}</div> : null}
                  <div className="ov-property-card-copy"><strong>{property.title}</strong><span>{property.meta} →</span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="ov-feature-band">
          <img src={TAMPA} alt="Tampa Halloween — Nightmare on Channelside" />
          <div className="ov-feature-band-copy">
            <div className="ov-kicker">ICONIC LIVE · TAMPA</div>
            <h2 className="ov-display">TAMPA HALLOWEEN.</h2>
            <p className="ov-copy">Nightmare on Channelside leads the current slate with a full event world: headline talent, Halloween spectacle, VIP, partner integrations and an official merchandise ecosystem.</p>
            <div className="ov-actions">
              <Link className="ov-btn" href="/tampa-halloween">Event + Access →</Link>
              <Link className="ov-btn ghost" href="/tampa/nightmare-on-channelside/merch/shop">Shop Merch</Link>
            </div>
          </div>
        </section>

        <div className="ov-shell">
          <div className="ov-quick-grid">
            <Link href="/access?intent=presale" className="ov-quick-card"><span>TICKETS + PRESALE</span><strong>Get release access before the public rush.</strong></Link>
            <Link href="/access?intent=vip" className="ov-quick-card"><span>VIP + HOSPITALITY</span><strong>Premium seating, hosted moments and elevated arrival.</strong></Link>
            <Link href="/access?intent=sponsorship" className="ov-quick-card"><span>SPONSORSHIPS</span><strong>Build brands into the actual fan journey.</strong></Link>
            <Link href="/merch" className="ov-quick-card"><span>MERCH DROPS</span><strong>Wear the event after the stage goes dark.</strong></Link>
          </div>
        </div>

        <section className="ov-merch-band">
          <div className="ov-shell ov-merch-layout">
            <div className="ov-merch-copy">
              <div className="ov-kicker">ICONIC MERCH</div>
              <h2 className="ov-display">WEAR THE CULTURE.</h2>
              <p className="ov-copy">Official event pieces and artist collections from the live Nightmare on Channelside shop.</p>
              <div className="ov-actions"><Link className="ov-btn ghost" href="/tampa/nightmare-on-channelside/merch/shop">Shop All →</Link></div>
            </div>
            <div className="ov-merch-gallery">
              {merchTiles.map((item) => <Link href={item.href} key={item.label}><img src={item.src} alt={item.label}/><span>{item.label}</span></Link>)}
            </div>
            <div className="ov-access-card">
              <div className="ov-kicker">EXCLUSIVE ACCESS</div>
              <h3>A HIGHER LEVEL OF LIVE.</h3>
              <p className="ov-copy">Presale. VIP. hospitality. merch drops. partner experiences.</p>
              <div className="ov-actions"><Link className="ov-btn" href="/access?intent=presale">Get Access →</Link></div>
            </div>
          </div>
        </section>

        <div className="ov-trust-strip">
          <div><b>LIVE EXPERIENCES</b><span>Concerts, tours and destination moments.</span></div>
          <div><b>PREMIUM ACCESS</b><span>VIP, hospitality and priority release windows.</span></div>
          <div><b>OFFICIAL MERCH</b><span>Artist, city and event collections.</span></div>
          <div><b>PARTNER PLATFORM</b><span>Sponsorship, content and activation opportunities.</span></div>
        </div>
      </div>
    </Shell>
  );
}
