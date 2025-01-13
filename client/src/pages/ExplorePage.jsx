import { posts } from "@/assets/data/posts";
import React, { useState } from "react";
import { NavLink } from "react-router";
import PostDetail from "./PostDetail";

const ExplorePage = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="h-full w-full bg-gray-50 dark:bg-neutral-900 ">
      <div className="w-full mx-auto px-4 py-8">
        {/* Grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {posts.map((post) => (
            <NavLink
              to={`/explore/${post.id}`}
              key={post.id}
              className="relative aspect-square group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-6 text-white">
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>

        {/* Modal */}
        {selectedPost && (
          <PostDetail
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
          />
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
