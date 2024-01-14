const { enqueueNotification, getNotifications } = require("../../socket.js");

const sendNotification = async (req, res) => {
  try {
    const { message } = req.body;
    // Perform any necessary validation or processing of the notification data here

    // Enqueue the notification message
    enqueueNotification(message);

    return res.status(200).json({
      status: "success",
      message: "Notification enqueued successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const userId = req.username; // Assuming userId is available in the request
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const notifications = await Promise.all(
      user.notifications.map(async (notification) => {
        const populatedNotification = { ...notification._doc }; // Copy the notification object

        if (notification.postId) {
          const post = await Post.findById(notification.postId);
          populatedNotification.post = post;
        }

        if (notification.likerId) {
          const liker = await User.findById(notification.likerId);
          populatedNotification.liker = liker;
        }

        return populatedNotification;
      })
    );

    return res.status(200).json({
      status: "success",
      data: notifications,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  sendNotification,
  getAllNotifications
};
