"use client";

import React, { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/buttons/Button";
import { Icons } from "../components/icons";

interface AlertContextValue {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

interface AlertOptions {
  title: string;
  description: string;
  isFailure: boolean;
  key?: string;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

const generateRandomKey = () =>
  `alert-${Math.random().toString(36).substr(2, 9)}`;

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentAlert, setCurrentAlert] = useState<AlertOptions | null>(null);

  const showAlert = (options: AlertOptions) => {
    if (currentAlert) return;
    const alertKey = options.key || generateRandomKey();
    setCurrentAlert({ ...options, key: alertKey });
  };

  const hideAlert = () => {
    setCurrentAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {currentAlert && (
        <Dialog open={true} onOpenChange={hideAlert}>
          <DialogContent className="rounded-2xl bg-white p-4 shadow-lg w-96 text-center">
            {/* Icon */}
            <div className="flex justify-center">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${
                  currentAlert.isFailure
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {currentAlert.isFailure ? (
                  <Icons.warning_delete />
                ) : (
                  <Icons.success_checkmark />
                )}
              </div>
            </div>

            {/* Title */}
            <DialogTitle className="text-lg font-gilroySemiBold text-gray-900">
              {currentAlert.title}
            </DialogTitle>

            {/* Description */}
            <DialogDescription className="p-1 text-sm font-gilroyMedium text-gray-600">
              {currentAlert.description}
            </DialogDescription>

            {/* Footer Buttons */}
            <DialogFooter className="flex w-full items-center pb-3 justify-center">
              <Button
                className={`w-[90%] rounded-md border shadow-sm ${
                  currentAlert.isFailure
                    ? "border-[#D0D5DD] bg-[#FFF] text-[#344054]"
                    : "border-[#039855] bg-[#039855] text-white"
                }`}
                onClick={hideAlert}
              >
                {currentAlert.isFailure ? "Close" : "Done"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextValue => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
