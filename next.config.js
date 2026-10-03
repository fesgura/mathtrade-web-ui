const { withSentryConfig } = require("@sentry/nextjs/config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PAUSED_SITE: process.env.PAUSED_SITE || "no",
    //
    API_TEST_MODE: process.env.API_TEST_MODE || "no",
    BASE_URL_TEST: process.env.BASE_URL_TEST || "http://localhost:8000/",
    BASE_URL: process.env.BASE_URL || "https://api.mathtrade.com.ar/",
    //
    GOOGLE_RECAPTCHA_CLIENT_KEY: "6LeWcz8gAAAAAGgpOiINIJZSwsmKH-eMjtbQbFbF",
    //
    LINK_HELP_BGG:
      "https://boardgamegeek.com/thread/3007435/math-trade-argentina-abril-2023",
    LINK_HELP_TELEGRAM: "https://t.me/+Dfp95Nxg59ZhMjIx",
    LINK_HELP_VIDEO: "https://www.youtube.com/watch?v=L1ri5Wz_HYw",
    LINK_HELP_ORGANIZATION: "https://t.me/Luis_Olcese",
    //
    // Sentry (src/sentry.ts). A DSN only lets you send errors, it's public
    // in the browser bundle anyway.
    NEXT_PUBLIC_SENTRY_DSN:
      "https://b4ac0541c4621809c28e81452d8477a3@o4512179076071424.ingest.us.sentry.io/4512179093766144",
  },
  reactStrictMode: false,
};

// No source map upload for now: it needs a Sentry auth token in the build.
// Browser errors go through our own /monitoring route, since ad blockers
// drop requests to sentry.io.
module.exports = withSentryConfig(nextConfig, {
  silent: true,
  telemetry: false,
  sourcemaps: { disable: true },
  tunnelRoute: "/monitoring",
});
