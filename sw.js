// Change VERSION whenever published files change. Cache only this app's files.
const VERSION='city-10';
const ASSETS=['./','./index.html','./arbitrazhnik3.html','./manifest.webmanifest','./icon.svg','./icon-180.png','./icon-192.png','./icon-512.png'];
const ALLOWED=new Set(ASSETS.map(p=>new URL(p,self.registration.scope).href));
self.addEventListener('install',e=>e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil((async()=>{
 for(const key of await caches.keys())if(key.startsWith('city-')&&key!==VERSION)await caches.delete(key);
 await self.clients.claim();
})()));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||!ALLOWED.has(e.request.url))return;
 e.respondWith((async()=>{
  const cache=await caches.open(VERSION);
  // Network first for HTML; offline uses the fully installed local copy.
  if(e.request.mode==='navigate'){
   try{const res=await fetch(e.request);if(res.ok)return res;}catch{}
  }
  return (await cache.match(e.request))||fetch(e.request);
 })());
});
