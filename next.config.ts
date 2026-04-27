
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: false, // Keep this false for clean SEO URLs
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // REMOVE the manual redirect if you have an app/[lang] folder structure.
  // Next.js middleware is better suited for this.
};

export default nextConfig;