import React from "react";
import "./ChartSkeleton.css";

const ChartSkeletonLoader = () => {
  return (
    <div className="h-[400px] w-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 animate-pulse">
        <div className="h-full w-full bg-gradient-to-r from-gray-300 to-gray-400 opacity-60 rounded-lg"></div>
      </div>
      <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 rounded-lg">
        <div className="h-full w-full animate-[wave_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent to-gray-200 dark:from-transparent dark:to-gray-600 opacity-70 rounded-lg"></div>
      </div>
    </div>
  );
};

export default ChartSkeletonLoader;
