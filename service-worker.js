const CACHE_NAME = 'gadis-qshq-cache-v2';

const urlsToCache = [
  './',
  './index.html',
  './semakkod.html',
  './dashboard.html',
  './audience-screen.html',
  './css/style.css',
  './js/config.js',
  './js/semakkod.js',
  './js/dashboard.js',
  './js/audience.js',
  './js/api.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
