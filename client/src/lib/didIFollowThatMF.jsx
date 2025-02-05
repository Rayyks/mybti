import usePost from "@/hooks/usePost";
import useProfile from "@/hooks/useProfile";

export const checkFollowInUserProfile = () => {
  const { myProfile, userProfile } = useProfile();
  const following = myProfile?.user?.following || [];
  return following.map((user) => user._id).includes(userProfile?.user?._id);
};

export const checkFollowInPostModal = () => {
  const { myProfile, post } = usePost();
  const following = myProfile?.user?.following || [];
  return following.map((user) => user._id).includes(post?.author?.id);
};
