import Link from "next/link";
import type { ReactNode } from "react";

export const C={
  black:"#050403",
  panel:"rgba(13,10,5,.88)",
  panel2:"rgba(24,17,7,.78)",
  white:"#fffaf0",
  muted:"rgba(255,244,219,.67)",
  faint:"rgba(236,187,89,.18)",
  gold:"#e0ad45",
  gold2:"#ffd97a",
  red:"#b98428"
};
export const drive=(id:string)=>`/api/media/drive/${id}`;
export const ICONIC_LOGO=drive("1EYSPTnhLTDDuVjQAK4PjojbHogWrjDcw");
const navLink={color:"rgba(255,232,187,.72)",textDecoration:"none",fontFamily:"Arial,sans-serif",fontSize:9,fontWeight:900,letterSpacing:".14em",textTransform:"uppercase" as const};

export function Shell({children}:{children:ReactNode}){return <main className="iconic-shell" style={{minHeight:"100vh",color:C.white}}>
  <nav className="iconic-nav" style={{position:"sticky",top:0,zIndex:50,minHeight:76,padding:"0 clamp(18px,4vw,56px)",display:"flex",alignItems:"center",justifyContent:"space-between",gap:20,background:"rgba(4,3,1,.91)",borderBottom:`1px solid ${C.faint}`,backdropFilter:"blur(28px) saturate(145%)"}}>
    <Link href="/" style={{color:C.white,textDecoration:"none",display:"flex",alignItems:"center"}}><img src={ICONIC_LOGO} alt="ICONIC" style={{width:"min(210px,28vw)",maxHeight:52,objectFit:"contain",objectPosition:"left center",filter:"drop-shadow(0 8px 24px rgba(226,171,61,.18))"}}/></Link>
    <div className="iconic-nav-links" style={{display:"flex",gap:"clamp(9px,1.7vw,22px)",alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"}}>
      <Link href="/tampa-halloween" style={navLink}>Tampa Halloween</Link>
      <Link href="/summer-walker" style={navLink}>Summer Walker</Link>
      <Link href="/dj-snake-pardon-my-french" style={navLink}>DJ Snake</Link>
      <Link href="/merch" style={navLink}>Merch</Link>
      <Link href="/access?intent=presale" style={{...navLink,color:C.gold2}}>Access</Link>
    </div>
  </nav>
  {children}
  <footer className="iconic-footer" style={{position:"relative",zIndex:2,padding:"44px clamp(20px,5vw,72px)",borderTop:`1px solid ${C.faint}`,display:"flex",justifyContent:"space-between",gap:24,flexWrap:"wrap",background:"rgba(0,0,0,.56)"}}>
    <div><img src={ICONIC_LOGO} alt="ICONIC" style={{width:190,maxHeight:58,objectFit:"contain",objectPosition:"left center"}}/><div style={{marginTop:8,color:C.muted,fontSize:9,fontWeight:900,letterSpacing:".18em",textTransform:"uppercase"}}>Concerts · Culture · Experiences</div></div>
    <div style={{display:"flex",gap:18,alignItems:"center",flexWrap:"wrap"}}>
      <Link href="/tampa-halloween" style={navLink}>Tampa</Link><Link href="/summer-walker" style={navLink}>Summer Walker</Link><Link href="/dj-snake-pardon-my-french" style={navLink}>DJ Snake</Link><Link href="/merch" style={navLink}>Merch</Link><Link href="/southlake-arena" style={navLink}>Southlake</Link><Link href="/#national-circuit" style={navLink}>Markets</Link>
    </div>
  </footer>
</main>}

type HeroProps={eyebrow:string;title:string;sub:string;accent?:string;children?:ReactNode;visual?:string;visualPosition?:string;visualNote?:string};
export function Hero({eyebrow,title,sub,accent="#d9a23d",children,visual,visualPosition="center center",visualNote}:HeroProps){return <section className={`iconic-hero${visual?" has-visual":""}`} style={{minHeight:visual?"88vh":"82vh",padding:visual?"0":"128px clamp(22px,6vw,90px) 78px",display:"flex",alignItems:"end",position:"relative",overflow:"hidden",background:visual?"#040301":`radial-gradient(circle at 78% 18%,${accent}30,transparent 24%),radial-gradient(circle at 10% 90%,rgba(233,170,50,.12),transparent 28%),#050403`}}>
  {visual?<img className="hero-visual" src={visual} alt="" style={{position:"absolute",inset:0,zIndex:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:visualPosition}}/>:<><div className="light-beam" style={{right:"4%",top:"-22%"}}/><div className="arena-architecture"/><div className="hero-scanline"/></>}
  <div className="hero-gold-vignette"/>
  {visualNote&&<div className="hero-concept-note">{visualNote}</div>}
  <div className={visual?"hero-copy hero-copy-visual":"hero-copy"} style={{position:"relative",zIndex:2,width:"100%",maxWidth:1450,margin:visual?"0 auto clamp(24px,5vw,68px)":"0 auto"}}>
    {!visual&&<img src={ICONIC_LOGO} alt="ICONIC" style={{width:"min(520px,65vw)",maxHeight:160,objectFit:"contain",objectPosition:"left center",filter:"drop-shadow(0 18px 55px rgba(0,0,0,.55))",marginBottom:24}}/>}
    <div className="hero-eyebrow" style={{display:"flex",alignItems:"center",gap:10,color:C.gold2,fontSize:9,fontWeight:900,letterSpacing:".31em",textTransform:"uppercase",marginBottom:16}}><span className="pulse-dot"/>{eyebrow}</div>
    <h1 className={visual?"visual-hero-title":"neon-text"} style={{margin:0,maxWidth:visual?860:1250,fontFamily:"Georgia,serif",fontSize:visual?"clamp(40px,6.2vw,92px)":"clamp(62px,11vw,165px)",lineHeight:visual?.86:.8,letterSpacing:visual?"-.04em":"-.06em"}}>{title}</h1>
    <p style={{margin:"24px 0 0",maxWidth:760,color:C.muted,fontSize:"clamp(13px,1.35vw,17px)",lineHeight:1.75}}>{sub}</p>
    {children&&<div style={{marginTop:28}}>{children}</div>}
  </div>
</section>}

export function Button({href,children,ghost=false}:{href:string;children:ReactNode;ghost?:boolean}){return <Link href={href} className={ghost?"iconic-button ghost":"iconic-button"} style={{display:"inline-flex",minHeight:50,alignItems:"center",justifyContent:"center",padding:"0 26px",marginRight:10,marginBottom:10,borderRadius:999,textDecoration:"none",border:ghost?`1px solid ${C.faint}`:"1px solid rgba(255,221,139,.34)",background:ghost?"rgba(255,214,119,.055)":"linear-gradient(110deg,#fff2bd,#d89f34 44%,#ffdf7d)",color:ghost?C.white:C.black,fontSize:9,fontWeight:900,letterSpacing:".17em",textTransform:"uppercase",boxShadow:ghost?"none":"0 14px 44px rgba(201,143,40,.22)"}}>{children}</Link>}

export function Section({eyebrow,title,children,dark=false}:{eyebrow:string;title:string;children:ReactNode;dark?:boolean}){return <section className={dark?"iconic-section dark":"iconic-section"} style={{position:"relative",zIndex:2,padding:"96px clamp(22px,6vw,90px)",background:dark?"rgba(255,194,74,.018)":"transparent",borderTop:`1px solid ${C.faint}`}}><div style={{maxWidth:1450,margin:"0 auto"}}><div style={{color:C.gold2,fontSize:9,fontWeight:900,letterSpacing:".30em",textTransform:"uppercase",marginBottom:16}}>{eyebrow}</div><h2 style={{margin:"0 0 42px",maxWidth:1100,fontFamily:"Georgia,serif",fontSize:"clamp(44px,6vw,90px)",lineHeight:.9,letterSpacing:"-.035em"}}>{title}</h2>{children}</div></section>}

export function InfoGrid({items}:{items:{label:string;value:string;body?:string}[]}){return <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:14}}>{items.map(x=><div className="glass market-card" key={x.label} style={{padding:28,borderRadius:22}}><div style={{color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".19em",textTransform:"uppercase"}}>{x.label}</div><div style={{marginTop:14,fontFamily:"Georgia,serif",fontSize:30,lineHeight:1.03}}>{x.value}</div>{x.body&&<p style={{color:C.muted,fontSize:13,lineHeight:1.7,margin:"14px 0 0"}}>{x.body}</p>}</div>)}</div>}

