import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInSeconds,
  format,
  formatDistanceToNow as formatDistanceToNowFn,
  isToday as isTodayFn,
  isYesterday as isYesterdayFn,
} from "date-fns";

import { Attachment } from "@/app/(root)/issues/[id]/_components/chat-interface";
import { saveAs } from "file-saver";
import JSZip from "jszip";

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

export function formatDistanceToNow(date: Date): string {
  return formatDistanceToNowFn(date, { addSuffix: true });
}

export function formatChatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = differenceInMilliseconds(now, date);
  const diffMinutes = differenceInMinutes(now, date);
  const diffSeconds = differenceInSeconds(now, date);

  const oneHourInMs = 60 * 60 * 1000;

  if (diffMs < oneHourInMs) {
    if (diffMinutes < 1) {
      return `${diffSeconds}s ago`;
    } else {
      return `${diffMinutes}m ago`;
    }
  } else {
    if (isToday(date)) {
      // Show only time if it's today
      return format(date, "h:mm a");
    } else {
      // Show date and time if it's not today
      return format(date, "MMM d, h:mm a");
    }
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
}

export function isImageAttachment(
  attachment: string | Attachment
): attachment is string | Attachment {
  // get the URL string
  const url =
    typeof attachment === "string" ? attachment : attachment.url ?? "";

  if (!url) return false;

  try {
    // parse URL to pull out the pathname
    const { pathname } = new URL(url, window.location.href);
    // common image extensions
    return /\.(jpe?g|png|gif|bmp|webp|svg)$/i.test(pathname);
  } catch {
    return false;
  }
}

export async function downloadAttachmentsAsZip(
  attachments: (string | Attachment)[]
) {
  const zip = new JSZip();
  const folder = zip.folder("attachments");

  const promises = attachments.map(async (att, index) => {
    const url = typeof att === "string" ? att : att.url!;
    const name =
      typeof att === "string"
        ? url.split("/").pop()!
        : att.name || `file-${index}`;
    const response = await fetch(url);
    const blob = await response.blob();
    folder?.file(name, blob);
  });

  await Promise.all(promises);
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, "attachments.zip");
}

export function isToday(date: Date): boolean {
  return isTodayFn(date);
}

export function isYesterday(date: Date): boolean {
  return isYesterdayFn(date);
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return format(date1, "yyyy-MM-dd") === format(date2, "yyyy-MM-dd");
}

export function formatDate(date: Date): string {
  return format(date, "MMMM d, yyyy");
}

export function formatTime(date: Date): string {
  return format(date, "h:mm a");
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

export function getUserColor(userId: string): string {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
  ];

  // Simple hash function to get a consistent color for a user ID
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
