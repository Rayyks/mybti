import { getSafeMediaUrl } from "@/lib/getSafeMediaUrl";
import { formatTimeAgo } from "@/lib/FormatDate";
import { Link } from "react-router";

export const PostPreview = ({ post }) => (
  <Link to={`/p/${post?._id}`}>
    <div className="mb-4 bg-neutral-900 hover:bg-neutral-800 transition-colors ease-linear duration-500 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex flex-col gap-4">
          {post?.image && (
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <img
                src={getSafeMediaUrl(post?.image)}
                alt={`Post by ${post?.author?.username}`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h4 className="font-medium text-white break-words">
              {post?.content}
            </h4>
            <div className="flex items-center justify-between text-sm text-gray-300">
              <span className="font-medium">{post?.author?.username}</span>
              <span>{formatTimeAgo(post?.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default PostPreview;
