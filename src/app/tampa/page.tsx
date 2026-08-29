import type { Metadata } from "next";
import { Button, Hero, InfoGrid, Section, Shell } from "../_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC Tampa — 4 Event Market Program",
  description: "ICONIC is launching a four-event live entertainment program in Tampa.",
};

export default function TampaPage(){return <Shell>
  <Hero eyebrow="ICONIC · NATIONAL CIRCUIT · MARKET 05" title="TAMPA." sub="Four ICONIC events built for Tampa. The market program is designed around distinct event brands, strong local demand, sponsor inventory and repeatable audience growth — with venues, talent and dates announced per property." accent="#ff6d67">
    <Button href="#program">4-Event Program</Button><Button href="/" ghost>ICONIC Home</Button>
  </Hero>
  <Section eyebrow="Tampa Program" title="Four events. Built for a real market footprint.">
    <div id="program"><InfoGrid items={[
      {label:"Market",value:"Tampa",body:"A dedicated ICONIC expansion market."},
      {label:"Annual Program",value:"4 Events",body:"Four distinct ICONIC dates planned for Tampa."},
      {label:"Venue Strategy",value:"To Be Announced",body:"Each event gets the venue that best fits its audience and scale."},
      {label:"Brand Architecture",value:"Separate Properties",body:"Every event maintains its own identity, funnel and operating plan."},
    ]}/></div>
  </Section>
  <Section eyebrow="Market Standard" title="Built to compound local audience, sponsor and ticket data." dark>
    <InfoGrid items={[
      {label:"Audience",value:"Tampa Bay",body:"Programming is built to draw across Tampa, St. Petersburg and the wider Bay market."},
      {label:"Partners",value:"Local + National",body:"Sponsor packages can be sold per event or across the four-event Tampa program."},
      {label:"Sales",value:"Tampa Funnel",body:"Local buyers stay in a dedicated market CRM and presale path."},
      {label:"Expansion",value:"4 / 4 / 4",body:"Tampa joins Las Vegas and Washington DC as a four-event ICONIC expansion market."},
    ]}/>
  </Section>
</Shell>}
