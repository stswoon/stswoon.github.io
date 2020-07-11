const cacheName = 'HowOldAreYouCache-v0.5';

const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './main.js',
    './favicon.ico',
    './style.css'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => {
                        return urlsToCache.indexOf(cacheName) !== -1
                    })
                    .map(cacheName => {
                        return caches.delete(cacheName);
                    })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    //network falling back to the cache
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request);
        })
    );
});