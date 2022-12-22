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
      // wss.emit("connection", ws, req)
    });

    // const params = new URLSearchParams(reqUrl.query!);
    // const accessory = params.get("accessory")
    // const token = params.get("token")

    // const tokenWithPrefix = req.headers["authorization"] ?? ""

    // if (tokenWithPrefix.startsWith("Bearer ")) {
    //     const token = tokenWithPrefix.substring(7)
    //     if (token === config.GATEWAY_TOKEN) {
    //         return void wss.handleUpgrade(req, socket, head, (ws) => {
    //             wss.emit("connection", ws, req)
    //         })
    //     }
    // }

    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
  });
}

function rejectSocket(socket: Duplex, reason: string) {
  socket.write(`HTTP/1.1 ${reason}\r\n\r\n`);
  socket.destroy();
}

export default useWebSocketServer;
