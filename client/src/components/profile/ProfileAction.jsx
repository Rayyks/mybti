import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/common";
import useProfile from "@/hooks/useProfile";
import { LogoutModal } from ".";
import { Settings, Edit, LogOut } from "lucide-react";

export const ProfileAction = () => {
  const { showLogoutModal, setShowLogoutModal } = useProfile();

  const actionButtons = [
    {
      to: "/profile/edit",
      icon: <Edit size={18} />,
      label: "Edit Profile",
      className: "bg-neutral-950 text-white hover:bg-neutral-800",
    },
    {
      to: "/profile/settings",
      icon: <Settings size={18} />,
      label: "Settings",
      className: "bg-neutral-900 text-white hover:bg-neutral-800",
    },
  ];

  return (
    <div className="mt-8 border-t border-neutral-800 pt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Main Action Buttons */}
        <div className="sm:col-span-2 lg:col-span-3 grid sm:grid-cols-2 gap-4">
          {actionButtons.map((button) => (
            <Link
              key={button.label}
              to={button.to}
              className={`
                group flex items-center justify-center gap-2 
                py-3 px-6 rounded-lg font-medium
                transition-all duration-300 ease-in-out
                transform hover:-translate-y-0.5 hover:shadow-lg
                ${button.className}
              `}
            >
              <span className="transition-transform duration-300 group-hover:scale-110">
                {button.icon}
              </span>
              <span>{button.label}</span>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Button
            onClick={() => setShowLogoutModal(true)}
            className={`
              w-full group flex items-center justify-center gap-2
              py-3 px-6 rounded-lg font-medium
              bg-red-600 text-white
              transition-all duration-300 ease-in-out
              transform hover:-translate-y-0.5 hover:shadow-lg
              hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              focus:ring-offset-neutral-900
            `}
          >
            <LogOut
              size={18}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            Logout
          </Button>
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
      />
    </div>
  );
};

export default ProfileAction;
