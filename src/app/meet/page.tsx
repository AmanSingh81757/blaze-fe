"use client";
import { ChatWindow } from "@/components/ChatWindow";
import { VideoCallPanel } from "@/components/VideoCallPanel";
import { useState, useEffect } from "react";
import { initiateClientId } from "@/utils/client";
import { ConnectionDetails } from "@/components/ConnectionDetails";

export default function Meet() {
  const [clientID, setClientID] = useState("");
  const [targetID, setTargetID] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleReceiveMessage = (event: MessageEvent) => {
    try {
      const parsedData = JSON.parse(event.data) as WebSocketMessage;
      console.log("Received JSON Parsed as:", parsedData);

      switch (parsedData.type) {
        case "message":
          setMessages((prevMessages) => [...prevMessages, parsedData.message]);
          break;
        case "matched":
          setMessages([]);
          setTargetID(parsedData.client_id);
          break;
        case "disconnected":
          setMessages([]);
          setTargetID("");
          break;
        default:
          console.warn("Unknown message type:", parsedData);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      console.error("Message is empty");
      return;
    }
    const msg: WebSocketMessage = {
      type: "message",
      message: message,
    };
    sendMessage(msg);
    setMessage("");
  };

  const sendMessage = (msg: WebSocketMessage) => {
    if (!socket) {
      console.error("WebSocket is not connected");
      return;
    }
    if (socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open");
      return;
    }
    console.log("Sending message:", JSON.stringify(msg));
    socket.send(JSON.stringify(msg));
  };

  useEffect(() => {
    const id = initiateClientId();
    setClientID(id);

    const ws = new WebSocket("ws://localhost:8080/ws");
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      ws.send(JSON.stringify({ type: "identity", id: id }));
    };

    ws.onclose = () => {
      ws.send(JSON.stringify({ type: "disconnected" }));
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onmessage = handleReceiveMessage;

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "disconnect" }));
        socket.close();
      }
    };
  }, []);
  return (
    <section className="h-screen w-screen flex flex-col px-6">
      <ConnectionDetails clientID={clientID} targetID={targetID} />
      <div className="grid grid-cols-7 justify-between items-start w-full flex-grow bg-blue-100">
        <VideoCallPanel className="col-span-5" socket={socket} />
        <ChatWindow
          className="col-span-2"
          message={message}
          messages={messages}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </section>
  );
}
