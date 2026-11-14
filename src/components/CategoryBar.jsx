import { categories } from "../data/videos.js";

export default function CategoryBar({ activeCategory, onSelect }) {
  return (
    <div className="sticky top-16 z-20 -mx-4 overflow-x-auto bg-canvas px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6">
      <div className="flex min-w-max gap-3">
        {categories.map((category) => (
          <button
            aria-pressed={activeCategory === category}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-white text-black"
                : "bg-[#272727] text-white hover:bg-[#3f3f3f]"
            }`}
            key={category}
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
