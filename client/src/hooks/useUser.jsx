import { useState, useEffect } from "react";
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "@/redux/slices/userApiSlice";
import toast from "react-hot-toast";
import useProfile from "./useProfile";

const useUser = (userId) => {
  const { myProfile, refetchUserProfile } = useProfile();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followUser] = useFollowUserMutation();
  const [unFollowUser] = useUnFollowUserMutation();

  useEffect(() => {
    if (userId && myProfile) {
      const following = myProfile?.user?.following || [];
      const isFollowingUser = following.some((user) => user._id === userId);
      setIsFollowing(isFollowingUser);
    }
  }, [userId, myProfile]);

  const handleFollowToggle = async () => {
    if (isFollowing) {
      setIsFollowing(false);
      await unFollow(userId);
    } else {
      setIsFollowing(true);
      await follow(userId);
    }
    await refetchUserProfile();
  };

  const follow = async (userIdToFollow) => {
    try {
      await followUser({ userIdToFollow });
    } catch (error) {
      toast.error("Failed to follow user");
      setIsFollowing(false);
    }
  };

  const unFollow = async (userIdToUnfollow) => {
    try {
      await unFollowUser({ userIdToUnfollow });
    } catch (error) {
      toast.error("Failed to unfollow user");
      setIsFollowing(true);
    }
  };

  return {
    handleFollowToggle,
    isFollowing,
  };
};

export default useUser;
