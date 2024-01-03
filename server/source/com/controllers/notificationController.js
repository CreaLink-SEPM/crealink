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
    const notifications = getNotifications();
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
