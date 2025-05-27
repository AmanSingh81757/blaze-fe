import { MicOff, VideoOff } from "lucide-react";

export function ClientVideoPanelIcons({
  isMicOn,
  isCameraOn,
}: {
  isMicOn: boolean;
  isCameraOn: boolean;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/local:opacity-100 transition-opacity duration-300">
      <div className="flex items-center space-x-2">
        {isMicOn && (
          <div className="bg-red-600 rounded-full p-1">
            <MicOff size={14} className="text-white" />
          </div>
        )}
        {isCameraOn && (
          <div className="bg-red-600 rounded-full p-1">
            <VideoOff size={14} className="text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
