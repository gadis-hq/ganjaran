const CACHE_NAME = "gadis-hq-v1";
const urlsToCache = [
  "/ganjaran/",
  "/ganjaran/index.html",
  "/ganjaran/dashboard.html",
  "/ganjaran/manifest.json"
];

self.addEventListener("install", event=>{
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache=>cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event=>{
  event.respondWith(
    caches.match(event.request)
    .then(response=>response || fetch(event.request))
  );
});
