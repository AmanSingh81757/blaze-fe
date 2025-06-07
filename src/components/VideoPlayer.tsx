export function VideoPlayer({
    videoRef, muted
}: {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    muted?: boolean;
  }) {

  // pass the state as prop here and show different video player based on the state
    return (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
            playsInline
            muted={muted}
        />
    )
}