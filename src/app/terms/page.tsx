import type { Metadata } from "next";
import { C, Section, Shell } from "@/app/_components/IconicPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of the ICONIC LIVE website, event information, access requests and merchandise links.",
};

const sections=[
  ["Website Use","This website provides information about ICONIC LIVE concerts, tours, experiences, access opportunities, partnerships and merchandise. You may use the site only for lawful purposes and may not interfere with its operation, security or other users."],
  ["Event Information","Event dates, venues, lineups, ticketing details, hospitality inventory and other event information may change. Unless specifically stated as final or on-sale, information presented on the website may reflect current planning, holds, routing or campaign architecture and is subject to confirmation."],
  ["Access Requests","Submitting a presale, VIP, sponsorship, travel, media, partnership or merchandise request does not guarantee tickets, inventory, acceptance, pricing, partnership rights or any other benefit. Requests are reviewed and routed according to availability and the applicable event or business opportunity."],
  ["Tickets and Third-Party Services","Ticketing, payment, travel, merchandise fulfillment or other services may be provided by third parties. Additional terms, refund rules, delivery terms and privacy practices may apply when you complete a transaction through those providers."],
  ["Intellectual Property","ICONIC LIVE names, branding, graphics, event concepts, site design and related materials are protected by applicable intellectual-property laws. Artist names, images, trademarks and other third-party materials remain the property of their respective owners and are used only as authorized or otherwise permitted."],
  ["No Unauthorized Resale or Misuse","You may not scrape, reproduce, resell, impersonate, falsely represent sponsorship rights, misuse event materials or use the site to create fraudulent ticket, merchandise or partnership offers."],
  ["Limitation","To the extent allowed by law, ICONIC LIVE and The Kollective Hospitality Group are not responsible for indirect losses arising from site interruptions, third-party services, schedule changes or reliance on information that has not been identified as final."],
  ["Contact","Questions about these terms can be directed to info@thekollectivehospitality.com."],
];

export default function TermsPage(){return <Shell>
  <section style={{padding:"clamp(110px,14vw,180px) clamp(22px,6vw,90px) 70px",background:"radial-gradient(circle at 70% 20%,rgba(224,173,69,.12),transparent 28%),#050403"}}>
    <div style={{maxWidth:1050}}><div style={{color:C.gold2,fontSize:9,fontWeight:900,letterSpacing:".28em",textTransform:"uppercase"}}>ICONIC LIVE · LEGAL</div><h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(56px,9vw,120px)",lineHeight:.84,letterSpacing:"-.05em",margin:"18px 0 24px"}}>TERMS OF USE.</h1><p style={{maxWidth:760,color:C.muted,lineHeight:1.75}}>Effective September 11, 2026. These terms govern use of the ICONIC LIVE website and its access-request pathways.</p></div>
  </section>
  <Section eyebrow="Terms" title="Use the platform correctly." dark>
    <div style={{display:"grid",gap:16,maxWidth:1050}}>{sections.map(([title,body])=><article key={title} className="glass" style={{padding:28,borderRadius:22}}><h2 style={{fontFamily:"Georgia,serif",fontSize:34,margin:"0 0 12px"}}>{title}</h2><p style={{color:C.muted,lineHeight:1.8,margin:0,fontSize:14}}>{body}</p></article>)}</div>
  </Section>
</Shell>}
