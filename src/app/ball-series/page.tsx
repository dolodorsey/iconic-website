import type { Metadata } from "next";
import { Button, Calendar, Hero, InfoGrid, Section, Shell } from "../_components/IconicPage";

export const metadata: Metadata = {
  title: "The Ball Series — ICONIC | Southlake Arena",
  description: "The Ball Series by ICONIC at Southlake Arena: six distinct formal and themed event properties across the 2026–2027 season.",
};

const balls=[
  {month:"OCT",date:"OCT 17, 2026",anchor:"BEAUTY & THE BEAST: GREEK BALL · SOUTHLAKE ARENA"},
  {month:"OCT",date:"OCT 31, 2026",anchor:"MONSTER'S BALL · SOUTHLAKE ARENA"},
  {month:"NOV",date:"NOV 28, 2026",anchor:"BLACK BALL · SOUTHLAKE ARENA"},
  {month:"DEC",date:"DEC 12, 2026",anchor:"SNOW BALL · SOUTHLAKE ARENA"},
  {month:"JAN",date:"JAN 02, 2027",anchor:"CHAMPAGNE BALL · SOUTHLAKE ARENA"},
  {month:"FEB",date:"FEB 13, 2027",anchor:"ROSE BALL · SOUTHLAKE ARENA"},
];

export default function BallSeriesPage(){return <Shell>
  <Hero eyebrow="ICONIC · SOUTHLAKE ARENA" title="THE BALL SERIES." sub="Six distinct event properties. One arena home. The Ball Series turns formalwear, culture, nightlife and seasonal tentpoles into a recurring Southlake Arena franchise." accent="#b897ff">
    <Button href="#calendar">View Season</Button><Button href="/southlake-arena" ghost>Southlake Hub</Button>
  </Hero>
  <Section eyebrow="The Franchise" title="Every Ball keeps its own identity.">
    <InfoGrid items={[
      {label:"Home Venue",value:"Southlake Arena",body:"The Ball Series is anchored at Southlake Arena."},
      {label:"Season",value:"6 Properties",body:"Greek Ball, Monster's Ball, Black Ball, Snow Ball, Champagne Ball and Rose Ball."},
      {label:"Audience",value:"25+ Core",body:"Semi-formal and premium social audiences, with event-specific targeting by property."},
      {label:"Operating Rule",value:"Separate Brands",body:"Each Ball maintains its own creative, audience, marketing funnel and operating plan under ICONIC."},
    ]}/>
  </Section>
  <Section eyebrow="2026–2027 · Southlake Arena" title="Six reasons to dress for the room." dark>
    <div id="calendar" style={{maxWidth:1050}}><Calendar rows={balls} status="THE BALL SERIES · SOUTHLAKE ARENA"/></div>
  </Section>
  <Section eyebrow="Commercial Architecture" title="Designed to compound attendance across the season.">
    <InfoGrid items={[
      {label:"Tickets",value:"Event-Specific",body:"Every Ball sells independently with its own ticket ladder and urgency cycle."},
      {label:"VIP",value:"Premium Inventory",body:"Tables, reserved inventory and hospitality packages increase yield per attendee."},
      {label:"Sponsors",value:"Season + Event",body:"Partners can buy the entire Ball Series or a single property without collapsing brand identity."},
      {label:"Retention",value:"Next Ball",body:"Every purchaser is routed into the next relevant Ball presale and remarketing funnel."},
    ]}/>
  </Section>
</Shell>}