export function Calendar({rows,status="2027 WORKING CALENDAR"}:{rows:{month:string;date:string;anchor:string}[];status?:string}){return <div className="glass calendar-shell" style={{overflow:"hidden"}}><div style={{padding:"20px 24px",color:C.gold2,fontSize:8,fontWeight:900,letterSpacing:".22em",textTransform:"uppercase",borderBottom:`1px solid ${C.faint}`}}>{status}</div>{rows.map((r,i)=><div className="calendar-row" key={`${r.month}-${i}`} style={{display:"grid",gridTemplateColumns:"72px minmax(100px,145px) 1fr",gap:18,padding:"18px 22px",borderBottom:i===rows.length-1?"none":`1px solid ${C.faint}`,alignItems:"center"}}><strong style={{fontSize:10,color:C.white}}>{r.month}</strong><span style={{color:C.gold2,fontSize:10,fontWeight:900,letterSpacing:".08em"}}>{r.date}</span><span style={{color:C.muted,fontSize:9,fontWeight:800,letterSpacing:".09em",textTransform:"uppercase"}}>{r.anchor}</span></div>)}</div>}

type VisualBannerProps={src:string;eyebrow?:string;title?:string;href?:string;height?:number;position?:string;note?:string};
export function VisualBanner({src,eyebrow,title,href,height=560,position="center center",note}:VisualBannerProps){
  const content=<><img src={src} alt={title||eyebrow||"ICONIC visual"} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:position}}/><div className="visual-banner-shade"/>{note&&<div className="visual-banner-note">{note}</div>}{(eyebrow||title)&&<div className="visual-banner-copy">{eyebrow&&<div>{eyebrow}</div>}{title&&<h3>{title}</h3>}</div>}</>;
  const style={position:"relative" as const,minHeight:height,display:"block",overflow:"hidden",borderRadius:28,border:`1px solid ${C.faint}`,color:C.white,textDecoration:"none",boxShadow:"0 34px 90px rgba(0,0,0,.38)"};
  return href?<Link href={href} className="visual-banner" style={style}>{content}</Link>:<div className="visual-banner" style={style}>{content}</div>;
}

