import { RawMessage } from "./types";

type OutletMessage = {
  propB: string;
};

function parseToOutletMessage(raw: RawMessage): OutletMessage {
  return {
    propB: "",
  };
}

export { OutletMessage, parseToOutletMessage };
