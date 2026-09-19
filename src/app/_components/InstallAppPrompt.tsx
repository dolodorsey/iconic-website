"use client";

import { useEffect, useState } from "react";

interface InstallPromptEvent extends Event { prompt: () => Promise<{ outcome: "accepted" | "dismissed" }> }

function forceInstall(){try{return new URLSearchParams(location.search).get('install')==='1'}catch{return false}}
function clearInstallIntent(){try{const u=new URL(location.href);u.searchParams.delete('install');history.replaceState(history.state,'',u.pathname+(u.search||'')+(u.hash||''))}catch{}}
function InstallQr(){
  const [qr,setQr]=useState('');
  useEffect(()=>{if(typeof window==='undefined'||window.innerWidth<760)return;try{const u=new URL(location.href);u.hash='';u.search='';u.searchParams.set('install','1');setQr('https://wfkohcwxxsrhcxhepfql.supabase.co/functions/v1/app-install-qr?url='+encodeURIComponent(u.toString()))}catch{}},[]);
  if(!qr)return null;
  return <div className="install-qr" aria-label="Scan to install ICONIC on another device">
    <img src={qr} alt="QR code to install ICONIC" width="112" height="112"/>
    <div><strong>SCAN ON YOUR PHONE</strong><small>Open the install flow without covering the site.</small></div>
  </div>
}

const CAPTURE_URL="https://wfkohcwxxsrhcxhepfql.supabase.co/functions/v1/marketing-event-capture";
const BRAND_KEY="iconic-live-entertainment";
const DISMISS_MS=7*24*60*60*1000;

function storageGet(key:string){try{return localStorage.getItem(key)}catch{return null}}
function storageSet(key:string,value:string){try{localStorage.setItem(key,value)}catch{}}
function isIOS(){return /iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)}
function isStandalone(){return matchMedia("(display-mode: standalone)").matches||Boolean((navigator as Navigator & {standalone?:boolean}).standalone)}
function visitor(){const existing=storageGet("khg_vid");if(existing)return existing;const id=crypto.randomUUID();storageSet("khg_vid",id);return id}
async function track(event_type:string,metadata:Record<string,string|boolean|number>={}){try{await fetch(CAPTURE_URL,{method:"POST",headers:{"content-type":"application/json"},keepalive:true,body:JSON.stringify({brand_key:BRAND_KEY,event_type,visitor_key:visitor(),metadata:{event_id:crypto.randomUUID(),path:`${location.pathname}${location.search}`.slice(0,500),app:"iconic-live",...metadata}})})}catch{}}

