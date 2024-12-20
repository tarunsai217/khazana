import React, { useState, useEffect, useMemo } from "react";
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
import { ChartPlaceholder } from "../Components/ChartPlaceholder.jsx";
import { useNavigate } from "react-router-dom";
import { useCoinDetails, useCoinHistory } from "../api/apis";
import { mockCoinDetails } from "../api/mockData.js";

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
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  const {
    data: coinData,
    isLoading: coinLoading,
    isError: isCoinError,
    error: coinError,
    refetch: refetchCoinData,
  } = useCoinDetails(id);
  const {
    data: priceHistory,
    isLoading: chartLoading,
    isError: isChartError,
    error: chartError,
  } = useCoinHistory(id, timeframe.value);

  useEffect(() => {
    if (isCoinError) {
      setIsUsingMockData(true);
    }
  }, [isCoinError, coinError]);
  if (coinLoading) {
    return <SkeletonLoader />;
  }

  if (isCoinError) {
    console.log("error", coinError);
  }
  function goBackHandler() {
    navigate("/");
  }
  let displayCoinData = isUsingMockData ? mockCoinDetails : coinData;
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6">
        <>
          <button
            onClick={goBackHandler}
            className=" mb-2 md:mb-6 flex items-center text-blue-500 bg-transparent py-1 md:py-2 px-0 md:px-2 focus:outline-none "
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
        </>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <img
              src={displayCoinData?.image.large}
              alt={displayCoinData?.name}
              className="w-16 h-16"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {displayCoinData?.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {displayCoinData?.symbol?.toUpperCase()}
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

        {coinError && (
          <p className="mt-4 text-red-500">
            {
              "Looks like we hit the rate limit. Switching to mock data for now."
            }
          </p>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Market Cap Rank
            </p>
            <p className="text-xl font-semibold dark:text-white">
              #{displayCoinData?.market_cap_rank}
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Current Price
            </p>
            <p className="text-xl font-semibold dark:text-white">
              ${displayCoinData?.market_data.current_price.usd.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              24h Trading Volume
            </p>
            <p className="text-xl font-semibold dark:text-white">
              ${displayCoinData?.market_data.total_volume.usd.toLocaleString()}
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
          <div className="h-[400px] w-full">
            {chartLoading ? (
              <ChartSkeletonLoader />
            ) : isChartError ? (
              <ChartPlaceholder />
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
            About {displayCoinData?.name}
          </h2>
          <ResponsiveDescription
            content={displayCoinData?.description.en}
            maxMobileChars={300}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;

export function ResponsiveDescription({ content, maxMobileChars = 300 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { truncatedContent, needsTruncation } = useMemo(() => {
    if (!content) return { truncatedContent: "", needsTruncation: false };

    const stripped = content.replace(/<[^>]+>/g, "");
    const needsTruncation = stripped.length > maxMobileChars;
    const truncated = needsTruncation
      ? stripped.substring(0, maxMobileChars).trim()
      : stripped;

    return {
      truncatedContent: truncated,
      needsTruncation,
    };
  }, [content, maxMobileChars]);

  return (
    <>
      {/* Desktop View */}
      <div
        className="hidden md:block prose max-w-none dark:prose-dark text-gray-900 dark:text-white"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="text-gray-900 dark:text-white">
          {isExpanded ? (
            <>
              <div
                className="prose max-w-none dark:prose-dark"
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
              <span
                onClick={() => setIsExpanded(false)}
                className="inline-block ml-1 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 cursor-pointer transition-colors"
              >
                Show less
              </span>
            </>
          ) : (
            <p>
              {truncatedContent}
              {needsTruncation && (
                <>
                  ...{" "}
                  <span
                    onClick={() => setIsExpanded(true)}
                    className="inline-block text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 cursor-pointer transition-colors"
                  >
                    Read more
                  </span>
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
