import type { Metadata } from "next";
import { Button, Calendar, Hero, InfoGrid, Section, Shell } from "../_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC Tampa — 2027 Four-Event Program",
  description: "ICONIC Tampa 2027 planning holds: four live entertainment dates across the full calendar year.",
};

const tampa=[
  {month:"JAN",date:"JAN 30 · HOLD",anchor:"WINTER MARKET OPEN"},
  {month:"APR",date:"APR 17 · HOLD",anchor:"SPRING"},
  {month:"JUL",date:"JUL 03 · HOLD",anchor:"INDEPENDENCE DAY WEEKEND"},
  {month:"OCT",date:"OCT 16 · HOLD",anchor:"FALL / HALLOWEEN RUNWAY"},
];

export default function TampaPage(){return <Shell>
  <Hero eyebrow="ICONIC · NATIONAL CIRCUIT · MARKET 05" title="TAMPA." sub="Four 2027 planning holds distributed across the full year so ICONIC can build a real Tampa Bay audience instead of appearing once and disappearing. Each date remains its own event property with dedicated talent, venue and funnel." accent="#ff6d67">
    <Button href="/tampa/nightmare-on-channelside/merch">Nightmare Merch</Button><Button href="#calendar" ghost>2027 Holds</Button><Button href="/" ghost>ICONIC Home</Button>
  </Hero>
  <Section eyebrow="Tampa Program" title="Four events. Four chances to compound the market.">
    <InfoGrid items={[
      {label:"Market",value:"Tampa Bay",body:"Tampa, St. Petersburg and the wider Bay market are treated as one regional demand opportunity with segmented targeting."},
      {label:"Annual Program",value:"4 Events",body:"Four strategically spaced Saturday planning holds."},
      {label:"Venue Strategy",value:"Event-Specific",body:"Each property gets the room that best matches its audience and scale."},
      {label:"Brand Architecture",value:"Separate Properties",body:"Every event maintains its own identity, creative direction and conversion path."},
    ]}/>
  </Section>
  <Section eyebrow="Nightmare on Channelside" title="Official Halloween merch is now its own ICONIC experience." dark>
    <InfoGrid items={[
      {label:"Storefront",value:"14 Collections",body:"Artist, event, Tampa and culture collections remain completely separated."},
      {label:"Merch System",value:"140 Slots",body:"Ten dedicated graphic-shirt product routes are prebuilt for every collection."},
      {label:"Creative",value:"Halloween Archive",body:"Cinematic editorial design built to feel collectible rather than like a generic concert merch grid."},
      {label:"Status",value:"Live Build",body:"Artwork slots are ready to receive finished merch graphics as production is completed."},
    ]}/>
    <div style={{marginTop:28}}><Button href="/tampa/nightmare-on-channelside/merch">Enter Nightmare Merch</Button></div>
  </Section>
  <Section eyebrow="2027 Planning Holds" title="A full-year cadence instead of a one-off Tampa play." dark>
    <div id="calendar" style={{maxWidth:960}}><Calendar rows={tampa} status="ICONIC TAMPA · 2027 PLANNING HOLDS · VENUE + TALENT TBD"/></div>
  </Section>
  <Section eyebrow="Market Standard" title="Built to turn four nights into a permanent Tampa audience asset.">
    <InfoGrid items={[
      {label:"Audience",value:"Tampa Bay CRM",body:"Every buyer, lead and partner enters a dedicated Tampa market data layer."},
      {label:"Partners",value:"Local + National",body:"Sponsor packages can be sold event-by-event or across all four Tampa dates."},
      {label:"Sales",value:"Presale Flywheel",body:"Every event sells the next event before the audience leaves the current one."},
      {label:"Status",value:"Planning Holds",body:"Dates stay internal targets until venue and talent contracts convert them to confirmed."},
    ]}/>
  </Section>
</Shell>}
