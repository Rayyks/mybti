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
      invalidatesTags: ["User"],
    }),
    removeFollower: builder.mutation({
      query: ({ followerId }) => ({
        url: "/remove-follower",
        method: "POST",
        data: { followerId },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useFollowUserMutation,
  useUnFollowUserMutation,
  useRemoveFollowerMutation,
} = userApi;
