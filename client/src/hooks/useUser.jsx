import { useState, useEffect } from "react";
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "@/redux/slices/userApiSlice";
import toast from "react-hot-toast";
import useDidIFollowThatMF from "@/lib/didIFollowThatMF";
import useProfile from "./useProfile";

const useUser = () => {
  const { refetchUserProfile } = useProfile();
  const isFollowingInitial = useDidIFollowThatMF();
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);

  useEffect(() => {
    setIsFollowing(isFollowingInitial);
  }, [isFollowingInitial]);

  const [followUser] = useFollowUserMutation();
  const [unFollowUser] = useUnFollowUserMutation();

  const handleFollowToggle = async (profileId) => {
    if (isFollowing) {
      await unFollow(profileId);
    } else {
      await follow(profileId);
    }
    setIsFollowing(!isFollowing);
  };

  const follow = async (userIdToFollow) => {
    try {
      await followUser({ userIdToFollow });
      toast.success("User followed successfully");
      refetchUserProfile();
    } catch (error) {
      toast.error("Failed to follow user");
    }
  };

  const unFollow = async (userIdToUnfollow) => {
    try {
      await unFollowUser({ userIdToUnfollow });
      toast.success("User unfollowed successfully");
      refetchUserProfile();
    } catch (error) {
      toast.error("Failed to unfollow user");
    }
  };

  return {
    handleFollowToggle,
    isFollowing,
  };
};

export default useUser;
