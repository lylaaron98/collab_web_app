import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? "collaborative-app-backend-d92mgbnd4-awaiskazmi154.vercel.app/"
    : "http://localhost:4000";

export const socket = io(URL, {
  autoConnect: false,
});
