import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/common";
import useProfile from "@/hooks/useProfile";
import usePost from "@/hooks/usePost";
import useUser from "@/hooks/useUser";
import { AreYouSureModal } from "@/components/ui";

export const MorePostAction = ({
  openReportMenu,
  closeMoreActionMenu,
  post,
}) => {
  const { myProfile } = useProfile();
  const { isDeletingPost, handleDeletePost } = usePost();
  const postAuthorId = post?.author?.id || post?.author?._id;
  const { isFollowing, handleFollowToggle } = useUser(postAuthorId);
  const [areYouSure, setAreYouSure] = useState(false);

  const isMyPost = myProfile?.user?.username === post?.author?.username;

  const handleReportClick = () => {
    openReportMenu();
    closeMoreActionMenu();
  };

  const handleDeleteClick = () => {
    handleDeletePost(post._id);
    closeMoreActionMenu();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={closeMoreActionMenu}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-neutral-800 rounded-xl w-[90%] max-w-sm overflow-hidden">
          {/* Modal header */}
          <div className="text-center text-white py-4 border-b-2 border-neutral-600">
            <h3 className="font-medium">Post options</h3>
          </div>

          {/* Modal content */}
          <div className="flex flex-col">
            <Link
              to={`/p/${post._id}`}
              className="flex w-full items-center justify-center px-4 py-3 text-sm text-white hover:bg-neutral-950 active:bg-neutral-900 transition-colors border-b border-neutral-600"
            >
              View Post
            </Link>

            {isMyPost && (
              <Link
                to={`/p/${post._id}/edit`}
                className="flex w-full items-center justify-center px-4 py-3 text-sm text-white hover:bg-neutral-950 active:bg-neutral-900 transition-colors border-b border-neutral-600"
              >
                Edit Post
              </Link>
            )}

            {!isMyPost && (
              <Button
                onClick={() => handleFollowToggle()}
                className="w-full px-4 py-3 text-sm text-white hover:bg-neutral-950 active:bg-neutral-900 transition-colors border-b border-neutral-600"
              >
                {isFollowing ? "Unfollow User" : "Follow User"}
              </Button>
            )}

            <Button
              onClick={handleReportClick}
              className="w-full px-4 py-3 text-sm text-yellow-600 font-semibold hover:bg-neutral-950 active:bg-neutral-900 transition-colors border-b border-neutral-600"
            >
              Report
            </Button>
            {isMyPost && (
              <Button
                onClick={() => setAreYouSure(true)}
                disabled={isDeletingPost}
                className="w-full px-4 py-3 text-sm text-red-600 font-semibold hover:bg-neutral-950 active:bg-neutral-900 transition-colors"
              >
                Delete
              </Button>
            )}
            <AreYouSureModal
              isOpen={areYouSure}
              close={() => setAreYouSure(false)}
              title="Are you sure you want to delete this post?"
              action={handleDeleteClick}
            />
          </div>

          {/* Cancel button */}
          <div className="border-t border-gray-200">
            <Button
              onClick={closeMoreActionMenu}
              className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-neutral-950 active:bg-neutral-900 transition-colors"
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
