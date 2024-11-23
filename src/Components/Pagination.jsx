import React from "react";

const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="mt-6 flex justify-center items-center space-x-4">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
      >
        Previous
      </button>
      <div className="flex items-center space-x-2">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded-lg hover:bg-gray-200 md:dark:hover:bg-gray-700 text-gray-900 dark:text-gray-900"
          >
            {page - 1}
          </button>
        )}
        <button className="px-3 py-1 rounded-lg bg-blue-500 text-white">
          {page}
        </button>
        {page < totalPages && (
          <button
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded-lg hover:bg-gray-200 md:dark:hover:bg-gray-700 text-gray-900 dark:text-gray-900"
          >
            {page + 1}
          </button>
        )}
      </div>
      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
