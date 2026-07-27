const CACHE_NAME = 'moa-charting-2026.07.05-10-test-layout-2';
const APP_SHELL = ['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL))));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(r.mode==='navigate'||u.pathname.endsWith('/index.html')){
    e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put('./index.html',cp));return res}).catch(()=>caches.match('./index.html')));return;
  }
  e.respondWith(caches.match(r).then(cached=>cached||fetch(r).then(res=>{if(res&&res.ok&&u.origin===self.location.origin){const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put(r,cp))}return res})).catch(()=>caches.match('./index.html')));
});
