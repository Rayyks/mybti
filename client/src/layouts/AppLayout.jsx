import React from "react";
import { Sidebar, Footer } from "@/components/common";
import { cn } from "@/lib/utils";

const AppLayout = () => {
  return (
    <main>
      <div
        className={cn(
          "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 flex-1 w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
          "h-screen"
        )}
      >
        {/* SIDEBAR AND CONTENT IS DOWN HERE OKAY */}
        <Sidebar />
      </div>
    </main>
  );
};

export default AppLayout;
