import { WebSocket } from "ws";

import {
  GetStateRequest,
  GetStateResponse,
  OutletState,
  SetStateRequest,
  SwitchState,
} from "@homebridge-ws/types";

import { Factory } from "./factory";
import { ServiceType } from "./services/unions";

class Logger {
  info(...data: any[]) {
    console.log(data);
  }
}

class Client {
  private readonly _log: Logger;
  private readonly _factory: Factory;
  private readonly _apiUrl: string;

  constructor(apiUrl: string) {
    this._log = new Logger();
    this._factory = new Factory();
    this._apiUrl = apiUrl;
  }

  public get log() {
    return this._log;
  }

  subscribe(
    serviceType: "Switch",
    accessory: string,
    token: string,
    setState: (msg: SwitchState) => void,
    getState: () => SwitchState,
  ): void;
  subscribe(
    serviceType: "Outlet",
    accessory: string,
    token: string,
    setState: (msg: OutletState) => void,
    getState: () => OutletState,
  ): void;
  subscribe(
    serviceType: ServiceType,
    accessory: string,
    token: string,
    setState: ((msg: SwitchState) => void) | ((msg: OutletState) => void),
    getState: (() => SwitchState) | (() => OutletState),
  ): void {
    const parseRawFn = this._factory.get(serviceType);
    const ws = new WebSocket(
      `${this._apiUrl}?accessory=${accessory}&token=${token}`,
    );

    ws.on("message", (raw: any) => {
      const data = JSON.parse(raw);

      if (data._type === "GetStateRequest") {
        const req: GetStateRequest = data;
        const state = getState();
        const res: GetStateResponse = {
          _type: "GetStateResponse",
          id: req.id,
          state,
        };

        return void ws.send(JSON.stringify(res));
      }

      if (data._type === "SetStateRequest") {
        const req: SetStateRequest = data;
        const state = parseRawFn(req.state);

        // TODO: Do this without using any
        return void setState(state as any);
      }
    });
  }
}

export default Client;
