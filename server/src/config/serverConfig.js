const express = require("express");
const path = require("path");
const cors = require("cors");//*библиотека позволяющая конфигурировать CORS политику
const morgan = require("morgan"); //* библиотека позволяющая выводить запросы в лог
const cookieParser = require("cookie-parser");//*библиотека проводит расшифровку куков


const corsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
};


const serverConfig = (app) => {
  //* позволяет работать с телом запроса
  app.use(express.urlencoded({ extended: true }));

  //* парсит JSON
  app.use(express.json());

  //* логирует данные о запросах на сервер
  app.use(morgan("dev"));

  app.use(cors(corsOptions));

  //* парсит куки
  app.use(cookieParser());

  //* настройка статики, папка public ассоциирована с маршрутом запроса
app.use(
  "/static/images",
  express.static(path.resolve(__dirname, "..", "public", "images")
  // , {
  //   setHeaders: (res) => {
  //     res.set(
  //       "Cache-Control",
  //       "no-store, no-cache, must-revalidate, proxy-revalidate"
  //     );
  //     res.set("Pragma", "no-cache");
  //     res.set("Expires", "0");
  //   },
  // }
)
);
};

module.exports = serverConfig