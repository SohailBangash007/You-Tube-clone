import {
  Bell,
  Menu,
  Mic,
  Search,
  Video,
} from "lucide-react";

export default function Header({
  query,
  onQueryChange,
  onSearch,
  onMenuClick,
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between bg-canvas px-4 sm:px-6">
      <div className="flex min-w-[170px] items-center gap-4">
        <button
          aria-label="Toggle navigation"
          className="icon-button"
          onClick={onMenuClick}
        >
          <Menu size={23} />
        </button>
        <a
          href="#"
          className="flex items-center gap-2"
          aria-label="Muhammad Sohail home"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 via-red-600 to-orange-500 text-[12px] font-black tracking-[-1px] shadow-lg shadow-red-950/40">
            MS
          </span>
          <span className="whitespace-nowrap text-[15px] font-bold tracking-[-0.4px] sm:text-[17px]">
            Muhammad Sohail
          </span>
        </a>
      </div>

      <form
        className="mx-3 flex max-w-[650px] flex-1 items-center"
        onSubmit={onSearch}
        role="search"
      >
        <div className="flex h-10 min-w-0 flex-1 overflow-hidden rounded-l-full border border-[#303030] bg-[#121212] focus-within:border-blue-500">
          <input
            aria-label="Search"
            className="w-full bg-transparent px-5 text-base outline-none placeholder:text-neutral-500"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search"
            value={query}
          />
        </div>
        <button
          aria-label="Search videos"
          className="flex h-10 w-16 items-center justify-center rounded-r-full border border-l-0 border-[#303030] bg-[#222] hover:bg-[#303030]"
          type="submit"
        >
          <Search size={20} />
        </button>
        <button
          aria-label="Voice search"
          className="icon-button ml-3 hidden bg-[#181818] sm:flex"
          onClick={(event) => event.preventDefault()}
          type="button"
        >
          <Mic size={19} />
        </button>
      </form>

      <div className="flex min-w-[115px] items-center justify-end gap-1 sm:gap-3">
        <button aria-label="Create video" className="icon-button">
          <Video size={21} />
        </button>
        <button aria-label="Notifications" className="icon-button">
          <Bell size={20} />
        </button>
        <button
          aria-label="Your profile"
          className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-rose-500 text-xs font-bold text-black"
        >
          A
        </button>
      </div>
    </header>
  );
}
