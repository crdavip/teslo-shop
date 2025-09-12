import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // 👇 Fix para evitar que Next.js intente escanear Prisma
  webpack: (config) => {
    if (config.externals) {
      config.externals.push("@prisma/client", ".prisma/client");
    } else {
      config.externals = ["@prisma/client", ".prisma/client"];
    }
    return config;
  },
};

export default nextConfig;
