import { WebSocket } from "ws";
import { GetStateBridgeRequest } from "@homebridge-ws/types";

const ws = new WebSocket("ws://localhost:3000/bridge");

ws.on("message", (e) => {
  console.log(JSON.parse(e as any));
});

ws.on("open", () => {
  const req: GetStateBridgeRequest = {
    _type: "GetStateRequest",
    accessoryId: "SOME_LAMP",
    id: "000.000",
  };
  ws.send(JSON.stringify(req));
});
