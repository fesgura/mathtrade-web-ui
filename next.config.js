/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PAUSED_SITE: "no",
    //
    API_TEST_MODE: "yes",
    BASE_URL_TEST: "https://mathtrade-backend.fly.dev/",
    BASE_URL: "https://api.mathtrade.com.ar/",
    //
    GOOGLE_RECAPTCHA_CLIENT_KEY: "6LeWcz8gAAAAAGgpOiINIJZSwsmKH-eMjtbQbFbF",
    //
    LINK_HELP_BGG:
      "https://boardgamegeek.com/thread/3007435/math-trade-argentina-abril-2023",
    LINK_HELP_TELEGRAM: "https://t.me/+Dfp95Nxg59ZhMjIx",
    LINK_HELP_VIDEO: "https://www.youtube.com/watch?v=L1ri5Wz_HYw",
    LINK_HELP_ORGANIZATION: "https://t.me/Luis_Olcese",
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
