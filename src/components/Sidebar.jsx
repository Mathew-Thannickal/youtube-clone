import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  Home as HomeIcon,
  Flame,
  Music,
  Gamepad2,
  Code,
  BookOpen,
  History,
  ThumbsUp,
  ListVideo,
  Clock,
} from "lucide-react";

const navItems = [
  { icon: HomeIcon, label: "Home",      path: "/",                  categoryKey: null },
  { icon: Flame,    label: "Trending",  path: "/?category=trending",  categoryKey: "trending" },
  { icon: Music,    label: "Music",     path: "/?category=music",     categoryKey: "music" },
  { icon: Gamepad2, label: "Gaming",    path: "/?category=gaming",    categoryKey: "gaming" },
  { icon: Code,     label: "Coding",    path: "/?category=coding",    categoryKey: "coding" },
  { icon: BookOpen, label: "Learning",  path: "/?category=learning",  categoryKey: "learning" },
];

const libraryItems = [
  { icon: History,   label: "History",    path: "/" },
  { icon: ThumbsUp,  label: "Liked",      path: "/" },
  { icon: ListVideo, label: "Playlists",  path: "/" },
  { icon: Clock,     label: "Watch Later",path: "/" },
];

function Sidebar({ isOpen }) {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");

  const isItemActive = (item) => {
    if (pathname !== "/") return false;
    if (item.categoryKey === null) {
      return currentCategory === null;
    }
    return currentCategory === item.categoryKey;
  };

  return (
    <aside className={`sidebar${isOpen ? "" : " collapsed"}`} aria-label="Sidebar navigation">
      {/* Main nav */}
      <div className="sidebar-section">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item);
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`sidebar-item${active ? " active" : ""}`}
              aria-label={item.label}
            >
              <span className="sidebar-icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <span className="sidebar-item-label">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Library */}
      <div className="sidebar-section">
        {isOpen && <p className="sidebar-label">Library</p>}
        {libraryItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.path}
              className="sidebar-item"
              aria-label={item.label}
            >
              <span className="sidebar-icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <span className="sidebar-item-label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
