import { UserData } from "@/app/meet/types";

export function ConnectionDetails({
  client,
  target,
}: {
  client: UserData | null;
  target: UserData | null;
}) {
  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-[#dcebff] via-[#ebdcfb] via-[#fbe5f0] to-[#f7faff] text-gray-800 px-6 py-2 shadow-md">
      <div className="flex w-full justify-between items-center gap-6 text-sm md:text-base">
        <div className="flex flex-col text-right truncate max-w-[150px] text-ellipsis overflow-hidden">
          <span className="font-medium">You</span>
          <span className="opacity-80 ">{client?.username || "—"}</span>
        </div>
        <div className="border-l border-gray-600 h-6 opacity-40"></div>
        <div className="flex flex-col text-right truncate max-w-[150px] text-ellipsis overflow-hidden">
          <span className="font-medium">Connected with</span>
          <span className="opacity-80">{target?.username || "Waiting..."}</span>
        </div>
      </div>
    </nav>
  );
}
