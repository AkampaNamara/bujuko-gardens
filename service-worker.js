// ============================================================
//  SERVICE WORKER FOR MIRACLE PARK GARDENS & HOTEL BUJUUKO
//  Enables offline support and app-like experience
//  Version: 2.0
// ============================================================

const CACHE_NAME = 'miracle-park-v2';
const urlsToCache = [
  '/bujuuko-gardens/',
  '/bujuuko-gardens/index.html',
  '/bujuuko-gardens/about.html',
  '/bujuuko-gardens/contact.html',
  '/bujuuko-gardens/menu.html',
  '/bujuuko-gardens/cart.html',
  '/bujuuko-gardens/privacy.html',
  '/bujuuko-gardens/style.css',
  '/bujuuko-gardens/script.js',
  '/bujuuko-gardens/manifest.json',
  '/bujuuko-gardens/logo.jpeg',
  '/bujuuko-gardens/overview.jpeg',
  '/bujuuko-gardens/logo-192.png',
  '/bujuuko-gardens/logo-512.png',
  '/bujuuko-gardens/sitemap.xml',
  '/bujuuko-gardens/robots.txt',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

// Install Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Service Worker: Caching assets');
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch from cache or network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(function(networkResponse) {
            // Cache new responses for future offline use
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then(function(cache) {
                cache.put(event.request, responseClone);
              });
            }
            return networkResponse;
          });
      })
      .catch(function() {
        // Return a fallback page if offline
        return caches.match('/bujuuko-gardens/index.html');
      })
  );
});
