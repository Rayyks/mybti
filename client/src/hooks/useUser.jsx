import { useState, useEffect } from "react";
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
  useRemoveFollowerMutation,
} from "@/redux/slices/userApiSlice";
import toast from "react-hot-toast";
import useProfile from "./useProfile";

const useUser = (userId) => {
  const { myProfile, refetchUserProfile, refetchProfile } = useProfile();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [followUser] = useFollowUserMutation();
  const [unFollowUser] = useUnFollowUserMutation();
  const [removeFollower] = useRemoveFollowerMutation();

  useEffect(() => {
    if (userId && myProfile) {
      const following = myProfile?.user?.following || [];
      setIsFollowing(following.some((user) => user._id === userId));
    }
  }, [userId, myProfile]);

  const handleFollowToggle = async () => {
    if (loading) return;

    setLoading(true);
    try {
      if (isFollowing) {
        await unFollow(userId);
        setIsFollowing(false);
      } else {
        await follow(userId);
        setIsFollowing(true);
      }
      await refetchUserProfile();
    } catch (error) {
      toast.error("Failed to update follow status");
    } finally {
      setLoading(false);
    }
  };

  const follow = async (userIdToFollow) => {
    try {
      await followUser({ userIdToFollow }).unwrap();
    } catch (error) {
      console.error("Failed to follow user");
    }
  };

  const unFollow = async (userIdToUnfollow) => {
    try {
      await unFollowUser({ userIdToUnfollow }).unwrap();
    } catch (error) {
      console.error("Failed to unFollow user");
    }
  };

  const handleRemoveFollower = async (followerId) => {
    try {
      await removeFollower({ followerId }).unwrap();
      await refetchProfile();
    } catch (error) {
      console.error("Failed to remove follower");
    }
  };

  return {
    handleFollowToggle,
    handleRemoveFollower,
    isFollowing,
    isLoading: loading,
  };
};

export default useUser;
