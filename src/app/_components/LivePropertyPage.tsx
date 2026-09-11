import Link from "next/link";
import { Button, C, Hero, InfoGrid, Section, Shell } from "./IconicPage";

type Stat = { label: string; value: string; body?: string };
type Pillar = { label: string; title: string; body: string };
type Stop = { city: string; venue: string; meta?: string; note?: string; href?: string };

type LivePropertyPageProps = {
  eyebrow: string;
  title: string;
  sub: string;
  visual: string;
  visualPosition?: string;
  status: string;
  accent: string;
  stats: Stat[];
  pillars: Pillar[];
  stops?: Stop[];
  stopsEyebrow?: string;
  stopsTitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  merchLabel?: string;
  merchHref?: string;
  footerEyebrow?: string;
  footerTitle?: string;
};

export default function LivePropertyPage({
  eyebrow,
  title,
  sub,
  visual,
  visualPosition = "center center",
  status,
  accent,
  stats,
  pillars,
  stops,
  stopsEyebrow = "Tour Architecture",
  stopsTitle = "The route becomes part of the campaign.",
  primaryLabel = "Get First Access",
  primaryHref = "/access?intent=presale",
  secondaryLabel = "Partnership Access",
  secondaryHref = "/access?intent=sponsorship",
  merchLabel = "Shop Merch",
  merchHref = "/merch",
  footerEyebrow = "ICONIC LIVE",
  footerTitle = "BE THERE BEFORE EVERYONE ELSE.",
}: LivePropertyPageProps) {
  return (
    <Shell>
      <Hero visual={visual} visualPosition={visualPosition} eyebrow={eyebrow} title={title} sub={sub} visualNote={status}>
        <Button href={primaryHref}>{primaryLabel}</Button>
        <Button href={secondaryHref} ghost>{secondaryLabel}</Button>
      </Hero>

      <section style={{position:"relative",zIndex:2,padding:"28px clamp(22px,6vw,90px) 88px"}}>
        <div style={{maxWidth:1450,margin:"0 auto"}}><InfoGrid items={stats}/></div>
      </section>

      <Section eyebrow="The Experience" title="Built as a world — not just a date on a flyer." dark>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>
          {pillars.map((pillar,index)=><article key={pillar.title} className="glass market-card" style={{padding:30,borderRadius:24,minHeight:290,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",width:180,height:180,borderRadius:"50%",right:-80,top:-80,background:accent,filter:"blur(65px)",opacity:.17}}/>
            <div style={{position:"relative",zIndex:2,color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".22em",textTransform:"uppercase"}}>{String(index+1).padStart(2,"0")} / {pillar.label}</div>
            <h2 style={{position:"relative",zIndex:2,fontFamily:"Georgia,serif",fontSize:"clamp(32px,3.1vw,48px)",lineHeight:.96,letterSpacing:"-.035em",margin:"20px 0 16px"}}>{pillar.title}</h2>
            <p style={{position:"relative",zIndex:2,color:C.muted,fontSize:13,lineHeight:1.75,margin:0}}>{pillar.body}</p>
          </article>)}
        </div>
      </Section>

      {stops && stops.length > 0 && <Section eyebrow={stopsEyebrow} title={stopsTitle}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(245px,1fr))",gap:12}}>
          {stops.map((stop,index)=>{
            const card=<>
              <div style={{display:"flex",justifyContent:"space-between",gap:16,alignItems:"center"}}><span style={{fontSize:8,fontWeight:900,letterSpacing:".2em",color:C.gold2}}>{String(index+1).padStart(2,"0")}</span><div style={{display:"flex",gap:10,alignItems:"center"}}>{stop.meta && <span style={{fontSize:8,fontWeight:900,letterSpacing:".12em",color:C.muted,textTransform:"uppercase"}}>{stop.meta}</span>}{stop.href && <span style={{fontSize:17}}>↗</span>}</div></div>
              <div style={{marginTop:32}}><h3 style={{fontFamily:"Georgia,serif",fontSize:36,lineHeight:.95,margin:"0 0 9px",letterSpacing:"-.03em"}}>{stop.city}</h3><div style={{fontSize:11,fontWeight:900,letterSpacing:".09em",textTransform:"uppercase",color:C.white}}>{stop.venue}</div>{stop.note && <p style={{fontSize:12,lineHeight:1.65,color:C.muted,margin:"12px 0 0"}}>{stop.note}</p>}</div>
            </>;
            const style={padding:26,borderRadius:22,minHeight:205,display:"flex",flexDirection:"column" as const,justifyContent:"space-between",color:C.white,textDecoration:"none"};
            return stop.href ? <Link key={`${stop.city}-${stop.venue}`} href={stop.href} className="glass market-card" style={style}>{card}</Link> : <article key={`${stop.city}-${stop.venue}`} className="glass market-card" style={style}>{card}</article>;
          })}
        </div>
        <div style={{marginTop:28,display:"flex",gap:10,flexWrap:"wrap"}}><Button href={primaryHref}>{primaryLabel}</Button><Button href={merchHref} ghost>{merchLabel}</Button></div>
      </Section>}

      <section style={{position:"relative",zIndex:2,padding:"110px clamp(22px,6vw,90px)",borderTop:`1px solid ${C.faint}`,overflow:"hidden"}}>
        <div style={{position:"absolute",inset:"20% -10% auto",height:280,background:accent,filter:"blur(150px)",opacity:.11}}/>
        <div style={{position:"relative",maxWidth:1150,margin:"0 auto",textAlign:"center"}}>
          <div style={{color:C.gold2,fontSize:9,fontWeight:900,letterSpacing:".3em",textTransform:"uppercase",marginBottom:18}}>{footerEyebrow}</div>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(52px,8vw,118px)",lineHeight:.82,letterSpacing:"-.055em",margin:"0 0 30px"}}>{footerTitle}</h2>
          <Button href={primaryHref}>{primaryLabel}</Button><Button href={merchHref} ghost>{merchLabel}</Button>
        </div>
      </section>
    </Shell>
  );
}
