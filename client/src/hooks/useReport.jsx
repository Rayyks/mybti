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

  // HANDLE REPORT
  const handleReport = async (type, id, reason) => {
    const mutationMap = {
      user: reportUser,
      post: reportPost,
      comment: reportComment,
      reply: reportReply,
    };
    try {
      await mutationMap[type]({ [`${type}Id`]: id, reason });
      toast.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} reported successfully`
      );
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
    reportUserLoading,
    // REPORT POST
    reportPostLoading,
    // REPORT COMMENT
    reportCommentLoading,
    // REPORT REPLY
    reportReplyLoading,
    // HANDLE SUBMIT REPORT
    handleReport,
  };
};

export default useReport;
