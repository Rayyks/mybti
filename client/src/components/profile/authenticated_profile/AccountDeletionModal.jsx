import { Trash2, X } from "lucide-react";
import React from "react";

export const AccountDeletionModal = ({ onCancel, onDelete }) => {
  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <X className="w-3.5 cursor-pointer fill-gray-400 hover:fill-red-500 absolute top-6 right-6" />

        <div className="my-4 text-center">
          <Trash2 className="w-16 h-16 mx-auto text-red-600" />
          <h4 className="text-gray-800 text-base font-semibold mt-4">
            Are you sure you want to delete it?
          </h4>

          <div className="text-center space-x-4 mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg text-gray-800 text-sm bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 rounded-lg text-white text-sm bg-red-600 hover:bg-red-700 active:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDeletionModal;
