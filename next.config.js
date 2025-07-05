/**
 * @type {import('next').NextConfig}
 */
const path = require("path")

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
    domains: ['kando.pp.ua'],
    // или можно использовать remotePatterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kando.pp.ua',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
