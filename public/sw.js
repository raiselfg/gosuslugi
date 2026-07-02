const CACHE_VERSION = "gosus-pwa-v2";
const APP_SHELL_CACHE = `${CACHE_VERSION}-shell`;
const PAGE_CACHE = `${CACHE_VERSION}-pages`;
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const PRECACHE_URLS = [
  "/",
  "/details",
  "/manifest.webmanifest",
  "/gosusligi-logo.png",
  "/gosusligi-logo.ico",
];

const CURRENT_CACHES = [
  APP_SHELL_CACHE,
  PAGE_CACHE,
  STATIC_CACHE,
  IMAGE_CACHE,
  RUNTIME_CACHE,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(APP_SHELL_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => !CURRENT_CACHES.includes(cacheName))
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

const isSameOriginGet = (request) =>
  request.method === "GET" &&
  new URL(request.url).origin === self.location.origin;

const canCacheResponse = (response) =>
  response &&
  response.ok &&
  (response.type === "basic" || response.type === "default");

const putInCache = async (cacheName, request, response) => {
  if (!canCacheResponse(response)) {
    return;
  }

  const cache = await caches.open(cacheName);
  await cache.put(request, response.clone());
};

const cacheFirst = async (request, cacheName) => {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(request);
  await putInCache(cacheName, request, response);

  return response;
};

const networkFirst = async (request, cacheName, fallbackUrl = "/") => {
  try {
    const response = await fetch(request);
    await putInCache(cacheName, request, response);

    return response;
  } catch {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    if (fallbackUrl) {
      const fallbackResponse = await caches.match(fallbackUrl);

      if (fallbackResponse) {
        return fallbackResponse;
      }
    }

    return Response.error();
  }
};

const isImageRequest = (request, pathname) =>
  request.destination === "image" ||
  /\.(?:png|jpg|jpeg|gif|webp|svg|ico|avif)$/i.test(pathname);

const isNextStaticAsset = (pathname) => pathname.startsWith("/_next/static/");

const isNextImage = (pathname) => pathname.startsWith("/_next/image");

const isPageDataRequest = (request, url) => {
  const acceptHeader = request.headers.get("accept") || "";

  return (
    url.searchParams.has("_rsc") ||
    request.headers.get("rsc") === "1" ||
    acceptHeader.includes("text/x-component")
  );
};

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (!isSameOriginGet(request)) {
    return;
  }

  const url = new URL(request.url);
  const { pathname } = url;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, PAGE_CACHE, "/"));
    return;
  }

  if (isPageDataRequest(request, url)) {
    event.respondWith(networkFirst(request, PAGE_CACHE, "/"));
    return;
  }

  if (pathname === "/manifest.webmanifest" || pathname === "/sw.js") {
    event.respondWith(networkFirst(request, RUNTIME_CACHE, null));
    return;
  }

  if (isNextStaticAsset(pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  if (isNextImage(pathname) || isImageRequest(request, pathname)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  event.respondWith(networkFirst(request, RUNTIME_CACHE, null));
});
