// SkeletonLoader.js
import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="space-y-8 p-6">
      <div className="flex animate-pulse space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
        <div className="flex flex-col space-y-4">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="p-4 bg-gray-300 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      <div className="mt-8 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-40 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
