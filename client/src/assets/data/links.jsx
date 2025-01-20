import {
  CirclePlus,
  Search,
  Home,
  Telescope,
  MessageSquareText,
  Bell,
} from "lucide-react";

export const links = [
  {
    label: "Create Post",
    href: "/create-post",
    icon: (
      <CirclePlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Home",
    href: "/",
    icon: (
      <Home className="text-neutral-700  dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Search",
    href: "/search",
    icon: (
      <Search className="text-neutral-700  dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Explore",
    href: "/explore",
    icon: (
      <Telescope className="text-neutral-700  dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Messages",
    href: "/inbox",
    icon: (
      <MessageSquareText className="text-neutral-700  dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: (
      <Bell className="text-neutral-700  dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];
