import { createContext, useContext, useState, useMemo } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [openMoreAction, setOpenMoreAction] = useState(false);
  const [openMoreAction_Postlist, setOpenMoreAction_Postlist] = useState(null);
  const [showMenuComment, setShowMenuComment] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [showFollowerModal, setShowFollowerModal] = useState(false);

  const value = useMemo(
    () => ({
      openMoreAction,
      openReportModal,
      showMenuComment,
      showFollowerModal,
      openMoreAction_Postlist,
      openMoreActionMenu: () => setOpenMoreAction(true),
      closeMoreActionMenu: () => {
        if (openMoreAction_Postlist !== null) setOpenMoreAction_Postlist(null);
        else setOpenMoreAction(false);
      },
      openMoreActionMenu_Postlist: (index) => setOpenMoreAction_Postlist(index),
      openMenuComment: () => setShowMenuComment(true),
      closeMenuComment: () => setShowMenuComment(false),
      openReportMenu: () => setOpenReportModal(true),
      closeReportMenu: () => setOpenReportModal(false),
      openFollowerModal: () => setShowFollowerModal(true),
      closeFollowerModal: () => setShowFollowerModal(false),
    }),
    [
      openMoreAction,
      openReportModal,
      showMenuComment,
      showFollowerModal,
      openMoreAction_Postlist,
    ]
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
