import { Bookmark, Check, ThumbsDown, ThumbsUp, X } from "lucide-react";

export default function VideoPlayer({
  video,
  onClose,
  liked,
  onLike,
  saved,
  onSave,
  subscribed,
  onSubscribe,
}) {
  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-8"
      onClick={onClose}
      role="presentation"
    >
      <section
        aria-label={video.title}
        aria-modal="true"
        className="relative max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-[#181818] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="Close video"
          className="icon-button absolute right-3 top-3 z-10 bg-black/60"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <div className="aspect-video w-full bg-black">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
            referrerPolicy="strict-origin-when-cross-origin"
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
          />
        </div>
        <div className="p-4 sm:p-6">
          <h2 className="text-lg font-bold sm:text-xl">{video.title}</h2>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-black"
                style={{ backgroundColor: video.color }}
              >
                {video.avatar}
              </span>
              <div>
                <p className="font-semibold">{video.channel}</p>
                <p className="text-xs text-neutral-400">Creator</p>
              </div>
              <button
                className={`ml-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  subscribed
                    ? "bg-[#3f3f3f] text-white hover:bg-[#4a4a4a]"
                    : "bg-white text-black hover:bg-neutral-200"
                }`}
                onClick={onSubscribe}
              >
                {subscribed ? (
                  <span className="flex items-center gap-1.5">
                    <Check size={15} /> Subscribed
                  </span>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex overflow-hidden rounded-full bg-[#272727]">
                <button
                  aria-label={liked ? "Unlike video" : "Like video"}
                  aria-pressed={liked}
                  className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#3f3f3f] ${
                    liked ? "text-blue-400" : ""
                  }`}
                  onClick={onLike}
                >
                  <ThumbsUp size={18} /> {liked ? "Liked" : video.views}
                </button>
                <span className="my-2 border-l border-[#454545]" />
                <button
                  aria-label="Dislike video"
                  className="px-3 hover:bg-[#3f3f3f]"
                >
                  <ThumbsDown size={18} />
                </button>
              </div>
              <button
                aria-label={saved ? "Remove from saved videos" : "Save video"}
                aria-pressed={saved}
                className={`icon-button bg-[#272727] ${
                  saved ? "text-blue-400" : ""
                }`}
                onClick={onSave}
              >
                <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
          <div className="mt-5 rounded-xl bg-[#272727] p-4 text-sm">
            <p className="mb-2 font-semibold">
              {video.views} <span className="px-1">·</span> {video.age}
            </p>
            <p className="leading-6 text-neutral-300">
              Thanks for watching! Subscribe for more videos from {video.channel}.
              Explore more content and discover something new.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
