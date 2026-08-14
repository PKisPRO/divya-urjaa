import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // a stray lockfile in the home directory otherwise wins the workspace-root
  // inference, which changes where output tracing looks
  outputFileTracingRoot: path.join(__dirname),
  // lets a production build live somewhere a running `next dev` can't clobber:
  //   NEXT_DIST_DIR=.next-prod npm run build && NEXT_DIST_DIR=.next-prod npm start
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920, 2400, 3000],
    imageSizes: [64, 96, 128, 256, 384, 512],
  },
  experimental: {
    optimizePackageImports: ["motion", "@react-three/drei"],
  },
};

export default nextConfig;
