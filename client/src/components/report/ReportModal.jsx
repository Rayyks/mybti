import { Label } from "@/components/ui";
import { Button } from "@/components/common";
import useReport from "@/hooks/useReport";

export const ReportModal = ({
  reportType,
  id,
  openReportModal,
  setOpenReportModal,
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
    "Other",
  ];

  const onSubmit = async (data) => {
    try {
      const reasonToUse =
        data.reason === "Other" ? data.customReason : data.reason;
      await handleReport(reportType, id, reasonToUse);
      setReason("");
      setCustomReason("");
      setOpenReportModal(false);
    } catch (error) {
      console.error("Error Reporting:", error);
    }
  };

  return (
    <>
      {openReportModal && (
        <div className="z-[999] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Report {reportType}</h2>
              <Button
                onClick={() => setOpenReportModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for reporting
                </Label>
                <select
                  {...register("reason", {
                    required: "Please select a reason",
                  })}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a reason</option>
                  {reportReasons.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.reason && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.reason.message}
                  </p>
                )}
              </div>

              {reason === "Other" && (
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Please provide more details about your report..."
                  />
                  {errors.customReason && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.customReason.message}
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  onClick={() => setOpenReportModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Submit Report
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportModal;
