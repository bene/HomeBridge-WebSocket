import { OutletState, RawAccessoryState } from "@homebridge-ws/types";

function parseToOutletMessage(raw: RawAccessoryState): OutletState {
  if (typeof raw.on !== "boolean") {
    return { on: false };
  }

  return { on: raw.on };
}

export { OutletState, parseToOutletMessage };
