import React from "react";
import { Button } from "@/components/common";

export const AreYouSureModal = ({
  isOpen,
  close,
  title,
  description,
  action,
  actionButtonText = "Yes",
  cancelButtonText = "No",
  actionVariant = "danger",
}) => {
  const handleAction = () => {
    action();
    close();
  };

  if (!isOpen) return null;

  // Variant styles
  const variantStyles = {
    danger: "bg-red-600 hover:bg-red-500 active:bg-red-700",
    default: "bg-blue-600 hover:bg-blue-500 active:bg-blue-700",
    neutral: "bg-neutral-600 hover:bg-neutral-500 active:bg-neutral-700",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
        role="dialog"
        aria-modal="true"
      >
        <h2 className="text-lg font-semibold mb-4 text-neutral-800">{title}</h2>

        {description && (
          <p className="text-sm text-neutral-600 mb-4">{description}</p>
        )}

        <div className="flex justify-end gap-3">
          <Button
            onClick={close}
            className="px-4 py-2 text-sm text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
          >
            {cancelButtonText}
          </Button>

          <Button
            onClick={handleAction}
            className={`
              px-4 py-2 text-sm text-white 
              ${variantStyles[actionVariant]} 
              transition-colors
            `}
          >
            {actionButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
