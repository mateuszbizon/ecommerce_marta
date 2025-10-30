import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["overdefensive-unhomiletic-marna.ngrok-free.dev"],
  images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*"
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};

export default nextConfig;
