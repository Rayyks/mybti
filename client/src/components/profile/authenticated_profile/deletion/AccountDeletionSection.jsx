import { useState } from "react";
import { Button } from "@/components/common";
import useDeleteAccount from "@/hooks/useDeleteAccount";
import useProfile from "@/hooks/useProfile";
import { AccountDeletionModal } from "@/components/profile";
import BeforeDeleteAccount from "@/lib/BeforeDeleteAccount";
import { DeletionForm } from "./DeletionForm";

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
  const [showModal, setShowModal] = useState(false);
  const [showBeforeDeleteModal, setShowBeforeDeleteModal] = useState(false);

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

  const handleImmediateChange = (e) => {
    setIsImmediate(e.target.checked);
    if (e.target.checked) {
      setShowBeforeDeleteModal(true);
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-6 mb-8 shadow-sm">
      <h2 className="text-3xl font-semibold mb-6 text-black">
        Account Settings
      </h2>

      {isDeletionRequested ? (
        <DeletionRequestedSection
          myProfile={myProfile}
          handleCancelDeletion={handleCancelDeletion}
        />
      ) : (
        <DeletionForm
          deletionReason={deletionReason}
          setDeletionReason={setDeletionReason}
          customReason={customReason}
          setCustomReason={setCustomReason}
          isImmediate={isImmediate}
          handleImmediateChange={handleImmediateChange}
          handleDeleteClick={handleDeleteClick}
          register={register}
          errors={errors}
          setShowBeforeDeleteModal={setShowBeforeDeleteModal}
        />
      )}

      {showModal && (
        <AccountDeletionModal
          onCancel={handleModalCancel}
          onDelete={handleModalDelete}
        />
      )}

      <BeforeDeleteAccount
        isOpen={showBeforeDeleteModal}
        onClose={() => setShowBeforeDeleteModal(false)}
      />
    </div>
  );
};

const DeletionRequestedSection = ({ myProfile, handleCancelDeletion }) => (
  <div className="bg-neutral-900 p-6 rounded-lg">
    <h3 className="text-xl font-medium text-white mb-3">
      Account Deletion Requested
    </h3>
    <p className="text-neutral-300 mb-6">
      Your account is scheduled for deletion on{" "}
      <span className="font-bold underline">
        {new Date(myProfile?.user?.deletionScheduledAt).toLocaleString()}
      </span>
      . You can cancel this request if you change your mind.
    </p>
    <p className="text-neutral-300 mb-6">
      with the reason:{" "}
      <span className="font-bold underline">
        {myProfile?.user?.deletionReason}
      </span>
    </p>
    <Button
      onClick={handleCancelDeletion}
      className="bg-white text-black border-2 border-white px-6 py-3 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
    >
      Cancel Deletion Request
    </Button>
  </div>
);

export default AccountDeletionSection;
