import type { MetadataRoute } from "next";

export default function manifest():MetadataRoute.Manifest{
  return {
    id:"/",
    name:"ICONIC — Live Entertainment",
    short_name:"ICONIC",
    description:"Concerts, tours, premium experiences, creators, music, media, merchandise, VIP and live-event updates.",
    start_url:"/?source=pwa",
    scope:"/",
    display:"standalone",
    display_override:["window-controls-overlay","standalone"],
    orientation:"portrait-primary",
    background_color:"#050403",
    theme_color:"#e0ad45",
    categories:["entertainment","music","lifestyle"],
    prefer_related_applications:false,
    icons:[
      {src:"/api/pwa-icon?size=192",sizes:"192x192",type:"image/png",purpose:"any"},
      {src:"/api/pwa-icon?size=512",sizes:"512x512",type:"image/png",purpose:"any"},
      {src:"/api/pwa-icon?size=512",sizes:"512x512",type:"image/png",purpose:"maskable"}
    ],
    shortcuts:[
      {name:"Upcoming Events",short_name:"Events",url:"/events?source=pwa-shortcut"},
      {name:"Access ICONIC",short_name:"Access",url:"/access?source=pwa-shortcut"}
    ]
  };
}
