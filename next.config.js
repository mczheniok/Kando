/**
 * @type {import('next').NextConfig}
 */
const path = require("path");
require("dotenv").config();

const nextConfig = {
  webpack(config) {
    // Конфигурация для SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    // Конфигурация алиасов
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    return config;
  },
  images: {
    // если используешь внешний хостинг, добавь сюда домены
    unoptimized: true,
    domains: [
      process.env.NEXT_PUBLIC_DOMAIN,
      "h3.googleusercontent.com"
    ],
    // или можно использовать remotePatterns
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_PROTO,
        hostname: process.env.NEXT_PUBLIC_DOMAIN,
        pathname: '/uploads/**',
      },
      {
        protocol: "https",
        hostname: "h3.googleusercontent.com",
        pathname: "/**"
      }
    ],
  },
};

module.exports = nextConfig;
