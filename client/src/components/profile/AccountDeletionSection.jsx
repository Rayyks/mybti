import React from "react";

export const AccountDeletionSection = (
  isDeletionRequested,
  handleCancelDeletion,
  handleDeleteAccount,
  deletionReason,
  setDeletionReason,
  customReason,
  setCustomReason
) => {
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
            Your account is scheduled for deletion. You can cancel this request
            if you change your mind.
          </p>
          <button
            onClick={handleCancelDeletion}
            className="bg-white text-black border-2 border-white px-6 py-3 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
          >
            Cancel Deletion Request
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-black">Delete Account</h3>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-neutral-700">
              Reason for deletion:
            </label>
            <select
              value={deletionReason}
              onChange={(e) => setDeletionReason(e.target.value)}
              className="w-full p-3 border-2 border-neutral-200 rounded-lg focus:border-black focus:ring-0 transition-colors duration-200"
            >
              <option value="">Select a reason</option>
              <option value="not_useful">Not useful anymore</option>
              <option value="privacy">Privacy concerns</option>
              <option value="too_many_emails">Too many emails</option>
              <option value="other">Other reason</option>
            </select>
          </div>

          {deletionReason === "other" && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-neutral-700">
                Please specify:
              </label>
              <input
                type="text"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="w-full p-3 border-2 border-neutral-200 rounded-lg focus:border-black focus:ring-0 transition-colors duration-200"
                placeholder="Enter your reason"
              />
            </div>
          )}

          <button
            onClick={handleDeleteAccount}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              !deletionReason || (deletionReason === "other" && !customReason)
            }
          >
            Request Account Deletion
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountDeletionSection;
