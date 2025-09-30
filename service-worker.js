const CACHE_NAME = 'elecprodevis-cache-v1';
const urlsToCache = [
  'index.html',
  'accueil.html',
  'produits.html',
  'devis.html',
  'paiement.html',
  'personnalisation.html',
  'admin.html',
  'debug.html',
  'style.css',
  'script.js',
  'manifest.json',
  'images/piquet.png',
  'images/boite.png',
  'images/cable.png',
  'images/gaine.png',
  'images/tableau.png',
  'images/disjoncteur.png',
  'images/prise.png',
  'images/boitier.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
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
