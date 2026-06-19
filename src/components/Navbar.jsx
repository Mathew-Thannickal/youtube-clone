import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Sun, Moon, Menu } from "lucide-react";

function Navbar({ searchTerm, setSearchTerm, darkMode, setDarkMode, sidebarOpen, setSidebarOpen }) {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    setSearchTerm("");
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      {/* Left – Hamburger + Logo */}
      <div className="nav-left">
        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <Link to="/" className="logo" aria-label="VideoTube home">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="logo-svg">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff0055" />
                  <stop offset="100%" stopColor="#7a00ff" />
                </linearGradient>
                <linearGradient id="prismGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff7b00" />
                  <stop offset="100%" stopColor="#ff0055" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#logoGrad)" />
              <path d="M9.5 8.5L15.5 12L9.5 15.5V8.5Z" fill="#ffffff" />
              <path d="M9.5 8.5L12.5 12L9.5 12V8.5Z" fill="url(#prismGrad)" opacity="0.35" />
            </svg>
          </div>
          <span className="logo-text">
            VideoTube<span className="logo-badge">PRO</span>
          </span>
        </Link>
      </div>

      {/* Center – Search */}
      <div className="nav-center">
        <form className="search-form" onSubmit={handleSubmit} role="search">
          <input
            id="search-input"
            className="search-input"
            type="search"
            placeholder="Search videos…"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (e.target.value === "") setSearchTerm("");
            }}
            aria-label="Search videos"
          />
          <button className="search-btn" type="submit" aria-label="Submit search">
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* Right – Controls */}
      <div className="nav-right">
        <button
          id="dark-mode-toggle"
          className="icon-btn dark-toggle"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={darkMode ? "Light Mode" : "Dark Mode"}
        >
          {darkMode ? <Sun size={20} className="icon-sun" /> : <Moon size={20} className="icon-moon" />}
        </button>

        <button className="icon-btn notification-btn" aria-label="Notifications" title="Notifications">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>

        <button className="avatar-btn" aria-label="My account" title="My Account">
          M
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
