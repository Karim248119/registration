import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute w-16 h-16 rounded-full border-4 border-t-transparent border-r-transparent border-blue-600 animate-spin"></div>
      </div>
    </div>
  );
}
