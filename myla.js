var cacheName = "sv-1";
if ('serviceWorker' in navigator) {
 navigator.serviceWorker
          .register('./sw.js')
          .then(function() { console.log('Service Worker Registered'); });
}
