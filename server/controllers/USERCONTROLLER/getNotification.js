export const getNotificationsController = async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  res.status(200).json(notifications);
};
