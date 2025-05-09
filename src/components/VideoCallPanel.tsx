import React from "react";

export function VideoCallPanel({
  socket,
  localVideoRef,
  remoteVideoRef,
  className,
}: {
  socket: WebSocket | null;
  localVideoRef: React.RefObject<HTMLVideoElement | null>;
  remoteVideoRef: React.RefObject<HTMLVideoElement | null>;
  className?: string;
}) {
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
