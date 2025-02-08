import { Label, Input } from "@/components/ui";
import { Button } from "@/components/common";

export const DeletionForm = ({
  deletionReason,
  setDeletionReason,
  customReason,
  setCustomReason,
  isImmediate,
  handleImmediateChange,
  handleDeleteClick,
  register,
  errors,
  setShowBeforeDeleteModal,
}) => (
  <div className="space-y-6">
    <h3 className="text-xl font-medium text-black">Delete Account</h3>
    <div className="space-y-3">
      <Label className="block text-sm font-medium text-neutral-700">
        Reason for deletion
      </Label>
      <select
        {...register("deletionReason", { required: true })}
        value={deletionReason}
        onChange={(e) => setDeletionReason(e.target.value)}
        className="block w-full px-4 py-2 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
      >
        <option value="">Select a reason</option>
        <option value="privacy">Privacy concerns</option>
        <option value="not_useful">Not useful</option>
        <option value="not_safe">Not safe</option>
        <option value="harassment">Harassment</option>
        <option value="other">Other</option>
      </select>
      {deletionReason === "other" && (
        <Input
          type="text"
          {...register("customReason", { required: true })}
          value={customReason}
          onChange={(e) => setCustomReason(e.target.value)}
          className="block w-full px-4 py-2 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
          placeholder="Please specify"
        />
      )}
      {errors.deletionReason && (
        <p className="text-red-500 text-sm mt-2">
          Reason for deletion is required
        </p>
      )}
    </div>
    <div className="flex items-center">
      <Input
        type="checkbox"
        {...register("isImmediate")}
        checked={isImmediate}
        onChange={handleImmediateChange}
        className="h-4 w-4 text-neutral-600 border-neutral-300 rounded focus:ring-neutral-500"
      />
      <Label className="ml-2 block text-sm text-neutral-700">
        Delete immediately{" "}
        <span
          className="uppercase mx-2 font-bold text-red-600 hover:underline cursor-pointer"
          onClick={() => setShowBeforeDeleteModal(true)}
        >
          [please read this before selecting this!]
        </span>
      </Label>
    </div>
    <Button
      onClick={handleDeleteClick}
      className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
    >
      Delete Account
    </Button>
  </div>
);
