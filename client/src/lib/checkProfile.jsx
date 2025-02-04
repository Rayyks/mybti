import useProfile from "@/hooks/useProfile";

export const useCheckProfile = () => {
  const { myProfile, navigate } = useProfile();
  const checkProfile = (username) => {
    if (myProfile?.data?.username === username) {
      navigate("/profile");
    } else {
      navigate(`/profile/${username}`);
    }
  };

  return { checkProfile };
};
