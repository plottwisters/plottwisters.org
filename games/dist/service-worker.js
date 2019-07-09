/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/add-hover.b3367594.png","e4fb9ccb54e035204587670c2860f626"],["/add-list.2cb3d962.png","ff0f72caa5e4fad9eb0d01114330724d"],["/add.c64df968.png","0e9783e4039b3801d21f8a23e7ead790"],["/add.e7ac97a8.png","0e9783e4039b3801d21f8a23e7ead790"],["/back-hover.daee29d1.png","af5050b9d99e8d0bfd35b59451c660ef"],["/back-hover.fb42a807.png","af5050b9d99e8d0bfd35b59451c660ef"],["/back.c2df9823.png","1e007d816810fdc210405fa535ebb64d"],["/back.e845af3b.png","1e007d816810fdc210405fa535ebb64d"],["/bg.c04a5f46.jpg","75aff9a1a331d1f2f3fd09c17a21de4d"],["/bg.d8c2f5d7.jpg","75aff9a1a331d1f2f3fd09c17a21de4d"],["/breadcrumb-gray.adef6eb5.png","44f413bf9cbc28cc1ca1c440d1661345"],["/breadcrumb.f3b87f38.png","1dd48cfc5e39b09d26884aaf58867b5e"],["/check-mark-256.png","f92062f20f7631ec4fffe5178791d2d3"],["/checkmark.ac80b579.png","d27ccb9d4324cdc5a40f0ceca9b1b7b1"],["/checkmark.fe812768.png","d27ccb9d4324cdc5a40f0ceca9b1b7b1"],["/cookietrail.34b82bff.css","1119f9b462ebac8a0547afb47f4f0785"],["/cookietrail.34b82bff.js","3c4a5d1aa31feed8f5f359cb97195834"],["/couple-bird-1.1e73b784.png","46b94c45ab51a055e596ddb4a9d524ef"],["/flip-list.e0d40566.png","b327ab54208549f6844f713a65200d68"],["/fontawesome-webfont.152c194f.ttf","b06871f281fee6b241d60582ae9369b9"],["/fontawesome-webfont.4a2277d0.eot","674f50d287a8c48dc19ba404d20fe713"],["/fontawesome-webfont.4e039e70.woff","fee66e712a8a08eef5805a46892932ad"],["/fontawesome-webfont.80db1567.eot","674f50d287a8c48dc19ba404d20fe713"],["/fontawesome-webfont.9ab71dbb.svg","912ec66d7572ff821749319396470bde"],["/fontawesome-webfont.9fb3877d.woff2","af7ae505a9eed503f8b8e6982036873e"],["/fontawesome-webfont.a9acc805.svg","912ec66d7572ff821749319396470bde"],["/fontawesome-webfont.c3cf7ef2.woff","fee66e712a8a08eef5805a46892932ad"],["/fontawesome-webfont.cda54bb3.woff2","af7ae505a9eed503f8b8e6982036873e"],["/fontawesome-webfont.cf80d36a.ttf","b06871f281fee6b241d60582ae9369b9"],["/gaggle-bird-1.6d59a38e.png","9e0aa5629e3fa857a713faec44529a21"],["/img/add-hover.png","e4fb9ccb54e035204587670c2860f626"],["/img/add-list.png","ff0f72caa5e4fad9eb0d01114330724d"],["/img/add.png","0e9783e4039b3801d21f8a23e7ead790"],["/img/back-hover.png","af5050b9d99e8d0bfd35b59451c660ef"],["/img/back.png","1e007d816810fdc210405fa535ebb64d"],["/img/bg.jpg","75aff9a1a331d1f2f3fd09c17a21de4d"],["/img/breadcrumb-gray.png","44f413bf9cbc28cc1ca1c440d1661345"],["/img/breadcrumb.png","1dd48cfc5e39b09d26884aaf58867b5e"],["/img/checkmark.png","d27ccb9d4324cdc5a40f0ceca9b1b7b1"],["/img/couple-bird-1.png","46b94c45ab51a055e596ddb4a9d524ef"],["/img/couple-bird-2.png","ae2e66004f591fa9e0f6a3ef50371282"],["/img/flip-birds.png","b846e6e3c618ecb75ed46c8b3c5ec248"],["/img/flip-list.png","b327ab54208549f6844f713a65200d68"],["/img/gaggle-bird-1.png","9e0aa5629e3fa857a713faec44529a21"],["/img/gaggle-bird-2.png","6fe0291bdd8b0c8828a2e3a79bec97e8"],["/img/redo-hover.png","e49668769440cba4042b856eae0ede0a"],["/img/redo.png","01dac53ba54e3ba1bba921543dd335f2"],["/img/single-bird-1.png","9025f15b927727b3a3730047b1601818"],["/img/single-bird-2.png","ca461984ee4f64105112e1d2cfe5fdec"],["/img/single-bird-3.png","8a89302bc736c7be097c02bd2439b357"],["/img/single-bird-4.png","b47a45b83a62017cd45e10f2f3bd92b4"],["/img/single-bird-5.png","1ae78089b6f75100ffeb3eddabbb42ca"],["/img/single-bird-6.png","d3e0a12035e806fac8b62956ee824c07"],["/img/trash.png","2dcb3a7a77b434886cdc1a30e4907d57"],["/img/undo-hover.png","16718f9c44dc2caa6a35a7d1d7769041"],["/img/undo.png","d74ecabb37d66b85e0e365b92bc3b000"],["/index.html","9fd285fb1de960ee47d75bf3bcde13b0"],["/login.f062701c.css","eddfdd793ba7bcc8d3aa6e1a9221953e"],["/login.f062701c.js","398b5fb3dc758102628cd89a875b121c"],["/redo-hover.2c529042.png","e49668769440cba4042b856eae0ede0a"],["/redo-hover.9988fe4c.png","e49668769440cba4042b856eae0ede0a"],["/redo.430d47c7.png","01dac53ba54e3ba1bba921543dd335f2"],["/redo.bf6cf8f5.png","01dac53ba54e3ba1bba921543dd335f2"],["/service-worker.js","8eafd38258e85b5450881d1f73569da2"],["/single-bird-1.3b2e8e5e.png","9025f15b927727b3a3730047b1601818"],["/single-bird-1.944c7422.png","9025f15b927727b3a3730047b1601818"],["/src.04e9093b.js","24b3b225397cd2fa711b5b53d0135289"],["/src.14d8f3c3.js","72e9f605806a26bd418c3e3de60e39ca"],["/src.63e56bf7.css","cbb875c984adeb47a9e74b737a2bf1a7"],["/src.94599484.css","92b872bd2a1d79e6e4c3e07b438c08bc"],["/src.e31bb0bc.css","f2eaabae691d57f09606cac876ea441d"],["/src.ebbb5c0d.css","5c915f34ea22dd7adb0dff531a006119"],["/styles-web.fd801af0.css","19119255cdb1bd959ae83084357858c2"],["/styles-web.fd801af0.js","8878bdc62ce63c36992894a031d62c05"],["/styles.08261f57.css","c5065ad458d2ca7fd84659c50ea94b45"],["/styles.c86c3119.css","444921bde39f5c6f2530150ab69485f9"],["/styles.c86c3119.js","3856392dfbbaaccfeb019a1df5824089"],["/styles.d25a5498.css","3b19816c10c760f02d9f8ef3a0d1d2db"],["/trash-2-256.png","87fb86ca7b8c1ded2493dd59bc613d14"],["/trash.be1686b2.png","2dcb3a7a77b434886cdc1a30e4907d57"],["/trash.eb842e6e.png","2dcb3a7a77b434886cdc1a30e4907d57"],["/undo-hover.320cca16.png","16718f9c44dc2caa6a35a7d1d7769041"],["/undo-hover.4f0b93c1.png","16718f9c44dc2caa6a35a7d1d7769041"],["/undo.6cc5d2f6.png","d74ecabb37d66b85e0e365b92bc3b000"],["/undo.f547b8fd.png","d74ecabb37d66b85e0e365b92bc3b000"]];
var cacheName = 'sw-precache-v3-games-plottwister-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, /\.\w{8}\./);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["^(?!\\/__).*"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







