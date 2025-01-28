import React, { useState } from "react";
import {
  ArrowLeft,
  MoreHorizontal,
  MessageCircle,
  Repeat2,
  Heart,
  BarChart2,
  Upload,
  Bookmark,
} from "lucide-react";

const TweetPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center gap-6 px-4 py-3 border-b border-neutral-800 sticky top-0 bg-black/80 backdrop-blur-sm">
        <button className="rounded-full p-2 hover:bg-neutral-900">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Post</h1>
      </div>

      {/* Main Tweet */}
      <article className="border-b border-neutral-800">
        {/* Tweet Header */}
        <div className="flex justify-between p-4">
          <div className="flex gap-3">
            <img
              src="/api/placeholder/48/48"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold hover:underline cursor-pointer">
                  John Doe
                </span>
                <svg
                  viewBox="0 0 22 22"
                  className="w-5 h-5 text-primary-500"
                  fill="currentColor"
                >
                  <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                </svg>
              </div>
              <span className="text-neutral-500">@johndoe</span>
            </div>
          </div>
          <button className="h-fit rounded-full p-2 hover:bg-neutral-900 hover:text-primary-500">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Tweet Content */}
        <div className="px-4 pb-3">
          <p className="text-xl whitespace-pre-wrap">
            Just shipped a new feature! 🚀
            <br />
            <br />
            Check out our latest update that makes the platform even better. Let
            me know what you think!
          </p>
          <time className="block mt-3 text-neutral-500">
            7:21 PM · Jan 28, 2025
          </time>
        </div>

        {/* Tweet Stats */}
        <div className="px-4 py-3 border-y border-neutral-800 flex gap-4">
          <span className="hover:underline cursor-pointer">
            <strong className="text-white">5,678</strong>{" "}
            <span className="text-neutral-500">Likes</span>
          </span>
          <span className="hover:underline cursor-pointer">
            <strong className="text-white">892</strong>{" "}
            <span className="text-neutral-500">Bookmarks</span>
          </span>
        </div>

        {/* Tweet Actions */}
        <div className="px-4 py-2 flex justify-around border-b border-neutral-800">
          <button className="rounded-full p-2 hover:bg-blue-500/10 hover:text-blue-500">
            <MessageCircle size={20} />
          </button>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`rounded-full p-2 ${
              isLiked
                ? "text-pink-500"
                : "hover:bg-pink-500/10 hover:text-pink-500"
            }`}
          >
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`rounded-full p-2 ${
              isBookmarked
                ? "text-blue-500"
                : "hover:bg-blue-500/10 hover:text-blue-500"
            }`}
          >
            <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
          <button className="rounded-full p-2 hover:bg-blue-500/10 hover:text-blue-500">
            <Upload size={20} />
          </button>
        </div>

        {/* Reply Input */}
        <div className="p-4 flex gap-4">
          <img
            src="/api/placeholder/48/48"
            alt="Your profile"
            className="w-12 h-12 rounded-full"
            loading="lazy"
          />
          <div className="flex-1">
            <textarea
              placeholder="Post your reply!"
              className="w-full bg-transparent resize-none outline-none text-lg placeholder:text-neutral-500"
              rows={1}
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-1">
                <button className="rounded-full p-2 hover:bg-blue-500/10 text-primary-500">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="currentColor"
                  >
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z" />
                  </svg>
                </button>
                <button className="rounded-full p-2 hover:bg-blue-500/10 text-primary-500">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="currentColor"
                  >
                    <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z" />
                  </svg>
                </button>
                <button className="rounded-full p-2 hover:bg-blue-500/10 text-primary-500">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="currentColor"
                  >
                    <path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z" />
                  </svg>
                </button>
                <button className="rounded-full p-2 hover:bg-blue-500/10 text-primary-500">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="currentColor"
                  >
                    <path d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z" />
                  </svg>
                </button>
              </div>
              <button className="px-4 py-1.5 bg-primary-500 text-white font-bold rounded-full opacity-50">
                Reply
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Show replies here */}
    </div>
  );
};

export default TweetPage;
