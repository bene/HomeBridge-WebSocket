import {
  AccessoryPlugin,
  API,
  HAP,
  Logging,
  PlatformConfig,
  StaticPlatformPlugin,
} from "homebridge";
import { Switch } from "./services/Switch";

let hap: HAP;

class WebSocketPlatform implements StaticPlatformPlugin {
  private readonly _accessories: AccessoryPlugin[] = [];

  constructor(log: Logging, config: PlatformConfig, api: API) {
    if (config.accessories && Array.isArray(config.accessories)) {
      for (const accessoryConfig of config.accessories) {
        if (accessoryConfig.service === "Switch") {
          this._accessories.push(
            new Switch(log, hap, accessoryConfig.name, config.apiUrl),
          );
        }
      }
    }
  }

  accessories(callback: (foundAccessories: AccessoryPlugin[]) => void): void {
    callback(this._accessories);
  }
}

export = (api: API) => {
  hap = api.hap;
  api.registerPlatform("HomeBridgeWebSocket", WebSocketPlatform);
};
