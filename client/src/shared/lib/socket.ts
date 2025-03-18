import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  count: (count: number) => void;
}

interface ClientToServerEvents {
  increment: () => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000",
  {
    path: "/ws",
    transports: ["websocket"],
  }
);

export default socket;
