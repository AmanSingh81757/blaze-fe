export interface BaseMessage {
  type:
    | "message"
    | "matched"
    | "disconnected"
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
  client_id: string;
}

export interface DisconnectedMessage extends BaseMessage {
  type: "disconnected";
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
  | IceCandidateMessage
  | SDPMessage
  | SDPAnswerMessage;

export interface UserData {
  id: number;
  uuid: string;
  username: string;
  token: string;
}
