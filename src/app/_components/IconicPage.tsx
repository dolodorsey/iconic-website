import Link from "next/link";
import type { ReactNode } from "react";

export const C = {
  black: "#050505",
  panel: "#0b0b0b",
  panel2: "#111111",
  white: "#f7f3ea",
  muted: "rgba(247,243,234,.60)",
  faint: "rgba(247,243,234,.12)",
  gold: "#d2ad55",
  red: "#8f1017",
};

export function Shell({ children }: { children: ReactNode }) {
  return (
    <main style={{ minHeight: "100vh", background: C.black, color: C.white }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 40, minHeight: 70, padding: "0 clamp(18px,4vw,56px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, background: "rgba(5,5,5,.94)", borderBottom: `1px solid ${C.faint}`, backdropFilter: "blur(20px)" }}>
        <Link href="/" style={{ color: C.white, textDecoration: "none", display: "flex", alignItems: "center", gap: 11 }}>
          <span style={{ width: 9, height: 9, background: C.gold, transform: "rotate(45deg)", display: "inline-block" }} />
          <strong style={{ fontFamily: "Georgia,serif", fontSize: 24, letterSpacing: ".08em" }}>ICONIC</strong>
        </Link>
        <div style={{ display: "flex", gap: "clamp(10px,2vw,26px)", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Link href="/atlanta/halloween" style={navLink}>Halloween</Link>
          <Link href="/atlanta/bravo" style={navLink}>BRAVO</Link>
          <Link href="/new-york/resorts-world" style={navLink}>New York</Link>
          <Link href="/series/21-plus" style={navLink}>21+</Link>
          <Link href="/series/30-plus" style={navLink}>30+</Link>
        </div>
      </nav>
      {children}
      <footer style={{ padding: "44px clamp(20px,5vw,72px)", borderTop: `1px solid ${C.faint}`, display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", background: C.panel }}>
        <div><strong style={{ fontFamily: "Georgia,serif", fontSize: 25 }}>ICONIC.</strong><div style={{ marginTop: 8, color: C.muted, fontFamily: "Arial,sans-serif", fontSize: 11, letterSpacing: ".13em", textTransform: "uppercase" }}>Concerts · Festivals · Arena Events</div></div>
        <div style={{ color: C.muted, fontFamily: "Arial,sans-serif", fontSize: 11, lineHeight: 1.7, maxWidth: 430 }}>Atlanta + New York flagship markets. Built as independent market programs under one national ICONIC platform.</div>
      </footer>
    </main>
  );
}

const navLink = { color: C.muted, textDecoration: "none", fontFamily: "Arial,sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" as const };

export function Hero({ eyebrow, title, sub, accent = C.gold, children }: { eyebrow: string; title: string; sub: string; accent?: string; children?: ReactNode }) {
  return (
    <section style={{ minHeight: "72vh", padding: "110px clamp(22px,6vw,90px) 70px", display: "flex", alignItems: "end", position: "relative", overflow: "hidden", background: `radial-gradient(circle at 78% 22%, ${accent}22, transparent 30%), radial-gradient(circle at 15% 90%, rgba(255,255,255,.05), transparent 32%), ${C.black}` }}>
      <div style={{ position: "absolute", inset: 0, opacity: .16, backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 1450, margin: "0 auto" }}>
        <div style={{ color: accent, fontFamily: "Arial,sans-serif", fontSize: 10, fontWeight: 900, letterSpacing: ".34em", textTransform: "uppercase", marginBottom: 18 }}>{eyebrow}</div>
        <h1 style={{ margin: 0, maxWidth: 1200, fontFamily: "Georgia,serif", fontSize: "clamp(58px,11vw,165px)", lineHeight: .82, letterSpacing: "-.055em" }}>{title}</h1>
        <p style={{ margin: "34px 0 0", maxWidth: 720, color: C.muted, fontFamily: "Arial,sans-serif", fontSize: "clamp(14px,1.5vw,18px)", lineHeight: 1.75 }}>{sub}</p>
        {children && <div style={{ marginTop: 34 }}>{children}</div>}
      </div>
    </section>
  );
}

export function Button({ href, children, ghost = false }: { href: string; children: ReactNode; ghost?: boolean }) {
  return <Link href={href} style={{ display: "inline-flex", minHeight: 48, alignItems: "center", justifyContent: "center", padding: "0 25px", marginRight: 10, marginBottom: 10, textDecoration: "none", border: `1px solid ${ghost ? C.faint : C.gold}`, background: ghost ? "transparent" : C.gold, color: ghost ? C.white : C.black, fontFamily: "Arial,sans-serif", fontSize: 10, fontWeight: 900, letterSpacing: ".17em", textTransform: "uppercase" }}>{children}</Link>;
}

export function Section({ eyebrow, title, children, dark = false }: { eyebrow: string; title: string; children: ReactNode; dark?: boolean }) {
  return <section style={{ padding: "90px clamp(22px,6vw,90px)", background: dark ? C.panel : C.black, borderTop: `1px solid ${C.faint}` }}><div style={{ maxWidth: 1450, margin: "0 auto" }}><div style={{ color: C.gold, fontFamily: "Arial,sans-serif", fontSize: 9, fontWeight: 900, letterSpacing: ".30em", textTransform: "uppercase", marginBottom: 16 }}>{eyebrow}</div><h2 style={{ margin: "0 0 42px", maxWidth: 1050, fontFamily: "Georgia,serif", fontSize: "clamp(42px,6vw,88px)", lineHeight: .92 }}>{title}</h2>{children}</div></section>;
}

export function InfoGrid({ items }: { items: { label: string; value: string; body?: string }[] }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12 }}>{items.map((x) => <div key={x.label} style={{ padding: 28, border: `1px solid ${C.faint}`, background: C.panel2 }}><div style={{ color: C.gold, fontFamily: "Arial,sans-serif", fontSize: 9, fontWeight: 900, letterSpacing: ".18em", textTransform: "uppercase" }}>{x.label}</div><div style={{ marginTop: 14, fontFamily: "Georgia,serif", fontSize: 29, lineHeight: 1.05 }}>{x.value}</div>{x.body && <p style={{ color: C.muted, fontFamily: "Arial,sans-serif", fontSize: 13, lineHeight: 1.65, margin: "14px 0 0" }}>{x.body}</p>}</div>)}</div>;
}

export function Calendar({ rows, status = "2027 WORKING CALENDAR" }: { rows: { month: string; date: string; anchor: string }[]; status?: string }) {
  return <div style={{ border: `1px solid ${C.faint}`, background: C.panel }}><div style={{ padding: "20px 24px", color: C.gold, fontFamily: "Arial,sans-serif", fontSize: 9, fontWeight: 900, letterSpacing: ".22em", textTransform: "uppercase", borderBottom: `1px solid ${C.faint}` }}>{status}</div>{rows.map((r, i) => <div key={`${r.month}-${i}`} style={{ display: "grid", gridTemplateColumns: "90px minmax(90px,130px) 1fr", gap: 18, padding: "17px 22px", borderBottom: i === rows.length - 1 ? "none" : `1px solid ${C.faint}`, alignItems: "center" }}><strong style={{ fontFamily: "Arial,sans-serif", fontSize: 11, color: C.white }}>{r.month}</strong><span style={{ color: C.gold, fontFamily: "Arial,sans-serif", fontSize: 10, fontWeight: 900, letterSpacing: ".08em" }}>{r.date}</span><span style={{ color: C.muted, fontFamily: "Arial,sans-serif", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase" }}>{r.anchor}</span></div>)}</div>;
}

export const ny21 = [
  { month: "JAN", date: "JAN 09 · HOLD", anchor: "MLK / WINTER OPEN" },
  { month: "FEB", date: "FEB 20 · HOLD", anchor: "POST-SUPER BOWL / ALL-STAR" },
  { month: "MAR", date: "MAR 06 · HOLD", anchor: "SPRING KICKOFF" },
  { month: "APR", date: "APR 10 · HOLD", anchor: "SPRING" },
  { month: "MAY", date: "MAY 22 · HOLD", anchor: "MEMORIAL DAY WINDOW" },
  { month: "JUN", date: "JUN 26 · HOLD", anchor: "EARLY SUMMER" },
  { month: "JUL", date: "JUL 03 · HOLD", anchor: "JULY 4TH WEEKEND" },
  { month: "AUG", date: "AUG 14 · HOLD", anchor: "LATE SUMMER" },
  { month: "SEP", date: "SEP 11 · HOLD", anchor: "FALL OPEN" },
  { month: "OCT", date: "OCT 09 · HOLD", anchor: "HOMECOMING SEASON" },
  { month: "NOV", date: "NOV 13 · HOLD", anchor: "FALL" },
  { month: "DEC", date: "DEC 04 · HOLD", anchor: "HOLIDAY CONCERT" },
];

export const ny30 = [
  { month: "JAN", date: "JAN 30 · HOLD", anchor: "WINTER" },
  { month: "FEB", date: "FEB 13 · HOLD", anchor: "VALENTINE'S R&B" },
  { month: "MAR", date: "MAR 27 · HOLD", anchor: "SPRING" },
  { month: "APR", date: "APR 24 · HOLD", anchor: "SPRING" },
  { month: "MAY", date: "MAY 08 · HOLD", anchor: "MOTHER'S DAY WEEKEND" },
  { month: "JUN", date: "JUN 19 · HOLD", anchor: "JUNETEENTH" },
  { month: "JUL", date: "JUL 31 · HOLD", anchor: "SUMMER" },
  { month: "AUG", date: "AUG 28 · HOLD", anchor: "LATE SUMMER" },
  { month: "SEP", date: "SEP 18 · HOLD", anchor: "FALL OPEN" },
  { month: "OCT", date: "OCT 23 · HOLD", anchor: "HOMECOMING SEASON" },
  { month: "NOV", date: "NOV 27 · HOLD", anchor: "THANKSGIVING WEEKEND" },
  { month: "DEC", date: "DEC 18 · HOLD", anchor: "HOLIDAY R&B" },
];
