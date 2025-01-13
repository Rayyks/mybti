import React from "react";
import { Button } from "@/components/common";
import useAuth from "@/hooks/useAuth";

export const LogoutModal = ({ showLogoutModal, setShowLogoutModal }) => {
  const { handleLogout } = useAuth();
  return (
    <div
      className={
        showLogoutModal
          ? "fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]"
          : "hidden"
      }
    >
      <div className="w-full max-w-lg bg-white border-red-600 border-[1px] shadow-lg rounded-xl p-8 relative">
        <div>
          <h4 className="text-xl text-gray-800 font-semibold">
            Sure you want to logout?
          </h4>
          <p className="text-sm text-gray-600 mt-4">
            You will be redirected to the login page after logging out.
          </p>
        </div>

        <div className="flex gap-4 max-sm:flex-col mt-8">
          <Button
            type="button"
            onClick={() => setShowLogoutModal(false)}
            className="px-5 py-2.5 rounded-lg text-gray-800 text-sm tracking-wide border-none outline-none bg-gray-200 hover:bg-gray-300"
          >
            No, cancel
          </Button>
          <Button
            type="button"
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wide border-none outline-none bg-[#333] hover:bg-[#222]"
          >
            Yes, confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
