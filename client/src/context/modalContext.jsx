import { createContext, useContext, useState, useMemo } from "react";

export const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [openMoreAction, setOpenMoreAction] = useState(null);
  const [showMenuComment, setShowMenuComment] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);

  const toggleState = (setter, value) => () => setter(value);

  const value = useMemo(
    () => ({
      openMoreAction,
      openReportModal,
      showMenuComment,
      setOpenMoreAction,
      openMenuComment: toggleState(setShowMenuComment, true),
      closeMenuComment: toggleState(setShowMenuComment, false),
      openReportMenu: toggleState(setOpenReportModal, true),
      closeReportMenu: toggleState(setOpenReportModal, false),
      openMoreActionMenu: setOpenMoreAction,
      closeMoreActionMenu: toggleState(setOpenMoreAction, null),
    }),
    [openMoreAction, openReportModal, showMenuComment]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModal must be used within a ModalContextProvider");
  return context;
};

export default ModalContextProvider;
