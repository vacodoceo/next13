/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["render.worldofwarcraft.com", "cataas.com"],
  },
};

module.exports = nextConfig;
