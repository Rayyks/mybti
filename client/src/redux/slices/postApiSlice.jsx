import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/axiosBaseQuery";

export const postApi = createApi({
  reducerpath: "postApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/posts",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getSinglePost: builder.query({
      query: (postId) => ({
        url: `/${postId}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetSinglePostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
