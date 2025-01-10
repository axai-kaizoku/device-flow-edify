"use client";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const StoreGlobalSearch = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        "flex items-center py-1 gap-1 pl-1.5 pr-0.5 text-black hover:ring-[1px] rounded-full hover:text-black hover:ring-black transition-all duration-300 cursor-pointer",
        isFocused && "w-full max-w-xs ring-[1px] ring-black"
      )}
      onClick={() => setIsFocused(true)}
    >
      <Icons.store_search className="size-[1.35rem] mb-0.5" />
      <input
        className={cn(
          "flex-grow  duration-300 -mt-0.5 ease-in-out bg-transparent placeholder:text-[#7F7F7F] text-sm font-gilroyMedium whitespace-nowrap outline-none focus:outline-none",
          isFocused ? "input-transition" : "w-0"
        )}
        onBlur={() => setIsFocused(false)}
        autoFocus={isFocused}
        placeholder="Search"
      />
    </div>
  );
};

// value={searchTerm || ""}
// onChange={(e) => setSearchTerm(e.target.value)}
