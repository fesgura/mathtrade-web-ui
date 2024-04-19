const baseURL = process.env.API_TEST_MODE
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

export default apiConfig;
