if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./pwa.js')
        .then(function () {
            console.log('Service Worker Registered');
        });
}
