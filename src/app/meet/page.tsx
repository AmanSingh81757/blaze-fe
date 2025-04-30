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
      const parsedData = JSON.parse(event.data);
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
          console.warn("Unknown message type:", parsedData.type);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  const handleSendMessage = () => {
    if (socket && message) {
      console.log(
        "Sending message:",
        JSON.stringify({ type: "message", message: message })
      );
      socket.send(JSON.stringify({ type: "message", message: message }));
      setMessage("");
    }
  };

  useEffect(() => {
    const id = initiateClientId();
    setClientID(id);
    return () => {
      if (socket) {
        socket.send(JSON.stringify({ type: "disconnect" }));
        socket.close();
      }
    };
  }, [socket]);
  return (
    <section className="h-screen w-screen flex flex-col px-6">
      <ConnectionDetails clientID={clientID} targetID={targetID} />
      <div className="grid grid-cols-7 justify-between items-start w-full flex-grow bg-blue-100">
        <VideoCallPanel
          className="col-span-5"
          clientID={clientID}
          socket={socket}
          setSocket={setSocket}
          setMessages={setMessages}
          setTargetID={setTargetID}
          handleReceiveMessage={handleReceiveMessage}
        />
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
