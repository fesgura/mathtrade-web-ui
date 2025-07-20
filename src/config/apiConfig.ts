const baseURL =
  process.env.API_TEST_MODE === "yes"
    ? process.env.NEXT_PUBLIC_BASE_URL_TEST
    : process.env.NEXT_PUBLIC_BASE_URL;

const apiConfig = {
  timeout: 15000, // 15 segundos
  baseURL,
  headers: {
    Accept: "application/json",
    "content-Type": "application/json",
  },
};

export const DAYS_EXPIRE_TOKEN = 7;

export const COOKIE_AUTH_TOKEN = "auth_token_mt";

export default apiConfig;
