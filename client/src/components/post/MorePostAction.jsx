import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/common";

export const MorePostAction = ({
  setOpenReportModal,
  setMoreAction,
  post,
  index,
}) => {
  const handleReportClick = () => {
    setOpenReportModal(true);
    setMoreAction(null);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => setMoreAction(null)}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-[90%] max-w-sm overflow-hidden">
          {/* Modal header */}
          <div className="text-center py-4 border-b border-gray-200">
            <h3 className="font-medium">Post options</h3>
          </div>

          {/* Modal content */}
          <div className="flex flex-col">
            <Link
              to={`/p/${post._id}`}
              className="flex w-full items-center justify-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-200"
            >
              View Post
            </Link>

            <Link
              to={`/p/${post._id}/edit`}
              className="flex w-full items-center justify-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-200"
            >
              Edit Post
            </Link>

            <Button
              onClick={() => {
                /* Add follow handler */
              }}
              className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-200"
            >
              Follow User
            </Button>

            <Button
              onClick={handleReportClick}
              className="w-full px-4 py-3 text-sm text-yellow-600 font-semibold hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-200"
            >
              Report
            </Button>

            <Button
              onClick={() => {
                /* Add delete handler */
              }}
              className="w-full px-4 py-3 text-sm text-red-600 font-semibold hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              Delete
            </Button>
          </div>

          {/* Cancel button */}
          <div className="border-t border-gray-200">
            <Button
              onClick={() => setMoreAction(null)}
              className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MorePostAction;
