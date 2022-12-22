import express from "express";

import useWebSocketServer from "./useWebSocketServer";

const app = express();

// Start listening
const server = app.listen(3000);

// Start WebSocket server
useWebSocketServer(server);
