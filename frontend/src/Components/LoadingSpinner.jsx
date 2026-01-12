import React from "react";

const LoadingSpinner = ({ size = "lg", message = "Loading..." }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
      <div
        className={`animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 shadow-lg ${sizeClasses[size]}`}
      />
      <p className="text-gray-600 font-medium text-sm sm:text-base">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;
