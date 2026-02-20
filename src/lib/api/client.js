import axios from "axios";

const timeoutMs = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS || 15000);

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_INTERNAL_API_BASE_URL || "/api",
  timeout: Number.isNaN(timeoutMs) ? 15000 : timeoutMs,
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.code === "ECONNABORTED") {
      error.message = "Request timeout. Please try again.";
    }

    return Promise.reject(error);
  },
);

export default apiClient;
