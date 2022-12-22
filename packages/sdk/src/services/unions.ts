import { OutletState, SwitchState } from "@homebridge-ws/types";

type ServiceType = "Switch" | "Outlet";
type ServiceState = SwitchState | OutletState;

export type { ServiceState, ServiceType };
