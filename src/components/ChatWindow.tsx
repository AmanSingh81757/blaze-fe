export function ChatWindow({
  messages,
  message,
  setMessage,
  handleSendMessage,
  className,
}: {
  messages: string[];
  message: string;
  setMessage: (msg: string) => void;
  handleSendMessage: () => void;
  className?: string;
}) {
  return (
    <section
      className={`flex flex-col h-full w-full p-2 gap-2 ${className}`}
    >
      <div className="flex-1 overflow-y-auto border shadow-md p-4 min-h-450px bg-gray-300 rounded-2xl">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <p className="text-gray-800">{message}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="border rounded p-2 w-full"
        />
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleSendMessage}>Send</button>
      </div>
    </section>
  );
}
