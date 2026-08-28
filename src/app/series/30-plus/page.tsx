import type { Metadata } from "next";
import { Button, Calendar, Hero, InfoGrid, ny30, Section, Shell } from "../../_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC 30+ Concert Series — Atlanta + New York",
  description: "ICONIC's recurring 30+ concert series across Atlanta and New York. Final series name coming soon.",
};

const atlanta = [
  { month: "JAN", date: "JAN 23", anchor: "JANUARY" },
  { month: "FEB", date: "FEB 12", anchor: "VALENTINE'S WEEKEND R&B" },
  { month: "MAR", date: "MAR 20", anchor: "SPRING" },
  { month: "APR", date: "APR 17", anchor: "SPRING" },
  { month: "MAY", date: "MAY 08", anchor: "MOTHER'S DAY WEEKEND" },
  { month: "JUN", date: "JUN 12", anchor: "PRE-JUNETEENTH" },
  { month: "JUL", date: "JUL 17", anchor: "SUMMER" },
  { month: "AUG", date: "AUG 21", anchor: "LATE SUMMER" },
  { month: "SEP", date: "SEP 25", anchor: "FALL" },
  { month: "OCT", date: "OCT 23", anchor: "HOMECOMING SEASON" },
  { month: "NOV", date: "NOV 20", anchor: "PRE-THANKSGIVING" },
  { month: "DEC", date: "DEC 18", anchor: "CHRISTMAS / HOLIDAY R&B" },
];

export default function ThirtyPlusPage() {
  return <Shell>
    <Hero eyebrow="ICONIC SERIES · NAME COMING SOON" title="30+ CONCERT SERIES." sub="A recurring grown-audience concert property centered on R&B, soul, neo-soul, legacy hip-hop and artists with deep catalog recognition.">
      <Button href="#markets">See 2027 Calendar</Button><Button href="mailto:info@thekollectivehospitality.com?subject=ICONIC%2030%2B%20Talent%20Submission" ghost>Talent / Booking</Button>
    </Hero>

    <Section eyebrow="Series Position" title="Grown music. Premium room. Strong catalog.">
      <InfoGrid items={[
        { label: "Audience", value: "30+", body: "A mature concert audience that values catalog, comfort, premium seating and hospitality." },
        { label: "Primary Sound", value: "R&B + Soul", body: "Neo-soul, legacy hip-hop and high-recognition crossover acts fit naturally into the format." },
        { label: "Atlanta", value: "12 Shows", body: "Monthly 2027 series, including a major Valentine's R&B opportunity." },
        { label: "New York", value: "12 Shows", body: "Monthly Resorts World program with exact venue-approved dates still to be locked." },
      ]} />
    </Section>

    <Section eyebrow="2027 Markets" title="Twenty-four grown-audience shows across two cities." dark>
      <div id="markets" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(330px,1fr))", gap: 16 }}>
        <div><h3 style={{ fontFamily: "Georgia,serif", fontSize: 36, margin: "0 0 18px" }}>Atlanta</h3><Calendar rows={atlanta} status="ATLANTA · 12 CONFIRMED PLANNING DATES" /></div>
        <div><h3 style={{ fontFamily: "Georgia,serif", fontSize: 36, margin: "0 0 18px" }}>New York · Resorts World</h3><Calendar rows={ny30} status="NEW YORK · 12 MONTHLY HOLDS" /></div>
      </div>
    </Section>

    <Section eyebrow="Programming System" title="Premium enough to feel special every month.">
      <InfoGrid items={[
        { label: "Talent", value: "Catalog Matters", body: "Packages prioritize artists with songs audiences already know and want to hear live." },
        { label: "Experience", value: "Premium Seating", body: "Comfort, service and upgraded inventory become part of the series proposition." },
        { label: "Tentpoles", value: "Holiday Windows", body: "Valentine's, Mother's Day, Juneteenth, homecoming and holiday dates receive larger packages." },
        { label: "Retention", value: "Membership Mindset", body: "Build repeat attendance so the audience follows the series, not only the individual artist." },
      ]} />
      <div style={{ marginTop: 34 }}><Button href="mailto:info@thekollectivehospitality.com?subject=ICONIC%2030%2B%20Partnership">Sponsor the Series</Button><Button href="/new-york/resorts-world" ghost>Resorts World Program</Button></div>
    </Section>
  </Shell>;
}
