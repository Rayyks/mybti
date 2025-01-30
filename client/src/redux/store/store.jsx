import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import { profileApi } from "@/redux/slices/profileApiSlice";
import { reportApi } from "@/redux/slices/reportApiSlice";
import { accountApi } from "@/redux/slices/accountApiSlice";
import { postApi } from "@/redux/slices/postApiSlice";
import { userApi } from "@/redux/slices/userApiSlice";
import { postActionApi } from "@/redux/slices/postActionApiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postActionApi.reducerPath]: postActionApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      profileApi.middleware,
      reportApi.middleware,
      accountApi.middleware,
      postApi.middleware,
      userApi.middleware,
      postActionApi.middleware
    ),
});

export default store;
