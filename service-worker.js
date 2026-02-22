const CACHE_NAME = 'gadis-qshq-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/semakkod.html',
  '/dashboard.html',
  '/audience-screen.html',
  '/css/style.css',
  '/js/config.js',
  '/js/semakkod.js',
  '/js/dashboard.js',
  '/js/audience.js',
  '/js/api.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});