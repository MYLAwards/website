console.log('in SW js');
var cacheName = 'static-1';
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
 '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
 '//images.mylawards.org/final-logo-myla-01.png',
 '//images.mylawards.org/broali.svg',
 '//images.mylawards.org/rabia.jpg',
 '//images.mylawards.org/ather.jpg',
 '//images.mylawards.org/aisha.jpg',
 '//images.mylawards.org/sumran.jpg',
 '//images.mylawards.org/sami.jpg',
 '//images.mylawards.org/reies.jpg',
 '//images.mylawards.org/faizan.png',

 '//code.jquery.com/jquery-3.2.1.min.js'
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
  console.log(e.request.url);
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