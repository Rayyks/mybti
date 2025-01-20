import React from "react";
import { Link } from "react-router";
import { X } from "lucide-react";
import { Button } from "@/components/common";

export const MorePostAction = ({ setOpenReportModal, setMoreAction, post }) => {
  const handleReportClick = () => {
    setOpenReportModal(true);
    setMoreAction(null);
  };

  return (
    <div className="relative">
      {/* Close button */}
      <Button
        onClick={() => setMoreAction(null)}
        className="p-2 bg-gray-100 rounded-full"
      >
        <X className="w-5 h-5" />
      </Button>

      {/* Dropdown menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
        <Link
          to={`/p/${post._id}`}
          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          View Post
        </Link>

        <Link
          to={`/p/${post._id}/edit`}
          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Edit Post
        </Link>

        <Button
          onClick={() => {
            /* Add follow handler */
          }}
          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Follow User
        </Button>

        <hr className="my-1 border-gray-200" />

        <Button
          onClick={handleReportClick}
          className="flex w-full items-center px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100"
        >
          Report
        </Button>

        <Button
          onClick={() => {
            /* Add delete handler */
          }}
          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default MorePostAction;
