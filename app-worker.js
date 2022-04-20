const cacheName = "app-" + "5773511354fe5ff79fbf179cb62ca4232d46e3ed";

self.addEventListener("install", event => {
  console.log("installing app worker 5773511354fe5ff79fbf179cb62ca4232d46e3ed");

  event.waitUntil(
    caches.open(cacheName).
      then(cache => {
        return cache.addAll([
          "/go-pwa",
          "/go-pwa/app.css",
          "/go-pwa/app.js",
          "/go-pwa/manifest.webmanifest",
          "/go-pwa/wasm_exec.js",
          "/go-pwa/web/app.wasm",
          "https://storage.googleapis.com/murlok-github/icon-192.png",
          "https://storage.googleapis.com/murlok-github/icon-512.png",
          
        ]);
      }).
      then(() => {
        self.skipWaiting();
      })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  console.log("app worker 5773511354fe5ff79fbf179cb62ca4232d46e3ed is activated");
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
