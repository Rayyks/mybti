import { getSafeMediaUrl } from "@/lib/getSafeMediaUrl";
import { formatTimeAgo } from "@/lib/FormatDate";
import { Link } from "react-router";

export const PostPreview = ({ post }) => (
  <Link to={`/p/${post?._id}`}>
    <div className="mb-4 bg-neutral-900 hover:bg-neutral-800 transition-colors ease-linear duration-500 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            {post?.image && (
              <img
                src={getSafeMediaUrl(post?.image)}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white mb-1">{post?.content}</h4>
            <p className="text-sm text-gray-300 line-clamp-2">
              Post From : {post?.author?.username}
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
              <span>{formatTimeAgo(post?.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default PostPreview;
