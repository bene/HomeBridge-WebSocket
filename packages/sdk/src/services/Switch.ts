import { RawAccessoryState } from "@homebridge-ws/types";
import { SwitchState } from "@homebridge-ws/types/services/Switch";

function parseToSwitchMessage(raw: RawAccessoryState): SwitchState {
  return {
    value: true,
  };
}

export { parseToSwitchMessage, SwitchState };
