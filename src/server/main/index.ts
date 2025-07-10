// // const BASEURL = "https://gcp-api.edify.club";
// // const BASEURL = "https://staging.deviceflow.ai";
// const BASEURL = "https://bceee85acbd2.ngrok-free.app";

// export { BASEURL };

"use client";

import { useBaseUrl } from "./base-url-context";

// Hook to get the current base URL
export function useApiConfig() {
  const { baseUrl } = useBaseUrl();
  return { baseUrl };
}

// For server-side or non-hook usage, you can create a function
// that gets the URL from localStorage (though this should be used carefully)
export function getStoredBaseUrl(): string {
  if (typeof window === "undefined") {
    // Server-side fallback
    return "https://staging.deviceflow.ai";
  }

  const environment = localStorage.getItem("api-environment") || "staging";
  const customUrl = localStorage.getItem("api-custom-url") || "";

  const BASE_URLS = {
    prod: "https://gcp-api.edify.club",
    staging: "https://staging.deviceflow.ai",
    custom: customUrl,
  };

  return BASE_URLS[environment as keyof typeof BASE_URLS] || BASE_URLS.staging;
}
