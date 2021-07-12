console.log("refistrado");
const CACHE_ELEMENTS = [
  "./",
  "https://unpkg.com/react@17/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone/babel.min.js",
  //tambien los estilos y componentes
];

const CACHE_NAME = "v2_contador";

self.addEventListener("install", (e) => {
  console.log("holi");
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache
        .addAll(CACHE_ELEMENTS)
        .then(() => {
          self.skipWaiting();
        })
        .catch(console.log);
    })
  );
});

self.addEventListener("activate", (e) => {
  const cacheWhiteList = [CACHE_NAME];
  console.log("holi");
  e.waitUntil(
    caches
      .keys()
      .then((cachesNames) => {
        console.log(cachesNames);
        return Promise.all(
          cachesNames.map((cacheName) => {
            return (
              cacheWhiteList.indexOf(cacheName) === -1 &&
              caches.delete(cacheName)
            );
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => (res ? res : fetch(e.request)))
  );
});
