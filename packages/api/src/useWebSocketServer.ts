import { WebSocketServer } from "ws";
import { parse } from "url";
import type { Server } from "http";
import type { Duplex } from "stream";

import { addAccessoryConnection } from "./AccessoryHandler";
import { handleBridgeConnection } from "./BridgeHandler";

function useWebSocketServer(server: Server) {
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (req, socket, head) => {
    const reqUrl = parse(req.url!);

    return void wss.handleUpgrade(req, socket, head, (ws) => {
      if (reqUrl.pathname === "/bridge") {
        return void handleBridgeConnection(ws);
      }

      const params = new URLSearchParams(reqUrl.query!);
      const accessoryId = params.get("accessory");
      const token = params.get("token");

      if (!accessoryId) {
        return void rejectSocket(socket, "400 Bad Request");
      }

      addAccessoryConnection(accessoryId, ws);
    });
  });
}

function rejectSocket(socket: Duplex, reason: string) {
  socket.write(`HTTP/1.1 ${reason}\r\n\r\n`);
  socket.destroy();
}

export default useWebSocketServer;
