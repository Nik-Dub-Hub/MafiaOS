import { useEffect, useState } from "react";
import socket from "@/shared/lib/socket"; // Импортируем WebSocket-клиент
import styles from "./Counter.module.css"; // Импортируем стили

export function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Слушаем событие "count" от сервера
    socket.on("count", (newCount: number) => {
      setCount(newCount);
    });

    // Отписываемся от событий при размонтировании компонента
    return () => {
      socket.off("count");
    };
  }, []);

  const handleIncrement = () => {
    socket.emit("increment"); // Отправляем событие "increment" на сервер
  };
  const handleDecrement = () => {
    socket.emit("decrement"); // Отправляем событие "increment" на сервер
  };

  return (
    <div className={styles.counter}>
      <h2>Баланс: {count}</h2>
      <button onClick={handleIncrement}>Добавить</button>
      <button onClick={handleDecrement}>Убавить</button>
      <span>Можно убить время и соревноваться со всеми игроками баланс будет положительным или отрицательным</span>
    </div>
  );
}
