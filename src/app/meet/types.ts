interface BaseMessage {
  type:
    | "message"
    | "matched"
    | "disconnected"
    | "ice-candidate"
    | "sdp-offer"
    | "sdp-answer";
}

interface ChatMessage extends BaseMessage {
  type: "message";
  message: string;
}

interface MatchedMessage extends BaseMessage {
  type: "matched";
  client_id: string;
}

interface DisconnectedMessage extends BaseMessage {
  type: "disconnected";
}

interface IceCandidateMessage extends BaseMessage {
  type: "ice-candidate";
  data: RTCIceCandidateInit;
}

interface SDPMessage extends BaseMessage {
  type: "sdp-offer";
  data: RTCSessionDescriptionInit;
}

interface SDPAnswerMessage extends BaseMessage {
  type: "sdp-answer";
  data: RTCSessionDescriptionInit;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type WebSocketMessage =
  | ChatMessage
  | MatchedMessage
  | DisconnectedMessage
  | IceCandidateMessage
  | SDPMessage
  | SDPAnswerMessage;
