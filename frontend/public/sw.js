self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // A minimal fetch event handler is required by Chrome to pass the PWA install criteria
  // We just let the browser handle the request normally
  return;
});
