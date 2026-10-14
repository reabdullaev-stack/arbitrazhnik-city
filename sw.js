// Игра переехала на https://p2p-city.github.io/ — этот воркер удаляет себя и старый кэш.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())await caches.delete(k);await self.registration.unregister();for(const c of await self.clients.matchAll({type:'window'}))c.navigate('https://p2p-city.github.io/')})()));
