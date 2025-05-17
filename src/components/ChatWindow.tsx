import React from "react";
import { useRef, useEffect } from "react";
import { Send } from "lucide-react"

export function ChatWindow({
  messages,
  message,
  setMessage,
  handleSendMessage,
  socket,
  className,
}: {
  messages: ChatMessage[];
  message: string;
  setMessage: (msg: string) => void;
  handleSendMessage: () => void;
  socket: WebSocket | null;
  className?: string;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <section
      className={`bg-white rounded-lg shadow flex flex-col gap-2 ${className} h-[calc(100vh-120px)]`}
    >
      <div className="p-3 border-b border-gray-300">
        <h2 className="font-semibold">Chat</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col space-y-3">
          {messages.map((message, index) => (
            <div
              key={index}
              ref={message.isSelf ? null : messagesEndRef}
              className={`flex ${message.isSelf ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-xl ${
                  message.isSelf
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{message.message}</p>
              </div>
            </div>
          ))}
          {/* <div ref={messagesEndRef} /> */}
        </div>
      </div>
      <div className="flex justify-between gap-2 border-t border-gray-300 p-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Type a message..."
          className="rounded p-2 w-full"
        />
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
          onClick={handleSendMessage}
          disabled={
            message.trim() === "" || socket?.readyState !== WebSocket.OPEN
          }
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
