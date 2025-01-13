import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";

// IMPORT LAYOUT
const AppLayout = lazy(() => import("@/layouts/AppLayout"));

// IMPORT PAGES
import LoginPage from "@/pages/auth/LoginPage";
import Dashboard from "@/pages/HomePage";
import Loader from "@/components/common/Loader";
import RegisterPage from "@/pages/auth/RegisterPage";
import ExplorePage from "@/pages/ExplorePage";
import MessagesPage from "@/pages/MessagesPage";
import NotificationPage from "@/pages/NotificationPage";
import ProfilePage from "@/pages/ProfilePage";
import SinglePostPage from "@/pages/SinglePostPage";
import EditProfilePage from "@/pages/EditProfilePage";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="search" element={<>SEARCH</>} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="explore/:postId" element={<ExplorePage />} />
          <Route path="p/:postId" element={<SinglePostPage />} />
          <Route path="inbox" element={<MessagesPage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/edit" element={<EditProfilePage />} />
          <Route path="profile/settings" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
