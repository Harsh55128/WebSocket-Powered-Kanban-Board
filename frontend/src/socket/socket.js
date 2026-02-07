import { io } from "socket.io-client";

const SOCKET_URL = "https://websocket-powered-kanban-board-1.onrender.com";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});
