import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui";
import { Button } from "@/components/common";
import useReport from "@/hooks/useReport";
import { CircleAlert, X } from "lucide-react";

export const ReportModal = ({
  reportType,
  id,
  showReportMenu,
  openReportModal,
  closeReportMenu,
}) => {
  const {
    reason,
    setReason,
    customReason,
    setCustomReason,
    register,
    handleSubmit,
    errors,
    handleReport,
  } = useReport();

  const reportReasons = [
    "Spam",
    "Inappropriate Content",
    "Harassment",
    "False Information",
    "Violence",
    "Hate Speech",
    "Scam or Fraud",
    "Intellectual Property Violation",
    "Bullying",
    "Self-harm",
    "Child Abuse",
    "Sexual Content",
    "Terror Content",
    "Other",
  ];

  const onSubmit = async (data) => {
    try {
      const reasonToUse =
        data.reason === "Other" ? data.customReason : data.reason;
      await handleReport(reportType, id, reasonToUse);
      setReason("");
      setCustomReason("");
      closeReportMenu();
    } catch (error) {
      console.error("Error Reporting:", error);
    }
  };

  if (!showReportMenu && !openReportModal) return null;

  return (
    <AnimatePresence>
      {(showReportMenu || openReportModal) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
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
            className="bg-white dark:bg-zinc-900 rounded-lg w-full max-w-md my-8 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 rounded-t-lg border-b border-gray-200 dark:border-zinc-700 p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <CircleAlert
                    size={24}
                    className="text-red-500 flex-shrink-0"
                  />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                    Report {reportType}
                  </h2>
                </div>
                <Button
                  onClick={closeReportMenu}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors flex-shrink-0"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Reason Select */}
                <div className="space-y-2">
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reason for reporting
                  </Label>
                  <div className="relative">
                    <select
                      {...register("reason", {
                        required: "Please select a reason",
                      })}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 
                               bg-white dark:bg-zinc-800 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent
                               transition-colors appearance-none"
                    >
                      <option value="">Select a reason</option>
                      {reportReasons.map((r) => (
                        <option key={r} value={r} className="py-2">
                          {r}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.reason && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.reason.message}
                    </p>
                  )}
                </div>

                {/* Custom Reason Textarea */}
                {reason === "Other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Please specify
                    </Label>
                    <textarea
                      {...register("customReason", {
                        required:
                          reason === "Other" ? "Please provide details" : false,
                        maxLength: {
                          value: 500,
                          message: "Maximum length is 500 characters",
                        },
                      })}
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 
                               bg-white dark:bg-zinc-800 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent
                               transition-colors resize-none h-24"
                      placeholder="Please provide more details about your report..."
                    />
                    {errors.customReason && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.customReason.message}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Submit Buttons */}
                <div className="sticky bottom-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 p-4 rounded-b-lg">
                  <div className="flex flex-col sm:flex-row justify-end gap-3">
                    <Button
                      type="button"
                      onClick={closeReportMenu}
                      className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 
                           bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700
                           transition-colors w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-4 py-2 rounded-lg text-white dark:text-black
                           bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100
                           transition-colors w-full sm:w-auto"
                    >
                      Submit Report
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReportModal;
