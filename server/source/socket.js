const socketIo = require("socket.io");
let io;
let notificationQueue = [];

module.exports = {
  init: (httpServer) => {
    io = socketIo(httpServer);
    setInterval(() => {
      const notification = notificationQueue.shift();
      if (notification) {
        io.emit("notification", notification);
      }
    }, 5000);
    return io;
  },
  enqueueNotification: (notification) => {
    notificationQueue.push(notification);
  },
  getNotifications: () => {
    return notificationQueue;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io is not initialized");
    }
    return io;
  },
};
