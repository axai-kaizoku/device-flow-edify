"use client";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const StoreGlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isFocused, setIsFocused] = useState(false);
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  // Debounce effect for search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(term);
    }, 300); // Adjust debounce timing as needed

    return () => {
      clearTimeout(handler);
    };
  }, [term]);

  // Router update only when debounced term changes
  useEffect(() => {
    if (debouncedTerm) {
      if (!pathname.startsWith("/store/all-products")) {
        router.push(`/store/all-products?q=${encodeURIComponent(debouncedTerm)}`);
      } else if (!pathname.includes(`q=${encodeURIComponent(debouncedTerm)}`)) {
        router.replace(`/store/all-products?q=${encodeURIComponent(debouncedTerm)}`);
      }
    } else if (debouncedTerm === "") {
      // Clear query when the search term is empty
      if (pathname.startsWith("/store/all-products")) {
        router.replace("/store/all-products");
      }
    }
  }, [debouncedTerm, pathname, router]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

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
          "flex-grow duration-300 -mt-0.5 ease-in-out bg-transparent placeholder:text-[#7F7F7F] text-sm font-gilroyMedium whitespace-nowrap outline-none focus:outline-none",
          isFocused ? "input-transition" : "w-0"
        )}
        value={term}
        onChange={handleSearch}
        autoFocus={isFocused}
        placeholder="Search"
      />
    </div>
  );
};
