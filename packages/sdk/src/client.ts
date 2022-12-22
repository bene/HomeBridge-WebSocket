import { Factory } from "./factory";
import { ServiceType } from "./services/unions";
import { SwitchState } from "./services/Switch";
import { OutletState } from "./services/Outlet";

class Logger {
  info(...data: any[]) {
    console.log(data);
  }
}

class Client {
  private readonly _log: Logger;
  private readonly _factory: Factory;
  private readonly _ws: WebSocket;

  constructor(apiUrl: string, apiToken: string) {
    this._log = new Logger();
    this._factory = new Factory();
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
    const parseRaw = this._factory.get(serviceType);

    this._ws.addEventListener("message", (e) => {
      const raw = JSON.parse(e.data);
      const parsed = parseRaw(raw);
      setState(parsed);
    });
  }
}

export default Client;
