/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Autorise les images distantes (ex: Unsplash pour les placeholders).
    // À adapter quand vous brancherez votre propre CDN / stockage.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
