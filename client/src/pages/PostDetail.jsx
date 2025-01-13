import React from "react";

import { Button } from "@/components/common";
import { useNavigate } from "react-router";

const PostDetail = ({ selectedPost, setSelectedPost }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    setSelectedPost(null);
    navigate("/explore");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-4xl w-full rounded-lg overflow-hidden flex max-md:flex-col">
        <div className="w-full md:w-7/12">
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-5/12 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{selectedPost.title}</h2>
            <Button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
          <p className="text-gray-600 mb-4">{selectedPost.description}</p>
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <span>{selectedPost.date}</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{selectedPost.likes}</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{selectedPost.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
