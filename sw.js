var cacheName = 'static-1.7';
var filesToCache = [
 '/',
 'about',
 'programs',
 'mscholarship',
 'loan',
 'ischolarship',
 'donate',
 'endowment',
 'contact',
 'offline',

 'myla.js',

 'components/bootstrap.min.js',
 'components/final-logo-myla-01.png',
 'components/font-awesome.min.css',
 'components/jquery-3.2.1.slim.min.js',
 'components/odometer.css',
 'components/odometer.js',
 'components/popper.min.js',
 'components/style.css',
 'components/theme.css',
 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
 'https://images.mylawards.org/final-logo-myla-01.png',
 'https://images.mylawards.org/broali.svg',
 'https://images.mylawards.org/banner.jpg',
 'https://images.mylawards.org/endowment.png',
 'https://images.mylawards.org/rabia.jpg',
 'https://images.mylawards.org/ather.jpg',
 'https://images.mylawards.org/aisha.jpg',
 'https://images.mylawards.org/sumran.jpg',
 'https://images.mylawards.org/sami.jpg',
 'https://images.mylawards.org/reies.jpg',
 'https://images.mylawards.org/faizan.png',

 'https://code.jquery.com/jquery-3.2.1.min.js'
];

self.addEventListener('install', function (e) {
 console.log('[ServiceWorker] Install');
 self.skipWaiting();
 e.waitUntil(
  caches.open(cacheName).then(function (cache) {
   console.log('[ServiceWorker] Caching app shell');
   return cache.addAll(filesToCache);
  })
 );
});

self.addEventListener('activate', function (e) {
 console.log('[ServiceWorker] Activate');
 e.waitUntil(
  caches.keys().then(function (keyList) {
   return Promise.all(keyList.map(function (key) {
    if (key !== cacheName) {
     console.log('[ServiceWorker] Removing old cache', key);
     return caches.delete(key);
    }
   }));
  })
 );
 return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
 });
 