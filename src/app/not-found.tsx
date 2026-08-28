import Link from "next/link";

export default function NotFound() {
  return (
    <main className="iconic-shell" style={{ minHeight: "100svh", display: "grid", placeItems: "center", padding: 28, color: "white", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div className="light-beam" style={{ right: "8%", top: "-24%" }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
        <div style={{ color: "#cbbcff", fontSize: 9, fontWeight: 900, letterSpacing: ".32em", textTransform: "uppercase", marginBottom: 18 }}>404 · AFTER HOURS</div>
        <h1 className="neon-text" style={{ margin: 0, fontFamily: "Georgia,serif", fontSize: "clamp(76px,16vw,190px)", lineHeight: .78, letterSpacing: "-.06em" }}>LOST<br/>THE ROOM?</h1>
        <p style={{ maxWidth: 560, margin: "34px auto 30px", color: "rgba(255,255,255,.58)", lineHeight: 1.8, fontSize: 14 }}>That page is not on tonight's guest list. Head back to ICONIC and find the next show.</p>
        <Link href="/" style={{ display: "inline-flex", minHeight: 52, padding: "0 28px", alignItems: "center", borderRadius: 999, textDecoration: "none", background: "linear-gradient(110deg,#f5f2ff,#bba7ff 42%,#ff76bf)", color: "#050507", fontSize: 10, fontWeight: 900, letterSpacing: ".18em", textTransform: "uppercase" }}>Back to ICONIC</Link>
      </div>
    </main>
  );
}
