import React, { useState } from "react";
import { Heart, MessageCircle, UserPlus, Image, Star } from "lucide-react";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "like",
      user: {
        name: "Sarah Chen",
        avatar: "/api/placeholder/32/32",
        username: "sarahchen",
      },
      content: "liked your photo",
      time: "2m ago",
      isRead: false,
      targetImage: "/api/placeholder/40/40",
    },
    {
      id: 2,
      type: "follow",
      user: {
        name: "Mike Johnson",
        avatar: "/api/placeholder/32/32",
        username: "mikej",
      },
      content: "started following you",
      time: "15m ago",
      isRead: false,
    },
    {
      id: 3,
      type: "comment",
      user: {
        name: "Emma Wilson",
        avatar: "/api/placeholder/32/32",
        username: "emmaw",
      },
      content: 'commented: "This is amazing! 🔥"',
      time: "1h ago",
      isRead: true,
      targetImage: "/api/placeholder/40/40",
    },
    {
      id: 4,
      type: "mention",
      user: {
        name: "Alex Brown",
        avatar: "/api/placeholder/32/32",
        username: "alexb",
      },
      content: "mentioned you in a comment",
      time: "2h ago",
      isRead: true,
    },
    {
      id: 5,
      type: "like",
      user: {
        name: "David Kim",
        avatar: "/api/placeholder/32/32",
        username: "davidk",
      },
      content: "liked your comment",
      time: "3h ago",
      isRead: true,
    },
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <Heart className="w-5 h-5 text-red-500" fill="currentColor" />;
      case "comment":
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case "follow":
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case "mention":
        return <Star className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-neutral-800 rounded-lg">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-800 border-b dark:border-white rounded-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
          {/* <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button> */}
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-4 py-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center p-4 mb-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors ${
              !notification.isRead
                ? "bg-blue-50 dark:bg-neutral-900"
                : "bg-white dark:bg-neutral-700"
            }`}
          >
            {/* User Avatar */}
            <img
              src={notification.user.avatar}
              alt={notification.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* Notification Icon */}
            <div className="w-8 h-8 -ml-4 mb-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 border-2 border-white dark:border-gray-700">
              {getNotificationIcon(notification.type)}
            </div>

            {/* Content */}
            <div className="flex-1 ml-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {notification.user.name}
                  </span>{" "}
                  <span className="text-gray-600 dark:text-gray-300">
                    {notification.content}
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {notification.time}
                  </p>
                </div>
                {notification.targetImage && (
                  <img
                    src={notification.targetImage}
                    alt="Post"
                    className="w-10 h-10 rounded object-cover ml-4"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Notifications State */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            No new notifications
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
            When you get notifications, they'll show up here
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
