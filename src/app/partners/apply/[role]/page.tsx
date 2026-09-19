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
    description:`Apply to ICONIC LIVE for the ${role.title} lane for Nightmare on Channelside and future relevant ICONIC LIVE opportunities.`,
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
        <span>THIS IS BIGGER THAN ONE NIGHT</span>
        <p>Nightmare on Channelside in Tampa is the first active assignment. Strong personnel can be considered first for future ICONIC LIVE cities and touring properties, including an Atlanta target for Nightmare on Channelside, the Summer Walker Soul Symphony concept, the DJ Snake Pardon My French concept, and additional live properties as they are confirmed.</p>
      </div>
      <PartnerRoleForm role={role}/>
    </section>
  </CinematicShell>;
}
