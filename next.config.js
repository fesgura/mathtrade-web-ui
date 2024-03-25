/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "https://api.mathtrade.com.ar/",
     //BASE_URL: "https://mathtrade-backend-dev-tbmf.2.us-1.fl0.io/",
    BASE_URL_MEDIA: "https://mathtrade-backend-dev-tbmf.2.us-1.fl0.io/media/",
    GOOGLE_RECAPTCHA_CLIENT_KEY: "6LeWcz8gAAAAAGgpOiINIJZSwsmKH-eMjtbQbFbF",
    //
    LINK_HELP_BGG:
      "https://boardgamegeek.com/thread/3007435/math-trade-argentina-abril-2023",
    LINK_HELP_TELEGRAM: "https://t.me/+vy8WiP3QbFtjNDhh",
    LINK_HELP_VIDEO: "https://www.youtube.com/watch?v=U5cSBZeiNfc",
    LINK_HELP_ORGANIZATION: "https://t.me/Luis_Olcese",
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
