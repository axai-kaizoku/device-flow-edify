import React from "react";
import { generateAvatarFromName } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  className?: string;
  size?: number; // e.g., 40 = 40px
  isDeviceAvatar?: boolean;
}

export const GetAvatar: React.FC<AvatarProps> = ({
  name,
  className = "",
  size = 40,
  isDeviceAvatar,
  ...props
}) => {
  const { initials, backgroundColor, textColor } = generateAvatarFromName(name);

  return (
    <>
      {isDeviceAvatar ? (
        <div
          className={`flex items-center justify-center rounded-full font-gilroyMedium flex-shrink-0 ${className}`}
          style={{
            width: size,
            height: size,
            backgroundColor: "#9ca3af",
            color: "#fff",
            fontSize: size * 0.4,
          }}
          {...props}
        >
          {initials}
        </div>
      ) : (
        <div
          className={`flex items-center justify-center rounded-full font-gilroyMedium flex-shrink-0 ${className}`}
          style={{
            width: size,
            height: size,
            backgroundColor,
            color: textColor,
            fontSize: size * 0.4,
          }}
          {...props}
        >
          {initials}
        </div>
      )}
    </>
  );
};
