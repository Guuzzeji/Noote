//! Service Workers

let cache_name = 'marknote';

let files = [
    './',
    './index.html',

    //* CSS Files
    './css/main.css',

    //* Img Files
    './img/github-logo.svg',
    './img/notes.png',

    //* Main Js Files
    './js/hotkeys.js',
    './js/menu.js',
    './js/save.js',
    './js/textedit.js',
    './js/worker.js',

    //* Library files
    './lib/jquery-3.6.0.min.js',
    './lib/marked.min.js',
    './lib/mousetrap.js',
    './lib/purify.js',
    './lib/Sortable.js',
    './lib/water.css',

];

//! Install app for user
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cache_name).then((cache) => cache.addAll(files)),
    );
});

//! Fetch app files for user
self.addEventListener('fetch', function (e) {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});

//! Auto Update App When Changes Are Made
self.addEventListener('activate', function (event) {
    console.info('Event: Activate');

    //* Remove old and unwanted caches
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cache) {
                    console.log(cache);
                    return caches.delete(cache); //* Deleting the old cache 
                })
            );
        })
            .then(function () {
                console.info("Old caches are cleared!");
                //* To tell the service worker to activate current one instead of waiting for the old one to finish.
                return self.clients.claim();
            })
    );
});
