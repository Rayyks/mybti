import axiosConfig from "@/services/axiosConfig";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    // Ignore requests where the URL contains "undefined"
    if (url.includes("undefined")) {
      // console.warn(`Skipping request to: ${url}`);
      return { error: { status: 400, data: "Invalid request" } };
    }

    try {
      const result = await axiosConfig({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          "Content-Type":
            data instanceof FormData
              ? "multipart/form-data"
              : "application/json",
        },
      });
      return { data: result.data };
    } catch (error) {
      return {
        error: {
          status: error.response?.status || 500,
          data: error.response?.data || error.message,
        },
      };
    }
  };
