import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/common";
import usePost from "@/hooks/usePost";
import { SinglePostPage_SkeletonLoader } from "@/components/post/SkeletonLoading";
import { getSafeMediaUrl } from "@/lib/getSafeMediaUrl";

import { CommentItem } from "@/components/post";
import MainTweet from "@/components/post/MainTweet";

const SinglePostPage = () => {
  const { singlePost, singlePostLoading, singlePostError, navigate } =
    usePost();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [selectedParentCommentId, setSelectedParentCommentId] = useState(null);
  const selectedComment = (commentId) => {
    setSelectedParentCommentId(commentId);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (singlePostLoading) {
    return <SinglePostPage_SkeletonLoader />;
  }

  if (singlePostError) {
    return <p>Error: {singlePostError.message}</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center gap-6 px-4 py-3 border-b border-neutral-800 sticky top-0 bg-black/80 backdrop-blur-sm">
        <Button
          className="rounded-full p-2 hover:bg-neutral-900"
          onClick={goBack}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold">Post</h1>
      </div>

      {/* Main Tweet */}
      <MainTweet
        getSafeMediaUrl={getSafeMediaUrl}
        singlePost={singlePost}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
        setIsBookmarked={setIsBookmarked}
        selectedParentCommentId={selectedParentCommentId}
        setSelectedParentCommentId={setSelectedParentCommentId}
      />

      {/* Show replies here */}
      {singlePost.comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          singlePost={singlePost}
          getSafeMediaUrl={getSafeMediaUrl}
          selectedComment={selectedComment}
        />
      ))}
    </div>
  );
};

export default SinglePostPage;
