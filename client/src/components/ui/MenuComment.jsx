import { useState, useEffect } from "react";
import { Button } from "@/components/common";
import useProfile from "@/hooks/useProfile";
import usePostActions from "@/hooks/usePostActions";

export const MenuComment = ({ author, commentId }) => {
  const { myProfile, isLoading } = useProfile();
  const { handleDeleteComment } = usePostActions();

  const [isOwnComment, setIsOwnComment] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading && myProfile?.data) {
      setIsOwnComment(myProfile?.data?.username === author.username);
      setIsReady(true);
    }
  }, [isLoading, myProfile, author.profile]);

  if (!isReady) {
    return null;
  }

  return (
    <div className="absolute right-0 mt-2 w-48 bg-black border border-neutral-800 rounded-xl shadow-lg py-1 z-10">
      {isOwnComment ? (
        <>
          <Button
            onClick={() => handleDeleteComment(commentId)}
            className="w-full px-4 py-2 text-left text-red-500 hover:bg-neutral-900"
          >
            Delete
          </Button>
        </>
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
          <Button className="w-full px-4 py-2 text-left text-red-500 hover:bg-neutral-900">
            Report Comment
          </Button>
        </>
      )}
    </div>
  );
};

export default MenuComment;
