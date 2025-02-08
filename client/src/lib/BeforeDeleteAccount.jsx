import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common";

const BeforeDeleteAccount = ({ isOpen, onClose }) => {
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
          <div className="absolute top-4 right-4 z-10">
            <Button
              onClick={onClose}
              className="p-2 bg-neutral-100 dark:bg-zinc-800 rounded-full hover:bg-neutral-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-5 h-5 text-neutral-600 dark:text-neutral-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </Button>
          </div>
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            Immediate Account Deletion
          </h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
            If you select the "Delete immediately" option, your account will be
            permanently deleted right away. This action cannot be undone, and
            you will lose all your data, including posts, comments, and
            followers.
          </p>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-6">
            Please make sure you have backed up any important information before
            proceeding.
          </p>
          <Button
            onClick={onClose}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            I Understand
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BeforeDeleteAccount;
