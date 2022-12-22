import { RawAccessoryState } from "@homebridge-ws/types";
import { OutletState } from "@homebridge-ws/types/services/Outlet";

function parseToOutletMessage(raw: RawAccessoryState): OutletState {
  return {
    propB: "",
  };
}

export { OutletState, parseToOutletMessage };
