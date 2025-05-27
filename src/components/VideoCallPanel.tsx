"use client";

import React, { useState } from "react";
import {
  FaPhoneSlash,
} from "react-icons/fa";
import { SettingsPopUp } from "./SettingsPopUp";

export function VideoCallPanel({
  localVideoRef,
  localStreamRef,
  remoteVideoRef,
  className,
  socket,
  pcRef,
  ChatDrawerComponent,
}: {
  localVideoRef: React.RefObject<HTMLVideoElement | null>;
  localStreamRef: React.RefObject<MediaStream | null>;
  remoteVideoRef: React.RefObject<HTMLVideoElement | null>;
  className?: string;
  socket: WebSocket | null;
  pcRef: React.RefObject<RTCPeerConnection | null>;
  ChatDrawerComponent: React.ReactNode;
}) {
  console.log(pcRef);
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
      className={`relative group w-full bg-gray-400 rounded-lg overflow-hidden ${className} h-[calc(100vh-120px)]`}
    >
      <div className="absolute top-5 left-5"><p className="text-white font-bold opacity-50">Blaze</p></div>
      <div className="h-full w-full group">
        <video
          ref={remoteVideoRef}
          className="h-full w-full object-cover"
          autoPlay
          playsInline
        />
        <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/20 to-transparent opacity-100 transition-opacity duration-300 group-hover:opacity-0 z-10" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/20 to-transparent opacity-100 transition-opacity duration-300 group-hover:opacity-0 z-10" />
      </div>
      <div className="absolute bottom-20 right-4 w-[180px] h-[120px] rounded-lg overflow-hidden border-2 border-white shadow-lg sm:bottom-4 group-hover:bottom-20 sm:group-hover:bottom-6 sm:group-hover:right-6 transition-all duration-300">
        <video
          ref={localVideoRef}
          className="h-full w-full object-cover"
          autoPlay
          playsInline
          muted
        />
      </div>
      <div className="absolute top-5 sm:top-0 sm:opacity-0 right-5 group-hover:top-5 group-hover:opacity-100 transition-all duration-300">
        <SettingsPopUp
          isMicOn={isMicOn}
          isCameraOn={isCameraOn}
          handleMicToggle={handleMicToggle}
          handleCameraToggle={handleCameraToggle}
        />
      </div>
      <div className="absolute bottom-6 sm:bottom-0 sm:opacity-0 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 group-hover:bottom-6 group-hover:opacity-100 transition-all duration-300">
        {ChatDrawerComponent}
        {pcRef.current == null ? (
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
            aria-label="Join Chat"
            onClick={handleJoin}
          >
            Join
          </button>
        ) : (
          <button
            className="w-20 h-12 flex items-center justify-center rounded-lg bg-[#ff1313] text-white"
            aria-label="End Chat"
            onClick={handleEndChat}
          >
            <FaPhoneSlash size={20} />
          </button>
        )}
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
