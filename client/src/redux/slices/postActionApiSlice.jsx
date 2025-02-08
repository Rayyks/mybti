import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/axiosBaseQuery";

export const postActionApi = createApi({
  reducerPath: "postActionApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/action",
  }),
  tagTypes: ["PostAction"],
  endpoints: (builder) => ({
    likePost: builder.mutation({
      query: ({ postId }) => ({
        url: `/like`,
        method: "PUT",
        data: { postId },
      }),
      invalidatesTags: ["PostAction"],
    }),
    commentPost: builder.mutation({
      query: ({ postId, content }) => ({
        url: "/comments",
        method: "POST",
        data: { postId, content },
      }),
      invalidatesTags: ["PostAction"],
    }),
    replyComment: builder.mutation({
      query: ({ postId, parentCommentId, content }) => ({
        url: `/comments`,
        method: "POST",
        data: { postId, parentCommentId, content },
      }),
      invalidatesTags: ["PostAction"],
    }),
    savePost: builder.mutation({
      query: ({ postId }) => ({
        url: "/save/post",
        method: "POST",
        data: { postId },
      }),
      invalidatesTags: ["PostAction"],
    }),
    deleteComment: builder.mutation({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PostAction"],
    }),
  }),
});

export const {
  useLikePostMutation,
  useCommentPostMutation,
  useReplyCommentMutation,
  useDeleteCommentMutation,
  useSavePostMutation,
} = postActionApi;
