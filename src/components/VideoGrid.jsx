import { VideoOff } from "lucide-react";
import VideoCard from "./VideoCard.jsx";

export default function VideoGrid({
  videos,
  onOpen,
  subscriptions,
  onSubscribe,
  savedVideos,
  onSave,
}) {
  if (videos.length === 0) {
    return (
      <div className="flex min-h-[45vh] flex-col items-center justify-center text-center">
        <VideoOff className="mb-4 text-neutral-500" size={42} strokeWidth={1.4} />
        <h2 className="text-xl font-semibold">No videos found</h2>
        <p className="mt-2 text-sm text-neutral-400">
          Try a different search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-9 pb-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {videos.map((video, index) => (
        <VideoCard
          isSubscribed={subscriptions.includes(video.channel)}
          isSaved={savedVideos.includes(video.id)}
          key={video.id}
          onOpen={onOpen}
          onSave={() => onSave(video.id)}
          onSubscribe={() => onSubscribe(video.channel)}
          video={video}
        />
      ))}
    </div>
  );
}