export const ny21=[{month:"JAN",date:"JAN 09 · HOLD",anchor:"WINTER OPEN"},{month:"FEB",date:"FEB 20 · HOLD",anchor:"WINTER"},{month:"MAR",date:"MAR 06 · HOLD",anchor:"SPRING"},{month:"APR",date:"APR 10 · HOLD",anchor:"SPRING"},{month:"MAY",date:"MAY 22 · HOLD",anchor:"MEMORIAL WINDOW"},{month:"JUN",date:"JUN 26 · HOLD",anchor:"SUMMER"},{month:"JUL",date:"JUL 03 · HOLD",anchor:"JULY 4TH"},{month:"AUG",date:"AUG 14 · HOLD",anchor:"LATE SUMMER"},{month:"SEP",date:"SEP 11 · HOLD",anchor:"FALL"},{month:"OCT",date:"OCT 09 · HOLD",anchor:"FALL"},{month:"NOV",date:"NOV 13 · HOLD",anchor:"FALL"},{month:"DEC",date:"DEC 04 · HOLD",anchor:"HOLIDAY"}];
export const ny30=[{month:"JAN",date:"JAN 30 · HOLD",anchor:"WINTER"},{month:"FEB",date:"FEB 13 · HOLD",anchor:"VALENTINE'S"},{month:"MAR",date:"MAR 27 · HOLD",anchor:"SPRING"},{month:"APR",date:"APR 24 · HOLD",anchor:"SPRING"},{month:"MAY",date:"MAY 08 · HOLD",anchor:"MOTHER'S DAY"},{month:"JUN",date:"JUN 19 · HOLD",anchor:"JUNETEENTH"},{month:"JUL",date:"JUL 31 · HOLD",anchor:"SUMMER"},{month:"AUG",date:"AUG 28 · HOLD",anchor:"LATE SUMMER"},{month:"SEP",date:"SEP 18 · HOLD",anchor:"FALL"},{month:"OCT",date:"OCT 23 · HOLD",anchor:"FALL"},{month:"NOV",date:"NOV 27 · HOLD",anchor:"THANKSGIVING"},{month:"DEC",date:"DEC 18 · HOLD",anchor:"HOLIDAY"}];
