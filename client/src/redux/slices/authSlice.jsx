import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { Login, Logout, Register } from "@/redux/thunks/auth";

const initialState = {
  user: null,
  token: Cookies.get("_user_access_token_"),
  isAuthenticated: Cookies.get("_user_access_token_") ? true : false,
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.data.token;
        state.loading = false;
        state.error = false;
        Cookies.set("_user_access_token_", action.payload.data.token, {
          expires: 7,
        });
      })
      .addCase(Login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(Register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = false;
      })
      .addCase(Register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.loading = false;
        // state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        Cookies.remove("_user_access_token_");
      })
      .addCase(Logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default authSlice.reducer;
export const {} = authSlice.actions;
