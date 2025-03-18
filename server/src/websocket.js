const { Server } = require("socket.io");

const setupWebSocket = (server) => {
  const io = new Server(server, {
    path: process.env.WS_PATH, // путь из .env (например, /ws)
    cors: {
      origin: process.env.CLIENT_URL, // разрешенный источник (http://localhost:5173)
    },
  });

  let count = 0;

  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.emit("count", count); // Отправка текущего значения счетчика

    socket.on("increment", () => {
      count += 1;
      io.emit("count", count); // Рассылка обновления всем клиентам
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

module.exports = setupWebSocket;
