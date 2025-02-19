import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FollowerList } from "./FollowerList";
import { FollowingList } from "./FollowingList";
import useProfile from "@/hooks/useProfile";

export const SeeFollowersModal = ({
  closeFollowerModal,
  myFollowers,
  myFollowing,
  isLoading,
  safeUrl,
}) => {
  const [activeTab, setActiveTab] = useState("followers");
  const modalRef = useRef(null);
  const { refetchProfile } = useProfile();

  const onClose = () => {
    closeFollowerModal();
    refetchProfile();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeFollowerModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeFollowerModal]);

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border-b border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Connections
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={closeFollowerModal}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>

            {/* Tabs */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveTab("followers")}
                className={`flex-1 py-2 px-4 text-sm font-medium ${
                  activeTab === "followers"
                    ? "bg-gray-100 text-gray-900"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Followers ({myFollowers?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab("following")}
                className={`flex-1 py-2 px-4 text-sm font-medium ${
                  activeTab === "following"
                    ? "bg-gray-100 text-gray-900"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Following ({myFollowing?.length || 0})
              </button>
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "followers" ? (
              <FollowerList
                key="followers"
                users={myFollowers}
                isLoading={isLoading}
                safeUrl={safeUrl}
                emptyMessage="No followers yet"
              />
            ) : (
              <FollowingList
                key="following"
                users={myFollowing}
                isLoading={isLoading}
                safeUrl={safeUrl}
                emptyMessage="Not following anyone yet"
              />
            )}
          </AnimatePresence>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border-t border-gray-200"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
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
