const cacheName = 'HowOldAreYouCache-v0.4';

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './manifest.json',
                './main.js',
                './favicon.ico',
                './style.css',
                './moment.min.js'
            ]);
        })
    );
});

// при событии fetch, мы используем кэш, и только потом обновляем его данным с сервера
self.addEventListener('fetch', function(event) {
    // Мы используем `respondWith()`, чтобы мгновенно ответить без ожидания ответа с сервера.
    event.respondWith(fromCache(event.request));
    // `waitUntil()` нужен, чтобы предотвратить прекращение работы worker'a до того как кэш обновиться.
    event.waitUntil(update(event.request));
});

function fromCache(request) {
    return caches.open(cacheName).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}

function update(request) {
    return caches.open(cacheName).then((cache) =>
        fetch(request).then((response) =>
            cache.put(request, response)
        )
    );
}