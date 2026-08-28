"use client";

import { useEffect, useState } from "react";

const C = {
  black: "#050505",
  panel: "#0b0b0b",
  panel2: "#111111",
  white: "#f7f3ea",
  muted: "rgba(247,243,234,.58)",
  faint: "rgba(247,243,234,.12)",
  gold: "#d2ad55",
  red: "#8f1017",
};

const atl21 = [
  ["JAN 16", "MLK WEEKEND"],
  ["FEB 27", "WINTER"],
  ["MAR 13", "SPRING KICKOFF"],
  ["APR 03", "SPRING"],
  ["MAY 29", "MEMORIAL DAY"],
  ["JUN 05", "EARLY SUMMER"],
  ["JUL 10", "SUMMER"],
  ["AUG 07", "LATE SUMMER"],
  ["SEP 04", "LABOR DAY"],
  ["OCT 02", "HOMECOMING"],
  ["NOV 12", "FALL"],
  ["DEC 10", "HOLIDAY"],
];

const atl30 = [
  ["JAN 23", "JANUARY"],
  ["FEB 12", "VALENTINE'S R&B"],
  ["MAR 20", "SPRING"],
  ["APR 17", "SPRING"],
  ["MAY 08", "MOTHER'S DAY"],
  ["JUN 12", "PRE-JUNETEENTH"],
  ["JUL 17", "SUMMER"],
  ["AUG 21", "LATE SUMMER"],
  ["SEP 25", "FALL"],
  ["OCT 23", "HOMECOMING"],
  ["NOV 20", "PRE-THANKSGIVING"],
  ["DEC 18", "HOLIDAY R&B"],
];

function Button({ children, href = "#shows", solid = true }: { children: React.ReactNode; href?: string; solid?: boolean }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 48,
        padding: "0 26px",
        border: solid ? `1px solid ${C.gold}` : `1px solid ${C.faint}`,
        background: solid ? C.gold : "transparent",
        color: solid ? C.black : C.white,
        textDecoration: "none",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontWeight: 800,
        fontSize: 11,
        letterSpacing: ".18em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ color: C.gold, fontFamily: "Arial, Helvetica, sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: ".34em", textTransform: "uppercase", marginBottom: 18 }}>
      {children}
    </div>
  );
}

