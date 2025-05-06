"use client";
import React, { useState } from "react";
import { DiagonisticIcons } from "./icons";

interface LoginKeyProps {
  otpString: string;
  onDone: () => void;
}

function LoginKey({ otpString, onDone }: LoginKeyProps) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) {
    onDone();
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(otpString);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const handleDone = () => {
    setVisible(false);
  };

  return (
    <div className="w-fit flex flex-col gap-5 justify-center items-center bg-white rounded-[31px] border border-gray-300 p-6">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-gilroySemiBold py-5">Login Key</h1>
        <p className="text-[#4E4D4D] text-base font-gilroyMedium">
          Use this Unique Login key to login into Checkmate
        </p>
      </div>
      <h1 className="font-gilroyBold text-7xl tracking-[1rem] py-3">
        {otpString ?? "2434"}
      </h1>
      <button
        className="w-full rounded-lg flex py-3 justify-center items-center gap-2 bg-[#EDEDED]"
        onClick={handleCopy}
      >
        <span className="text-base font-gilroySemiBold">
          {copied ? "Copied" : "Copy"}
        </span>
        <DiagonisticIcons.copy_svg />
      </button>
      <button
        className="py-3 bg-black font-gilroySemiBold border hover:border hover:text-black duration-200 hover:border-black hover:bg-white text-white rounded-lg w-full"
        onClick={handleDone}
      >
        Done
      </button>
    </div>
  );
}

export default LoginKey;
