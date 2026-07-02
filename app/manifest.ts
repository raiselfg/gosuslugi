import type { MetadataRoute } from "next";
import { appInfo } from "@/lib/app-data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appInfo.name,
    short_name: appInfo.name,
    description: appInfo.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    orientation: "portrait",
    lang: appInfo.lang,
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/gosusligi-logo.ico",
        sizes: "233x256",
        type: "image/x-icon",
      },
    ],
  };
}
