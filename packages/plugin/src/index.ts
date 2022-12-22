import {
  AccessoryPlugin,
  API,
  HAP,
  Logging,
  PlatformConfig,
  StaticPlatformPlugin,
} from "homebridge";
import { ExampleSwitch } from "./services/Switch";

let hap: HAP;

class WebSocketPlatform implements StaticPlatformPlugin {
  private readonly _log: Logging;
  private readonly _accessories: AccessoryPlugin[];

  constructor(log: Logging, config: PlatformConfig, api: API) {
    this._log = log;
    this._accessories = [
      new ExampleSwitch(hap, this._log, "Switch 1"),
      new ExampleSwitch(hap, this._log, "Switch 2"),
    ];

    console.log(config);
  }

  accessories(callback: (foundAccessories: AccessoryPlugin[]) => void): void {
    callback(this._accessories);
  }
}

export = (api: API) => {
  hap = api.hap;
  api.registerPlatform("HomeBridgeWebSocket", WebSocketPlatform);
};
