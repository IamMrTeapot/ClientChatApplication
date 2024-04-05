import { io } from "socket.io-client";
import { environment } from "./environment";

export const mySocket = io(environment.socketUrl);
