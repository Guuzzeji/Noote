if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/Noote/pwa.js')
        .then(function () {
            console.log('Service Worker Registered');
        });
}
