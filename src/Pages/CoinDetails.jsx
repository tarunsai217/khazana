import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RefreshCw, ArrowLeft } from "lucide-react";
import SkeletonLoader from "../Components/CoinDetailsSkeleton.jsx";
import ChartSkeletonLoader from "../Components/ChartSkeleton";
import { useNavigate } from "react-router-dom";
import { useCoinDetails, useCoinHistory } from "../api/apis";

const timeframes = [
  { label: "24h", value: 1 },
  { label: "7d", value: 7 },
  { label: "1m", value: 30 },
  { label: "3m", value: 90 },
  { label: "1y", value: 365 },
];

const CoinDetail = () => {
  const { id } = useParams();
  const [timeframe, setTimeframe] = useState(timeframes[0]);
  const navigate = useNavigate();

  const {
    data: coinData,
    isLoading: coinLoading,
    error: coinError,
    refetch: refetchCoinData,
  } = useCoinDetails(id);
  const {
    data: priceHistory,
    isLoading: chartLoading,
    error: chartError,
  } = useCoinHistory(id, timeframe.value);

  if (coinLoading) {
    return <SkeletonLoader />;
  }

  if (!coinData) return null;

  function goBackHandler() {
    navigate("/");
  }
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <>
          <button
            onClick={goBackHandler}
            className="mb-6 flex items-center text-blue-500 bg-transparent py-2 focus:outline-none "
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
        </>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <img
              src={coinData.image.large}
              alt={coinData.name}
              className="w-16 h-16"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {coinData.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {coinData.symbol.toUpperCase()}
              </p>
            </div>
          </div>
          <button
            onClick={refetchCoinData}
            className="p-2 bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors rounded-md flex items-center"
            title="Refresh data"
          >
            <RefreshCw className="w-5 h-5 mr-1" />
          </button>
        </div>

        {coinError && <p className="mt-4 text-red-500">{coinError}</p>}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Market Cap Rank
            </p>
            <p className="text-xl font-semibold dark:text-white">
              #{coinData.market_cap_rank}
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Current Price
            </p>
            <p className="text-xl font-semibold dark:text-white">
              ${coinData.market_data.current_price.usd.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              24h Trading Volume
            </p>
            <p className="text-xl font-semibold dark:text-white">
              ${coinData.market_data.total_volume.usd.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-0 ">
              Price History
            </h2>
            <div className="flex space-x-2">
              {timeframes.map((tf) => (
                <button
                  key={tf.value}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    timeframe.value === tf.value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>
          {console.log("priceHistory", priceHistory)}
          <div className="h-[400px] w-full">
            {chartLoading ? (
              <ChartSkeletonLoader />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Price",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            About {coinData.name}
          </h2>
          <div
            className="prose max-w-none dark:prose-dark text-gray-900 dark:text-white"
            dangerouslySetInnerHTML={{ __html: coinData.description.en }}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
