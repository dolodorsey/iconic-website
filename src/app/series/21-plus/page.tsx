import type { Metadata } from "next";
import { Button, Calendar, Hero, InfoGrid, ny21, Section, Shell } from "../../_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC 21+ Concert Series — Atlanta + New York",
  description: "ICONIC's recurring 21+ concert series across Atlanta and New York. Final series name coming soon.",
};

const atlanta = [
  { month: "JAN", date: "JAN 16", anchor: "MLK WEEKEND" },
  { month: "FEB", date: "FEB 27", anchor: "POST-SUPER BOWL / ALL-STAR" },
  { month: "MAR", date: "MAR 13", anchor: "SPRING KICKOFF" },
  { month: "APR", date: "APR 03", anchor: "SPRING" },
  { month: "MAY", date: "MAY 29", anchor: "MEMORIAL DAY WEEKEND" },
  { month: "JUN", date: "JUN 05", anchor: "EARLY SUMMER" },
  { month: "JUL", date: "JUL 10", anchor: "SUMMER" },
  { month: "AUG", date: "AUG 07", anchor: "LATE SUMMER" },
  { month: "SEP", date: "SEP 04", anchor: "LABOR DAY WEEKEND" },
  { month: "OCT", date: "OCT 02", anchor: "HBCU / HOMECOMING SEASON" },
  { month: "NOV", date: "NOV 12", anchor: "FALL" },
  { month: "DEC", date: "DEC 10", anchor: "HOLIDAY CONCERT" },
];

export default function TwentyOnePlusPage() {
  return <Shell>
    <Hero eyebrow="ICONIC SERIES · NAME COMING SOON" title="21+ CONCERT SERIES." sub="A recurring large-format concert property for contemporary hip-hop, R&B and crossover audiences. One brand. Separate Atlanta and New York market programs.">
      <Button href="#markets">See 2027 Calendar</Button><Button href="mailto:info@thekollectivehospitality.com?subject=ICONIC%2021%2B%20Talent%20Submission" ghost>Talent / Booking</Button>
    </Hero>

    <Section eyebrow="Series Position" title="A concert brand people can follow all year.">
      <InfoGrid items={[
        { label: "Audience", value: "21+", body: "Adult concert audience with a contemporary music and culture focus." },
        { label: "Primary Sound", value: "Hip-Hop + R&B", body: "Flexible enough for crossover packages, DJs and culture-forward supporting talent." },
        { label: "Atlanta", value: "12 Shows", body: "Monthly 2027 series with exact strategic dates already mapped." },
        { label: "New York", value: "12 Shows", body: "Monthly Resorts World program; exact venue-approved dates remain on hold." },
      ]} />
    </Section>

    <Section eyebrow="2027 Markets" title="Twenty-four shows across two flagship cities." dark>
      <div id="markets" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(330px,1fr))", gap: 16 }}>
        <div><h3 style={{ fontFamily: "Georgia,serif", fontSize: 36, margin: "0 0 18px" }}>Atlanta</h3><Calendar rows={atlanta} status="ATLANTA · 12 CONFIRMED PLANNING DATES" /></div>
        <div><h3 style={{ fontFamily: "Georgia,serif", fontSize: 36, margin: "0 0 18px" }}>New York · Resorts World</h3><Calendar rows={ny21} status="NEW YORK · 12 MONTHLY HOLDS" /></div>
      </div>
    </Section>

    <Section eyebrow="Programming System" title="Built to scale without making every show feel the same.">
      <InfoGrid items={[
        { label: "Headliner", value: "Primary Draw", body: "Each date anchors around a clear headline artist or co-headline package." },
        { label: "Support", value: "2–4 Adds", body: "Regional, emerging and culture-relevant support expands reach and value." },
        { label: "Local Layer", value: "City-Specific", body: "Atlanta and New York use separate tastemakers, partners and opening talent." },
        { label: "Retention", value: "Next Show Funnel", body: "Every buyer is immediately retargeted into the following ICONIC date." },
      ]} />
      <div style={{ marginTop: 34 }}><Button href="mailto:info@thekollectivehospitality.com?subject=ICONIC%2021%2B%20Partnership">Sponsor the Series</Button><Button href="/new-york/resorts-world" ghost>Resorts World Program</Button></div>
    </Section>
  </Shell>;
}
