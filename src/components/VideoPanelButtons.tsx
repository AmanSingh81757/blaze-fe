// import { PhoneOff, SkipForward, Phone } from "lucide-react";
import { UserState } from "@/app/meet/types";

export function VideoPanelButtons({
  handleJoin,
  handleEndChat,
  handleShuffle,
  userDataState,
}: {
  handleJoin: () => void;
  handleEndChat: () => void;
  handleShuffle: () => void;
  userDataState: UserState | undefined;
}) {
  return (
    <div className="flex gap-4">
      {userDataState !== UserState.Matched &&
      userDataState !== UserState.Waiting ? (
        <button
          className="px-6 py-3 font-semibold rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          aria-label="Join Chat"
          onClick={handleJoin}
          disabled={userDataState === UserState.Disconnected}
        >
          Join
        </button>
      ) : (
        <button
          className="px-5 py-3 font-semibold rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          aria-label="End Chat"
          onClick={handleEndChat}
        >
          {userDataState === UserState.Matched ? "End" : "Stop"}
        </button>
      )}
      {userDataState === UserState.Matched && (
        <button
          className="px-6 py-3 font-semibold rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          aria-label="Skip Forward"
          onClick={handleShuffle}
        >
          Skip
        </button>
      )}
    </div>
  );
}
