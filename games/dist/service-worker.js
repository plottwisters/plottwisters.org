"use strict";

function setOfCachedUrls(e) {
  return e.keys().then(function(e) {
    return e.map(function(e) {
      return e.url
    })
  }).then(function(e) {
    return new Set(e)
  })
}
var precacheConfig = [
    ["./check-mark-256.png", "f92062f20f7631ec4fffe5178791d2d3"],
    ["./fontawesome-webfont.152c194f.ttf", "b06871f281fee6b241d60582ae9369b9"],
    ["./fontawesome-webfont.4a2277d0.eot", "674f50d287a8c48dc19ba404d20fe713"],
    ["./fontawesome-webfont.4e039e70.woff", "fee66e712a8a08eef5805a46892932ad"],
    ["./fontawesome-webfont.80db1567.eot", "674f50d287a8c48dc19ba404d20fe713"],
    ["./fontawesome-webfont.9ab71dbb.svg", "912ec66d7572ff821749319396470bde"],
    ["./fontawesome-webfont.9fb3877d.woff2", "af7ae505a9eed503f8b8e6982036873e"],
    ["./fontawesome-webfont.a9acc805.svg", "912ec66d7572ff821749319396470bde"],
    ["./fontawesome-webfont.c3cf7ef2.woff", "fee66e712a8a08eef5805a46892932ad"],
    ["./fontawesome-webfont.cda54bb3.woff2", "af7ae505a9eed503f8b8e6982036873e"],
    ["./fontawesome-webfont.cf80d36a.ttf", "b06871f281fee6b241d60582ae9369b9"],
    ["./index.html", "95969cc355b9709b4eae8198e54b3724"],
    ["./service-worker.js", "32b0ef56e3fd3af1329d434ad5a9a17f"],
    ["./src.0a6f7a1a.js", "854e3bbc95e90c50c15c10fa678862a6"],
    ["./src.1a16a04e.js", "ac8920f54b177d722b3858b3bb6f929b"],
    ["./src.1f1621f6.js", "32a909e4fbdaf5a515d8de46e14caba3"],
    ["./src.333328b3.js", "abc81d88c26b0d984d109ea9652e17aa"],
    ["./src.4c1fed23.js", "5a9718ab5fc9a882b845edfac1d73e8f"],
    ["./src.5e41bcf9.js", "f438db3842af7a7d31b62441435b1543"],
    ["./src.8802fe65.js", "c547d693932e1a4b90931cea29176b5f"],
    ["./src.94599484.css", "92b872bd2a1d79e6e4c3e07b438c08bc"],
    ["./src.95d06fd4.js", "1597c1f6a284ee8c73dc499699505bf4"],
    ["./src.b7f04086.js", "c5a6b7339f7312ab623b16fb8970c6c0"],
    ["./src.d580cf4b.js", "30428b7420c3087d0eeddb3bfd921dc5"],
    ["./src.e31bb0bc.css", "f2eaabae691d57f09606cac876ea441d"],
    ["./src.e31bb0bc.js", "b41305d546bbd206b25236e1e7be3273"],
    ["./src.e7979f9a.js", "0c30f35f543d71711dc845d8469da083"],
    ["./src.ea802965.js", "c9eb84f5a94f5ab199838be73da2a4fb"],
    ["./src.fb7e8fe9.js", "4b6d155bf3b9559a7b6e04bd10b8cc74"],
    ["./styles.c86c3119.css", "46ca46b176461528e4ac627943fc69ef"],
    ["./styles.c86c3119.js", "f07731b5df7e9844ebdcb14959393a6f"],
    ["./styles.d25a5498.css", "a968f7ed1632ff2a661888dfdfed52cf"],
    ["./trash-2-256.png", "87fb86ca7b8c1ded2493dd59bc613d14"]
  ],
  cacheName = "sw-precache-v3-games-plottwister-" + (self.registration ? self.registration.scope : ""),
  ignoreUrlParametersMatching = [/^utm_/],
  addDirectoryIndex = function(e, t) {
    var n = new URL(e);
    return "/" === n.pathname.slice(-1) && (n.pathname += t), n.toString()
  },
  cleanResponse = function(e) {
    if (!e.redirected) return Promise.resolve(e);
    return ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function(t) {
      return new Response(t, {
        headers: e.headers,
        status: e.status,
        statusText: e.statusText
      })
    })
  },
  createCacheKey = function(e, t, n, r) {
    var a = new URL(e);
    return r && a.pathname.match(r) || (a.search += (a.search ? "&" : "") + encodeURIComponent(t) + "=" + encodeURIComponent(n)), a.toString()
  },
  isPathWhitelisted = function(e, t) {
    if (0 === e.length) return !0;
    var n = new URL(t).pathname;
    return e.some(function(e) {
      return n.match(e)
    })
  },
  stripIgnoredUrlParameters = function(e, t) {
    var n = new URL(e);
    return n.hash = "", n.search = n.search.slice(1).split("&").map(function(e) {
      return e.split("=")
    }).filter(function(e) {
      return t.every(function(t) {
        return !t.test(e[0])
      })
    }).map(function(e) {
      return e.join("=")
    }).join("&"), n.toString()
  },
  hashParamName = "_sw-precache",
  urlsToCacheKeys = new Map(precacheConfig.map(function(e) {
    var t = e[0],
      n = e[1],
      r = new URL(t, self.location),
      a = createCacheKey(r, hashParamName, n, /\.\w{8}\./);
    return [r.toString(), a]
  }));
self.addEventListener("install", function(e) {
  e.waitUntil(caches.open(cacheName).then(function(e) {
    return setOfCachedUrls(e).then(function(t) {
      return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n) {
        if (!t.has(n)) {
          var r = new Request(n, {
            credentials: "same-origin"
          });
          return fetch(r).then(function(t) {
            if (!t.ok) throw new Error("Request for " + n + " returned a response with status " + t.status);
            return cleanResponse(t).then(function(t) {
              return e.put(n, t)
            })
          })
        }
      }))
    })
  }).then(function() {
    return self.skipWaiting()
  }))
}), self.addEventListener("activate", function(e) {
  var t = new Set(urlsToCacheKeys.values());
  e.waitUntil(caches.open(cacheName).then(function(e) {
    return e.keys().then(function(n) {
      return Promise.all(n.map(function(n) {
        if (!t.has(n.url)) return e.delete(n)
      }))
    })
  }).then(function() {
    return self.clients.claim()
  }))
}), self.addEventListener("fetch", function(e) {
  if ("GET" === e.request.method) {
    var t, n = stripIgnoredUrlParameters(e.request.url, ignoreUrlParametersMatching);
    (t = urlsToCacheKeys.has(n)) || (n = addDirectoryIndex(n, "index.html"), t = urlsToCacheKeys.has(n));
    !t && "navigate" === e.request.mode && isPathWhitelisted(["^(?!\\/__).*"], e.request.url) && (n = new URL("./index.html", self.location).toString(), t = urlsToCacheKeys.has(n)), t && e.respondWith(caches.open(cacheName).then(function(e) {
      return e.match(urlsToCacheKeys.get(n)).then(function(e) {
        if (e) return e;
        throw Error("The cached response that was expected is missing.")
      })
    }).catch(function(t) {
      return console.warn('Couldn\'t serve response for "%s" from cache: %O', e.request.url, t), fetch(e.request)
    }))
  }
});
