## 1. Register an accessory in your plugin config:

```json
{
  "host": "home.bene.dev",
  "token": "",
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

## 2. Implement a client

```typescript
import Client from "./client.ts";

const client = new Client("https://home.bene.dev");

client.subscribe("SOME_UNIQUE_ID", "SOME_RANDOM_TOKEN", (msg) => {
  // Set GPIO
});
```
