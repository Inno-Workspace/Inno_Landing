import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone output mode
  output: "standalone",
  // Exclude backend from output file tracing
  outputFileTracingExcludes: {
    "*": ["./backend/**/*"],
  },
  // Add empty turbopack config to silence warning when using webpack
  turbopack: {},
  // Use webpack to exclude backend directory
  webpack: (config, { isServer }) => {
    // Exclude backend directory from webpack compilation
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/backend/**", "**/node_modules/**"],
    };
    return config;
  },
};

export default nextConfig;
