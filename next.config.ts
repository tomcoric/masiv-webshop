import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Tijekom prototipa koristimo fotografije dobavljača (Gutekunst).
    // Prije produkcije zamijeniti vlastitim slikama na S3 storageu.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gutekunst.de",
      },
    ],
  },
};

export default nextConfig;
