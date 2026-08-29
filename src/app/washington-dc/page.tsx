import type { Metadata } from "next";
import { Button, Hero, InfoGrid, Section, Shell } from "../_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC Washington DC — 4 Event Market Program",
  description: "ICONIC is launching a four-event live entertainment program in Washington DC.",
};

export default function WashingtonDCPage(){return <Shell>
  <Hero eyebrow="ICONIC · NATIONAL CIRCUIT · MARKET 04" title="WASHINGTON DC." sub="Four ICONIC events built for the DC market. Each date will carry its own event identity, audience strategy, venue plan, talent package and conversion funnel while operating under the ICONIC national platform." accent="#5b8cff">
    <Button href="#program">4-Event Program</Button><Button href="/" ghost>ICONIC Home</Button>
  </Hero>
  <Section eyebrow="Washington DC Program" title="Four dates. One deliberate market entry.">
    <div id="program"><InfoGrid items={[
      {label:"Market",value:"Washington DC",body:"A dedicated ICONIC expansion market."},
      {label:"Annual Program",value:"4 Events",body:"Four distinct ICONIC dates planned for the market."},
      {label:"Venue Strategy",value:"To Be Announced",body:"Venue selections remain event-specific and are announced after confirmation."},
      {label:"Brand Architecture",value:"Separate Properties",body:"Every event keeps its own identity, audience and sales path."},
    ]}/></div>
  </Section>
  <Section eyebrow="Market Standard" title="Built for regional draw, premium partners and repeat attendance." dark>
    <InfoGrid items={[
      {label:"Audience",value:"DMV Reach",body:"Programming can draw from DC, Maryland and Northern Virginia without flattening local targeting."},
      {label:"Partners",value:"Premium + Cultural",body:"Sponsor inventory is packaged around each event and the wider four-event market program."},
      {label:"Sales",value:"DC Funnel",body:"Local ticket buyers and leads stay inside a dedicated DC remarketing path."},
      {label:"Expansion",value:"4 / 4 / 4",body:"Washington DC joins Las Vegas and Tampa as a four-event ICONIC expansion market."},
    ]}/>
  </Section>
</Shell>}
