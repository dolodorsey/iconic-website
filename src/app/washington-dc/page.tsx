import type { Metadata } from "next";
import { Button, Calendar, Hero, InfoGrid, Section, Shell } from "../_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC Washington DC — 2027 Four-Event Program",
  description: "ICONIC Washington DC 2027 planning holds: four live entertainment dates built for the DMV market.",
};

const dc=[
  {month:"MAR",date:"MAR 13 · HOLD",anchor:"SPRING MARKET OPEN"},
  {month:"JUN",date:"JUN 19 · HOLD",anchor:"JUNETEENTH"},
  {month:"AUG",date:"AUG 28 · HOLD",anchor:"LATE SUMMER / FALL RUNWAY"},
  {month:"NOV",date:"NOV 13 · HOLD",anchor:"VETERANS WEEK / FALL"},
];

export default function WashingtonDCPage(){return <Shell>
  <Hero eyebrow="ICONIC · NATIONAL CIRCUIT · MARKET 04" title="WASHINGTON DC." sub="Four 2027 planning holds for the DMV. The cadence creates a spring opening, a Juneteenth tentpole, a late-summer return and a strong fall close — each with its own event identity and local demand strategy." accent="#5b8cff">
    <Button href="#calendar">2027 Holds</Button><Button href="/" ghost>ICONIC Home</Button>
  </Hero>
  <Section eyebrow="Washington DC Program" title="Four dates. One deliberate DMV footprint.">
    <InfoGrid items={[
      {label:"Market",value:"Washington DC",body:"A dedicated ICONIC expansion market reaching DC, Maryland and Northern Virginia."},
      {label:"Annual Program",value:"4 Events",body:"Four strategically spaced Saturday planning holds."},
      {label:"Venue Strategy",value:"Event-Specific",body:"Venue selection follows the audience and scale of each distinct property."},
      {label:"Brand Architecture",value:"Separate Properties",body:"Every date keeps its own identity, creative language and sales path."},
    ]}/>
  </Section>
  <Section eyebrow="2027 Planning Holds" title="A calendar that gives the market time to build between moments." dark>
    <div id="calendar" style={{maxWidth:960}}><Calendar rows={dc} status="ICONIC WASHINGTON DC · 2027 PLANNING HOLDS · VENUE + TALENT TBD"/></div>
  </Section>
  <Section eyebrow="Market Standard" title="Regional draw without turning the DMV into one generic audience.">
    <InfoGrid items={[
      {label:"Audience",value:"DMV Segmentation",body:"DC, Maryland and Northern Virginia can be targeted separately while sharing one event demand model."},
      {label:"Partners",value:"Premium + Cultural",body:"Sponsor inventory can be sold per property or across the four-date market program."},
      {label:"Sales",value:"DC Funnel",body:"Local ticket buyers and leads remain inside a dedicated DC remarketing path."},
      {label:"Status",value:"Planning Holds",body:"Dates stay internal targets until contracts make them confirmed public events."},
    ]}/>
  </Section>
</Shell>}
