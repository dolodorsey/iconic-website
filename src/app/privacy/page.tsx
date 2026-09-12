import type { Metadata } from "next";
import { C, Section, Shell } from "@/app/_components/IconicPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for ICONIC LIVE website visitors, access requests, event inquiries and merchandise customers.",
};

const sections=[
  ["Information We Collect","When you submit an access, VIP, sponsorship, media, travel, partnership or merchandise request, we may collect the information you provide such as your name, email address, phone number, company, city, event interest and message. We also preserve limited campaign attribution such as page path and UTM source, medium and campaign."],
  ["How We Use Information","We use submitted information to respond to requests, route inquiries to the correct ICONIC LIVE team or event, manage presale and VIP interest, evaluate sponsorship and partnership opportunities, support merchandise communications and improve our event marketing and customer experience."],
  ["Analytics","ICONIC LIVE uses privacy-minimized first-party event tracking to understand page views and conversion actions. The analytics system is designed not to store names, email addresses, phone numbers, form notes, cookies or raw IP addresses in the behavioral event table."],
  ["Service Providers","We may use trusted infrastructure and commerce providers to operate the website, database, hosting, email, ticketing, merchandise and related services. Those providers process information according to their own contractual and legal obligations."],
  ["Data Retention","We retain inquiry and business records only as long as reasonably necessary for event operations, customer support, legal obligations, business records and legitimate follow-up. Retention periods can differ depending on the type of request and applicable requirements."],
  ["Your Choices","You may ask us to correct or delete information you submitted, subject to legal, contractual or recordkeeping requirements. You can also choose not to submit optional fields on our forms."],
  ["Contact","For privacy questions or requests, contact ICONIC LIVE / The Kollective Hospitality Group at info@thekollectivehospitality.com."],
];

export default function PrivacyPage(){return <Shell>
  <section style={{padding:"clamp(110px,14vw,180px) clamp(22px,6vw,90px) 70px",background:"radial-gradient(circle at 70% 20%,rgba(224,173,69,.12),transparent 28%),#050403"}}>
    <div style={{maxWidth:1050}}><div style={{color:C.gold2,fontSize:9,fontWeight:900,letterSpacing:".28em",textTransform:"uppercase"}}>ICONIC LIVE · LEGAL</div><h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(56px,9vw,120px)",lineHeight:.84,letterSpacing:"-.05em",margin:"18px 0 24px"}}>PRIVACY POLICY.</h1><p style={{maxWidth:760,color:C.muted,lineHeight:1.75}}>Effective September 11, 2026. This policy explains how ICONIC LIVE and The Kollective Hospitality Group handle information submitted through this website.</p></div>
  </section>
  <Section eyebrow="Privacy" title="Clear data handling. No hidden games." dark>
    <div style={{display:"grid",gap:16,maxWidth:1050}}>{sections.map(([title,body])=><article key={title} className="glass" style={{padding:28,borderRadius:22}}><h2 style={{fontFamily:"Georgia,serif",fontSize:34,margin:"0 0 12px"}}>{title}</h2><p style={{color:C.muted,lineHeight:1.8,margin:0,fontSize:14}}>{body}</p></article>)}</div>
  </Section>
</Shell>}
