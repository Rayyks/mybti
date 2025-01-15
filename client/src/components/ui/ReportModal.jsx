import useReport from "@/hooks/useReport";
import { REPORT_OPTIONS } from "@/assets/data/report_option";

const ReportModal = ({ onClose, type = "user", targetId }) => {
  const { reason, setReason, customReason, setCustomReason } = useReport();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const finalReason = reason === "other" ? customReason : reason;
    console.log("Submitting report:", {
      type,
      targetId,
      reason: finalReason,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 relative">
        {/* Close button */}
        <Button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 cursor-pointer shrink-0"
            viewBox="0 0 320.591 320.591"
          >
            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
          </svg>
        </Button>

        {/* Header */}
        <div className="my-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 fill-red-500 inline"
            viewBox="0 0 286.054 286.054"
          >
            <path d="M143.027 0C64.04 0 0 64.04 0 143.027c0 78.996 64.04 143.027 143.027 143.027 78.996 0 143.027-64.022 143.027-143.027C286.054 64.04 222.022 0 143.027 0zm0 259.236c-64.183 0-116.209-52.026-116.209-116.209S78.844 26.818 143.027 26.818s116.209 52.026 116.209 116.209-52.026 116.209-116.209 116.209zm.009-196.51c-10.244 0-17.995 5.346-17.995 13.981v79.201c0 8.644 7.75 13.972 17.995 13.972 9.994 0 17.995-5.551 17.995-13.972V76.707c-.001-8.43-8.001-13.981-17.995-13.981zm0 124.997c-9.842 0-17.852 8.01-17.852 17.86 0 9.833 8.01 17.843 17.852 17.843s17.843-8.01 17.843-17.843c-.001-9.851-8.001-17.86-17.843-17.86z" />
          </svg>

          <h4 className="text-lg text-gray-800 font-semibold mt-6">
            Report {type.charAt(0).toUpperCase() + type.slice(1)}
          </h4>
          <p className="text-sm text-gray-500 mt-2">
            Please select a reason for reporting
          </p>
        </div>

        {/* Report Form */}
        <div className="space-y-4 mb-6">
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-0 transition-colors"
          >
            <option value="">Select a reason</option>
            {REPORT_OPTIONS[type].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {reason === "other" && (
            <textarea
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Please provide details..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-0 transition-colors min-h-[100px]"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex max-sm:flex-col gap-4">
          <Button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg w-full text-gray-800 text-sm border-none outline-none bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !reason || (reason === "other" && !customReason) || isSubmitting
            }
            className="px-5 py-2.5 rounded-lg w-full text-white text-sm border-none outline-none bg-red-500 hover:bg-red-600 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
