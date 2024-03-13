const apiConfig = {
  timeout: 300000, // 5 minutes
  baseURL: process.env.BASE_URL,
  headers: {
    Accept: "application/json",
    "content-Type": "application/json",
  },
};

export default apiConfig;
