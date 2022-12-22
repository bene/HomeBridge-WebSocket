import { OutletState, RawAccessoryState } from "@homebridge-ws/types";

function parseToOutletMessage(raw: RawAccessoryState): OutletState {
  return {
    propB: "",
  };
}

export { OutletState, parseToOutletMessage };
