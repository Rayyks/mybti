import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/axiosBaseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/user",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: ({ username }) => ({
        url: `/profile/${username}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    followUser: builder.mutation({
      query: ({ userIdToFollow }) => ({
        url: "/follow",
        method: "POST",
        data: { userIdToFollow },
      }),
      invalidatesTags: ["User"],
    }),
    unFollowUser: builder.mutation({
      query: ({ userIdToUnfollow }) => ({
        url: "/unfollow",
        method: "POST",
        data: { userIdToUnfollow },
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useFollowUserMutation,
  useUnFollowUserMutation,
} = userApi;
