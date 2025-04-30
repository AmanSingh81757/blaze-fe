export function ConnectionDetails({
  clientID,
  targetID,
}: {
  clientID: string;
  targetID: string;
}) {
  return (
    <div className="p-4 flex flex-col">
      <h2 className="text-xl font-semibold">Connection Details or navbar in future</h2>
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-row justify-between items-center text-gray-700">
        <p>Your ID: {clientID}</p>
        <p>Connected to ID: {targetID}</p>
      </div>
    </div>
  );
}
