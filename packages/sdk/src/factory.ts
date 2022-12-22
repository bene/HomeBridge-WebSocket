import { RawAccessoryState } from "@homebridge-ws/types/index";

import { ServiceState, ServiceType } from "./services/unions";
import { parseToOutletMessage } from "./services/Outlet";
import { parseToSwitchMessage } from "./services/Switch";

class Factory {
  private readonly _entries: Record<
    ServiceType,
    (raw: RawAccessoryState) => ServiceState
  >;

  constructor() {
    this._entries = {
      Switch: parseToSwitchMessage,
      Outlet: parseToOutletMessage,
    };
  }

  get(service: ServiceType) {
    return this._entries[service];
  }
}

export { Factory };
