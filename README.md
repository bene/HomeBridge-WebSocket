# HomeBridge-WebSocket

Forwards events from HomeBridge to your device to quickly build accessories
without worrying about communication.

## Usage

To get started the `HomeBridge-WebSocket` server must be hosted. You can host it
in the cloud for simplicity or locally for shorter response times and higher
privacy.

### Register an accessory in your plugin config

After hosting s server and installing the plugin in HomeBridge, add an accessory
to the config.

```json
{
  "host": "wss://home.bene.dev",
  "token": "SERVER_TOKEN",
  "accessories": [
    {
      "service": "Switch",
      "accessory": "ExampleSwitch",
      "name": "PiSwitch",
      "id:": "SOME_UNIQUE_ID",
      "token": "SOME_RANDOM_TOKEN"
    }
  ]
}
```

### Implement a client

To receive events on your client (e.g. Raspberry Pi) use the TypeScript SDK.

```typescript
import Client from "./client.ts";

const client = new Client("https://home.bene.dev");

client.subscribe("SOME_UNIQUE_ID", "SOME_RANDOM_TOKEN", (msg) => {
  // Set GPIO
});
```

## Supported service types

See [here](./SUPPORT.md) which service types are supported.
