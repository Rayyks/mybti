export const countReplies = (replies) => {
  if (!replies || replies.length === 0) return 0;
  let count = replies.length;
  replies.forEach((reply) => {
    count += countReplies(reply.replies);
  });
  return count;
};
