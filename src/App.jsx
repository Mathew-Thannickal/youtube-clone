import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import VideoDetails from "./pages/VideoDetails";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`app${darkMode ? " dark" : ""}`}>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="main-layout">
        <Sidebar isOpen={sidebarOpen} />

        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/video/:id" element={<VideoDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
