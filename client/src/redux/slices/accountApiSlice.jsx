import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/axiosBaseQuery";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/auth",
  }),
  tagTypes: ["Account"],
  endpoints: (builder) => ({
    deleteAccount: builder.mutation({
      query: ({ immediate, reason }) => ({
        url: "/delete-account",
        method: "DELETE",
        data: { immediate, reason },
      }),
      invalidatesTags: ["Account"],
    }),
    cancelAccountDeletion: builder.mutation({
      query: () => ({
        url: "/cancel-deletion",
        method: "POST",
      }),
      invalidatesTags: ["Account"],
    }),
  }),
});

export const { useDeleteAccountMutation, useCancelAccountDeletionMutation } =
  accountApi;
