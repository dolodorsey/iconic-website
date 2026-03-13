"use client";
import type { ReactNode } from "react";
import { useState, useEffect, useRef } from "react";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const C = {
  base:      "#06060a",
  surface:   "#0c0a0e",
  gold:      "#c9a84c",
  goldLight: "#f0d888",
  goldDeep:  "#7a5e20",
  cream:     "#f0ece4",
  muted:     "rgba(255,255,255,0.48)",
  dim:       "rgba(255,255,255,0.25)",
  border:    "rgba(255,255,255,0.07)",
};

const F = {
  serif: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  sans:  "'DM Sans', 'Inter', system-ui, sans-serif",
};

function useInView(t = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    o.observe(el); return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, d = 0 }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ transform: v ? "translateY(0)" : "translateY(32px)", opacity: v ? 1 : 0, transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${d}s` }}>{children}</div>;
}

const Grain = ({ o = 0.035 }) => (
  <div style={{ position: "absolute", inset: 0, opacity: o, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
);

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [page, setPage] = useState("home");
  useEffect(() => { const h = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? "14px clamp(24px,4vw,56px)" : "24px clamp(24px,4vw,56px)", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrolled ? "rgba(6,6,10,0.95)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
      <div>
        <div style={{ fontFamily: F.sans, fontSize: "8px", letterSpacing: "0.5em", textTransform: "uppercase", color: C.gold, marginBottom: "3px" }}>Entertainment Group</div>
        <span style={{ fontFamily: F.serif, fontSize: "22px", fontWeight: 600, color: C.cream, letterSpacing: "0.08em" }}>ICONIC™</span>
      </div>
      <div style={{ display: "flex", gap: "clamp(16px,2.5vw,36px)", alignItems: "center" }}>
        {["Events", "Creators", "Music", "Partners"].map(n => (
          <a key={n} href={`#${n.toLowerCase()}`} style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: C.muted, textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = C.cream} onMouseLeave={e => e.target.style.color = C.muted}>{n}</a>
        ))}
        <button style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#06060a", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`, border: "none", padding: "10px 26px", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => e.target.style.transform = "translateY(-2px)"} onMouseLeave={e => e.target.style.transform = "translateY(0)"}>Book ICONIC</button>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  return (
    <section style={{ minHeight: "100vh", position: "relative", overflow: "hidden", background: `radial-gradient(ellipse at 60% 30%, ${C.gold}10 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(100,60,20,0.12) 0%, transparent 55%), ${C.base}`, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 clamp(32px,6vw,96px) 96px" }}>
      <Grain />
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
      <div style={{ position: "absolute", top: "20%", right: "5%", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}12, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
        <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: C.gold, opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease 0.3s", marginBottom: "20px" }}>
          Nightlife · Creators · Music · Experiences
        </div>
        <h1 style={{ fontFamily: F.serif, fontSize: "clamp(60px,11vw,152px)", fontWeight: 600, lineHeight: 0.87, letterSpacing: "-0.02em", color: C.cream, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)", transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s", maxWidth: "1100px" }}>
          Some Nights
          <br />
          <em style={{ color: `rgba(240,236,228,0.28)` }}>Become</em>
          <br />
          <em style={{ backgroundImage: `linear-gradient(135deg, ${C.goldLight}, ${C.gold}, ${C.goldDeep})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Legacy.</em>
        </h1>
        <p style={{ fontFamily: F.sans, fontSize: "clamp(14px,1.2vw,17px)", lineHeight: 1.8, color: C.muted, maxWidth: "540px", marginTop: "32px", opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease 0.9s" }}>
          ICONIC™ is an entertainment group producing invite-level nightlife, immersive cultural experiences, and housing elite creative talent across music, art, and performance.
        </p>
        <div style={{ display: "flex", gap: "16px", marginTop: "48px", opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease 1.2s", flexWrap: "wrap" }}>
          <button style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#06060a", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`, border: "none", padding: "16px 44px", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.target.style.transform = "translateY(0)"; }}>Experience ICONIC</button>
          <button style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: C.cream, background: "transparent", border: `1px solid ${C.border}`, padding: "16px 38px", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => { e.target.style.borderColor = C.gold; e.target.style.color = C.gold; }} onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.cream; }}>Join as Creator</button>
          <button style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: C.dim, background: "transparent", border: "none", padding: "16px 24px", cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = C.cream} onMouseLeave={e => e.target.style.color = C.dim}>Book ICONIC →</button>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "64px", marginTop: "72px", opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.4s", flexWrap: "wrap" }}>
          {[["3", "Experience Pillars"], ["8+", "Cities Active"], ["ATL · HOU · LA", "Priority Markets"], ["Prestige Only", "Access Level"]].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontFamily: F.serif, fontSize: "clamp(24px,3vw,40px)", fontWeight: 600, color: C.gold, fontStyle: "italic" }}>{v}</div>
              <div style={{ fontFamily: F.sans, fontSize: "9px", fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase", color: C.dim, marginTop: "6px" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── THREE PILLARS ────────────────────────────────────────────────────────────
function ThreePillars() {
  const [hover, setHover] = useState(null);
  const pillars = [
    { id: "experiences", title: "ICONIC Experiences™", sub: "Invite-Level Events & Cultural Moments", body: "ICONIC NIGHTS, ICONIC EXPERIENCES, and ICONIC SOCIAL — three distinct frameworks for curating the rooms that define cultural moments. Entry is earned, not purchased.", items: ["ICONIC NIGHTS™ — Prestige nightlife with strict curation", "ICONIC EXPERIENCES™ — Immersive culture-forward environments", "ICONIC SOCIAL™ — Invite-only power networking"], cta: "Explore Experiences" },
    { id: "creators", title: "ICONIC Creators™", sub: "A Home for Elite Creative Talent", body: "ICONIC houses music artists, DJs, painters, performers, photographers, videographers, hosts, producers, designers, and cultural tastemakers — providing booking pipelines, brand packaging, media capture, and sponsor access.", items: ["Booking pipeline management", "Brand packaging & development", "Media capture & documentation", "Sponsor & brand access"], cta: "Join Creator Network" },
    { id: "music", title: "ICONIC MUSIC™", sub: "Music Discovery & Development", body: "The music division of ICONIC focused on artist discovery, development, release strategy, DJ curation, and live performance integration into ICONIC events and beyond.", items: ["Artist development programs", "Production & studio strategy", "Release rollout management", "Performance & DJ bookings"], cta: "Explore ICONIC MUSIC" },
  ];

  return (
    <section id="events" style={{ background: C.base, padding: "0" }}>
      {pillars.map((p, i) => (
        <div
          key={p.id}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          style={{ borderBottom: `1px solid ${C.border}`, background: hover === i ? C.surface : "transparent", transition: "background 0.4s", position: "relative", overflow: "hidden" }}
        >
          {hover === i && <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 80% 50%, ${C.gold}08, transparent 70%)` }} />}
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px clamp(32px,6vw,96px)", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "80px", alignItems: "center", position: "relative", zIndex: 1 }}>
            <div>
              <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: C.gold, marginBottom: "20px" }}>0{i + 1}</div>
              <h3 style={{ fontFamily: F.serif, fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 600, color: C.cream, lineHeight: 1.05, marginBottom: "12px" }}>{p.title}</h3>
              <div style={{ fontFamily: F.sans, fontSize: "12px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: "24px" }}>{p.sub}</div>
              <p style={{ fontFamily: F.sans, fontSize: "15px", lineHeight: 1.8, color: C.muted, marginBottom: "32px" }}>{p.body}</p>
              <button style={{ fontFamily: F.sans, fontSize: "9px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: C.gold, background: "transparent", border: `1px solid ${C.gold}30`, padding: "11px 28px", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => { e.target.style.background = `${C.gold}15`; e.target.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.transform = "translateY(0)"; }}>{p.cta} →</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {p.items.map((item, j) => (
                <div key={j} style={{ padding: "22px 28px", background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.gold, flexShrink: 0, marginTop: "6px" }} />
                  <span style={{ fontFamily: F.sans, fontSize: "14px", lineHeight: 1.6, color: C.muted }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

// ─── MEDIA ARCHIVE ────────────────────────────────────────────────────────────
function MediaArchive() {
  const formats = [
    { title: "High-End Photography", desc: "Editorial-grade documentation capturing every significant moment within ICONIC events." },
    { title: "Recap Reels", desc: "Cinematic event summaries built for social distribution, sponsor deliverables, and cultural proof." },
    { title: "Editorial Documentation", desc: "Written and visual editorial coverage positioning every ICONIC event as a cultural record." },
    { title: "Creator Content Pipeline", desc: "Structured content creation from ICONIC&apos;s internal creator network for each event." },
  ];

  return (
    <section style={{ background: C.surface, padding: "120px clamp(32px,6vw,96px)", position: "relative", overflow: "hidden" }}>
      <Grain />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${C.gold}07, transparent 65%)` }} />
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.48em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>Media & Archive</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "64px" }}>
            <h2 style={{ fontFamily: F.serif, fontSize: "clamp(36px,5vw,68px)", fontWeight: 600, lineHeight: 1.0, color: C.cream }}>Every Moment<br />Becomes Proof.</h2>
            <p style={{ fontFamily: F.sans, fontSize: "15px", lineHeight: 1.75, color: C.muted, maxWidth: "400px" }}>ICONIC events are archived through premium documentation that transforms each night into cultural currency.</p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2px", background: C.border }}>
          {formats.map((f, i) => (
            <div key={f.title} style={{ background: C.base, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
              <div style={{ fontFamily: F.sans, fontSize: "9px", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: C.gold, marginBottom: "20px" }}>0{i + 1}</div>
              <div style={{ fontFamily: F.serif, fontSize: "28px", fontWeight: 600, color: C.cream, marginBottom: "14px" }}>{f.title}</div>
              <p style={{ fontFamily: F.sans, fontSize: "14px", lineHeight: 1.75, color: C.muted }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BOOKING & PARTNERSHIPS ───────────────────────────────────────────────────
function BookingPartnerships() {
  const types = [
    { name: "Corporate Events", desc: "Private celebrations, team experiences, and branded nightlife activations for corporate clients." },
    { name: "Album Releases", desc: "Music-driven experiences built around artist drops, listening sessions, and performance moments." },
    { name: "Art Exhibitions", desc: "Curated spaces for visual artists to present work within an ICONIC-level social environment." },
    { name: "Brand Activations", desc: "Premium experiential moments for brands seeking access to ICONIC&apos;s curated audience." },
    { name: "Private Events", desc: "Milestone celebrations, private access events, and exclusive social moments built for lasting memory." },
    { name: "Venue Programming", desc: "Recurring ICONIC events placed into venues and hospitality partners across cities." },
  ];

  return (
    <section id="partners" style={{ background: C.base, padding: "120px clamp(32px,6vw,96px)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.48em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>Booking & Partnerships</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "64px" }}>
            <h2 style={{ fontFamily: F.serif, fontSize: "clamp(36px,5vw,68px)", fontWeight: 600, lineHeight: 1.0, color: C.cream }}>What ICONIC Produces</h2>
            <p style={{ fontFamily: F.sans, fontSize: "14px", lineHeight: 1.75, color: C.muted, maxWidth: "400px" }}>Partners are vetted and category-exclusive. ICONIC does not dilute its positioning for volume.</p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px", background: C.border }}>
          {types.map((t, i) => (
            <div key={t.name} style={{ background: C.surface, padding: "40px 32px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
              <div style={{ fontFamily: F.sans, fontSize: "9px", fontWeight: 600, letterSpacing: "0.38em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>0{i + 1}</div>
              <div style={{ fontFamily: F.serif, fontSize: "24px", fontWeight: 600, color: C.cream, marginBottom: "12px" }}>{t.name}</div>
              <p style={{ fontFamily: F.sans, fontSize: "13px", lineHeight: 1.7, color: C.muted }}>{t.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "64px", padding: "56px 48px", background: `linear-gradient(135deg, ${C.gold}12, ${C.goldDeep}08)`, border: `1px solid ${C.gold}25`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "32px" }}>
          <div>
            <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: C.gold, marginBottom: "12px" }}>Ready to Build With ICONIC</div>
            <h3 style={{ fontFamily: F.serif, fontSize: "clamp(28px,3vw,44px)", fontWeight: 600, color: C.cream, lineHeight: 1.05 }}>Not Attended.<br />Remembered.</h3>
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#06060a", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`, border: "none", padding: "15px 40px", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => e.target.style.transform = "translateY(-2px)"} onMouseLeave={e => e.target.style.transform = "translateY(0)"}>Book ICONIC</button>
            <button style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: C.cream, background: "transparent", border: `1px solid ${C.border}`, padding: "15px 36px", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => { e.target.style.borderColor = C.gold; e.target.style.color = C.gold; }} onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.cream; }}>Sponsor Inquiry</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CITIES ───────────────────────────────────────────────────────────────────
function Cities() {
  const cities = [
    { name: "Atlanta", status: "Flagship", note: "Home base. Deep talent network. Priority city for all three pillars." },
    { name: "Houston", status: "Priority", note: "Strong cultural foundation. Experiences and music division expanding." },
    { name: "Los Angeles", status: "Priority", note: "Creator ecosystem launch. West Coast ICONIC NIGHTS rollout." },
    { name: "DC", status: "Active", note: "Power networking market. ICONIC SOCIAL primary focus." },
    { name: "Miami", status: "Planned", note: "High-visibility expansion. Events and sponsorship focus." },
    { name: "New York", status: "Planned", note: "Global prestige market. Creator and music division expansion." },
  ];
  return (
    <section style={{ background: C.surface, padding: "120px clamp(32px,6vw,96px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 70%, ${C.gold}07, transparent 60%)` }} />
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ fontFamily: F.sans, fontSize: "9px", letterSpacing: "0.48em", textTransform: "uppercase", color: C.gold, marginBottom: "16px" }}>City Expansion</div>
          <h2 style={{ fontFamily: F.serif, fontSize: "clamp(36px,5vw,68px)", fontWeight: 600, lineHeight: 1.0, color: C.cream, marginBottom: "64px" }}>Where ICONIC Operates</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px", background: C.border }}>
          {cities.map(city => (
            <div key={city.name} style={{ background: C.base, padding: "40px 32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div style={{ fontFamily: F.serif, fontSize: "28px", fontWeight: 600, color: C.cream }}>{city.name}</div>
                <span style={{ fontFamily: F.sans, fontSize: "8px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, padding: "6px 12px", border: `1px solid ${C.gold}30`, background: `${C.gold}10` }}>{city.status}</span>
              </div>
              <p style={{ fontFamily: F.sans, fontSize: "13px", lineHeight: 1.7, color: C.muted }}>{city.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#04040a", borderTop: `1px solid ${C.border}`, padding: "64px clamp(32px,6vw,96px) 40px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(3,1fr)", gap: "48px", marginBottom: "64px" }}>
          <div>
            <div style={{ fontFamily: F.sans, fontSize: "8px", letterSpacing: "0.5em", textTransform: "uppercase", color: C.gold, marginBottom: "8px" }}>Entertainment Group</div>
            <div style={{ fontFamily: F.serif, fontSize: "26px", fontWeight: 600, color: C.cream, marginBottom: "16px", letterSpacing: "0.06em" }}>ICONIC™</div>
            <p style={{ fontFamily: F.sans, fontSize: "13px", lineHeight: 1.7, color: C.muted }}>Invite-level experiences. Elite creators. Cultural memory.</p>
            <div style={{ marginTop: "20px", fontFamily: F.sans, fontSize: "12px", color: C.dim }}>justhuglife.forever@gmail.com</div>
          </div>
          {[
            { h: "Experiences", l: ["ICONIC NIGHTS™", "ICONIC EXPERIENCES™", "ICONIC SOCIAL™", "Book an Experience", "RSVP / Access"] },
            { h: "Creators", l: ["Join Creator Network", "Music Artists", "DJs & Performers", "Photographers", "Submit Application"] },
            { h: "Company", l: ["About ICONIC™", "ICONIC MUSIC™", "Media & Press", "Partner With Us", "City Expansion"] },
          ].map(col => (
            <div key={col.h}>
              <div style={{ fontFamily: F.sans, fontSize: "8px", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: C.gold, marginBottom: "20px" }}>{col.h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.l.map(i => <li key={i} style={{ fontFamily: F.sans, fontSize: "13px", color: C.muted }}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ fontFamily: F.sans, fontSize: "11px", color: "rgba(255,255,255,0.22)" }}>© 2026 ICONIC™ Entertainment Group. Strategic partner of HUGLIFE. All rights reserved.</div>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy", "Terms", "Contact"].map(i => <span key={i} style={{ fontFamily: F.sans, fontSize: "11px", color: "rgba(255,255,255,0.25)", cursor: "pointer" }}>{i}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function ICONICFullSite() {
  return (
    <div style={{ background: C.base }}>
      <Nav />
      <Hero />
      <ThreePillars />
      <MediaArchive />
      <BookingPartnerships />
      <Cities />
      <Footer />
    </div>
  );
}
