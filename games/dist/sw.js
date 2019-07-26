/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "assets/img/add-hover.png",
    "revision": "e4fb9ccb54e035204587670c2860f626"
  },
  {
    "url": "assets/img/add-list.png",
    "revision": "ff0f72caa5e4fad9eb0d01114330724d"
  },
  {
    "url": "assets/img/add.png",
    "revision": "0e9783e4039b3801d21f8a23e7ead790"
  },
  {
    "url": "assets/img/back-hover.png",
    "revision": "af5050b9d99e8d0bfd35b59451c660ef"
  },
  {
    "url": "assets/img/back.png",
    "revision": "1e007d816810fdc210405fa535ebb64d"
  },
  {
    "url": "assets/img/bg.jpg",
    "revision": "75aff9a1a331d1f2f3fd09c17a21de4d"
  },
  {
    "url": "assets/img/book-closed.png",
    "revision": "8c68930035f665e0c5c6e2ca1bba3073"
  },
  {
    "url": "assets/img/book-open.png",
    "revision": "38aea8b54521ae146657100e2aea3ca8"
  },
  {
    "url": "assets/img/breadcrumb-gray.png",
    "revision": "44f413bf9cbc28cc1ca1c440d1661345"
  },
  {
    "url": "assets/img/breadcrumb.png",
    "revision": "1dd48cfc5e39b09d26884aaf58867b5e"
  },
  {
    "url": "assets/img/checkmark.png",
    "revision": "d27ccb9d4324cdc5a40f0ceca9b1b7b1"
  },
  {
    "url": "assets/img/couple-bird-1.png",
    "revision": "46b94c45ab51a055e596ddb4a9d524ef"
  },
  {
    "url": "assets/img/couple-bird-2.png",
    "revision": "ae2e66004f591fa9e0f6a3ef50371282"
  },
  {
    "url": "assets/img/expand.png",
    "revision": "1b78412f028916a6fce590b112286e9e"
  },
  {
    "url": "assets/img/flip-birds.png",
    "revision": "b846e6e3c618ecb75ed46c8b3c5ec248"
  },
  {
    "url": "assets/img/flip-list.png",
    "revision": "b327ab54208549f6844f713a65200d68"
  },
  {
    "url": "assets/img/gaggle-bird-1.png",
    "revision": "9e0aa5629e3fa857a713faec44529a21"
  },
  {
    "url": "assets/img/gaggle-bird-2.png",
    "revision": "6fe0291bdd8b0c8828a2e3a79bec97e8"
  },
  {
    "url": "assets/img/redo-hover.png",
    "revision": "e49668769440cba4042b856eae0ede0a"
  },
  {
    "url": "assets/img/redo.png",
    "revision": "01dac53ba54e3ba1bba921543dd335f2"
  },
  {
    "url": "assets/img/single-bird-1.png",
    "revision": "9025f15b927727b3a3730047b1601818"
  },
  {
    "url": "assets/img/single-bird-2.png",
    "revision": "ca461984ee4f64105112e1d2cfe5fdec"
  },
  {
    "url": "assets/img/single-bird-3.png",
    "revision": "8a89302bc736c7be097c02bd2439b357"
  },
  {
    "url": "assets/img/single-bird-4.png",
    "revision": "b47a45b83a62017cd45e10f2f3bd92b4"
  },
  {
    "url": "assets/img/single-bird-5.png",
    "revision": "1ae78089b6f75100ffeb3eddabbb42ca"
  },
  {
    "url": "assets/img/single-bird-6.png",
    "revision": "d3e0a12035e806fac8b62956ee824c07"
  },
  {
    "url": "assets/img/trash.png",
    "revision": "2dcb3a7a77b434886cdc1a30e4907d57"
  },
  {
    "url": "assets/img/undo-hover.png",
    "revision": "16718f9c44dc2caa6a35a7d1d7769041"
  },
  {
    "url": "assets/img/undo.png",
    "revision": "d74ecabb37d66b85e0e365b92bc3b000"
  },
  {
    "url": "assets/styles/cookietrail.css",
    "revision": "2f84a343dfa4b4fec5252a92520c7051"
  },
  {
    "url": "assets/styles/login.css",
    "revision": "98fad979689e9e0cad4bad79a9931ba1"
  },
  {
    "url": "assets/styles/styles-web.css",
    "revision": "f28719bb06a0ac0fed60dcc5f08cba02"
  },
  {
    "url": "assets/styles/styles.css",
    "revision": "2dabfff0d5f18e288adbde8dd2832850"
  },
  {
    "url": "index.html",
    "revision": "c46ad58e1bbf8ddf1432d8feb980fae1"
  },
  {
    "url": "src.ba777e5e.css",
    "revision": "3f9e535c68e1e707dd95e5fc1a0fc21d"
  },
  {
    "url": "/",
    "revision": "bfecca841bb1c768ddd2c4bc06d16c40"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/games/dist/index.html"));
