import { useState, useEffect } from "react";
import "./App.css";
import { Moon, Sun } from "lucide-react";
import { getCoins } from "./api/apis";
import CoinList from "./Pages/CoinList";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetchCoins();
  }, [page]);

  async function fetchCoins() {
    setLoading(true);
    try {
      const data = await getCoins(page);
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Crypto Dashboard
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="text-yellow-500" />
              ) : (
                <Moon className="text-gray-700" />
              )}
            </button>
          </div>
          <CoinList coins={coins} loading={loading} />
        </div>
      </div>
    </>
  );
}

export default App;
