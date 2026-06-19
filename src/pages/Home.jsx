import { useSearchParams } from "react-router-dom";
import { videos, categories } from "../data/videos";
import VideoList from "../components/VideoList";

function Home({ searchTerm }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  // Map category param to existing categories array or fallback to "All"
  const activeCategory = categories.find(
    (c) => c.toLowerCase() === categoryParam?.toLowerCase()
  ) || "All";

  const setActiveCategory = (cat) => {
    if (cat === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat.toLowerCase() });
    }
  };

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "All" ||
      video.category?.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="content" aria-label="Main content">
      {/* Category chips */}
      <div className="category-chips" role="toolbar" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`chip-${cat.toLowerCase()}`}
            className={`chip${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Section header */}
      {!searchTerm && (
        <div className="section-header">
          <h1 className="section-title">
            {activeCategory === "All" ? "Recommended for You" : activeCategory}
          </h1>
          <div className="section-divider" aria-hidden="true" />
        </div>
      )}

      {searchTerm && (
        <div className="section-header">
          <h1 className="section-title">
            Search results for &ldquo;{searchTerm}&rdquo;
          </h1>
          <div className="section-divider" aria-hidden="true" />
        </div>
      )}

      <VideoList videos={filteredVideos} />
    </main>
  );
}

export default Home;
