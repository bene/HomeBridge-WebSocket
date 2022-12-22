import { SwitchState } from "@homebridge-ws/types";
import {
  AccessoryPlugin,
  CharacteristicEventTypes,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  HAP,
  Logging,
  Service,
} from "homebridge";

import { Handler } from "../handler";

export class Switch implements AccessoryPlugin {
  // This property must be existent
  name: string;

  private readonly handler: Handler;
  private readonly log: Logging;
  private readonly switchService: Service;
  private readonly informationService: Service;

  constructor(
    log: Logging,
    hap: HAP,
    name: string,
    apiUrl: string,
    accessoryId: string,
    token: string,
  ) {
    this.log = log;
    this.name = name;
    this.handler = new Handler(apiUrl, accessoryId, token, log);

    this.switchService = new hap.Service.Switch(name);
    this.switchService.getCharacteristic(hap.Characteristic.On)
      .on(
        CharacteristicEventTypes.GET,
        async (callback: CharacteristicGetCallback) => {
          const state = await this.handler.getState();
          if (state) {
            callback(undefined, (state as SwitchState).on);
          }
        },
      )
      .on(
        CharacteristicEventTypes.SET,
        (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
          const on = value as boolean;
          const state: SwitchState = { on };
          this.handler.setState(state);
          callback();
        },
      );

    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Identifier, accessoryId)
      .setCharacteristic(hap.Characteristic.Model, "WebSocket Switch");
  }

  getServices(): Service[] {
    return [
      this.informationService,
      this.switchService,
    ];
  }
}
