// @ts-check

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "shorturl.at",
      "placeimg.com",
      "lh3.googleusercontent.com",
      "loremflickr.com",
    ],
  },
};

module.exports = nextConfig;
