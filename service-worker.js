const CACHE_NAME = 'offline-login-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css', // Add any additional assets you want to cache
  '/app.js' // Add any additional assets you want to cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
