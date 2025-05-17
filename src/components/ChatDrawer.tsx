"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MessageSquare, Send, X } from "lucide-react";

export function ChatDrawer({
  message,
  messages,
  setMessage,
  handleSendMessage,
  socket,
}: {
  message: string;
  messages: ChatMessage[];
  setMessage: (msg: string) => void;
  handleSendMessage: () => void;
  socket: WebSocket | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100); // Small delay to ensure drawer is fully open
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button
          className="w-12 h-12 flex items-center justify-center rounded-full bg-[#38b6ff] text-white md:hidden"
          aria-label="Toggle Chat"
        >
          <MessageSquare
            size={20}
            className="transition-transform duration-300 ease-in-out transform scale-100"
          />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-[85vh] sm:h-[70vh] bg-white">
        <DrawerHeader className="border-b border-gray-300">
          <div className="flex items-center justify-between">
            <DrawerTitle>Chat</DrawerTitle>
            <DrawerClose asChild>
              <button>
                <X className="h-4 w-4" />
              </button>
            </DrawerClose>
          </div>
          <DrawerDescription>
            Chat with your video call participants
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 p-4 overflow-y-auto h-[calc(85vh-180px)] sm:h-[calc(70vh-180px)]">
          <div className="flex flex-col space-y-3">
            {messages.map((message) => (
              <div
                // key={message.id}
                className={`flex ${message.isSelf ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.isSelf
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <DrawerFooter className="border-t pt-2 border-gray-300">
          <div className="flex space-x-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2"
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
