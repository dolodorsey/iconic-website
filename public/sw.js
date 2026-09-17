const VERSION="iconic-pwa-v1";
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",(event)=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter((key)=>key.startsWith("iconic-pwa-")&&key!==VERSION).map((key)=>caches.delete(key)));await self.clients.claim()})()));

// No blanket page cache: ticketing, availability, forms and account surfaces stay live.
self.addEventListener("push",(event)=>{let payload={};try{payload=event.data?.json()||{}}catch{payload={body:event.data?.text()||""}}event.waitUntil(self.registration.showNotification(payload.title||"ICONIC",{body:payload.body||"A new ICONIC update just dropped.",icon:payload.icon||"/api/pwa-icon?size=192",badge:payload.badge||"/api/pwa-icon?size=192",data:{url:payload.url||"/"}}))});
self.addEventListener("notificationclick",(event)=>{event.notification.close();const target=event.notification.data?.url||"/";event.waitUntil((async()=>{const windows=await self.clients.matchAll({type:"window",includeUncontrolled:true});const existing=windows.find((client)=>"focus" in client);if(existing){await existing.focus();if("navigate" in existing)await existing.navigate(target);return}await self.clients.openWindow(target)})())});
