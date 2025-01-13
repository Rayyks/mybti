import axios from "axios";
import Cookies from "js-cookie";

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Request interceptor
axiosConfig.interceptors.request.use(
  (config) => {
    const token = Cookies.get("_user_access_token_");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Check if the request is multipart/form-data
    if (config.data && config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    // console.log(
    //   `Request: ${config.method.toUpperCase()} ${config.url}`,
    //   config
    // );
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosConfig.interceptors.response.use(
  (response) => {
    // console.log(
    //   `Response: ${response.status} ${response.config.url}`,
    //   response
    // );
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const customMessage =
        {
          400: "Bad request. Please check your input.",
          401: "Unauthorized. Please log in again.",
          403: "Access forbidden. You do not have the required permissions.",
          404: "The requested resource was not found.",
          500: "Internal server error. Please try again later.",
        }[status] || "An unexpected error occurred.";

      // Log errors for debugging
      console.error(
        `API Error [${status}]: ${data.message || customMessage}`,
        data
      );

      // Reject with a custom error object
      return Promise.reject({
        success: false,
        message: data.message || customMessage,
        data: data || null,
        status,
      });
    }

    // Handle non-response errors (e.g., network or timeout errors)
    console.error("Network or Unknown Error:", error.message);
    return Promise.reject({
      success: false,
      message: "Server is unreachable. Please check your internet connection.",
      data: null,
      status: 0,
    });
  }
);

export default axiosConfig;
