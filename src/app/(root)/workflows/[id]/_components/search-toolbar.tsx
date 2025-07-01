"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface SearchToolbarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;

  searchIcon: React.ReactNode;
}

export function SearchToolbar({
  placeholder = "Search...",
  onSearch,

  searchIcon,
}: SearchToolbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="  transition-all duration-500 ease-in-out"
      ref={containerRef}
    >
      <Card className="overflow-hidden transition-all duration-500 ease-in-out">
        <div
          className={cn(
            "transition-all duration-500 ease-in-out",
            isOpen ? "w-[200px]" : "w-[98px]"
          )}
        >
          <div>
            {!isOpen ? (
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setIsOpen(true)}
                  asChild
                >
                  {searchIcon}
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <div className="relative w-full">
                  <Input
                    className="h-9"
                    autoFocus
                    placeholder={placeholder}
                    onChange={(e) => onSearch?.(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
