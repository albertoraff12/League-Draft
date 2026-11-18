const PREFIX='draftcore-shell-'+encodeURIComponent(self.registration.scope)+'-';
const CACHE=PREFIX+'v1.0.0';
const ASSETS=['./','./index.html','./styles.css','./app.js','./engine.mjs','./data.mjs','./icon.svg','./manifest.webmanifest'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;const url=new URL(event.request.url);const known=ASSETS.some(p=>new URL(p,self.registration.scope).pathname===url.pathname);if(!known)return;event.respondWith(caches.open(CACHE).then(async cache=>{const hit=await cache.match(event.request,{ignoreSearch:true});return hit||fetch(event.request);}));});
