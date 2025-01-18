import React, { Suspense } from "react";
import { Routes, Route } from "react-router";
import Loader from "@/components/common/Loader";
import AppLayout from "@/layouts/AppLayout";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ExplorePage from "@/pages/ExplorePage";
import MessagesPage from "@/pages/MessagesPage";
import NotificationPage from "@/pages/NotificationPage";
import ProfilePage from "@/pages/ProfilePage";
import SinglePostPage from "@/pages/SinglePostPage";
import EditProfilePage from "@/pages/EditProfilePage";
import ProfileSettingsPage from "@/pages/ProfileSettingsPage";
import PublicRoutes from "@/routes/PublicRoutes";
import PrivateRoutes from "@/routes/PrivateRoutes";

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
            path="p/:postId"
            element={
              <PrivateRoutes>
                <SinglePostPage />
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
