import type { Metadata } from "next";
import { Button, Calendar, Hero, InfoGrid, Section, Shell } from "../_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC Las Vegas — 2027 Four-Event Program",
  description: "ICONIC Las Vegas 2027 planning holds: four live entertainment dates across major leisure and holiday windows.",
};

const vegas=[
  {month:"FEB",date:"FEB 13 · HOLD",anchor:"VALENTINE'S + PRESIDENTS DAY WEEKEND"},
  {month:"MAY",date:"MAY 29 · HOLD",anchor:"MEMORIAL DAY WEEKEND"},
  {month:"SEP",date:"SEP 04 · HOLD",anchor:"LABOR DAY WEEKEND"},
  {month:"NOV",date:"NOV 27 · HOLD",anchor:"THANKSGIVING WEEKEND"},
];

export default function LasVegasPage(){return <Shell>
  <Hero eyebrow="ICONIC · NATIONAL CIRCUIT · MARKET 03" title="LAS VEGAS." sub="Four 2027 planning holds positioned on high-intent leisure weekends. Each date remains a distinct ICONIC property with its own venue, talent, creative direction and conversion funnel." accent="#a855f7">
    <Button href="#calendar">2027 Holds</Button><Button href="/" ghost>ICONIC Home</Button>
  </Hero>
  <Section eyebrow="Las Vegas Program" title="Four events. Built around the weekends Vegas already wins.">
    <InfoGrid items={[
      {label:"Market",value:"Las Vegas",body:"A dedicated ICONIC expansion market."},
      {label:"Annual Program",value:"4 Events",body:"Four strategically spaced Saturday planning holds."},
      {label:"Venue Strategy",value:"Event-Specific",body:"Venue relationships stay unannounced until actually contracted."},
      {label:"Brand Architecture",value:"Separate Properties",body:"Every event keeps its own identity, audience and conversion funnel."},
    ]}/>
  </Section>
  <Section eyebrow="2027 Planning Holds" title="Leisure weekends with built-in travel intent." dark>
    <div id="calendar" style={{maxWidth:960}}><Calendar rows={vegas} status="ICONIC LAS VEGAS · 2027 PLANNING HOLDS · VENUE + TALENT TBD"/></div>
  </Section>
  <Section eyebrow="Launch Standard" title="The dates are strategic. The event brands still have to earn the room.">
    <InfoGrid items={[
      {label:"Talent",value:"Demand First",body:"Every event is built around a clear ticket-demand thesis before inventory opens."},
      {label:"Production",value:"Arena-Level Thinking",body:"Capture, sponsor inventory and repeatability are engineered from the beginning."},
      {label:"Sales",value:"Vegas CRM",body:"Vegas buyers remain inside a dedicated local presale and remarketing path."},
      {label:"Status",value:"Planning Holds",body:"Dates are internal targets until venue and talent contracts convert them to confirmed."},
    ]}/>
  </Section>
</Shell>}
