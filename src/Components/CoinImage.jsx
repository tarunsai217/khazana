import React, { useState } from "react";
import { ImageOff } from "lucide-react";

function CoinImage({ src, alt, className = "w-8 h-8 rounded-full" }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Skeleton placeholder */}
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
        />
      )}

      {/* Actual image */}
      {!error ? (
        <img
          src={src}
          alt={alt}
          className={`${className} ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            setIsLoading(false);
          }}
          loading="lazy"
        />
      ) : (
        <div
          className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}
        >
          <ImageOff size={16} className="text-gray-400" />
        </div>
      )}
    </div>
  );
}

export default CoinImage;
