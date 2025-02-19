import { motion } from "framer-motion";
import { Link } from "react-router";
import { UserPlus, Loader2 } from "lucide-react";
import useUser from "@/hooks/useUser";

export const FollowerList = ({ users, isLoading, safeUrl, emptyMessage }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto"
    >
      {users?.length === 0 ? (
        <div className="p-8 text-center text-gray-500">{emptyMessage}</div>
      ) : (
        users?.map((user) => (
          <FollowerItem
            key={user._id}
            user={user}
            isLoading={isLoading}
            safeUrl={safeUrl}
          />
        ))
      )}
    </motion.div>
  );
};

const FollowerItem = ({ user, isLoading, safeUrl }) => {
  const { isFollowing, handleRemoveFollower } = useUser(user._id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.15,
        delay: 0.05,
      }}
      className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <Link
        to={`/profile/${user?.username}`}
        className="flex items-center space-x-3"
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          src={safeUrl(user?.profilePicture)}
          alt={user?.username}
          className="w-10 h-10 rounded-full object-cover bg-gray-100"
          loading="lazy"
        />
        <div>
          <h3 className="font-medium text-gray-900">@{user?.username}</h3>
        </div>
      </Link>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={() => handleRemoveFollower(user?._id)}
        disabled={isLoading}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          isFollowing
            ? "bg-gray-900 text-white hover:bg-gray-800"
            : "border border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isFollowing ? (
          <div className="flex items-center space-x-1">
            <span>Remove</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <UserPlus className="w-4 h-4" />
            <span>Follow</span>
          </div>
        )}
      </motion.button>
    </motion.div>
  );
};
