import React from "react";
import { Smile } from "lucide-react";
import { Input } from "@/components/ui";
import { Button } from "@/components/common";

export const CommentInput = () => {
  return (
    <form className="flex items-center gap-3 mt-2">
      <Smile size={24} className="text-white" />
      <Input
        type="text"
        placeholder="Add a comment..."
        className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
      />
      <Button
        type="submit"
        className="text-blue-400 font-medium hover:text-blue-300"
      >
        Post
      </Button>
    </form>
  );
};

export default CommentInput;
