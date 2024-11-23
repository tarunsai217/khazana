import React from "react";
import { BarChart3, AlertCircle } from "lucide-react";

export function ChartPlaceholder() {
  return (
    <div className="relative h-[400px] w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:60px_60px] animate-[gradient_3s_linear_infinite]" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <div className="relative">
          <BarChart3 className="w-16 h-16 text-gray-400 dark:text-gray-500 animate-pulse" />
          <AlertCircle className="w-6 h-6 text-amber-500 absolute -top-1 -right-1 animate-bounce" />
        </div>

        <h3 className="mt-6 text-xl font-semibold text-gray-700 dark:text-gray-300">
          Unable to retrieve chart data. Try after sometime!
        </h3>

        {/* Loading Bars */}
        <div className="mt-8 w-full max-w-md space-y-3">
          {[100, 75, 50].map((width, i) => (
            <div
              key={i}
              className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
            >
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 rounded-full"
                style={{ width: `${width}%` }}
              >
                <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
