import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },

  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "img.clerk.com" },
    ],
  },
};

export default nextConfig;