export default function InstallAppPrompt(){
  const [prompt,setPrompt]=useState<InstallPromptEvent|null>(null);
  const [visible,setVisible]=useState(false);
  const [steps,setSteps]=useState(false);
  const [installed,setInstalled]=useState(false);
  const [apple,setApple]=useState(false);

  useEffect(()=>{
    if(isStandalone()){setInstalled(true);return}
    const ios=isIOS();setApple(ios);
    if("serviceWorker" in navigator)navigator.serviceWorker.register("/sw.js").catch(()=>undefined);
    const dismissed=Number(storageGet("iconic:pwa-dismissed")||0);
    void dismissed;
    if(forceInstall())window.setTimeout(()=>setVisible(true),120);
    const before=(event:Event)=>{event.preventDefault();setPrompt(event as InstallPromptEvent)};
    const added=()=>{setInstalled(true);setVisible(false);void track("app_install",{platform:ios?"ios":"web",variant:"iconic_pwa"})};
    addEventListener("beforeinstallprompt",before);addEventListener("appinstalled",added);
    return()=>{removeEventListener("beforeinstallprompt",before);removeEventListener("appinstalled",added)};
  },[]);

  if(installed)return null;
  if(!visible)return null;
  const close=()=>{storageSet("iconic:pwa-dismissed",String(Date.now()));clearInstallIntent();setVisible(false);void track("cta_click",{cta:"pwa_prompt_dismiss",variant:apple?"ios":"web"})};
  const install=async()=>{void track("app_install_click",{platform:apple?"ios":"web",variant:prompt?"native_prompt":"instructions"});if(prompt){const result=await prompt.prompt();setPrompt(null);if(result.outcome==="accepted"){clearInstallIntent();setVisible(false)}return}setSteps(true)};

  return <div className="iconic-install-backdrop" role="dialog" aria-modal="true" aria-label="Install ICONIC">
    <section className="iconic-install-card">
      <button className="iconic-install-close" onClick={close} aria-label="Close">×</button>
      <div className="iconic-stage" aria-hidden="true"><div className="beam b1"/><div className="beam b2"/><div className="phone"><div className="island"/><div className="icon">I</div><div className="screenText">ICONIC</div></div><div className="halo"/></div>
      {!steps?<div className="copy">
        <div className="kicker">THE NEXT ANNOUNCEMENT WON'T WAIT.</div>
        <h2>KEEP<br/><em>ICONIC</em><br/>IN YOUR POCKET.</h2>
        <p>Shows. Presales. VIP. Tour drops. Event updates. Open ICONIC from your Home Screen before the timeline catches up.</p>
        <div className="ticker"><span>LIVE</span><b>•</b><span>PRESALES</span><b>•</b><span>VIP</span><b>•</b><span>DROPS</span></div>
        <button className="cta" onClick={install}><span>{prompt?"INSTALL ICONIC":"ADD ICONIC"}</span><strong>↗</strong></button>
        <button className="later" onClick={close}>Maybe later</button>
      </div>:<div className="copy steps">
        <div className="kicker">{apple?"IPHONE / HOME SCREEN":"INSTALL ICONIC"}</div>
        <h2>THREE TAPS.<br/><em>FRONT ROW.</em></h2>
        <ol><li><b>01</b><div><strong>{apple?"Tap Share":"Open browser menu"}</strong><small>{apple?"Use Safari's Share button.":"Open the browser installation menu."}</small></div></li><li><b>02</b><div><strong>Add to Home Screen</strong><small>Select Add to Home Screen / Install App.</small></div></li><li><b>03</b><div><strong>Tap Add</strong><small>ICONIC lands beside your other apps.</small></div></li></ol>
        {!apple&&<InstallQr/>}
        <button className="cta" onClick={close}>GOT IT</button>
      </div>}
      <style jsx>{`
        .iconic-install-backdrop{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:end center;padding:16px;background:linear-gradient(180deg,#0002,#000d);backdrop-filter:blur(11px);animation:enter .32s ease both}.iconic-install-card{position:relative;width:min(720px,100%);min-height:485px;overflow:hidden;border:1px solid #e0ad4566;border-radius:30px;background:radial-gradient(circle at 84% 8%,#e0ad4528,transparent 34%),linear-gradient(145deg,#151006,#050403 72%);box-shadow:0 35px 110px #000d,inset 0 1px #ffe7a01a;color:#fffaf0;padding:32px 24px 23px;isolation:isolate}.iconic-install-card:after{content:"";position:absolute;inset:0;z-index:-1;opacity:.1;background:repeating-linear-gradient(110deg,transparent 0 17px,#ffd97a22 18px,transparent 19px)}.iconic-install-close{position:absolute;right:14px;top:14px;z-index:4;width:39px;height:39px;border:1px solid #fff2;border-radius:50%;background:#fff1;color:#fff;font-size:25px}.iconic-stage{position:absolute;right:-24px;top:0;width:265px;height:300px;pointer-events:none}.beam{position:absolute;top:-70px;width:48px;height:330px;background:linear-gradient(#ffd97a00,#ffd97a55,#ffd97a00);filter:blur(17px);transform:rotate(17deg)}.b1{right:55px}.b2{right:135px;opacity:.45}.phone{position:absolute;right:67px;top:47px;width:107px;height:215px;border:4px solid #fff7df;border-radius:29px;background:linear-gradient(160deg,#1c1307,#030201);transform:rotate(7deg);box-shadow:0 30px 70px #000a;display:flex;flex-direction:column;align-items:center;justify-content:center}.island{position:absolute;top:7px;width:43px;height:10px;border-radius:12px;background:#000}.icon{width:58px;height:58px;border-radius:17px;background:linear-gradient(145deg,#ffd97a,#a96f20);display:grid;place-items:center;color:#090602;font:900 33px/1 Arial;box-shadow:0 0 0 3px #fff2,0 14px 34px #e0ad4555}.screenText{margin-top:14px;color:#ffe8ab;font:900 8px/1 Arial;letter-spacing:.23em}.halo{position:absolute;right:20px;top:8px;width:220px;height:220px;border:1px solid #ffd97a66;border-radius:50%;animation:pulse 2.3s ease-out infinite}.copy{position:relative;z-index:2;max-width:480px;padding-right:90px}.kicker{color:#ffd97a;font:900 10px/1 Arial;letter-spacing:.19em;margin-bottom:11px}.copy h2{margin:0;font:900 clamp(35px,9vw,58px)/.83 Arial,sans-serif;letter-spacing:-.065em}.copy h2 em{font-style:normal;background:linear-gradient(180deg,#fff8dc,#e0ad45 58%,#a96f20);-webkit-background-clip:text;color:transparent}.copy>p{max-width:440px;margin:18px 0 15px;color:#fff4dbb0;font:500 14px/1.55 Arial}.ticker{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:18px;color:#fff0be88;font:900 9px/1 Arial;letter-spacing:.11em}.ticker b{color:#ffd97a}.cta{width:100%;min-height:55px;border:0;border-radius:14px;background:linear-gradient(100deg,#ffd97a,#dba63d);color:#090602;display:flex;justify-content:space-between;align-items:center;padding:0 18px;font:900 13px/1 Arial;letter-spacing:.07em;box-shadow:0 16px 42px #dba63d44}.cta strong{font-size:22px}.later{width:100%;border:0;background:transparent;color:#fff7df77;padding:13px 0 0;font:700 11px/1 Arial}.steps ol{list-style:none;margin:20px 0;padding:0;display:grid;gap:9px}.steps li{display:flex;gap:12px;align-items:center;padding:12px;border:1px solid #ffd97a1f;border-radius:13px;background:#fff1}.steps li>b{color:#ffd97a;font:900 11px/1 Arial}.steps strong,.steps small{display:block}.steps strong{font:800 13px/1.2 Arial}.steps small{margin-top:3px;color:#fff5d888;font:500 11px/1.35 Arial}@keyframes enter{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}@keyframes pulse{0%{transform:scale(.68);opacity:.65}100%{transform:scale(1.2);opacity:0}}@media(min-width:720px){.iconic-install-backdrop{place-items:center}.iconic-install-card{padding:44px 38px 34px}.copy{padding-right:150px}.iconic-stage{right:8px;top:34px}}@media(max-width:430px){.iconic-install-card{min-height:465px;padding:28px 18px 20px;border-radius:25px}.copy{padding-right:42px}.copy h2{font-size:36px}.iconic-stage{right:-72px;opacity:.68}}@media(prefers-reduced-motion:reduce){.iconic-install-backdrop,.halo{animation:none}}
      `}</style>
    </section>
  </div>;
}
