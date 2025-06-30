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
import { ChatMessage, UserState } from "@/app/meet/types";

export function ChatDrawer({
  message,
  messages,
  setMessage,
  handleSendMessage,
  socket,
  userDataState
}: {
  message: string;
  messages: ChatMessage[];
  setMessage: (msg: string) => void;
  handleSendMessage: () => void;
    socket: WebSocket | null;
  userDataState: UserState | undefined
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
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 hover:opacity-90 text-white md:hidden cursor-pointer"
          aria-label="Toggle Chat"
        >
          <MessageSquare size={20} />
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
        {userDataState === UserState.Matched ? (
          <>
            <div className="flex-1 p-4 overflow-y-auto h-[calc(85vh-180px)] sm:h-[calc(70vh-180px)]">
              <div className="flex flex-col space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isSelf ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        message.isSelf
                          ? "bg-purple-500 text-white rounded-br-none"
                          : "bg-purple-200 text-gray-800 rounded-bl-none"
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
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-md"
                  onClick={handleSendMessage}
                  disabled={
                    message.trim() === "" ||
                    socket?.readyState !== WebSocket.OPEN
                  }
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </DrawerFooter>
          </>
        ) : (
          <div className="flex-1 p-4 overflow-y-auto h-[calc(85vh-180px)]">
            <p className="text-gray-500 text-center items-center justify-center flex h-full">
              {userDataState === UserState.Connected &&
                "Join a call to start chatting!"}
              {userDataState === UserState.Waiting &&
                "Waiting to connect to someone"}
              {userDataState === UserState.Disconnected &&
                "Could not connect at the moment. Please refresh"}
            </p>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
