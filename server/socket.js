const socketIo = require("socket.io");
const http = require("http");

let io;

module.exports = {
  init: (httpServer) => {
    io = socketIo(httpServer);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io is not initialized");
    }
    return io;
  },
};
