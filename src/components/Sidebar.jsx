import {
  ArrowUpRight,
  Clock3,
  Flame,
  Gamepad2,
  History,
  Home,
  ListVideo,
  Music2,
  PlaySquare,
  ThumbsUp,
  Trophy,
  TvMinimalPlay,
} from "lucide-react";

const primaryLinks = [
  { label: "Home", icon: Home },
  { label: "Shorts", icon: TvMinimalPlay },
  { label: "Subscriptions", icon: PlaySquare },
];

const libraryLinks = [
  { label: "History", icon: History },
  { label: "Playlists", icon: ListVideo },
  { label: "Watch later", icon: Clock3 },
  { label: "Liked videos", icon: ThumbsUp },
];

const exploreLinks = [
  { label: "Trending", icon: Flame },
  { label: "Music", icon: Music2 },
  { label: "Gaming", icon: Gamepad2 },
  { label: "Sports", icon: Trophy },
];

function LinkGroup({ links, active, onSelect, compact = false }) {
  return (
    <div className="space-y-1">
      {links.map(({ label, icon: Icon }) => (
        <button
          aria-current={active === label ? "page" : undefined}
          className={`group relative flex w-full items-center text-left transition-all duration-200 ${
            compact
              ? "flex-col justify-center gap-1 rounded-2xl px-1 py-3 text-[10px]"
              : "gap-3 rounded-xl px-3 py-2.5 text-[13px]"
          } ${
            active === label
              ? "bg-gradient-to-r from-orange-500/15 to-rose-500/10 font-semibold text-orange-300"
              : "text-neutral-400 hover:bg-white/[0.06] hover:text-white"
          }`}
          key={label}
          onClick={() => onSelect(label)}
        >
          {active === label && !compact && (
            <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-gradient-to-b from-orange-400 to-rose-500" />
          )}
          <Icon
            className={`shrink-0 transition-colors ${
              active === label ? "text-orange-300" : "text-neutral-400 group-hover:text-white"
            }`}
            size={compact ? 21 : 19}
            strokeWidth={active === label ? 2.2 : 1.8}
          />
          <span className={compact ? "max-w-full truncate" : "truncate"}>
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function Sidebar({
  activeNav,
  onNavSelect,
  expanded,
  mobileOpen,
  onClose,
}) {
  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed bottom-0 left-0 top-16 z-40 overflow-y-auto border-r border-white/[0.06] bg-[#101012] transition-all duration-200 [scrollbar-width:thin] [scrollbar-color:#383838_transparent] ${
          mobileOpen
            ? "w-64 translate-x-0"
            : `-translate-x-full md:translate-x-0 ${
                expanded ? "md:w-60" : "md:w-[76px]"
              }`
        }`}
      >
        <nav className={`px-2 py-4 ${expanded || mobileOpen ? "sm:px-3" : ""}`}>
          <LinkGroup
            active={activeNav}
            links={primaryLinks}
            onSelect={onNavSelect}
            compact={!expanded && !mobileOpen}
          />
          <div className="mx-2 my-4 border-t border-white/[0.08]" />
          {(expanded || mobileOpen) ? (
            <>
              <h2 className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                Your space
              </h2>
              <LinkGroup
                active={activeNav}
                links={libraryLinks}
                onSelect={onNavSelect}
              />
              <div className="mx-2 my-4 border-t border-white/[0.08]" />
              <h2 className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                Discover
              </h2>
              <LinkGroup
                active={activeNav}
                links={exploreLinks}
                onSelect={onNavSelect}
              />
              <div className="mx-2 my-4 border-t border-white/[0.08]" />
              <a
                className="mx-1 flex items-center justify-between rounded-xl border border-orange-400/15 bg-gradient-to-br from-orange-500/[0.12] to-rose-500/[0.06] px-3 py-3 transition-colors hover:border-orange-400/30"
                href="#"
              >
                <span>
                  <span className="block text-xs font-semibold text-white">
                    Muhammad Sohail
                  </span>
                  <span className="mt-1 block text-[10px] text-neutral-400">
                    Your video space
                  </span>
                </span>
                <ArrowUpRight className="text-orange-300" size={16} />
              </a>
              <p className="px-3 pb-5 pt-4 text-[10px] leading-5 text-neutral-600">
                About &nbsp; Press &nbsp; Creators
                <br />
                © 2025 Muhammad Sohail
              </p>
            </>
          ) : null}
        </nav>
      </aside>
    </>
  );
}
