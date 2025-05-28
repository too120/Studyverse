
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('study-app-cache').then(cache => {
      return cache.addAll(['/', '/index.html', '/main.jsx', '/manifest.json']);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
