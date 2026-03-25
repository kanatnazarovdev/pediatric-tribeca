
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // 1. Force all URLs to NOT have a trailing slash (e.g., /en/blog)
  // This ensures your Sitemap URLs are the "Final Destination"
  trailingSlash: false, 
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  // 2. Optimization: Ensure redirects handle the localization properly
  async redirects() {
    return [
      // Optional: Redirect the bare root to /en if you want to be strict
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;