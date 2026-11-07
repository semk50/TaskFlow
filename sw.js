const CACHE_NAME = 'mon-app-cache-v1';
const assetsToCache = [
    './',
    './index.html',
    './manifest.json',
    './icon.svg',
];

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(assetsToCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});