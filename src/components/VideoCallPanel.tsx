"use client";

import React, { useState } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
} from "react-icons/fa";

export function VideoCallPanel({
  localVideoRef,
  localStreamRef,
  remoteVideoRef,
  className,
  socket,
  ChatDrawerComponent,
}: {
  localVideoRef: React.RefObject<HTMLVideoElement | null>;
  localStreamRef: React.RefObject<MediaStream | null>;
  remoteVideoRef: React.RefObject<HTMLVideoElement | null>;
  className?: string;
  socket: WebSocket | null;
  ChatDrawerComponent: React.ReactNode;
}) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const handleMicToggle = () => {
    if (!localStreamRef.current) {
      console.error("Error: localStreamRef.current is null");
      return;
    }
    // Toggle the enabled state of video tracks
    localStreamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = !isMicOn;
    });

    setIsMicOn((prev) => !prev);
  };

  const handleCameraToggle = async () => {
    if (!localStreamRef.current) {
      console.error("Error: localStreamRef.current is null");
      return;
    }
    // Toggle the enabled state of video tracks
    localStreamRef.current.getVideoTracks().forEach((track) => {
      track.enabled = !isCameraOn;
    });

    setIsCameraOn((prev) => !prev);
  };

  const handleEndChat = () => {
    console.log("End chat button pressed");
  };

  const handleJoin = () => {
    if (!socket) {
      console.error("Error: Socket is not initialized. Socket: ", socket);
      return;
    }
    socket.send(JSON.stringify({ type: "join" }));
  };

  const handleShuffle = () => {
    if (!socket) {
      console.error("Error: Socket is not initialized. Socket: ", socket);
      return;
    }
    socket.send(JSON.stringify({ type: "rematch" }));
  };

  return (
    <div
      className={`relative w-full bg-gray-400 rounded-lg overflow-hidden ${className} h-[calc(100vh-120px)]`}
    >
      <div className="h-full w-full">
        <video
          ref={remoteVideoRef}
          className="h-full w-full object-cover"
          autoPlay
          playsInline
        />
      </div>
      <div className="absolute bottom-4 right-4 w-[180px] h-[120px] rounded-lg overflow-hidden border-2 border-white shadow-lg">
        <video
          ref={localVideoRef}
          className="h-full w-full object-cover"
          autoPlay
          playsInline
          muted
        />
      </div>
      {/* Mic and Camera Status */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        {ChatDrawerComponent}
        {/* Mic Toggle Button */}
        <button
          className="w-12 h-12 flex items-center justify-center rounded-full bg-[#38b6ff] text-white"
          aria-label="Toggle Mic"
          onClick={handleMicToggle}
        >
          {isMicOn ? (
            <FaMicrophone
              size={20}
              className="transition-transform duration-300 ease-in-out transform scale-100"
            />
          ) : (
            <FaMicrophoneSlash
              size={20}
              className="transition-transform duration-300 ease-in-out transform scale-100"
            />
          )}
        </button>

        {/* Camera Toggle Button */}
        <button
          className="w-12 h-12 flex items-center justify-center rounded-full bg-[#38b6ff] text-white"
          aria-label="Toggle Camera"
          onClick={handleCameraToggle}
        >
          {isCameraOn ? (
            <FaVideo
              size={20}
              className="transition-transform duration-300 ease-in-out transform scale-100"
            />
          ) : (
            <FaVideoSlash
              size={20}
              className="transition-transform duration-300 ease-in-out transform scale-100"
            />
          )}
        </button>

        {/* End Chat Button */}
        <button
          className="w-20 h-12 flex items-center justify-center rounded-lg bg-[#ff5757] text-white"
          aria-label="End Chat"
          onClick={handleEndChat}
        >
          <FaPhoneSlash size={20} />
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={handleJoin}
        >
          Join
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={handleShuffle}
        >
          Shuffle
        </button>
      </div>
    </div>
  );
}
