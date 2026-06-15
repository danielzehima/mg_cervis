import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fixe la racine du projet (évite l'avertissement "multiple lockfiles" :
  // un package-lock.json traîne aussi dans C:\Users\HP\).
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  images: {
    // Autorise les images distantes (ex: Unsplash pour les placeholders).
    // À adapter quand vous brancherez votre propre CDN / stockage.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
