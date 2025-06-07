// import { PhoneOff, SkipForward, Phone } from "lucide-react";
import { UserState } from "@/app/meet/types";

export function VideoPanelButtons({
  pcRef,
  handleJoin,
  handleEndChat,
  handleShuffle,
  userDataState,
}: {
  pcRef: React.RefObject<RTCPeerConnection | null>;
  handleJoin: () => void;
  handleEndChat: () => void;
  handleShuffle: () => void;
  userDataState: UserState | undefined;
}) {
  return (
    <>
      {userDataState !== UserState.Matched && userDataState !== UserState.Waiting ? (
        <button
          className="w-12 h-12 px-8 font-semibold flex items-center justify-center rounded-lg bg-blue-500 hover:opacity-90 text-white cursor-pointer"
          aria-label="Join Chat"
          onClick={handleJoin}
          disabled={userDataState === UserState.Disconnected}
        >
          {/* <Phone size={20} /> */}
          Join
        </button>
      ) : (
        <button
          className="w-12 h-12 px-8  flex font-semibold  items-center justify-center rounded-lg bg-[#ff1313] hover:opacity-90 text-white cursor-pointer"
          aria-label="End Chat"
          onClick={handleEndChat}
        >
            {/* <PhoneOff size={20} /> */}
            {userDataState === UserState.Matched ? "End" : "Stop"}
        </button>
      )}
      {userDataState === UserState.Matched && (
        <button
          className="w-12 h-12 px-8 flex font-semibold  items-center justify-center rounded-lg bg-blue-500 hover:opacity-90 text-white cursor-pointer"
          aria-label="Skip Forward"
          onClick={handleShuffle}
        >
          {/* <SkipForward
          size={20}
        /> */}
          Skip
        </button>
      )}
    </>
  );
}
