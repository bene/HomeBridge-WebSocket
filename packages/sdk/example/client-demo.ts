import Client from "../src/client";
import { SwitchState } from "../src/services/Switch";

const client = new Client("wss://home.bene.dev", "TOKEN");
const state: SwitchState = { value: false };

client.subscribe("Switch", "ACCESSORY_ID", "TOKEN", (msg) => {
  state.value = msg.value;
}, () => {
  return state;
});
