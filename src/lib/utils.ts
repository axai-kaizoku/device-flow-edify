import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const pastelColors = [
  "#FAEDCB",
  "#C9E4DE",
  "#C6DEF1",
  "#DBCDF0",
  "#F2C6DE",
  "#F7D9C4",
];

function getContrastTextColor(bgColor: string): string {
  const color = bgColor?.substring(1);
  const r = parseInt(color?.substring(0, 2), 16);
  const g = parseInt(color?.substring(2, 4), 16);
  const b = parseInt(color?.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#000000" : "#FFFFFF";
}

export function generateAvatarFromName(name: string) {
  const initials = name
    ?.split(" ")
    ?.map((part) => part?.charAt(0)?.toUpperCase())
    ?.slice(0, 2)
    ?.join("");

  const colorIndex =
    (name?.charCodeAt(0) + name?.length) % pastelColors?.length;
  const backgroundColor = pastelColors[colorIndex];
  const textColor = getContrastTextColor(backgroundColor);

  return {
    initials,
    backgroundColor,
    textColor,
  };
}

export function formatNumber(n: number): string {
  if (n >= 100000) {
    const val = (n / 100000).toFixed(2);
    return `${parseFloat(val)}L`;
  }

  // Format with Indian commas and no decimal
  return n.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });
}
