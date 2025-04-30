export function VideoCallPanel({
  clientID,
  socket,
  setSocket,
  setMessages,
  setTargetID,
  handleReceiveMessage,
  className,
}: {
  clientID: string;
  socket: WebSocket | null;
  setSocket: (ws: WebSocket) => void;
  setMessages: (messages: string[]) => void;
  setTargetID: (id: string) => void;
  handleReceiveMessage: (event: MessageEvent) => void;
  className?: string;
}) {
  const handleConnect = () => {
    try {
      if (socket && socket.readyState === WebSocket.OPEN) {
        return;
      }
      const ws = new WebSocket("ws://localhost:8080/ws");

      ws.onopen = () => {
        console.log("Connected to WebSocket");
        ws.send(JSON.stringify({ type: "identity", id: clientID }));
      };

      ws.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          console.log("Received JSON Parsed as:", parsedData);

          switch (parsedData.type) {
            case "message":
              handleReceiveMessage(event);
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

      ws.onclose = () => {
        ws.send(JSON.stringify({ type: "disconnected" }));
        console.log("WebSocket connection closed");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      setSocket(ws);
    } catch (e) {
      console.error("WebSocket error:", e);
    }
  };

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
          onClick={handleConnect}
        >
          Connect
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
    </section>
  );
}
