import { Fragment, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common";
import useProfile from "@/hooks/useProfile";
import usePostActions from "@/hooks/usePostActions";
import { ReportModal } from "@/components/report";

export const MenuComment = ({
  author,
  commentId,
  showReplyMenu,
  showMenuComment,
  showReportMenu,
  closeMenuComment,
  openReportMenu,
  closeReportMenu,
  setShowReplyMenu,
}) => {
  const { myProfile, isLoading } = useProfile();
  const { handleDeleteComment } = usePostActions();
  const [isOwnComment, setIsOwnComment] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading && myProfile?.data && author?.username) {
      setIsOwnComment(myProfile?.data?.username === author.username);
      setIsReady(true);
    }
  }, [isLoading, myProfile, author?.username]);
  if (!isReady) return null;

  const handleReportModal = () => {
    openReportMenu();
  };

  return (
    <Fragment>
      {/* Menu Modal */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, backgroundColor: "rgba(0,0,0,0.5)" }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => {
            if (showMenuComment === true) {
              closeMenuComment();
            }
            if (showReplyMenu === true) {
              setShowReplyMenu(false);
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black border border-neutral-800 rounded-xl shadow-lg py-1 w-48"
            onClick={(e) => e.stopPropagation()}
          >
            {isOwnComment ? (
              <Button
                onClick={() => handleDeleteComment(commentId)}
                className="w-full px-4 py-2 text-left text-red-500 hover:bg-neutral-900"
              >
                Delete
              </Button>
            ) : (
              <>
                <Button className="w-full px-4 py-2 text-left hover:bg-neutral-900">
                  Follow @{author.username}
                </Button>
                <Button className="w-full px-4 py-2 text-left hover:bg-neutral-900">
                  Mute @{author.username}
                </Button>
                <Button className="w-full px-4 py-2 text-left hover:bg-neutral-900">
                  Block @{author.username}
                </Button>
                <Button
                  onClick={handleReportModal}
                  className="w-full px-4 py-2 text-left text-red-500 hover:bg-neutral-900"
                >
                  Report Comment
                </Button>
              </>
            )}
            <Button
              onClick={() => {
                if (showMenuComment === true) {
                  closeMenuComment();
                }
                if (showReplyMenu === true) {
                  setShowReplyMenu(false);
                }
              }}
              className="w-full px-4 py-2 text-left hover:bg-neutral-900 border-t-[1px] border-neutral-800"
            >
              Close
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Report Modal */}
      {showReportMenu && (
        <ReportModal
          reportType="comment"
          id={commentId}
          showReportMenu={showReportMenu}
          closeReportMenu={closeReportMenu}
        />
      )}
    </Fragment>
  );
};

export default MenuComment;
