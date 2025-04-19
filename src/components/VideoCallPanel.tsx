export function VideoCallPanel({
  socket,
  className,
}: {
  socket: WebSocket | null;
  className?: string;
}) {
  const handleJoin = () => {
    if (socket) {
      socket.send(JSON.stringify({ type: "join" }));
    }
  };

  const handleShuffle = () => {
    if (socket) {
      socket.send(JSON.stringify({ type: "rematch" }));
    }
  };

  return (
    <section
      className={`flex flex-col h-full w-full p-2 gap-2 ${className}`}
    >
      <div className="flex-1 bg-gray-400 flex items-center justify-center min-h-450px rounded-2xl">
        <p className="text-white text-lg font-bold">Video Player Placeholder</p>
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
