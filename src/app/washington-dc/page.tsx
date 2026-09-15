import type { Metadata } from "next";
import { Button, Calendar, Hero, InfoGrid, Section, Shell } from "../_components/IconicPage";

export const metadata: Metadata = {
  title: "ICONIC Washington DC — Live Entertainment Updates",
  description: "Discover ICONIC's planned Washington DC experiences and request local event updates. Dates, venues and talent remain subject to announcement.",
};
// Original: Drive 1_Ks8CqO1RVSmLf7m644guTcVSkXcqnyt. Verified stable mirror; never substitute another market.
const VISUAL="https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-washington-dc-market-stable.webp?v=1789462683";
const dc=[
  {month:"MAR",date:"MAR 13 · HOLD",anchor:"SPRING MARKET OPEN"},
  {month:"JUN",date:"JUN 19 · HOLD",anchor:"JUNETEENTH"},
  {month:"AUG",date:"AUG 28 · HOLD",anchor:"LATE SUMMER / FALL"},
  {month:"NOV",date:"NOV 13 · HOLD",anchor:"FALL"},
];
export default function WashingtonDCPage(){return <Shell>
  <Hero visual={VISUAL} visualNote="MARKET CONCEPT · DATES, VENUES + TALENT TO BE ANNOUNCED" eyebrow="ICONIC · WASHINGTON DC" title="THE DMV. A WORLD OF ITS OWN." sub="Live music, culture and memorable nights for Washington DC, Maryland and Northern Virginia. Explore the planned season and be first to hear when each experience is announced.">
    <Button href="/access?intent=presale&event=iconic-washington-dc">Get DC Updates</Button><Button href="#calendar" ghost>Explore the Planned Season</Button>
  </Hero>
  <Section eyebrow="The DMV Experience" title="Different nights. Local perspective.">
    <InfoGrid items={[
      {label:"Market",value:"Washington DC",body:"Experiences for DC, Maryland and Northern Virginia."},
      {label:"Planned Season",value:"Four Occasions",body:"Spring, Juneteenth, late summer and fall are the current planning windows."},
      {label:"The Setting",value:"Made for the Night",body:"Venues and talent will be announced with each confirmed event."},
      {label:"Stay Connected",value:"Local Updates",body:"Request news for this market, with ticket and access details as they become available."},
    ]}/>
  </Section>
  <Section eyebrow="Proposed 2027 Season" title="The dates we are working toward." dark>
    <p style={{maxWidth:850,lineHeight:1.7,marginBottom:24}}>These are planning holds, not confirmed public events or ticket offers. Dates may change. Venue and talent details will be published after confirmation.</p>
    <div id="calendar" style={{maxWidth:960,scrollMarginTop:160}}><Calendar rows={dc} status="PROPOSED 2027 DATES · NOT ON SALE · VENUE + TALENT TBA"/></div>
  </Section>
  <Section eyebrow="Join the Conversation" title="Be part of the next DC experience.">
    <Button href="/access?intent=presale&event=iconic-washington-dc">Event Updates</Button><Button href="/access?intent=sponsorship&event=iconic-washington-dc" ghost>DC Partnerships</Button>
  </Section>
</Shell>}
