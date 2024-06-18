const baseURL =
  process.env.API_TEST_MODE === "yes"
    ? process.env.BASE_URL_TEST
    : process.env.BASE_URL;

const apiConfig = {
  timeout: 300000, // 5 minutes
  baseURL,
  headers: {
    Accept: "application/json",
    "content-Type": "application/json",
  },
};

export const DAYS_EXPIRE_TOKEN = 7;

export const COOKIE_AUTH_TOKEN = "auth_token_mt";

export default apiConfig;
