import { useEffect, useState } from "react";
import socket from "@/shared/lib/socket"; // Импортируем WebSocket-клиент

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

  return (
    <div>
      <h2>Счетчик: {count}</h2>
      <button onClick={handleIncrement}>Увеличить счетчик</button>
    </div>
  );
}
