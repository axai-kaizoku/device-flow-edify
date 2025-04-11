"use client";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import React from "react";

export const NewBackButton = () => {
  const router = useRouter();
  return (
    <div
      className="rounded-md cursor-pointer border border-gray-300 hover:border-black p-2.5"
      onClick={() => router.back()}
    >
      <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
      <span className="sr-only">Back Button</span>
    </div>
  );
};
