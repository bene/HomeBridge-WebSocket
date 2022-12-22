import { WebSocket } from "ws";
import { v4 as uuid } from "uuid";
import {
  GetStateBridgeRequest,
  GetStateResponse,
  RawAccessoryState,
  SetStateBridgeRequest,
} from "@homebridge-ws/types";

class Handler {
  private _ws: WebSocket;
  private readonly _accessoryId: string;

  constructor(apiUrl: string, accessoryId: string, token: string) {
    this._accessoryId = accessoryId;
    this._ws = new WebSocket(`${apiUrl}/bridge`);
  }

  getState(): Promise<RawAccessoryState | null> {
    return new Promise((resolve, reject) => {
      const requestId = uuid();
      const req: GetStateBridgeRequest = {
        _type: "GetStateRequest",
        accessoryId: this._accessoryId,
        id: requestId,
      };

      this._ws.addEventListener("message", (e) => {
        const data = JSON.parse(e.data as any);

        if (data._type === "GetStateResponse") {
          const res: GetStateResponse = data;
          if (res.id === requestId) {
            resolve(res.state);
          }
        }
      });

      this._ws.send(JSON.stringify(req));
    });
  }

  setState(state: RawAccessoryState) {
    const req: SetStateBridgeRequest = {
      _type: "SetStateRequest",
      accessoryId: this._accessoryId,
      state,
    };
    this._ws.send(JSON.stringify(req));
  }
}

export { Handler };
