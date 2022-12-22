import { RawAccessoryState, SwitchState } from "@homebridge-ws/types";

function parseToSwitchMessage(raw: RawAccessoryState): SwitchState {
  if (typeof raw.on !== "boolean") {
    return { on: false };
  }

  return { on: raw.on };
}

export { parseToSwitchMessage, SwitchState };
