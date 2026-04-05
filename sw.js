const CACHE='juns-erp-v1';
const STATIC=['/juns-works-way/','/juns-works-way/index.html','/juns-works-way/manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('firestore')||e.request.url.includes('googleapis')||e.request.url.includes('telegram')||e.request.url.includes('gstatic')||e.request.url.includes('fonts')){e.respondWith(fetch(e.request).catch(()=>new Response('Offline',{status:503})));return}
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));
});
