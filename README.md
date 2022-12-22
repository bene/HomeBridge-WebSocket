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
  "apiUrl": "wss://home.bene.dev",
  "name": "HomeBridgeWebSocket",
  "platform": "HomeBridgeWebSocket",
  "accessories": [
    {
      "service": "Switch",
      "id": "Switch-000",
      "token": "SOME_RANDOM_TOKEN",
      "name": "PiSwitch"
    }
  ]
}
```

### Implement a client

To receive events on your client (e.g. Raspberry Pi) use the TypeScript SDK.

```typescript
import Client from "@homebridge-ws/sdk";
import { SwitchState } from "@homebridge-ws/types";

const client = new Client("wss://home.bene.dev");

let isOn = true;

function onSetState(state: SwitchState) {
  console.log("SetState", state);
  isOn = state.on;
  // Example: Set GPIO on Raspberry Pi
}

function onGetState(): SwitchState {
  console.log("GetState", { on: isOn });
  return { on: isOn };
}

client.subscribe(
  "Switch",
  "Switch-000",
  "SOME_RANDOM_TOKEN",
  onSetState,
  onGetState,
);
```

## Supported service types

See [here](./SUPPORT.md) which service types are supported.
