interface BaseMessage {
  type: "message" | "matched" | "disconnected";
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

type WebSocketMessage = ChatMessage | MatchedMessage | DisconnectedMessage;
