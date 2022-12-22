type RawAccessoryState = Record<string, unknown>;

type SetStateRequest = {
  _type: "SetStateRequest";
  state: RawAccessoryState;
};

type GetStateRequest = {
  _type: "GetStateRequest";
  id: string;
};

type GetStateResponse = {
  _type: "GetStateResponse";
  id: string;
  state: RawAccessoryState | null;
};

type BridgeEvent = { accessoryId: string };
type SetStateBridgeRequest = SetStateRequest & BridgeEvent;
type GetStateBridgeRequest = GetStateRequest & BridgeEvent;
type GetStateBridgeResponse = GetStateResponse & BridgeEvent;

export type {
  GetStateBridgeRequest,
  GetStateBridgeResponse,
  GetStateRequest,
  GetStateResponse,
  RawAccessoryState,
  SetStateBridgeRequest,
  SetStateRequest,
};
