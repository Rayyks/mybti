import React from "react";
import { Label, Input } from "@/components/ui";
import { Button } from "@/components/common";
import useDeleteAccount from "@/hooks/useDeleteAccount";
import useProfile from "@/hooks/useProfile";
import { AccountDeletionModal } from "@/components/profile";

export const AccountDeletionSection = () => {
  const {
    deletionReason,
    setDeletionReason,
    customReason,
    setCustomReason,
    isImmediate,
    setIsImmediate,
    isDeletionRequested,
    register,
    handleSubmit,
    errors,
    handleDeleteAccount,
    handleCancelDeletion,
  } = useDeleteAccount();
  const { myProfile } = useProfile();
  const [showModal, setShowModal] = React.useState(false);

  const handleDeleteClick = () => {
    if (isImmediate) {
      setShowModal(true);
    } else {
      handleSubmit(handleDeleteAccount)();
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleModalDelete = () => {
    setShowModal(false);
    handleSubmit(handleDeleteAccount)();
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-6 mb-8 shadow-sm">
      <h2 className="text-3xl font-semibold mb-6 text-black">
        Account Settings
      </h2>

      {isDeletionRequested ? (
        <div className="bg-neutral-900 p-6 rounded-lg">
          <h3 className="text-xl font-medium text-white mb-3">
            Account Deletion Requested
          </h3>
          <p className="text-neutral-300 mb-6">
            Your account is scheduled for deletion on{" "}
            <span className="font-bold underline">
              {myProfile?.data?.deletionScheduledAt}
            </span>
            . You can cancel this request if you change your mind.
          </p>
          <p className="text-neutral-300 mb-6">
            with the reason:{" "}
            <span className="font-bold underline">
              {myProfile?.data?.deletionReason}
            </span>
          </p>
          <Button
            onClick={handleCancelDeletion}
            className="bg-white text-black border-2 border-white px-6 py-3 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
          >
            Cancel Deletion Request
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-black">Delete Account</h3>
          <div className="space-y-3">
            <Label className="block text-sm font-medium text-neutral-700">
              Reason for deletion
            </Label>
            <select
              {...register("deletionReason", { required: true })}
              value={deletionReason}
              onChange={(e) => setDeletionReason(e.target.value)}
              className="block w-full px-4 py-2 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
            >
              <option value="">Select a reason</option>
              <option value="privacy">Privacy concerns</option>
              <option value="not_useful">Not useful</option>
              <option value="not_safe">Not safe</option>
              <option value="harassment">Harassment</option>
              <option value="other">Other</option>
            </select>
            {deletionReason === "other" && (
              <Input
                type="text"
                {...register("customReason", { required: true })}
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="block w-full px-4 py-2 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
                placeholder="Please specify"
              />
            )}
            {errors.deletionReason && (
              <p className="text-red-500 text-sm mt-2">
                Reason for deletion is required
              </p>
            )}
          </div>
          <div className="flex items-center">
            <Input
              type="checkbox"
              {...register("isImmediate")}
              checked={isImmediate}
              onChange={(e) => setIsImmediate(e.target.checked)}
              className="h-4 w-4 text-neutral-600 border-neutral-300 rounded focus:ring-neutral-500"
            />
            <Label className="ml-2 block text-sm text-neutral-700">
              Delete immediately
            </Label>
          </div>
          <Button
            onClick={handleDeleteClick}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Delete Account
          </Button>
        </div>
      )}

      {showModal && (
        <AccountDeletionModal
          onCancel={handleModalCancel}
          onDelete={handleModalDelete}
        />
      )}
    </div>
  );
};

export default AccountDeletionSection;
