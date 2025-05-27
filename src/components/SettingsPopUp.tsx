import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Video, VideoOff, Mic, MicOff, Layout, SettingsIcon } from "lucide-react";

export function SettingsPopUp({
  isMicOn,
  isCameraOn,
  handleMicToggle,
  handleCameraToggle,
}: {
  isMicOn: boolean;
  isCameraOn: boolean;
  handleMicToggle: () => void;
  handleCameraToggle: () => void;
}) {
  const [displayMode, setDisplayMode] = useState<"split" | "meet">("meet");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button><SettingsIcon size={20} className="text-gray-600 hover:cursor-pointer"/></button>
      </DialogTrigger>
      <DialogContent className="w-sm">
        <DialogHeader>
          <DialogTitle>Video Settings</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <button
            onClick={handleMicToggle}
            className="flex items-center justify-start gap-2"
          >
            {isMicOn ? (
              <Mic className="w-5 h-5" />
            ) : (
              <MicOff className="w-5 h-5" />
            )}
            {isMicOn ? "Mute Microphone" : "Unmute Microphone"}
          </button>
          <button
            onClick={handleCameraToggle}
            className="flex items-center justify-start gap-2"
          >
            {isCameraOn ? (
              <Video className="w-5 h-5" />
            ) : (
              <VideoOff className="w-5 h-5" />
            )}
            {isCameraOn ? "Disable Camera" : "Enable Camera"}
          </button>
          <button
            onClick={() =>
              setDisplayMode((prev) => (prev === "meet" ? "split" : "meet"))
            }
            className="flex items-center justify-start gap-2"
          >
            <Layout className="w-5 h-5" />
            Switch to {displayMode === "meet" ? "Split" : "Meet"} Layout
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
