import { useMemo, useState } from "react";
import CategoryBar from "./components/CategoryBar.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import VideoGrid from "./components/VideoGrid.jsx";
import VideoPlayer from "./components/VideoPlayer.jsx";
import { videos } from "./data/videos.js";

export default function App() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeNav, setActiveNav] = useState("Home");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [likedVideos, setLikedVideos] = useState([]);
  const [savedVideos, setSavedVideos] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const visibleVideos = useMemo(() => {
    const normalizedQuery = submittedQuery.trim().toLowerCase();
    const categoryVideos =
      activeCategory === "All"
        ? videos
        : activeCategory === "Live"
          ? videos.filter((video) => video.live)
          : activeCategory === "Mixes"
            ? videos.filter((video) => video.category === "Music")
            : activeCategory === "Recently uploaded"
              ? [...videos].sort((a, b) => a.uploadedDays - b.uploadedDays)
              : videos.filter((video) => video.category === activeCategory);
    return categoryVideos.filter((video) => {
      const matchesQuery =
        !normalizedQuery ||
        `${video.title} ${video.channel} ${video.category}`
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesQuery;
    });
  }, [activeCategory, submittedQuery]);

  function submitSearch(event) {
    event.preventDefault();
    setSubmittedQuery(query);
    setActiveCategory("All");
  }

  function selectNavigation(label) {
    setActiveNav(label);
    setMobileMenuOpen(false);
    if (label === "Home") {
      setActiveCategory("All");
      setSubmittedQuery("");
      setQuery("");
      return;
    }
    if (label === "Music" || label === "Gaming") {
      setActiveCategory(label);
      setSubmittedQuery("");
      setQuery("");
      return;
    }
    if (label === "Trending") {
      setActiveCategory("Recently uploaded");
      setSubmittedQuery("");
      return;
    }
    if (label === "Liked videos" || label === "Watch later") {
      setActiveCategory("All");
      setSubmittedQuery("");
      return;
    }
    setActiveCategory("All");
    setSubmittedQuery("");
  }

  function toggleSubscription(channel) {
    setSubscriptions((current) =>
      current.includes(channel)
        ? current.filter((item) => item !== channel)
        : [...current, channel],
    );
  }

  function toggleVideoState(videoId, setState) {
    setState((current) =>
      current.includes(videoId)
        ? current.filter((id) => id !== videoId)
        : [...current, videoId],
    );
  }

  const filteredVideos =
    activeNav === "Liked videos"
      ? visibleVideos.filter((video) => likedVideos.includes(video.id))
      : activeNav === "Watch later"
        ? visibleVideos.filter((video) => savedVideos.includes(video.id))
      : activeNav === "Subscriptions"
        ? visibleVideos.filter((video) => subscriptions.includes(video.channel))
        : visibleVideos;

  const modalVideoId = selectedVideo?.id;

  return (
    <div className="min-h-screen bg-canvas text-white">
      <Header
        onMenuClick={() => {
          if (window.matchMedia("(min-width: 768px)").matches) {
            setSidebarExpanded((expanded) => !expanded);
          } else {
            setMobileMenuOpen((open) => !open);
          }
        }}
        onQueryChange={setQuery}
        onSearch={submitSearch}
        query={query}
      />
      <Sidebar
        activeNav={activeNav}
        expanded={sidebarExpanded}
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavSelect={selectNavigation}
      />
      <main
        className={`min-h-screen pt-16 transition-[margin] duration-200 ${
          sidebarExpanded ? "md:ml-60" : "md:ml-[76px]"
        }`}
      >
        <div className="px-4 sm:px-6">
          <CategoryBar
            activeCategory={activeCategory}
            onSelect={(category) => {
              setActiveCategory(category);
              setActiveNav("Home");
              setSubmittedQuery("");
              setQuery("");
            }}
          />
          <section aria-label="Videos" className="pt-4">
            <VideoGrid
              onOpen={setSelectedVideo}
              onSubscribe={toggleSubscription}
              subscriptions={subscriptions}
              onSave={(videoId) => toggleVideoState(videoId, setSavedVideos)}
              savedVideos={savedVideos}
              videos={filteredVideos}
            />
          </section>
        </div>
      </main>
      <VideoPlayer
        key={modalVideoId ?? "closed"}
        liked={modalVideoId ? likedVideos.includes(modalVideoId) : false}
        onClose={() => setSelectedVideo(null)}
        onLike={() =>
          modalVideoId && toggleVideoState(modalVideoId, setLikedVideos)
        }
        onSave={() =>
          modalVideoId && toggleVideoState(modalVideoId, setSavedVideos)
        }
        onSubscribe={() =>
          selectedVideo && toggleSubscription(selectedVideo.channel)
        }
        saved={modalVideoId ? savedVideos.includes(modalVideoId) : false}
        subscribed={
          selectedVideo ? subscriptions.includes(selectedVideo.channel) : false
        }
        video={selectedVideo}
      />
    </div>
  );
}
