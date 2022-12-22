import { RawMessage } from "./types";

type OutletState = {
  propB: string;
};

function parseToOutletMessage(raw: RawMessage): OutletState {
  return {
    propB: "",
  };
}

export { OutletState, parseToOutletMessage };
