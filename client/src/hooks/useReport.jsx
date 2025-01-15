import {
  useGetReportedQuery,
  useReportCommentMutation,
  useReportPostMutation,
  useReportReplyMutation,
  useReportUserMutation,
} from "@/redux/slices/reportApiSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";

const useReport = () => {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  // USE FORM HOOK
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: getReportedData, isLoading: getReportedLoading } =
    useGetReportedQuery();
  const [reportUser, { isLoading: reportUserLoading }] =
    useReportUserMutation();
  const [reportPost, { isLoading: reportPostLoading }] =
    useReportPostMutation();
  const [reportComment, { isLoading: reportCommentLoading }] =
    useReportCommentMutation();
  const [reportReply, { isLoading: reportReplyLoading }] =
    useReportReplyMutation();

  // REPORT USER
  const handleReportUser = async (userId, reason) => {
    try {
      await reportUser({ userIdToReport: userId, reason });
      toast.success("User reported successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  // REPORT POST
  const handleReportPost = async (postId, reason) => {
    try {
      await reportPost({ postId, reason });
      toast.success("Post reported successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  // REPORT COMMENT
  const hanldeReportComment = async (commentId, reason) => {
    try {
      await reportComment({ commentId, reason });
      toast.success("Comment reported successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  // REPORT REPLY
  const handleReportReply = async (replyId, reason) => {
    try {
      await reportReply({ replyId, reason });
      toast.success("Reply reported successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    reason,
    setReason,
    customReason,
    setCustomReason,
    // USE FORM HOOK
    register,
    handleSubmit,
    errors,
    reset,
    // GET REPORTED DATA
    getReportedData,
    getReportedLoading,
    // REPORT USER
    handleReportUser,
    reportUserLoading,
    // REPORT POST
    handleReportPost,
    reportPostLoading,
    // REPORT COMMENT
    hanldeReportComment,
    reportCommentLoading,
    // REPORT REPLY
    handleReportReply,
    reportReplyLoading,
  };
};

export default useReport;
