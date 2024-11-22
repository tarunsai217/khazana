import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CoinList from "./Pages/CoinList";
import CoinDetails from "./Pages/CoinDetails";
import Navbar from "./Components/NavBar";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<CoinList />} />
            <Route path="/:id" element={<CoinDetails />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
