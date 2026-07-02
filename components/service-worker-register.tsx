"use client";

import { useEffect } from "react";

const clearDevelopmentServiceWorkers = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();

  await Promise.all(
    registrations.map((registration) => registration.unregister()),
  );

  if ("caches" in window) {
    const cacheNames = await caches.keys();

    await Promise.all(
      cacheNames
        .filter((cacheName) => cacheName.startsWith("gosus-pwa-"))
        .map((cacheName) => caches.delete(cacheName)),
    );
  }
};

export const ServiceWorkerRegister = () => {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const setupServiceWorker = async () => {
      try {
        if (process.env.NODE_ENV !== "production") {
          await clearDevelopmentServiceWorkers();
          return;
        }

        await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      } catch (error) {
        console.error("Service worker setup failed", error);
      }
    };

    setupServiceWorker();
  }, []);

  return null;
};
