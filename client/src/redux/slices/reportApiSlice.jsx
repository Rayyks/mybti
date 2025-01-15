import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/services/axiosBaseQuery";

export const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/report",
  }),
  tagTypes: ["Report"],
  endpoints: (builder) => ({
    getReported: builder.query({
      query: () => ({
        url: "/reports",
        method: "GET",
      }),
      providesTags: ["Report"],
    }),
    reportUser: builder.mutation({
      query: ({ userIdToReport, reason }) => ({
        url: "/user",
        method: "POST",
        data: { userIdToReport, reason },
      }),
      invalidatesTags: ["Report"],
    }),
    reportPost: builder.mutation({
      query: ({ postId, reason }) => ({
        url: "/post",
        method: "POST",
        data: { postId, reason },
      }),
      invalidatesTags: ["Report"],
    }),
    reportComment: builder.mutation({
      query: ({ commentId, reason }) => ({
        url: "/comment",
        method: "POST",
        data: { commentId, reason },
      }),
      invalidatesTags: ["Report"],
    }),
    reportReply: builder.mutation({
      query: ({ replyId, reason }) => ({
        url: "/reply",
        method: "POST",
        data: { replyId, reason },
      }),
      invalidatesTags: ["Report"],
    }),
  }),
});

export const {
  useGetReportedQuery,
  useReportUserMutation,
  useReportPostMutation,
  useReportCommentMutation,
  useReportReplyMutation,
} = reportApi;
