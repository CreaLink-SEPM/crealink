const socketIo = require("socket.io");
let io;
let notificationQueue = [];

const init = (httpServer) => {
    io = socketIo(httpServer);
    setInterval(() => {
        const notification = notificationQueue.shift();
        if (notification) {
            io.emit("notification", notification);
        }
    }, 5000);
    return io;
};

const enqueueNotification = (notification) => {
    notificationQueue.push(notification);
};

const getNotifications = () => {
    return notificationQueue;
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io is not initialized");
    }
    return io;
};

module.exports = { init, enqueueNotification, getNotifications, getIO };
