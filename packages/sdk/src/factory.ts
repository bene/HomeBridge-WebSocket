import { RawMessage } from "./services/types";
import { ServiceMessage, ServiceType } from "./services/unions";
import { parseToOutletMessage } from "./services/Outlet";
import { parseToSwitchMessage } from "./services/Switch";

class Factory {
  private readonly _entries: Record<
    ServiceType,
    (raw: RawMessage) => ServiceMessage
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
