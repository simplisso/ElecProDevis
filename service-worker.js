const CACHE_NAME = "elecprodevis-cache-v1";
const urlsToCache = [
  "index.html",
  "accueil.html",
  "produits.html",
  "devis.html",
  "manifest.json",
  "images/icon-192.png",
  "images/icon-512.png",
  "videos/electricite.mp4"
];

// Installation du service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Interception des requêtes
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
