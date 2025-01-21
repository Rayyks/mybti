import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import Loader from "@/components/common/Loader";
// LAZY MF
const AppLayout = lazy(() => import("@/layouts/AppLayout"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const ExplorePage = lazy(() => import("@/pages/ExplorePage"));
const MessagesPage = lazy(() => import("@/pages/MessagesPage"));
const NotificationPage = lazy(() => import("@/pages/NotificationPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const UsersProfilePage = lazy(() => import("@/pages/UsersProfilePage"));
const SinglePostPage = lazy(() => import("@/pages/SinglePostPage"));
const EditProfilePage = lazy(() => import("@/pages/EditProfilePage"));
const EditPostPage = lazy(() => import("@/pages/EditPostPage"));
const ProfileSettingsPage = lazy(() => import("@/pages/ProfileSettingsPage"));
import { CreatePostModal } from "@/components/post";
// ROUTES
import PublicRoutes from "@/routes/PublicRoutes";
import PrivateRoutes from "@/routes/PrivateRoutes";
import TermsAndConditions from "@/pages/terms/Terms&Conditions";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={
              <PrivateRoutes>
                <HomePage />
              </PrivateRoutes>
            }
          />
          <Route
            path="search"
            element={
              <PrivateRoutes>
                <>SEARCH</>
              </PrivateRoutes>
            }
          />
          <Route
            path="explore"
            element={
              <PrivateRoutes>
                <ExplorePage />
              </PrivateRoutes>
            }
          />
          <Route
            path="explore/:postId"
            element={
              <PrivateRoutes>
                <ExplorePage />
              </PrivateRoutes>
            }
          />
          <Route
            path="create-post"
            element={
              <PrivateRoutes>
                <CreatePostModal />
              </PrivateRoutes>
            }
          />
          <Route
            path="p/:postId"
            element={
              <PrivateRoutes>
                <SinglePostPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="p/:postId/edit"
            element={
              <PrivateRoutes>
                <EditPostPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="inbox"
            element={
              <PrivateRoutes>
                <MessagesPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="notifications"
            element={
              <PrivateRoutes>
                <NotificationPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="profile/:username"
            element={
              <PrivateRoutes>
                <UsersProfilePage />
              </PrivateRoutes>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoutes>
                <ProfilePage />
              </PrivateRoutes>
            }
          />
          <Route
            path="profile/edit"
            element={
              <PrivateRoutes>
                <EditProfilePage />
              </PrivateRoutes>
            }
          />
          <Route
            path="profile/settings"
            element={
              <PrivateRoutes>
                <ProfileSettingsPage />
              </PrivateRoutes>
            }
          />
        </Route>
        {/* TERMS */}
        <Route path="terms&conditions" element={<TermsAndConditions />} />
        {/* AUTH */}
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <LoginPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutes>
              <RegisterPage />
            </PublicRoutes>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
