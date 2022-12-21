import Client from "../src/client";

const client = new Client("wss://home.bene.dev", "TOKEN");

client.subscribe("ACCESSORY_ID", "TOKEN", (msg) => {
  // Set GPIO
});
