"use client";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const StoreGlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isFocused, setIsFocused] = useState(false);
  const [term, setTerm] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentUrl = `/store/all-products?q=${encodeURIComponent(term)}`;
    if (term && !pathname.startsWith("/store/all-products")) {
      router.push(currentUrl);
    } else if (term && !pathname.includes(`q=${encodeURIComponent(term)}`)) {
      router.replace(currentUrl);
    }
  }, [term, pathname, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
        setTerm("");
        if (pathname.startsWith("/store/all-products")) {
          router.replace("/store/all-products");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pathname, router]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  return (
    <div
      ref={inputRef}
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
        value={term ?? ""}
        onChange={handleSearch}
        onBlur={() => setIsFocused(false)}
        autoFocus={isFocused}
        placeholder="Search"
      />
    </div>
  );
};
