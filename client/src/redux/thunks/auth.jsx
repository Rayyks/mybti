import { createAsyncThunk } from "@reduxjs/toolkit";

import { LoginAPI, LogoutAPI, RegisterAPI } from "@/services/AuthAPI";

export const Login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await LoginAPI(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const Register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await RegisterAPI(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const Logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await LogoutAPI();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
