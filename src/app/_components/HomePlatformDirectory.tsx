import Link from "next/link";

const divisions=[
  ["EVENTS","Headline concerts, tours and recurring live properties.","/events"],
  ["EXPERIENCES","ICONIC Nights, immersive cultural environments and destination moments.","/experiences"],
  ["ICONIC SOCIAL","Invite-level power networking for culture, business and creators.","/social"],
  ["CREATORS","Talent onboarding, packaging, booking pipelines and sponsor access.","/creators"],
  ["ICONIC MUSIC","Artist development, releases, DJ curation and live bookings.","/music"],
  ["MEDIA + ARCHIVE","Photography, recap films, editorial documentation and cultural proof.","/media"],
  ["PARTNERS","Sponsorship inventory, brand activations, VIP and category exclusivity.","/partners"],
  ["BOOK ICONIC","Corporate events, private celebrations, releases, exhibitions and venue programming.","/book"],
  ["CONTACT","Route a general request to the right ICONIC operating lane.","/contact"],
];

export default function HomePlatformDirectory(){return <section style={{padding:"110px clamp(20px,5vw,72px)",borderTop:"1px solid rgba(226,176,74,.24)",background:"linear-gradient(180deg,#050403,#090603)"}}>
  <div style={{maxWidth:1500,margin:"0 auto"}}>
    <div style={{fontSize:9,fontWeight:900,letterSpacing:".28em",color:"#ffd978",textTransform:"uppercase",marginBottom:18}}>THE FULL ICONIC ECOSYSTEM</div>
    <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.15fr) minmax(280px,.65fr)",gap:"clamp(28px,6vw,90px)",alignItems:"end",marginBottom:40}}>
      <h2 style={{fontFamily:"Didot, 'Bodoni MT', 'Times New Roman', serif",fontSize:"clamp(52px,6.5vw,96px)",letterSpacing:"-.055em",lineHeight:.86,margin:0}}>THE STAGE IS ONLY ONE PART OF ICONIC.</h2>
      <p style={{color:"rgba(255,246,226,.66)",fontSize:14,lineHeight:1.75,margin:0}}>Guests see the night. The ICONIC platform connects events, experiences, creators, music, media, partnerships, commerce and booking into one larger entertainment ecosystem.</p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:10}}>{divisions.map(([title,body,href],i)=><Link href={href} key={title} style={{position:"relative",minHeight:205,padding:24,border:"1px solid rgba(226,176,74,.24)",borderRadius:18,background:"linear-gradient(145deg,rgba(226,176,74,.055),rgba(255,255,255,.004))",color:"#fff7e7",textDecoration:"none",display:"flex",flexDirection:"column",justifyContent:"space-between"}}><div style={{color:"#ffd978",fontSize:8,fontWeight:900,letterSpacing:".18em"}}>{String(i+1).padStart(2,"0")}</div><div><h3 style={{fontFamily:"Didot, 'Bodoni MT', 'Times New Roman', serif",fontSize:28,lineHeight:.95,margin:"0 0 10px"}}>{title}</h3><p style={{color:"rgba(255,246,226,.56)",fontSize:11,lineHeight:1.55,margin:0}}>{body}</p></div><span style={{position:"absolute",right:18,top:18,color:"#ffd978"}}>↗</span></Link>)}</div>
  </div>
</section>}
