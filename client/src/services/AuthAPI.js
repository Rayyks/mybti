import axiosConfig from "@/services/axiosConfig";

export const LoginAPI = async (userData) => {
  try {
    const response = await axiosConfig.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    console.log("Error In LoginAPI", error.message);
    throw error;
  }
};

export const RegisterAPI = async (userData) => {
  try {
    const response = await axiosConfig.post("auth/register", userData);
    return response.data;
  } catch (error) {
    console.log("Error In RegisterAPI", error);
    throw error;
  }
};

export const LogoutAPI = async () => {
  try {
    await axiosConfig.post("auth/logout", {});
  } catch (error) {
    throw error;
  }
};
