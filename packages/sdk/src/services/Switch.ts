import { RawAccessoryState, SwitchState } from "@homebridge-ws/types";

function parseToSwitchMessage(raw: RawAccessoryState): SwitchState {
  return {
    value: true,
  };
}

export { parseToSwitchMessage, SwitchState };
