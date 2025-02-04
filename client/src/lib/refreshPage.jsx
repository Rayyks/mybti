import { useLocation } from "react-router";

export const useRefreshPage = () => {
  const location = useLocation();

  const refreshPage = (targetPath) => {
    if (location.pathname === targetPath) {
      window.location.reload();
    }
  };

  return { refreshPage };
};
