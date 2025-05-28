export function VideoPlayer({
    videoRef, muted
}: {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    muted?: boolean;
  }) {
  console.log(videoRef)
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