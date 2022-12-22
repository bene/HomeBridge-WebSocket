import { Evt } from "evt";
import { WebSocket } from "ws";
import { v4 as uuid } from "uuid";

import {
  GetStateRequest,
  RawAccessoryState,
  SetStateRequest,
} from "@homebridge-ws/types";

const clients: Record<string, {
  webSocket: WebSocket;
  stateEvt: Evt<RawAccessoryState>;
}> = {};

function getAccessoryState(
  accessoryId: string,
): Promise<RawAccessoryState | null> {
  return new Promise((resolve, reject) => {
    if (!clients[accessoryId]) {
      return void resolve(null);
    }

    const requestId = uuid();
    const { webSocket, stateEvt } = clients[accessoryId];

    // Resolve when receiving state
    stateEvt.attachOnce((state) => {
      resolve(state);
    });

    // Send state request
    const msg: GetStateRequest = {
      _type: "GetStateRequest",
      id: requestId,
    };
    webSocket.send(JSON.stringify(msg));
  });
}

async function setAccessoryState(
  accessoryId: string,
  state: RawAccessoryState,
) {
  if (!clients[accessoryId]) {
    return;
  }

  const ws = clients[accessoryId].webSocket;
  const msg: SetStateRequest = {
    _type: "SetStateRequest",
    state,
  };

  ws.send(JSON.stringify(msg));
}

function addAccessoryConnection(accessoryId: string, ws: WebSocket) {
  console.log(`Client connected:`, accessoryId);

  // Handle cleanup
  ws.on("close", () => {
    delete clients[accessoryId];
  });

  // Every accessory can only have one client. If there already is a connection.
  if (clients[accessoryId]) {
    clients[accessoryId].webSocket.close();
    delete clients[accessoryId];
  }

  // Save new connection
  clients[accessoryId] = {
    webSocket: ws,
    stateEvt: Evt.create<RawAccessoryState>(),
  };

  // Handle messages
  ws.addEventListener("message", (e) => {
    const data = JSON.parse(e.data as any);

    if (data._type !== "GetStateResponse") {
      return;
    }

    const state: RawAccessoryState = data;
    if (clients[accessoryId]) {
      clients[accessoryId].stateEvt.post(state);
    }
  });
}

export { addAccessoryConnection, getAccessoryState, setAccessoryState };
