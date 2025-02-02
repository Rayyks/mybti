import {
  MoreHorizontal,
  MessageCircle,
  Heart,
  Upload,
  Bookmark,
} from "lucide-react";
import { CommentInput } from "@/components/ui";
import { Button } from "@/components/common";
import { Link } from "react-router";

export const MainTweet = ({
  getSafeMediaUrl,
  singlePost,
  isLiked,
  isBookmarked,
  setIsBookmarked,
  selectedParentCommentId,
  setSelectedParentCommentId,
}) => {
  return (
    <article className="border-b border-neutral-800">
      {/* Tweet Header */}
      <div className="flex justify-between p-4">
        <div className="flex gap-3">
          <Link
            to={`/profile/${singlePost?.author?.username}`}
            className="flex"
          >
            <img
              src={getSafeMediaUrl(singlePost?.author?.profilePicture)}
              alt="Profile"
              className="w-12 h-12 rounded-full"
              loading="lazy"
            />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold hover:underline cursor-pointer">
                {singlePost?.author?.username}
              </span>
              <svg
                viewBox="0 0 22 22"
                className="w-5 h-5 text-primary-500"
                fill="currentColor"
              >
                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
              </svg>
            </div>
            <span className="text-neutral-400">
              · {singlePost?.author?.mbti}
            </span>
          </div>
        </div>
        <Button className="h-fit rounded-full p-2 hover:bg-neutral-900 hover:text-primary-500">
          <MoreHorizontal size={20} />
        </Button>
      </div>

      {/* Tweet Content */}
      <div className="px-4 pb-3">
        <p className="text-xl whitespace-pre-wrap">{singlePost?.content}</p>
        {singlePost?.image &&
          (singlePost.image.match(/\.(mp4|webm|ogg)$/i) ? (
            <video
              src={getSafeMediaUrl(singlePost?.image)}
              controls
              className="mt-3 rounded-2xl border border-neutral-800"
            />
          ) : (
            <img
              src={getSafeMediaUrl(singlePost?.image)}
              alt="Tweet image"
              className="mt-3 rounded-2xl border border-neutral-800"
            />
          ))}
        <time className="block mt-3 text-neutral-500">
          {singlePost?.createdAt}
        </time>
      </div>

      {/* Tweet Stats */}
      <div className="px-4 py-3 border-y border-neutral-800 flex gap-4">
        <span className="hover:underline cursor-pointer">
          <strong className="text-white">{singlePost?.likes.length}</strong>{" "}
          <span className="text-neutral-500">Likes</span>
        </span>
        <span className="hover:underline cursor-pointer">
          <strong className="text-white">{singlePost?.comments.length}</strong>{" "}
          <span className="text-neutral-500">Bookmarks</span>
        </span>
      </div>

      {/* Tweet Actions */}
      <div className="px-4 py-2 flex justify-around border-b border-neutral-800">
        <Button className="rounded-full p-2 hover:bg-blue-500/10 hover:text-blue-500">
          <MessageCircle size={20} />
        </Button>
        <Button
          onClick={() => setIsLiked(!isLiked)}
          className={`rounded-full p-2 ${
            isLiked
              ? "text-pink-500"
              : "hover:bg-pink-500/10 hover:text-pink-500"
          }`}
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
        </Button>
        <Button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`rounded-full p-2 ${
            isBookmarked
              ? "text-blue-500"
              : "hover:bg-blue-500/10 hover:text-blue-500"
          }`}
        >
          <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
        </Button>
        <Button className="rounded-full p-2 hover:bg-blue-500/10 hover:text-blue-500">
          <Upload size={20} />
        </Button>
      </div>

      {/* Comment Input */}
      <CommentInput
        getSafeMediaUrl={getSafeMediaUrl}
        singlePost={singlePost}
        selectedParentCommentId={selectedParentCommentId}
        setSelectedParentCommentId={setSelectedParentCommentId}
      />
    </article>
  );
};

export default MainTweet;
