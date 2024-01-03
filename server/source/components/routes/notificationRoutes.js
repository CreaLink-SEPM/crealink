const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/notificationController.js");

// Notification routes
router.post("/send", NotificationController.sendNotification);
router.get("/", NotificationController.getAllNotifications);

module.exports = router;
