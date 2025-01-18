import { useState } from "react";

import {
  useDeleteAccountMutation,
  useCancelAccountDeletionMutation,
} from "@/redux/slices/accountApiSlice";
import { profileApi } from "@/redux/slices/profileApiSlice";
import { useDispatch } from "react-redux";
import { resetAuthState } from "@/redux/slices/authSlice";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useProfile from "@/hooks/useProfile";

const useDeleteAccount = () => {
  const { myProfile, refetchProfile, navigate } = useProfile();
  const dispatch = useDispatch();
  const [deletionReason, setDeletionReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [isImmediate, setIsImmediate] = useState(false);

  const [deleteAccount, { isLoading: isDeletingAccount }] =
    useDeleteAccountMutation();
  const [cancelDeletion, { isLoading: isCancellingDeletion }] =
    useCancelAccountDeletionMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDeleteAccount = async () => {
    const finalReason =
      deletionReason === "other" ? customReason : deletionReason;

    try {
      await deleteAccount({
        immediate: isImmediate,
        reason: finalReason,
      }).unwrap();

      if (isImmediate) {
        dispatch(resetAuthState());
        await dispatch(profileApi.util.resetApiState());
        navigate("/login");
        toast.success("Your account has been deleted successfully.");
      }
      refetchProfile();
      toast.success("Account deletion requested successfully.");
      console.log("Requesting account deletion with reason:", finalReason);
    } catch (error) {
      toast.error("Failed to request account deletion.");
      console.error("Error requesting account deletion:", error);
    }
  };

  const handleCancelDeletion = async () => {
    setDeletionReason("");
    setCustomReason("");
    try {
      await cancelDeletion().unwrap();
      refetchProfile();
      toast.success("Account deletion request cancelled successfully.");
    } catch (error) {
      toast.error("Failed to cancel account deletion request.");
      console.error("Error cancelling account deletion request:", error);
    }
  };

  return {
    deletionReason,
    setDeletionReason,
    customReason,
    setCustomReason,
    isImmediate,
    setIsImmediate,
    isDeletionRequested: Boolean(
      myProfile?.data?.deletionScheduledAt && myProfile?.data?.deletionReason
    ),
    isDeletingAccount,
    isCancellingDeletion,
    register,
    handleSubmit,
    errors,
    handleDeleteAccount,
    handleCancelDeletion,
  };
};

export default useDeleteAccount;
