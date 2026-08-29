import type { Metadata } from "next";
import { Button, Hero, InfoGrid, Section, Shell } from "../_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC Las Vegas — 4 Event Market Program",
  description: "ICONIC is launching a four-event live entertainment program in Las Vegas.",
};

export default function LasVegasPage(){return <Shell>
  <Hero eyebrow="ICONIC · NATIONAL CIRCUIT · MARKET 03" title="LAS VEGAS." sub="Four ICONIC events. One of the most competitive entertainment markets in the world. The Las Vegas program is now defined as a four-event market rollout, with individual event identities, venues, talent and dates announced separately." accent="#a855f7">
    <Button href="#program">4-Event Program</Button><Button href="/" ghost>ICONIC Home</Button>
  </Hero>
  <Section eyebrow="Las Vegas Program" title="Four events. Built to enter the market with weight.">
    <div id="program"><InfoGrid items={[
      {label:"Market",value:"Las Vegas",body:"A dedicated ICONIC expansion market."},
      {label:"Annual Program",value:"4 Events",body:"Four distinct ICONIC dates planned for the market."},
      {label:"Venue Strategy",value:"To Be Announced",body:"Venue relationships are announced only when confirmed for each event."},
      {label:"Brand Architecture",value:"Separate Properties",body:"Each event keeps its own identity, audience and conversion funnel under ICONIC."},
    ]}/></div>
  </Section>
  <Section eyebrow="Launch Standard" title="No placeholder events. No filler dates." dark>
    <InfoGrid items={[
      {label:"Talent",value:"Demand First",body:"Every event is built around a clear audience and ticket-demand thesis."},
      {label:"Production",value:"Arena-Level Thinking",body:"The experience is designed for capture, sponsor inventory and repeatability."},
      {label:"Sales",value:"Market-Specific",body:"Vegas buyers enter a dedicated local CRM and remarketing path."},
      {label:"Expansion",value:"4 / 4 / 4",body:"Las Vegas joins Washington DC and Tampa as a four-event ICONIC expansion market."},
    ]}/>
  </Section>
</Shell>}
