import express from "express";

import { AccessoryHandlerRouter } from "./AccessoryHandler";
import useWebSocketServer from "./useWebSocketServer";

const app = express();

app.use("/clients", AccessoryHandlerRouter);

// Start listening
const server = app.listen(3000);

// Start WebSocket server
useWebSocketServer(server);
