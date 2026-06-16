const CACHE_NAME = 'Grimorio-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './cartas.json',
    './manifest.json',
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/vue@3/dist/vue.global.js',
    'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@400;500;600&display=swap'
];

// Instalación y almacenamiento en caché 
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caché abierta');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Interceptar peticiones para servir desde caché 
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si el recurso está en caché, lo devuelve. Si no, lo pide a la red.
                return response || fetch(event.request);
            })
    );
});

// Limpieza de cachés antiguas
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});