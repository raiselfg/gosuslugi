import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Госуслуги",
    short_name: "Госуслуги",
    description: "Приложение Госуслуги",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    orientation: "portrait",
    lang: "ru",
    icons: [
      {
        src: "/gosusligi-logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/gosusligi-logo.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
