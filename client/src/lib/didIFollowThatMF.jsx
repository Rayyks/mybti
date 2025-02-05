import useProfile from "@/hooks/useProfile";

const useDidIFollowThatMF = () => {
  const { myProfile, userProfile } = useProfile();
  const following = myProfile?.user?.following || [];
  return following.map((user) => user._id).includes(userProfile?.user?._id);
};

export default useDidIFollowThatMF;
