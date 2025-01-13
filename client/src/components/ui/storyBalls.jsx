import { Fragment } from "react";
import { useLocation } from "react-router";

const story = [
  { id: 1, username: "user1", hasStory: true },
  { id: 2, username: "user2", hasStory: true },
  { id: 3, username: "user3", hasStory: false },
  { id: 4, username: "user4", hasStory: true },
  { id: 5, username: "user5", hasStory: true },
];

export const StoryBalls = () => {
  // UNTUK HIDE STORY BALLS 🤨 kalo selain di index path
  const location = useLocation();
  if (location.pathname !== "/") return null;

  return (
    <Fragment>
      {story.map((user) => (
        <div
          key={user.id}
          className="relative h-20 w-20 rounded-full bg-gray-100 dark:bg-neutral-800 mr-2 mb-5"
        >
          {user.hasStory && (
            <div className="h-5 w-5 rounded-full bg-blue-500 border-2 border-white dark:border-neutral-900"></div>
          )}
          <span className="absolute -bottom-5 text-white">{user.username}</span>
        </div>
      ))}
    </Fragment>
  );
};

export default StoryBalls;
