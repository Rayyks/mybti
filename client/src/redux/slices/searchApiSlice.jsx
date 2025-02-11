import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/axiosBaseQuery";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/search",
  }),
  tagTypes: ["Search"],
  endpoints: (builder) => ({
    search: builder.query({
      query: ({ query }) => ({
        url: `/users?username=${query}`,
        method: "GET",
      }),
      providesTags: ["Search"],
    }),
  }),
});

export const { useLazySearchQuery } = searchApi;
