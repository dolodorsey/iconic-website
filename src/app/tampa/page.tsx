import type { Metadata } from "next";
import { Button, Calendar, Hero, InfoGrid, Section, Shell, drive } from "../_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC Tampa — Nightmare on Channelside + 2027 Program",
  description: "ICONIC Tampa is anchored by Nightmare on Channelside on October 31, 2026, followed by a four-event 2027 market program.",
};

const tampa=[
  {month:"JAN",date:"JAN 30 · HOLD",anchor:"WINTER MARKET OPEN"},
  {month:"APR",date:"APR 17 · HOLD",anchor:"SPRING"},
  {month:"JUL",date:"JUL 03 · HOLD",anchor:"INDEPENDENCE DAY WEEKEND"},
  {month:"OCT",date:"OCT 16 · HOLD",anchor:"FALL / HALLOWEEN RUNWAY"},
];

export default function TampaPage(){return <Shell>
  <Hero visual={drive("1Ub439rjM3-SwK67udFKh6f2q5SwDF_U1")} visualPosition="center 36%" eyebrow="ICONIC · TAMPA · ACTIVE NOW" title="NIGHTMARE ON CHANNELSIDE." sub="Saturday, October 31, 2026. Benchmark International Arena. Tampa's biggest Halloween concert becomes the anchor for ICONIC's long-term Tampa market strategy.">
    <Button href="/tampa/nightmare-on-channelside">Enter The Concert</Button><Button href="/tampa/nightmare-on-channelside/merch" ghost>Nightmare Merch</Button><Button href="#calendar" ghost>2027 Tampa Program</Button>
  </Hero>

  <Section eyebrow="Active Flagship" title="Build the Tampa audience now — then compound it in 2027.">
    <InfoGrid items={[
      {label:"Halloween 2026",value:"Nightmare on Channelside",body:"The active Tampa flagship concert at Benchmark International Arena."},
      {label:"Date",value:"October 31",body:"Saturday night. Doors 6 PM. Showtime 7 PM."},
      {label:"Conversion",value:"Tickets + VIP + Sponsors",body:"The event page now separates ticketing, premium hospitality, partnerships and merch into their own paths."},
      {label:"Afterlife",value:"Dedicated Merch",body:"Artist, Tampa, event and Halloween collections extend the property beyond the arena."},
    ]}/>
    <div style={{marginTop:30}}><Button href="/tampa/nightmare-on-channelside">Open Nightmare on Channelside</Button></div>
  </Section>

  <Section eyebrow="2027 Tampa Program" title="The Halloween audience becomes a repeat-market asset." dark>
    <InfoGrid items={[
      {label:"Market",value:"Tampa Bay",body:"Tampa, St. Petersburg and the wider Bay market are treated as one regional demand opportunity with segmented targeting."},
      {label:"Annual Program",value:"4 Events",body:"Four strategically spaced 2027 planning holds."},
      {label:"Venue Strategy",value:"Event-Specific",body:"Each property gets the room that best matches its audience and scale."},
      {label:"Brand Architecture",value:"Separate Properties",body:"Every event maintains its own identity, creative direction and conversion path."},
    ]}/>
  </Section>

  <Section eyebrow="2027 Planning Holds" title="A full-year cadence instead of a one-off Tampa play.">
    <div id="calendar" style={{maxWidth:960}}><Calendar rows={tampa} status="ICONIC TAMPA · 2027 PLANNING HOLDS · VENUE + TALENT TBD"/></div>
  </Section>

  <Section eyebrow="Market Standard" title="Every Tampa event should make the next one easier to sell." dark>
    <InfoGrid items={[
      {label:"Audience",value:"Tampa CRM",body:"Ticket buyers, premium leads and partner interest remain tagged to the Tampa market and event property."},
      {label:"Partners",value:"Local + National",body:"Sponsor packages can be sold event-by-event or across the future Tampa series."},
      {label:"Sales",value:"Presale Flywheel",body:"Every event can begin selling and segmenting the audience for the next event."},
      {label:"Creative",value:"Property-Specific",body:"Nightmare keeps its black-red horror world while future Tampa shows can hold completely separate identities."},
    ]}/>
  </Section>
</Shell>}
