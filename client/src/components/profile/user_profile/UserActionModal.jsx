import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common";
import useUser from "@/hooks/useUser";
import {
  X,
  UserMinus,
  Flag,
  MessageCircle,
  UserPlus,
  ShieldAlert,
} from "lucide-react";

export const UserActionModal = ({
  closeUserActionModal,
  openReportMenu,
  isOpen,
  profileId,
  isFollowing,
  handleFollowToggle,
}) => {
  const handleReportUser = () => {
    openReportMenu();
    closeUserActionModal();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-full max-w-md p-6 mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl"
        >
          {/* Close Button */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              onClick={closeUserActionModal}
              className="p-2 bg-neutral-100 dark:bg-zinc-800 rounded-full hover:bg-neutral-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <X className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            {/* Follow/Unfollow */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleFollowToggle(profileId)}
                className="w-full px-4 py-3 text-sm font-semibold text-white bg-black dark:bg-white dark:text-black 
                           rounded-xl flex items-center justify-center gap-2 
                           hover:bg-neutral-800 dark:hover:bg-neutral-100 
                           transition-colors"
              >
                {isFollowing ? <UserMinus size={18} /> : <UserPlus size={18} />}
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </motion.div>

            {/* Message */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="w-full px-4 py-3 text-sm font-semibold text-white bg-black dark:bg-white dark:text-black 
                           rounded-xl flex items-center justify-center gap-2 
                           hover:bg-neutral-800 dark:hover:bg-neutral-100 
                           transition-colors"
              >
                <MessageCircle size={18} />
                Message
              </Button>
            </motion.div>

            {/* Report User */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleReportUser}
                className="w-full px-4 py-3 text-sm font-semibold text-white bg-red-600 
                           rounded-xl flex items-center justify-center gap-2 
                           hover:bg-red-500 
                           transition-colors"
              >
                <Flag size={18} />
                Report User
              </Button>
            </motion.div>

            {/* Block User */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="w-full px-4 py-3 text-sm font-semibold text-white bg-red-600 
                           rounded-xl flex items-center justify-center gap-2 
                           hover:bg-red-500 
                           transition-colors"
              >
                <ShieldAlert size={18} />
                Block User
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserActionModal;
