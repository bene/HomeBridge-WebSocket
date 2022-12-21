import Client from "../src/client";

const client = new Client("wss://home.bene.dev", "TOKEN");

client.subscribe("Outlet", "ACCESSORY_ID", "TOKEN", (msg) => {
  // Set GPIO
  console.log(msg.propB);
});
