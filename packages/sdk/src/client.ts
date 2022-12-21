import { Factory } from "./factory";
import { ServiceMessage, ServiceType } from "./services/unions";
import { SwitchMessage } from "./services/Switch";
import { OutletMessage } from "./services/Outlet";

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
    onMessage: (msg: SwitchMessage) => void,
  ): void;
  subscribe(
    serviceType: "Outlet",
    accessory: string,
    token: string,
    onMessage: (msg: OutletMessage) => void,
  ): void;
  subscribe(
    serviceType: ServiceType,
    accessory: string,
    token: string,
    onMessage: (msg: ServiceMessage) => void,
  ): void {
    const parseRaw = this._factory.get(serviceType);

    this._ws.addEventListener("message", (e) => {
      const raw = JSON.parse(e.data);
      const parsed = parseRaw(raw);
      onMessage(parsed);
    });
  }
}

export default Client;
