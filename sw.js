var cacheName = 'static-1.2';
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
   caches.open(cacheName).then(function (cache) {
    return fetch(e.request).then(function (response) {
     //cache.put(e.request.url, response.clone());
     return response;
    }).catch(function (err) {
      return caches.match(e.request).then(function (res) {
       if (res === undefined) {
        if(!navigator.onLine && e.request.url.indexOf("google") === -1){
         return caches.match("offline.html");
        }
        console.log("trying to retrieve from cache but not found :" + e.request.url);
       }
       return res;
      })
     })
   })
  );
 });