"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type Environment = "prod" | "staging" | "custom";

interface BaseUrlContextType {
  baseUrl: string;
  environment: Environment;
  customUrl: string;
  setEnvironment: (env: Environment) => void;
  setCustomUrl: (url: string) => void;
  resetToStaging: () => void;
}

const BASE_URLS = {
  prod: "https://gcp-api.edify.club",
  staging: "https://staging.deviceflow.ai",
  custom: "",
};

const BaseUrlContext = createContext<BaseUrlContextType | undefined>(undefined);

export function BaseUrlProvider({ children }: { children: React.ReactNode }) {
  const [environment, setEnvironment] = useState<Environment>("staging");
  const [customUrl, setCustomUrl] = useState("");

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedEnv = localStorage.getItem("api-environment") as Environment;
    const savedCustomUrl = localStorage.getItem("api-custom-url");

    if (savedEnv && ["prod", "staging", "custom"].includes(savedEnv)) {
      setEnvironment(savedEnv);
    }
    if (savedCustomUrl) {
      setCustomUrl(savedCustomUrl);
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("api-environment", environment);
    localStorage.setItem("api-custom-url", customUrl);
  }, [environment, customUrl]);

  const baseUrl = environment === "custom" ? customUrl : BASE_URLS[environment];

  const resetToStaging = () => {
    setEnvironment("staging");
    setCustomUrl("");
  };

  return (
    <BaseUrlContext.Provider
      value={{
        baseUrl,
        environment,
        customUrl,
        setEnvironment,
        setCustomUrl,
        resetToStaging,
      }}
    >
      {children}
    </BaseUrlContext.Provider>
  );
}

export function useBaseUrl() {
  const context = useContext(BaseUrlContext);
  if (context === undefined) {
    throw new Error("useBaseUrl must be used within a BaseUrlProvider");
  }
  return context;
}
