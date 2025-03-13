const path = require("path"); //* Импорт библиотеки path
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") }); //* Подключение переменных окружения
const express = require("express"); //* Импорт библиотеки express
const serverConfig = require("./config/serverConfig");
const indexRouter = require("./routes/index.routes");

const app = express(); //* Заводим экземпляр приложения

serverConfig(app); //* Прогоняем экземпляр приложения через функцию обучения

const { PORT } = process.env; //* указываем порт, который будет слушать сервер

app.use("/api", indexRouter); //* подключаем весь пакет маршрутов на /api

//* Старт сервера - прослушивание определенного порта
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
