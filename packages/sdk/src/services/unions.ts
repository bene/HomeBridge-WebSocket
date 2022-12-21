import { OutletMessage } from "./Outlet";
import { SwitchMessage } from "./Switch";

type ServiceType = "Switch" | "Outlet";
type ServiceMessage = SwitchMessage | OutletMessage;

export type { ServiceMessage, ServiceType };