function ShowCard({ kicker, title, date, venue, note, accent = C.gold }: { kicker: string; title: string; date: string; venue: string; note: string; accent?: string }) {
  return (
    <article style={{ position: "relative", minHeight: 420, padding: "34px", border: `1px solid ${C.faint}`, background: `radial-gradient(circle at 80% 10%, ${accent}22, transparent 35%), linear-gradient(145deg, #141414 0%, #080808 70%)`, display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: -25, top: -10, fontFamily: "Georgia, serif", fontSize: 160, lineHeight: 1, fontWeight: 700, color: "rgba(255,255,255,.025)" }}>I</div>
      <div>
        <div style={{ color: accent, fontFamily: "Arial, Helvetica, sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: ".28em", textTransform: "uppercase" }}>{kicker}</div>
        <h3 style={{ margin: "22px 0 18px", maxWidth: 460, fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(40px,5vw,76px)", lineHeight: .92, color: C.white, fontWeight: 700 }}>{title}</h3>
        <p style={{ margin: 0, maxWidth: 460, fontFamily: "Arial, Helvetica, sans-serif", color: C.muted, fontSize: 14, lineHeight: 1.7 }}>{note}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "end", borderTop: `1px solid ${C.faint}`, paddingTop: 24, marginTop: 48 }}>
        <div>
          <div style={{ color: C.white, fontFamily: "Arial, Helvetica, sans-serif", fontSize: 13, fontWeight: 800, letterSpacing: ".08em" }}>{date}</div>
          <div style={{ color: C.muted, fontFamily: "Arial, Helvetica, sans-serif", fontSize: 11, marginTop: 8, textTransform: "uppercase", letterSpacing: ".12em" }}>{venue}</div>
        </div>
        <span style={{ color: accent, fontSize: 25 }}>↗</span>
      </div>
    </article>
  );
}

function Schedule({ title, subtitle, rows }: { title: string; subtitle: string; rows: string[][] }) {
  return (
    <div style={{ border: `1px solid ${C.faint}`, background: C.panel }}>
      <div style={{ padding: "28px 28px 24px", borderBottom: `1px solid ${C.faint}` }}>
        <div style={{ fontFamily: "Georgia, serif", color: C.white, fontSize: 30, fontWeight: 700 }}>{title}</div>
        <div style={{ color: C.muted, fontFamily: "Arial, Helvetica, sans-serif", fontSize: 11, marginTop: 8, letterSpacing: ".12em", textTransform: "uppercase" }}>{subtitle}</div>
      </div>
      <div>
        {rows.map(([date, anchor], i) => (
          <div key={date} style={{ display: "grid", gridTemplateColumns: "38px 90px 1fr", gap: 14, alignItems: "center", padding: "16px 20px", borderBottom: i === rows.length - 1 ? "none" : `1px solid ${C.faint}` }}>
            <span style={{ color: "rgba(255,255,255,.26)", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 10 }}>{String(i + 1).padStart(2, "0")}</span>
            <strong style={{ color: C.white, fontFamily: "Arial, Helvetica, sans-serif", fontSize: 12, letterSpacing: ".08em" }}>{date}</strong>
            <span style={{ color: C.muted, fontFamily: "Arial, Helvetica, sans-serif", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase" }}>{anchor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  return (
    <main style={{ background: C.black, color: C.white, minHeight: "100vh", overflowX: "hidden" }}>
      <nav style={{ position: "fixed", zIndex: 50, top: 0, left: 0, right: 0, minHeight: 72, padding: "0 clamp(20px,4vw,58px)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(5,5,5,.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.faint}` }}>
        <a href="#top" style={{ color: C.white, textDecoration: "none", display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ width: 9, height: 9, background: C.gold, transform: "rotate(45deg)", display: "inline-block" }} />
          <span style={{ fontFamily: "Georgia, serif", fontSize: 25, fontWeight: 700, letterSpacing: ".09em" }}>ICONIC</span>
        </a>
        <div className="desktopNav" style={{ display: "flex", alignItems: "center", gap: 30 }}>
          {[['Shows','#shows'],['Atlanta','#atlanta'],['New York','#newyork'],['Partners','#partners']].map(([label, href]) => <a key={label} href={href} style={{ color: C.muted, textDecoration: "none", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>{label}</a>)}
          <Button href="#shows">Get Tickets</Button>
        </div>
        <button className="mobileToggle" aria-label="Open menu" onClick={() => setMenu(!menu)} style={{ display: "none", border: `1px solid ${C.faint}`, background: "transparent", color: C.white, width: 44, height: 40, fontSize: 20 }}>☰</button>
      </nav>

      {menu && <div className="mobileMenu" style={{ position: "fixed", zIndex: 45, top: 72, left: 0, right: 0, background: C.black, borderBottom: `1px solid ${C.faint}`, padding: 24, display: "grid", gap: 18 }}>{[['Shows','#shows'],['Atlanta','#atlanta'],['New York','#newyork'],['Partners','#partners']].map(([label, href]) => <a onClick={() => setMenu(false)} key={label} href={href} style={{ color: C.white, textDecoration: "none", fontFamily: "Arial, Helvetica, sans-serif", textTransform: "uppercase", letterSpacing: ".14em", fontWeight: 800, fontSize: 12 }}>{label}</a>)}</div>}

      <section id="top" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "end", padding: "130px clamp(22px,6vw,92px) 72px", background: "radial-gradient(circle at 75% 34%, rgba(210,173,85,.16), transparent 29%), radial-gradient(circle at 12% 88%, rgba(143,16,23,.15), transparent 28%), #050505" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .17, backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1500, margin: "0 auto", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(28px)", transition: "all .8s ease" }}>
          <Eyebrow>Concerts · Festivals · Arena Events</Eyebrow>
          <h1 style={{ margin: 0, maxWidth: 1250, fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, fontSize: "clamp(72px,14vw,210px)", letterSpacing: "-.065em", lineHeight: .75 }}>ICONIC<span style={{ color: C.gold }}>.</span></h1>
          <div style={{ marginTop: 38, display: "grid", gridTemplateColumns: "minmax(0,1.3fr) minmax(260px,.7fr)", gap: 44, alignItems: "end" }} className="heroGrid">
            <h2 style={{ margin: 0, maxWidth: 900, fontFamily: "Georgia, serif", fontSize: "clamp(34px,5vw,76px)", lineHeight: .98, fontWeight: 400 }}>The nights people remember.<br/><em style={{ color: C.muted }}>The shows cities talk about.</em></h2>
            <div>
              <p style={{ margin: "0 0 26px", fontFamily: "Arial, Helvetica, sans-serif", color: C.muted, fontSize: 14, lineHeight: 1.75 }}>ICONIC is a live entertainment company built for major concerts, festivals, arena productions and recurring city series. Atlanta first. New York next. National by design.</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><Button href="#shows">Upcoming Shows</Button><Button href="#markets" solid={false}>Our Markets</Button></div>
            </div>
          </div>
          <div style={{ marginTop: 74, paddingTop: 24, borderTop: `1px solid ${C.faint}`, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="statsGrid">
            {[["2026", "Launch Year"], ["ATL + NYC", "Flagship Markets"], ["21+ / 30+", "Concert Series"], ["Arena + Festival", "Large Format"]].map(([big, small]) => <div key={small}><div style={{ fontFamily: "Georgia, serif", fontSize: 27, color: C.white }}>{big}</div><div style={{ marginTop: 7, fontFamily: "Arial, Helvetica, sans-serif", color: C.muted, fontSize: 9, letterSpacing: ".17em", textTransform: "uppercase" }}>{small}</div></div>)}
          </div>
        </div>
      </section>

      <section id="shows" style={{ padding: "110px clamp(22px,6vw,92px)", maxWidth: 1500, margin: "0 auto" }}>
        <Eyebrow>Now Selling / Announcing</Eyebrow>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 30, alignItems: "end", marginBottom: 44, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "clamp(48px,7vw,104px)", lineHeight: .9 }}>The first two<br/>ICONIC moments.</h2>
          <p style={{ maxWidth: 430, margin: 0, color: C.muted, fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.75, fontSize: 14 }}>We launch with two tentpoles designed to immediately define the brand: Halloween, followed by a New Year's Eve arena-scale production.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 16 }} className="twoCol">
          <ShowCard kicker="ICONIC PRESENTS · ATLANTA" title="HALLOWEEN" date="SATURDAY · OCTOBER 31, 2026" venue="ATLANTA · VENUE / TALENT ANNOUNCEMENT" note="The opening statement. A major Halloween concert built to become an annual ICONIC tentpole." accent="#a34a18" />
          <ShowCard kicker="ICONIC PRESENTS · NEW YEAR'S EVE" title="BRAVO" date="THURSDAY · DECEMBER 31, 2026" venue="SOUTHLAKE ARENA · ATLANTA" note="An arena-scale New Year's Eve concert and celebration designed as ICONIC's year-ending flagship." accent={C.gold} />
        </div>
      </section>

      <section id="markets" style={{ borderTop: `1px solid ${C.faint}`, borderBottom: `1px solid ${C.faint}`, background: C.panel, padding: "110px clamp(22px,6vw,92px)" }}>
        <div style={{ maxWidth: 1500, margin: "0 auto" }}>
          <Eyebrow>Flagship Markets</Eyebrow>
          <h2 style={{ margin: "0 0 56px", fontFamily: "Georgia, serif", fontSize: "clamp(48px,7vw,100px)", lineHeight: .92 }}>Two cities.<br/><span style={{ color: C.muted }}>One repeatable format.</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 1, background: C.faint }} className="twoCol">
            <div id="atlanta" style={{ background: C.black, padding: "clamp(30px,5vw,70px)" }}>
              <div style={{ color: C.gold, fontFamily: "Arial, Helvetica, sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: ".25em" }}>MARKET 01</div>
              <h3 style={{ margin: "20px 0 14px", fontFamily: "Georgia, serif", fontSize: "clamp(52px,7vw,96px)", lineHeight: .9 }}>ATLANTA</h3>
              <p style={{ maxWidth: 580, color: C.muted, fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.75, fontSize: 14 }}>The flagship operating market. Monthly 21+ and 30+ concerts, plus ICONIC tentpoles, festivals and arena productions.</p>
              <div style={{ marginTop: 40, display: "flex", gap: 30, flexWrap: "wrap" }}>
                <div><strong style={{ fontFamily: "Georgia, serif", fontSize: 36 }}>24</strong><div style={{ color: C.muted, fontFamily: "Arial, Helvetica, sans-serif", fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase" }}>Core 2027 Concerts</div></div>
                <div><strong style={{ fontFamily: "Georgia, serif", fontSize: 36 }}>12+12</strong><div style={{ color: C.muted, fontFamily: "Arial, Helvetica, sans-serif", fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase" }}>21+ / 30+</div></div>
              </div>
            </div>
            <div id="newyork" style={{ background: C.black, padding: "clamp(30px,5vw,70px)" }}>
              <div style={{ color: C.gold, fontFamily: "Arial, Helvetica, sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: ".25em" }}>MARKET 02</div>
              <h3 style={{ margin: "20px 0 14px", fontFamily: "Georgia, serif", fontSize: "clamp(52px,7vw,96px)", lineHeight: .9 }}>NEW YORK</h3>
              <p style={{ maxWidth: 580, color: C.muted, fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.75, fontSize: 14 }}>The New York expansion mirrors the Atlanta format: recurring 21+ and 30+ concert properties, programmed as a dedicated market with its own talent, marketing and operations.</p>
              <div style={{ marginTop: 40, padding: "22px", border: `1px solid ${C.faint}`, background: C.panel2 }}>
                <div style={{ color: C.white, fontFamily: "Georgia, serif", fontSize: 26 }}>Resorts World New York City</div>
                <div style={{ marginTop: 7, color: C.gold, fontFamily: "Arial, Helvetica, sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase" }}>ICONIC New York · Series Venue Partner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "110px clamp(22px,6vw,92px)", maxWidth: 1500, margin: "0 auto" }}>
        <Eyebrow>2027 Atlanta Concert Calendar</Eyebrow>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 30, alignItems: "end", marginBottom: 44, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "clamp(46px,6vw,88px)", lineHeight: .92 }}>Every month.<br/>Two audiences.</h2>
          <p style={{ maxWidth: 430, margin: 0, color: C.muted, fontFamily: "Arial, Helvetica, sans-serif", lineHeight: 1.75, fontSize: 14 }}>The 21+ series is built for high-energy contemporary packages. The 30+ series leans R&B, soul, neo-soul and legacy hip-hop. Each stays distinct.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 18 }} className="twoCol">
          <Schedule title="21+ Concert Series" subtitle="Atlanta · Monthly · 12 Shows" rows={atl21} />
          <Schedule title="30+ Concert Series" subtitle="Atlanta · Monthly · 12 Shows" rows={atl30} />
        </div>
      </section>

      <section style={{ background: C.white, color: C.black, padding: "110px clamp(22px,6vw,92px)" }}>
        <div style={{ maxWidth: 1500, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="twoCol">
          <div>
            <div style={{ color: "#7a6227", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: ".3em", textTransform: "uppercase", marginBottom: 18 }}>The Format</div>
            <h2 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "clamp(48px,7vw,100px)", lineHeight: .9 }}>Built once.<br/>Scaled city<br/>by city.</h2>
          </div>
          <div style={{ display: "grid", gap: 0, borderTop: "1px solid rgba(0,0,0,.16)" }}>
            {[
              ["01", "21+ Concert Series", "Monthly contemporary hip-hop, R&B and crossover concert packages."],
              ["02", "30+ Concert Series", "Monthly grown-audience R&B, soul, neo-soul and legacy hip-hop."],
              ["03", "Tentpole Events", "Halloween, New Year's Eve and major holiday / cultural weekends."],
              ["04", "Festival Scale", "Larger outdoor or multi-artist formats when the market and calendar justify it."],
              ["05", "Dedicated Market Teams", "Atlanta and New York operate independently while ICONIC maintains the master brand standard."],
            ].map(([num, title, body]) => <div key={num} style={{ display: "grid", gridTemplateColumns: "50px 1fr", gap: 22, padding: "24px 0", borderBottom: "1px solid rgba(0,0,0,.16)" }}><span style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: 10, fontWeight: 800 }}>{num}</span><div><strong style={{ fontFamily: "Georgia, serif", fontSize: 24 }}>{title}</strong><p style={{ margin: "8px 0 0", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 13, lineHeight: 1.65, color: "rgba(0,0,0,.62)" }}>{body}</p></div></div>)}
          </div>
        </div>
      </section>

      <section id="partners" style={{ padding: "110px clamp(22px,6vw,92px)", maxWidth: 1500, margin: "0 auto" }}>
        <div style={{ border: `1px solid ${C.faint}`, padding: "clamp(34px,6vw,84px)", background: "radial-gradient(circle at 88% 20%, rgba(210,173,85,.13), transparent 26%), #0b0b0b" }}>
          <Eyebrow>Partners · Sponsors · Talent</Eyebrow>
          <h2 style={{ margin: 0, maxWidth: 950, fontFamily: "Georgia, serif", fontSize: "clamp(48px,7vw,104px)", lineHeight: .9 }}>Be part of the<br/>next ICONIC night.</h2>
          <p style={{ margin: "30px 0 34px", maxWidth: 650, color: C.muted, fontFamily: "Arial, Helvetica, sans-serif", fontSize: 14, lineHeight: 1.75 }}>ICONIC is building multi-market relationships with artists, agencies, sponsors, media partners, hospitality brands and production partners across Atlanta, New York and future touring markets.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}><Button href="mailto:info@thekollectivehospitality.com">Partner With ICONIC</Button><Button href="#top" solid={false}>Back to Top</Button></div>
        </div>
      </section>

      <footer style={{ padding: "36px clamp(22px,6vw,92px) 48px", borderTop: `1px solid ${C.faint}` }}>
        <div style={{ maxWidth: 1500, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700, letterSpacing: ".08em" }}>ICONIC<span style={{ color: C.gold }}>.</span></div>
          <div style={{ color: C.muted, fontFamily: "Arial, Helvetica, sans-serif", fontSize: 9, letterSpacing: ".15em", textTransform: "uppercase" }}>Atlanta · New York · National Expansion</div>
          <div style={{ color: "rgba(255,255,255,.35)", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 9 }}>© 2026 ICONIC Entertainment. All rights reserved.</div>
        </div>
      </footer>

      <style jsx global>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #050505; }
        a, button { transition: opacity .2s ease, transform .2s ease, border-color .2s ease; }
        a:hover, button:hover { opacity: .82; }
        @media (max-width: 820px) {
          .desktopNav { display: none !important; }
          .mobileToggle { display: block !important; }
          .heroGrid, .twoCol { grid-template-columns: 1fr !important; }
          .statsGrid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </main>
  );
}
