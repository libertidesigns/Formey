// Formey Service Worker v2
const CACHE = 'formey-v2';
const ASSETS = [
  '/Formey/',
  '/Formey/index.html',
  '/Formey/builder.html',
  '/Formey/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network first — always try live, fall back to cache
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
