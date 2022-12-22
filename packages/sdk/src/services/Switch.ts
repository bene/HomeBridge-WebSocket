import { RawMessage } from "./types";

type SwitchState = {
  value: boolean;
};

function parseToSwitchMessage(raw: RawMessage): SwitchState {
  return {
    value: true,
  };
}

export { parseToSwitchMessage, SwitchState };
