"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function send(eventKey:string,action:string,label:string,path:string){
  const payload=JSON.stringify({eventKey,action,label,path});
  if(typeof navigator!=="undefined"&&"sendBeacon" in navigator){
    try{
      const blob=new Blob([payload],{type:"application/json"});
      if(navigator.sendBeacon("/api/event-track",blob)) return;
    }catch{}
  }
  fetch("/api/event-track",{method:"POST",headers:{"Content-Type":"application/json"},body:payload,keepalive:true}).catch(()=>{});
}

export default function Analytics(){
  const pathname=usePathname();
  const searchParams=useSearchParams();
  const query=searchParams?.toString()||"";

  useEffect(()=>{
    const path=query?`${pathname}?${query}`:pathname;
    send("site","page_view",document.title,path);
  },[pathname,query]);

  useEffect(()=>{
    function click(e:MouseEvent){
      const target=e.target as Element|null;
      const anchor=target?.closest?.("a[href]") as HTMLAnchorElement|null;
      if(!anchor) return;
      const href=anchor.getAttribute("href")||"";
      const label=(anchor.textContent||anchor.getAttribute("aria-label")||"link").trim().slice(0,160);
      let action="link_click";
      if(href.includes("/access")) action="access_click";
      else if(href.includes("/merch")||href.includes("/shop")) action="commerce_click";
      else if(href.startsWith("mailto:")||href.startsWith("tel:")) action="contact_click";
      send("site",action,label,window.location.pathname+window.location.search);
    }
    document.addEventListener("click",click,{capture:true});
    return ()=>document.removeEventListener("click",click,{capture:true});
  },[]);

  return null;
}
