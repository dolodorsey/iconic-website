import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type OgCardProps = { kicker: string; title: string; subtitle?: string };

export function makeOgImage({ kicker, title, subtitle }: OgCardProps) {
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",position:"relative",overflow:"hidden",background:"#050403",color:"#fffaf0",padding:"64px 72px",fontFamily:"Arial, Helvetica, sans-serif"}}>
      <div style={{position:"absolute",inset:"-120px -80px auto auto",width:560,height:560,borderRadius:999,background:"radial-gradient(circle, rgba(255,217,122,.32), rgba(224,173,69,.10) 42%, transparent 70%)"}}/>
      <div style={{position:"absolute",left:-120,bottom:-250,width:680,height:680,borderRadius:999,border:"2px solid rgba(255,217,122,.16)",boxShadow:"0 0 100px rgba(224,173,69,.10)"}}/>
      <div style={{position:"relative",zIndex:2,width:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(255,217,122,.24)",paddingBottom:22}}>
          <div style={{fontSize:34,fontWeight:900,letterSpacing:"-.04em",color:"#ffd97a"}}>ICONIC</div>
          <div style={{fontSize:13,fontWeight:800,letterSpacing:".20em",textTransform:"uppercase",color:"rgba(255,244,219,.68)"}}>Live Entertainment</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",maxWidth:980}}>
          <div style={{fontSize:14,fontWeight:900,letterSpacing:".24em",textTransform:"uppercase",color:"#ffd97a",marginBottom:18}}>{kicker}</div>
          <div style={{fontFamily:"Georgia, serif",fontSize:title.length>28?76:92,fontWeight:700,lineHeight:.88,letterSpacing:"-.05em",textTransform:"uppercase"}}>{title}</div>
          {subtitle&&<div style={{fontSize:22,lineHeight:1.35,color:"rgba(255,244,219,.72)",marginTop:24,maxWidth:860}}>{subtitle}</div>}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,fontWeight:800,letterSpacing:".16em",textTransform:"uppercase",color:"rgba(255,244,219,.48)"}}>
          <span>Atlanta · New York · Las Vegas · Washington DC · Tampa</span><span>iconic-atl.com</span>
        </div>
      </div>
    </div>, size
  );
}
