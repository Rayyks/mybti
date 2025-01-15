import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import { profileApi } from "@/redux/slices/profileApiSlice";
import { reportApi } from "@/redux/slices/reportApiSlice";
import { accountApi } from "@/redux/slices/accountApiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      profileApi.middleware,
      reportApi.middleware,
      accountApi.middleware
    ),
});

export default store;
