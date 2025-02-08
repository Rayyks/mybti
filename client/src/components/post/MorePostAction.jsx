import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/common";
import useProfile from "@/hooks/useProfile";
import usePost from "@/hooks/usePost";
import useUser from "@/hooks/useUser";
import { AreYouSureModal } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { CheckLocation } from "@/lib/checkLocation";
import usePostActions from "@/hooks/usePostActions";
import {
  Eye,
  Edit3,
  UserPlus,
  UserMinus,
  Flag,
  Trash2,
  X,
  ExternalLink,
} from "lucide-react";

const ModalButton = ({ onClick, icon: Icon, label, variant = "default" }) => {
  const variants = {
    default: "text-gray-200 hover:text-white",
    warning: "text-yellow-500 hover:text-yellow-400",
    danger: "text-red-500 hover:text-red-400",
  };

  return (
    <Button
      onClick={onClick}
      className={`w-full px-6 py-4 flex items-center space-x-3 hover:bg-white/5 transition-all duration-200 ${variants[variant]}`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </Button>
  );
};

const MorePostActionModal = ({
  post,
  isMyPost,
  isFollowing,
  handleFollowToggle,
  handleReportClick,
  handleDeleteClick,
  closeMoreActionMenu,
  isDeletingPost,
  areYouSure,
  setAreYouSure,
}) => (
  <motion.div
    key="modal"
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.95, opacity: 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="fixed inset-0 flex items-center justify-center z-50 px-4"
  >
    <div className="bg-neutral-900 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-white/10">
      {/* Modal Header */}
      <div className="relative border-b border-white/10">
        <h3 className="text-center text-white font-medium py-4">
          Post Options
        </h3>
        <Button
          onClick={closeMoreActionMenu}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Modal Content */}
      <div className="divide-y divide-white/10">
        {CheckLocation(location.pathname) && (
          <Link to={`/p/${post._id}`} className="block">
            <ModalButton icon={Eye} label="View Post" />
          </Link>
        )}

        {isMyPost && (
          <Link to={`/p/${post._id}/edit`} className="block">
            <ModalButton icon={Edit3} label="Edit Post" />
          </Link>
        )}

        {!isMyPost && (
          <ModalButton
            onClick={handleFollowToggle}
            icon={isFollowing ? UserMinus : UserPlus}
            label={isFollowing ? "Unfollow User" : "Follow User"}
          />
        )}

        <ModalButton
          onClick={handleReportClick}
          icon={Flag}
          label="Report Post"
          variant="warning"
        />

        {isMyPost && (
          <ModalButton
            onClick={() => setAreYouSure(true)}
            icon={Trash2}
            label={isDeletingPost ? "Deleting..." : "Delete Post"}
            variant="danger"
            disabled={isDeletingPost}
          />
        )}
      </div>

      <AreYouSureModal
        isOpen={areYouSure}
        close={() => setAreYouSure(false)}
        title="Are you sure you want to delete this post?"
        action={handleDeleteClick}
      />
    </div>
  </motion.div>
);

export const MorePostAction = ({
  openReportMenu,
  closeMoreActionMenu,
  post,
}) => {
  const { myProfile } = useProfile();
  const { isDeletingPost, handleDeletePost } = usePost();
  const { isSaved, handleSavePost } = usePostActions(post._id);
  const postAuthorId = post?.author?.id || post?.author?._id;
  const { isFollowing, handleFollowToggle } = useUser(postAuthorId);
  const [areYouSure, setAreYouSure] = useState(false);
  const location = useLocation();

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
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={closeMoreActionMenu}
      />

      <MorePostActionModal
        post={post}
        isMyPost={isMyPost}
        isSaved={isSaved}
        handleSavePost={handleSavePost}
        isFollowing={isFollowing}
        handleFollowToggle={handleFollowToggle}
        handleReportClick={handleReportClick}
        handleDeleteClick={handleDeleteClick}
        closeMoreActionMenu={closeMoreActionMenu}
        isDeletingPost={isDeletingPost}
        areYouSure={areYouSure}
        setAreYouSure={setAreYouSure}
      />
    </AnimatePresence>
  );
};

export default MorePostAction;
