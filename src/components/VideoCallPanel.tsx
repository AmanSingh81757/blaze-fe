"use client";

import React, { useEffect, useState } from "react";
import { SettingsPopUp } from "./SettingsPopUp";
import { VideoPanelButtons } from "./VideoPanelButtons";
import { VideoPlayer } from "./VideoPlayer";
import { ClientVideoPanelIcons } from "./ClientVideoPanelIcons";
import { UserState } from "@/app/meet/types";

export function VideoCallPanel({
  localVideoRef,
  localStreamRef,
  remoteVideoRef,
  className,
  socket,
  pcRef,
  ChatDrawerComponent,
  changeUserState,
}: {
  localVideoRef: React.RefObject<HTMLVideoElement | null>;
  localStreamRef: React.RefObject<MediaStream | null>;
  remoteVideoRef: React.RefObject<HTMLVideoElement | null>;
  className?: string;
  socket: WebSocket | null;
  pcRef: React.RefObject<RTCPeerConnection | null>;
  ChatDrawerComponent: React.ReactNode;
  changeUserState: (state: UserState) => void;
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
    if (!socket) {
      console.error("Error: Socket is not initialized. Socket: ", socket);
      return;
    }

    socket.send(JSON.stringify({ type: "end" }));

    console.log("End chat button pressed");
  };

  const handleJoin = () => {
    if (!socket) {
      console.error("Error: Socket is not initialized. Socket: ", socket);
      return;
    }
    socket.send(JSON.stringify({ type: "join" }));
    changeUserState(UserState.Waiting);
  };

  const handleShuffle = () => {
    if (!socket) {
      console.error("Error: Socket is not initialized. Socket: ", socket);
      return;
    }
    socket.send(JSON.stringify({ type: "rematch" }));
    changeUserState(UserState.Waiting);
  };

  useEffect(() => {
    const handleKeyPressDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case "m":
          handleMicToggle();
          break;
        case "c":
          handleCameraToggle();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPressDown);
    return () => window.removeEventListener("keydown", handleKeyPressDown);
  }, [localStreamRef, isMicOn, isCameraOn]);

  return (
    <div
      className={`relative group w-full bg-gray-400 rounded-lg overflow-hidden ${className} h-[calc(100vh-120px)]`}
    >
      <div className="absolute top-5 left-5">
        <p className="text-white font-bold opacity-50">Blaze</p>
      </div>
      <div className="h-full w-full group">
        <VideoPlayer videoRef={remoteVideoRef} />
        <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/20 to-transparent opacity-100 transition-opacity duration-300 group-hover:opacity-0 z-10" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/20 to-transparent opacity-100 transition-opacity duration-300 group-hover:opacity-0 z-10" />
      </div>
      <div className="group/local absolute bottom-20 right-4 w-[180px] h-[120px] rounded-lg overflow-hidden border-2 border-white shadow-lg sm:bottom-4 group-hover:bottom-20 sm:group-hover:bottom-6 sm:group-hover:right-6 transition-all duration-300">
        <VideoPlayer videoRef={localVideoRef} muted={true} />
        <ClientVideoPanelIcons isCameraOn={isCameraOn} isMicOn={isMicOn} />
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
        <VideoPanelButtons
          pcRef={pcRef}
          handleJoin={handleJoin}
          handleEndChat={handleEndChat}
          handleShuffle={handleShuffle}
        />
      </div>
    </div>
  );
}
