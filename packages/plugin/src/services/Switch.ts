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
    this.name = accessoryId;
    this.handler = new Handler(apiUrl, accessoryId, token);

    this.switchService = new hap.Service.Switch(accessoryId);
    this.switchService.getCharacteristic(hap.Characteristic.On)
      .on(
        CharacteristicEventTypes.GET,
        async (callback: CharacteristicGetCallback) => {
          const state = await this.handler.getState();
          if (state) {
            callback(undefined, (state as SwitchState).value);
          }
        },
      )
      .on(
        CharacteristicEventTypes.SET,
        (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
          const on = value as boolean;
          const state: SwitchState = { value: on };
          this.handler.setState(state);
          callback();
        },
      );

    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, "Custom Manufacturer")
      .setCharacteristic(hap.Characteristic.Model, "Custom Model");
  }

  getServices(): Service[] {
    return [
      this.informationService,
      this.switchService,
    ];
  }
}
