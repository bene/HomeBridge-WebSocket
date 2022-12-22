# @homebridge-ws/sdk

Use this sdk to build accessories.

## Usage

```typescript
import Client, { SwitchState } from "@homebridge-ws/sdk";

const client = new Client("wss://home.bene.dev");

function onSetState(state: SwitchState) {
  console.log("SetState", state.value);
}

function onGetState(): SwitchState {
  console.log("GetState");
  return { value: true };
}

client.subscribe("Switch", "ACCESSORY_ID", "TOKEN", onSetState, onGetState);
```
