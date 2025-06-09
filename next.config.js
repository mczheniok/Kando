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
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
