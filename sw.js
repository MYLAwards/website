console.log('in SW js');
var cacheName = 'myla-cache';
var filesToCache = [
 '',
 'about',
 'programs',
 'mscholarship',
 'loan',
 'ischolarship',
 'donate',
 'endowment',
 'contact',

 'myla.js',

 'components/bootstrap.min.js',
 'components/final-logo-myla-01.png',
 'components/font-awesome.min.css',
 'components/jquery-3.2.1.slim.min.js',
 'components/odometer.css',
 'components/odometer.js',
 'components/popper.min.js',
 'components/style.css',
 'components/theme.css'
];

self.addEventListener('install', function(e) {
 console.log('[ServiceWorker] Install');
 e.waitUntil(
  caches.open(cacheName).then(function(cache) {
   console.log('[ServiceWorker] Caching app shell');
   return cache.addAll(filesToCache);
  })
 );
});

self.addEventListener('activate', function(e) {
 console.log('[ServiceWorker] Activate');
 e.waitUntil(
  caches.keys().then(function(keyList) {
   return Promise.all(keyList.map(function(key) {
    if (key !== cacheName) {
      console.log('[ServiceWorker] Removing old cache', key);
      return caches.delete(key);
    }
   }));
  })
 );
 return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
 event.respondWith(
  caches.match(event.request).then(function(resp) {
   return resp || fetch(event.request).then(function(response) {
    return caches.open(cacheName).then(function(cache) {
     cache.put(event.request, response.clone());
     return response;
    });  
   });
  })
 );
});