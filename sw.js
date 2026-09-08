const CACHE_NAME = "grocery-glance-v20";
const PRECACHE_URLS = [
  "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png",
  "./css/app.css?v=20",
  "./js/data/shelf-life.js?v=20", "./js/data/store-sections.js?v=20", "./js/data/bogo-categories.js?v=20", "./js/data/grocery-categories.js?v=20",
  "./js/data/ingredients.js?v=20", "./js/data/recipes-a.js?v=20", "./js/data/recipes-b.js?v=20", "./js/data/recipes-c.js?v=20",
  "./js/core.js?v=20", "./js/groceries.js?v=20", "./js/shopping.js?v=20", "./js/recipe-engine.js?v=20", "./js/bogo.js?v=20", "./js/recipes.js?v=20", "./js/app.js?v=20"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // The page itself: network-first so updates land on the next open; cached shell when offline.
  if (req.mode === "navigate") {
    event.respondWith(fetch(req, { cache: "no-store" }).catch(() => caches.match("./index.html")));
    return;
  }

  // Same-origin assets: cache-first, refresh in the background (stale-while-revalidate).
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(req).then(cached => {
        const network = fetch(req).then(res => {
          if (res && res.ok) caches.open(CACHE_NAME).then(c => c.put(req, res.clone()));
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // Fonts and deal images: cache-first opportunistically; everything else (Firestore, APIs) goes straight to the network.
  if (url.hostname.endsWith("gstatic.com") || url.hostname.endsWith("googleapis.com") && url.pathname.startsWith("/css") || url.hostname.endsWith("wishabi.com") || url.hostname.endsWith("flippenterprise.net")) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        if (res && (res.ok || res.type === "opaque")) caches.open(CACHE_NAME).then(c => c.put(req, res.clone()));
        return res;
      }))
    );
  }
});
