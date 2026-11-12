import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The site is fully client-rendered, so a static export deploys cleanly to
  // Netlify (or any static host) without a Node server or Next runtime.
  output: "export",
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
};

export default nextConfig;
