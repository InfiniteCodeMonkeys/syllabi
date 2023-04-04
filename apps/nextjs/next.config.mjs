// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@acme/api", "@acme/db"],
  // We already do linting on GH actions
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-images-1.listennotes.com",
      },
      {
        protocol: "https",
        hostname: "production.listennotes.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default config;
