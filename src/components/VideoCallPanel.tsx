import React, { useState } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
} from "react-icons/fa";

export function VideoCallPanel({
  socket,
  localVideoRef,
  localStreamRef,
  remoteVideoRef,
  startCamera,
  pcRef,
  className,
}: {
  socket: WebSocket | null;
  localVideoRef: React.RefObject<HTMLVideoElement | null>;
  localStreamRef: React.RefObject<MediaStream | null>;
  remoteVideoRef: React.RefObject<HTMLVideoElement | null>;
  startCamera: (
    localVideoRef: React.RefObject<HTMLVideoElement>,
    localStreamRef: React.RefObject<MediaStream | null>,
  ) => Promise<void>;
  pcRef: React.RefObject<RTCPeerConnection | null>;
  className?: string;
}) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const handleMicToggle = () => {
    setIsMicOn((prev) => !prev);
    console.log("Mic toggled:", !isMicOn);
  };

  const handleCameraToggle = async () => {
    if (isCameraOn) {
      if (localStreamRef.current) {
        localStreamRef.current.getVideoTracks().forEach((track) => {
          track.stop();
          console.log("Video track stopped.");
        });
      }
      resetRemoteVideo();
    } else {
      try {
        await startCamera(localVideoRef, localStreamRef);

        // Reconnect remote video if needed
        if (remoteVideoRef.current && pcRef.current) {
          const remoteStreams = pcRef.current
            .getReceivers()
            .map(
              (receiver) => receiver.track?.kind === "video" && receiver.track,
            );
          if (remoteStreams.length > 0) {
            remoteVideoRef.current.srcObject = new MediaStream(
              remoteStreams.filter(Boolean),
            );
            console.log("Remote video reconnected.");
          }
        }
        console.log("Camera started.");
      } catch (error) {
        console.error("Error starting camera:", error);
      }
    }
    setIsCameraOn((prev) => !prev);
    console.log("Camera toggled:", !isCameraOn);
  };

  const resetRemoteVideo = () => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null; // Clear the video stream
      console.log("Remote video reset to default screen.");
    }
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
    <section className={`flex flex-col h-full w-full p-2 gap-2 ${className}`}>
      <div className="relative flex-1 bg-gray-400 min-h-450px rounded-2xl overflow-hidden">
        <video
          ref={remoteVideoRef}
          className="absolute inset-0 w-full h-full object-cover border-2 border-white rounded-lg"
          autoPlay
        />
        <video
          ref={localVideoRef}
          className="absolute bottom-4 right-4 w-32 h-32 object-cover border-2 border-white rounded-lg"
          autoPlay
          muted
        />
        {/* Mic and Camera Status */}
        <div className="absolute bottom-4 left-4 flex gap-4">
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
        </div>
      </div>
      <div className="flex justify-between">
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
    </section>
  );
}
