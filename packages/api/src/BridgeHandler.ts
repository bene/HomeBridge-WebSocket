import { WebSocket } from "ws";

import * as AccessoryHandler from "./AccessoryHandler";
import {
  GetStateBridgeRequest,
  GetStateBridgeResponse,
  SetStateBridgeRequest,
} from "@homebridge-ws/types";

function handleBridgeConnection(ws: WebSocket) {
  console.log("Bridge connected");
  ws.on("message", async (e) => {
    const data = JSON.parse(e as any);

    if (data._type === "GetStateRequest") {
      await onGetStateRequest(ws, data);
    }

    if (data._type === "SetStateRequest") {
      await onSetStateRequest(data);
    }
  });
}

async function onSetStateRequest(req: SetStateBridgeRequest) {
  await AccessoryHandler.setAccessoryState(req.accessoryId, req.state);
}

async function onGetStateRequest(ws: WebSocket, req: GetStateBridgeRequest) {
  const { id, accessoryId } = req;
  console.log("onGetStateRequest", accessoryId);
  const state = await AccessoryHandler.getAccessoryState(accessoryId);
  console.log("state", state);

  const res: GetStateBridgeResponse = {
    _type: "GetStateResponse",
    accessoryId,
    state,
    id,
  };

  ws.send(JSON.stringify(res));
}

export { handleBridgeConnection };
