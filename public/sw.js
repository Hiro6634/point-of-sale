// v3 por el cambio de iconos. Sin bumpear la version, el service worker instalado
// sigue sirviendo los iconos viejos desde su cache (el fetch es cache-first) y la
// app instalada queda con el icono anterior para siempre.
const CACHE = 'pos-pwa-v3'
const PRECACHE = ['/', '/manifest.webmanifest', '/icons/ajb-192.png', '/icons/ajb-512.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const isNavigation = event.request.mode === 'navigate'

  if (isNavigation) {
    // HTML siempre fresco: primero red, respaldo a caché offline.
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match('/')),
      ),
    )
    return
  }

  // Assets estáticos: cache-first con actualización en background.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached
      return fetch(event.request).then((response) => {
        if (response.ok) {
          const copy = response.clone()
          caches.open(CACHE).then((cache) => cache.put(event.request, copy))
        }
        return response
      })
    }),
  )
})
