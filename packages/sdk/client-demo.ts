import Client from "./client.ts";

const client = new Client("");

client.subscribe("ACCESSORY_ID", "TOKEN", (msg) => {
  // Set GPIO
});
