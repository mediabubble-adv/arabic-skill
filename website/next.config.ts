import type { NextConfig } from "next";
import path from "node:path";

const websiteRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  turbopack: {
    root: websiteRoot,
  },
  outputFileTracingRoot: websiteRoot,
};

export default nextConfig;
