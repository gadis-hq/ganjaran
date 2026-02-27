const CACHE_NAME = "gadis-hq-v3";

const urlsToCache = [
  "/ganjaran/",
  "/ganjaran/index.html",
  "/ganjaran/css/style.css"
];

self.addEventListener("install", e=>{
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache=>cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request)
    .then(res=>res || fetch(e.request))
  );
});
