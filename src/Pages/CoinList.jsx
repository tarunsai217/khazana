import React, { useState, useEffect } from "react";
import { ArrowDown, ArrowUp, Search, ArrowUpDown } from "lucide-react";
import Pagination from "../Components/Pagination";
import Skeleton from "../Components/Skeleton";
import { useNavigate } from "react-router-dom";
import { useCoins } from "../api/apis";
import { Tooltip } from "react-tooltip";
import { mockCoins } from "../api/mockData";
import "./CoinList.css";
function CoinList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useCoins(page, 20);
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "desc",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      console.error("Error fetching coins:", error);
      setCoins(mockCoins);
    } else if (data) {
      setCoins(data);
    }
  }, [data, isError, error]);

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key)
      return <ArrowUpDown size={16} className="ml-1 text-gray-400" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={16} className="ml-1 text-blue-500" />
    ) : (
      <ArrowDown size={16} className="ml-1 text-blue-500" />
    );
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "desc"
          ? "asc"
          : "desc",
    }));
  };

  const handleNavigateToCoinDetails = (id) => {
    navigate(`/${id}`);
  };
  //sort & filter
  const sortedCoins = [...coins].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });
  const filteredCoins = sortedCoins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Skeleton />;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {error && (
        <p className="mb-4 text-red-500">
          Looks like we hit the rate limit. Switching to mock data for now.
        </p>
      )}

      {/* Desktop  View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-[700] text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <span className="ml-[10px]">Coin</span>
              </th>
              <th
                onClick={() => handleSort("current_price")}
                className="px-6 py-3 text-right text-xs font-[700] text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
              >
                <span className="flex items-center justify-end">
                  Price {getSortIcon("current_price")}
                </span>
              </th>
              <th
                onClick={() => handleSort("price_change_percentage_24h")}
                className="px-6 py-3 text-right text-xs font-[700] text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
              >
                <span className="flex items-center justify-end">
                  24h Change {getSortIcon("price_change_percentage_24h")}
                </span>
              </th>
              <th
                onClick={() => handleSort("market_cap")}
                className="px-6 py-3 text-right text-xs font-[700] text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
              >
                <span className="flex items-center justify-end">
                  Market Cap {getSortIcon("market_cap")}
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredCoins?.map((coin) => (
              <tr
                key={coin.id}
                onClick={() => handleNavigateToCoinDetails(coin.id)}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="ml-4">
                      <div className="text-[1rem] font-[600] text-gray-900 dark:text-white">
                        {coin.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {coin.symbol.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                  ${coin.current_price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <span
                    className={`inline-flex items-center ${
                      coin.price_change_percentage_24h > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                    data-tooltip-id="price-tooltip"
                    data-tooltip-content={`Price change in the last 24 hours: ${coin.price_change_percentage_24h.toFixed(
                      2
                    )}%`}
                  >
                    {coin.price_change_percentage_24h > 0 ? (
                      <ArrowUp size={16} />
                    ) : (
                      <ArrowDown size={16} />
                    )}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                  ${coin.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredCoins?.map((coin) => (
          <div
            key={coin.id}
            onClick={() => handleNavigateToCoinDetails(coin.id)}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="ml-3">
                  <div className="text-[1rem] font-[600] text-gray-900 dark:text-white">
                    {coin.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {coin.symbol.toUpperCase()}
                  </div>
                </div>
              </div>
              <div
                className={`flex items-center ${
                  coin.price_change_percentage_24h > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {coin.price_change_percentage_24h > 0 ? (
                  <ArrowUp size={16} />
                ) : (
                  <ArrowDown size={16} />
                )}
                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <div className="text-gray-500 dark:text-gray-400">Price</div>
              <div className="font-medium text-gray-900 dark:text-white">
                ${coin.current_price.toLocaleString()}
              </div>
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <div className="text-gray-500 dark:text-gray-400">Market Cap</div>
              <div className="font-medium text-gray-900 dark:text-white">
                ${coin.market_cap.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination page={page} setPage={setPage} totalPages={10} />
      <Tooltip className="custom-tooltip" id="price-tooltip" />
    </div>
  );
}

export default CoinList;
