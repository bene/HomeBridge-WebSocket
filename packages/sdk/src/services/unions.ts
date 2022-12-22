import { OutletState } from "@homebridge-ws/types/services/Outlet";
import { SwitchState } from "@homebridge-ws/types/services/Switch";

type ServiceType = "Switch" | "Outlet";
type ServiceState = SwitchState | OutletState;

export type { ServiceState, ServiceType };
