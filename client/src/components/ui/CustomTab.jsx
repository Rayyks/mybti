import { Button } from "@/components/common";

export const CustomTab = ({ active, onClick, children }) => (
  <Button
    onClick={onClick}
    className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors duration-200
        ${
          active
            ? "bg-neutral-950 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
  >
    {children}
  </Button>
);

export default CustomTab;
