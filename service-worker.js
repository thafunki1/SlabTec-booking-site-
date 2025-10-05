self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('slabtec-cache-v2').then(cache => cache.addAll([
      './',
      './index.html',
      './offline.html',
      './manifest.webmanifest'
    ]))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('./offline.html'))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});