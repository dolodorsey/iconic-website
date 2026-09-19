import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CinematicShell } from "../../../_cinematic";
import { getPartnerRole, PARTNER_ROLES } from "@/lib/noc-partner-roles";
import PartnerRoleForm from "./PartnerRoleForm";
import s from "./form.module.css";

export function generateStaticParams(){ return PARTNER_ROLES.map(role=>({role:role.slug})); }

export async function generateMetadata({params}:{params:Promise<{role:string}>}):Promise<Metadata>{
  const {role:slug}=await params;
  const role=getPartnerRole(slug);
  if(!role) return {title:"Partner Application"};
  return {
    title:`${role.title} Application`,
    description:`Apply to ICONIC LIVE for the ${role.title} lane for Nightmare on Channelside in Tampa.`,
    robots:{index:false,follow:false},
  };
}

export default async function RoleApplicationPage({params}:{params:Promise<{role:string}>}){
  const {role:slug}=await params;
  const role=getPartnerRole(slug);
  if(!role) notFound();

  return <CinematicShell active="/partners">
    <section className={s.shell}>
      <div className={s.header}>
        <a href="/partners#join-team" className={s.back}>← ALL PERSONNEL LANES</a>
        <span className={s.pipeline}>{role.pipelineKey.replaceAll("_"," ").toUpperCase()}</span>
      </div>
      <div className={s.hero}>
        <div>
          <span className={s.kicker}>ICONIC LIVE / NIGHTMARE ON CHANNELSIDE</span>
          <h1>{role.title}</h1>
          <p className={s.short}>{role.short}</p>
        </div>
        <aside>
          <span>COMPENSATION MODEL</span>
          <p>{role.compensation}</p>
          <span>WHAT WE EXPECT</span>
          <p>{role.commitment}</p>
        </aside>
      </div>
      <div className={s.futureNote}>
        <span>UPCOMING</span>
        <p>Nightmare on Channelside · Saturday, October 31, 2026 · Tampa, Florida. Your application is being reviewed specifically for this campaign. Strong execution can still build your track record inside the ICONIC LIVE network, but other properties are intentionally not being presented on this page right now.</p>
      </div>
      <PartnerRoleForm role={role}/>
    </section>
  </CinematicShell>;
}
