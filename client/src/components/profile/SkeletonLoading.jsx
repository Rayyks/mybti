import { Fragment } from "react";
import { Grid, ListFilter } from 'lucide-react';

export const ProfileHeader_SkeletonLoading = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 animate-pulse">
      {/* Profile Picture Skeleton */}
      <div className="flex-shrink-0">
        <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200" />
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4">
          <div className="space-y-3 w-full sm:w-72">
            {/* Username Skeleton */}
            <div className="h-9 bg-gray-200 rounded-lg w-48" />

            {/* Email Skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="h-5 bg-gray-200 rounded w-40" />
            </div>

            {/* MBTI Skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-5 bg-gray-200 rounded w-16" />
              <div className="h-5 bg-gray-200 rounded w-12" />
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="flex gap-6 bg-neutral-950 p-4 rounded-lg">
            <div className="text-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-700 rounded" />
                <div className="h-8 bg-gray-700 rounded w-16" />
              </div>
              <div className="h-4 bg-gray-700 rounded w-14 mt-1" />
            </div>
            <div className="text-center border-l border-gray-700 pl-6">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-700 rounded" />
                <div className="h-8 bg-gray-700 rounded w-16" />
              </div>
              <div className="h-4 bg-gray-700 rounded w-14 mt-1" />
            </div>
          </div>
        </div>

        {/* Bio Skeleton */}
        <div className="mt-6 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
      </div>
    </div>
  );
};

export const ProfileBody_SkeletonLoading = () => {
  <Fragment>
    {/* Professional Info Skeleton */}
    <div className="mt-8 border-t border-gray-100 pt-8 animate-pulse">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 bg-gray-200 rounded" />
        <div className="h-7 bg-gray-200 rounded w-32" />
      </div>
      <div className="inline-block rounded-full py-3 px-5 bg-gray-200 w-40">
        <div className="h-5 w-24 mx-auto" />
      </div>
    </div>

    {/* Interests Skeleton */}
    <div className="mt-8 border-t border-gray-100 pt-8 animate-pulse">
      <div className="h-7 bg-gray-200 rounded w-28 mb-4" />
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div
            key={index}
            className="h-10 bg-gray-200 rounded-full"
            style={{
              width: `${Math.floor(Math.random() * (140 - 100) + 100)}px`,
            }}
          />
        ))}
      </div>
    </div>
  </Fragment>;
};

export const ProfileActivity_SkeletonLoading = ({
  CustomTab,
  ActivityTab,
  activityData,
  activeTab,
  setActiveTab,
  Activity,
  Heart,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8 animate-pulse">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          Account Activity
        </h2>
      </div>

      <div className="w-full">
        {/* Custom Tabs */}
        <div className="flex gap-2 mb-6">
          <CustomTab
            active={activeTab === "liked"}
            onClick={() => setActiveTab("liked")}
          >
            Liked Posts
          </CustomTab>
          <CustomTab
            active={activeTab === "commented"}
            onClick={() => setActiveTab("commented")}
          >
            Commented Posts
          </CustomTab>
          <CustomTab
            active={activeTab === "saved"}
            onClick={() => setActiveTab("saved")}
          >
            Saved Posts
          </CustomTab>
        </div>

        {/* Tab Content */}
        <div className="min-h-[200px]">
          <ActivityTab
            icon={Heart}
            label="Liked Posts"
            count={activityData.liked.length}
          >
            <div className="animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg bg-gray-200"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 w-3/4"></div>
                  <div className="h-4 bg-gray-200 w-1/2 mt-2"></div>
                  <div className="h-4 bg-gray-200 w-1/4 mt-2"></div>
                </div>
              </div>
            </div>
          </ActivityTab>
        </div>
      </div>
    </div>
  );
};

export const ProfilePosts_SkeletonLoading = () => {
  return (
    <section>
      {/* Tabs Navigation Skeleton */}
      <div className="bg-white mt-10 p-2 rounded-t-lg border-t border-gray-200">
        <div className="flex gap-8">
          <div className="flex items-center gap-2 py-3">
            <Grid size={20} className="text-gray-300" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="flex items-center gap-2 py-3">
            <ListFilter size={20} className="text-gray-300" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Posts Grid Skeleton */}
      <div className="bg-white mt-6 rounded-lg p-1">
        <div className="grid grid-cols-3 gap-1">
          {/* Generate 9 skeleton post items */}
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="aspect-square relative border-[1px] rounded-md border-neutral-200 bg-gray-200 animate-pulse"
            />
          ))}
        </div>

        {/* Tweets Skeleton (hidden by default) */}
        <div className="hidden space-y-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-4">
                {/* Avatar skeleton */}
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />

                <div className="flex-1">
                  {/* Username and date skeleton */}
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>

                  {/* Content skeleton */}
                  <div className="mt-2 space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Interaction buttons skeleton */}
              <div className="flex items-center gap-6 mt-4">
                {[...Array(3)].map((_, btnIndex) => (
                  <div key={btnIndex} className="flex items-center gap-1">
                    <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                    <div className="w-8 h-4 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
