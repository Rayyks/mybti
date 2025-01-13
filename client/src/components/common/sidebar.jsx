import React, { useState, Fragment } from "react";
import { motion } from "framer-motion";
import { Link, Outlet } from "react-router";

// UI
import { SidebarUI, SidebarBody, SidebarLink } from "@/components/ui/sidebarUI";
import { StoryBalls } from "@/components/ui";

// DATA
import { links } from "@/assets/data/links";
import useAuth from "@/hooks/useAuth";
import { LogIn } from "lucide-react";
import useProfile from "@/hooks/useProfile";
import { getSafeImageUrl } from "@/lib/getSafeImageUrl";
import { useEffect } from "react";

export function Sidebar() {
  const { isAuthenticated, loading } = useAuth();
  const { myProfile } = useProfile();
  const [open, setOpen] = useState(false);

  useEffect(() => {}, [isAuthenticated]);

  return (
    <Fragment>
      <SidebarUI open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            {!loading && isAuthenticated ? (
              <SidebarLink
                link={{
                  label: "Profile",
                  href: "/profile",
                  icon: (
                    <img
                      src={getSafeImageUrl(myProfile?.data?.profilePicture)}
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                      loading="lazy"
                    />
                  ),
                }}
              />
            ) : (
              <Link to="/login" className="flex ">
                <LogIn
                  size={38}
                  className="text-white bg-black hover:bg-neutral-950 w-full rounded-lg py-2"
                />
              </Link>
            )}
          </div>
        </SidebarBody>
      </SidebarUI>
      <Dashboard />
    </Fragment>
  );
}
export const Logo = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        MyBTI
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1 ">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 lg:items-center w-full h-screen overflow-auto ">
        {/* STORY */}
        <div className="flex gap-2">
          <StoryBalls />
        </div>
        {/* CONTENT */}
        <div className="flex gap-2 flex-1 sm:w-full lg:w-[50%] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
