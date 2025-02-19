import React, { useRef, useEffect } from "react";
import { X, UserPlus, Check, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

export const SeeFollowersModal = ({
  followers = [
    {
      id: 1,
      username: "johndoe",
      name: "John Doe",
      avatar: "/api/placeholder/40/40",
      isFollowing: false,
      isLoading: false,
    },
    {
      id: 2,
      username: "janedoe",
      name: "Jane Doe",
      avatar: "/api/placeholder/40/40",
      isFollowing: true,
      isLoading: false,
    },
  ],
  closeFollowerModal,
}) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeFollowerModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeFollowerModal]);

  const handleFollow = (userId) => {
    console.log("Following user:", userId);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm p-4 flex items-center justify-center overflow-y-auto z-[1000]"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-4 border-b border-gray-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Followers</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeFollowerModal}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          </motion.div>

          {/* Followers List */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto"
          >
            {followers.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center text-gray-500"
              >
                No followers yet
              </motion.div>
            ) : (
              followers.map((follower, index) => (
                <motion.div
                  key={follower.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      src={follower.avatar}
                      alt={follower.name}
                      className="w-10 h-10 rounded-full object-cover bg-gray-100"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {follower.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        @{follower.username}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFollow(follower.id)}
                    disabled={follower.isLoading}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      follower.isFollowing
                        ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {follower.isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : follower.isFollowing ? (
                      <div className="flex items-center space-x-1">
                        <Check className="w-4 h-4" />
                        <span>Following</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <UserPlus className="w-4 h-4" />
                        <span>Follow</span>
                      </div>
                    )}
                  </motion.button>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4 border-t border-gray-200"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={closeFollowerModal}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SeeFollowersModal;
