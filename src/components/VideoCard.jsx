import { Bookmark, Check } from "lucide-react";

export default function VideoCard({
  video,
  onOpen,
  isSubscribed,
  onSubscribe,
  isSaved,
  onSave,
}) {
  return (
    <article className="group min-w-0">
      <button
        aria-label={`Play ${video.title}`}
        className="relative block aspect-video w-full overflow-hidden rounded-xl bg-[#272727] text-left"
        onClick={() => onOpen(video)}
      >
        <img
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
          src={video.thumbnail}
        />
        {video.live ? (
          <span className="absolute bottom-2 left-2 rounded bg-red-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wide">
            Live
          </span>
        ) : (
          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium">
            {video.duration}
          </span>
        )}
      </button>
      <div className="flex gap-3 pt-3">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-black"
          style={{ backgroundColor: video.color }}
        >
          {video.avatar}
        </span>
        <div className="min-w-0 flex-1">
          <button
            className="line-clamp-2 w-full text-left text-[15px] font-semibold leading-5 hover:text-neutral-300"
            onClick={() => onOpen(video)}
          >
            {video.title}
          </button>
          <button
            className="mt-1 flex items-center gap-1 text-left text-sm text-neutral-400 hover:text-white"
            onClick={onSubscribe}
          >
            {video.channel}
            {isSubscribed && <Check size={13} aria-label="Subscribed" />}
          </button>
          <p className="text-sm text-neutral-400">
            {video.views} <span className="px-0.5">·</span> {video.age}
          </p>
        </div>
        <button
          aria-label={isSaved ? "Remove from Watch later" : "Save to Watch later"}
          aria-pressed={isSaved}
          className={`icon-button -mr-2 -mt-1 hidden h-8 w-8 shrink-0 group-hover:flex ${
            isSaved ? "text-blue-400" : ""
          }`}
          onClick={onSave}
          title={isSaved ? "Saved to Watch later" : "Save to Watch later"}
        >
          <Bookmark fill={isSaved ? "currentColor" : "none"} size={18} />
        </button>
      </div>
    </article>
  );
}
