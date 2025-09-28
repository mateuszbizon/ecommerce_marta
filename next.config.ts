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
};

export default nextConfig;
