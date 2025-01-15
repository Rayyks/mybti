import { createApi } from "@reduxjs/toolkit/query";
import { axiosBaseQuery } from "@/services/axiosBaseQuery";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/auth",
  }),
  tagTypes: ["Account"],
  endpoints: (builder) => ({
    deleteAccount: builder.mutation({
      query: (immediate, reason) => ({
        url: "/delete-account",
        method: "DELETE",
        data: { immediate, reason },
      }),
    }),
    cancelAccountDeletion: builder.mutation({
      query: () => ({
        url: "/cancel-deletion",
        method: "POST",
      }),
    }),
  }),
});

export const { useDeleteAccountMutation, useCancelAccountDeletionMutation } =
  accountApi;
