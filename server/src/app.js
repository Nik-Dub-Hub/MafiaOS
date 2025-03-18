const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const express = require("express");
const http = require("http");
const setupWebSocket = require("./websocket");
const serverConfig = require("./config/serverConfig");
const indexRouter = require("./routes/index.routes");

// Создаем экземпляр Express-приложения
const app = express();

// Создаем HTTP-сервер на основе Express
const server = http.createServer(app);

// Настраиваем WebSocket
setupWebSocket(server);

// Применяем конфигурацию сервера (middleware, статические файлы и т.д.)
serverConfig(app);

// Подключаем маршруты
app.use("/api", indexRouter);

// Получаем порт из .env
const { PORT } = process.env;

// Запускаем сервер
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`WebSocket is running on path ${process.env.WS_PATH}`);
});
