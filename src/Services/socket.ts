// socket.ts
import { io } from "socket.io-client";
const BASE_URL = import.meta.env.VITE_BASE_IO || "http://localhost:3000";

// Se pasa la ruta actual al conectarse
const page = window.location.pathname;

const socket = io(BASE_URL, {
  query: { page },
});

export default socket;