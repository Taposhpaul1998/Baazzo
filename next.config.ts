import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,

  // ── WordPress image domain whitelist ──────────────────────
  // WooCommerce product image গুলো এই domain থেকে আসবে
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "baazzo.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.baazzo.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
