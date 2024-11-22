import React from "react";

export default function Skeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="mb-6">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-20"></div>
              </th>
              <th className="px-6 py-3 text-right">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16 ml-auto"></div>
              </th>
              <th className="px-6 py-3 text-right">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24 ml-auto"></div>
              </th>
              <th className="px-6 py-3 text-right">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24 ml-auto"></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {[...Array(10)].map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                    <div className="ml-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-20 ml-auto"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16 ml-auto"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24 ml-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
