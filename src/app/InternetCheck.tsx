"use client";

import { useState, useEffect } from "react";

export default function InternetCheck() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkInternetConnection = () => navigator.onLine;

    const updateConnectionStatus = () => {
      setIsOnline(checkInternetConnection());
    };

    // Initial check
    updateConnectionStatus();

    // Event listeners for online/offline
    window.addEventListener("online", updateConnectionStatus);
    window.addEventListener("offline", updateConnectionStatus);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("online", updateConnectionStatus);
      window.removeEventListener("offline", updateConnectionStatus);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed inset-0 bg-cover bg-[url('/media/internt_error.png')] flex items-center justify-center   z-50">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-sm mx-auto text-center">
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-red-600 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636a9 9 0 11-12.728 0M12 8v4m0 4h.01"
            />
          </svg>
        </div>
        <h2 className="text-lg font-gilroySemiBold text-gray-800">
          You're Offline
        </h2>
        <p className="text-sm font-gilroyMedium text-gray-600 mt-2">
          It seems like your internet connection is lost. Please check your
          connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 font-gilroySemiBold bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
