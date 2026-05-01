const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("chat:message", (payload) => {
      io.emit("chat:message", payload);
    });

    socket.on("notification:send", (payload) => {
      io.emit("notification:receive", payload);
    });
  });
};

const getIO = () => io;

module.exports = { initSocket, getIO };
