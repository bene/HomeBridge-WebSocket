import { RawMessage } from "./types";

type SwitchMessage = {
  propA: string;
};

function parseToSwitchMessage(raw: RawMessage): SwitchMessage {
  return {
    propA: "",
  };
}

export { parseToSwitchMessage, SwitchMessage };
