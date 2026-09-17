import { ImageResponse } from "next/og";

export const runtime="edge";

export async function GET(request:Request){
  const requested=Number(new URL(request.url).searchParams.get("size")||512);
  const size=[180,192,512].includes(requested)?requested:512;
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",background:"radial-gradient(circle at 72% 12%,rgba(255,217,122,.25),transparent 33%),linear-gradient(145deg,#151006,#050403 72%)"}}>
      <div style={{position:"absolute",width:"82%",height:"82%",border:"2px solid rgba(255,217,122,.34)",borderRadius:"50%",transform:"rotate(9deg)"}} />
      <div style={{position:"absolute",width:"64%",height:"64%",border:"2px solid rgba(224,173,69,.20)",borderRadius:"50%"}} />
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"64%",height:"64%",borderRadius:"27%",background:"linear-gradient(145deg,#ffe69a,#d8a23b 58%,#8e5c17)",boxShadow:"0 26px 80px rgba(224,173,69,.32)",color:"#090602",fontFamily:"Arial,sans-serif",fontWeight:900,fontSize:size*.42}}>I</div>
      <div style={{position:"absolute",bottom:"7%",display:"flex",color:"#fff8dc",fontFamily:"Arial,sans-serif",fontWeight:900,fontSize:Math.max(10,size*.043),letterSpacing:Math.max(2,size*.011)}}>ICONIC</div>
    </div>,{width:size,height:size}
  );
}
