import Client from "../src/client";
import { SwitchState } from "../src/services/Switch";

const client = new Client("ws://localhost:3000", "TOKEN");
const state: SwitchState = { value: false };

client.subscribe("Switch", "ACCESSORY_ID", "TOKEN", (msg) => {
  console.log("SetState");
  state.value = msg.value;
}, () => {
  console.log("GetState");
  return state;
});
