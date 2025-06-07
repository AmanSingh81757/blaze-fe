export interface BaseMessage {
  type:
    | "message"
    | "matched"
    | "disconnected"
    | "peer_disconnected"
    | "ice-candidate"
    | "sdp-offer"
    | "sdp-answer";
}

export interface ChatMessage extends BaseMessage {
  type: "message";
  message: string;
  isSelf: boolean;
}

export interface MatchedMessage extends BaseMessage {
  type: "matched";
  client: UserData;
}

export interface DisconnectedMessage extends BaseMessage {
  type: "disconnected";
}

export interface PeerDisconnectedMessage extends BaseMessage {
  type: "peer_disconnected";
}

export interface IceCandidateMessage extends BaseMessage {
  type: "ice-candidate";
  data: RTCIceCandidateInit;
}

export interface SDPMessage extends BaseMessage {
  type: "sdp-offer";
  data: RTCSessionDescriptionInit;
}

export interface SDPAnswerMessage extends BaseMessage {
  type: "sdp-answer";
  data: RTCSessionDescriptionInit;
}

export type WebSocketMessage =
  | ChatMessage
  | MatchedMessage
  | DisconnectedMessage
  | PeerDisconnectedMessage
  | IceCandidateMessage
  | SDPMessage
  | SDPAnswerMessage;

export enum UserState {
  Connected = "connected",
  Waiting = "waiting",
  Matched = "matched",
  Disconnected = "disconnected",
}

export interface UserData {
  id: number;
  uuid: string;
  username: string;
  token: string;
  state: UserState;
}
