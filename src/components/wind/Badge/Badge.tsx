import * as React from "react";
import { StyledBadge } from "./styles/style";
import { BadgeColors } from "./styles/BadgeColors";
import { Colors } from "./styles/colors";
import { Icon } from "../Icons";
import { IconsType } from "../Icons/components/icons/interface";

export const Badge = ({
  children,
  color,
  border,
  size,
  onClose,
  dot,
  icon,
  style,
  dotColor,
  iconPlacement = "left",
}: BadgeProps) => {
  const dotSize = size === "lg" ? "8" : "6";
  return (
    <StyledBadge hasRightIcon={icon && iconPlacement === "right"} color={color} border={border} size={size} style={style}>
      {dot ? (
        <Icon
          type="FilledDot"
          style={{ width: `${dotSize}px`, height: `${dotSize}px` }}
          color={
            dotColor || (color ? BadgeColors?.[color]?.icon : Colors.info_500)
          }
        />
      ) : icon && iconPlacement === "left" ? (
        <Icon
          type={icon}
          color={color ? BadgeColors?.[color]?.icon : Colors.info_500}
          size="xs"
        />
      ) : null}
      <span>{children}</span>
      {onClose ? (
        <Icon
          style={{ cursor: "pointer" }}
          type="OutlinedClose"
          size="xs"
          onClick={onClose}
          color={color ? BadgeColors?.[color]?.icon : Colors.info_500}
        />
      ) : icon && iconPlacement === "right" ? (
        <Icon
          type={icon}
          color={color ? BadgeColors[color].icon : Colors.info_500}
          style={{  alignSelf: "center" }}
          size="xs"
        />
      ) : null}
    </StyledBadge>
  );
};

export interface BadgeProps {
  // The content rendered within the badge.
  children: React.ReactNode;
  // Different sizes for badge. Default size is md
  size?: "md" | "lg";
  // Color variants for badge. The colors for badge's background, text and icons is taken from BadgeColors.ts
  color?:
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light_blue"
    | "pink"
    | "turquoise"
    | "orange"
    | "violet"
    | "grey"
    | "yellow"
    | "red"
    | "success_dark"
    | "success_dark_outline"
    | "grey_dark"
    | "grey_dark_outline"
    | "error_dark"
    | "warning_dark";
  // Border radius type for badge
  border?: "rounded" | "squared";
  // handler on close button click
  onClose?: () => void;
  // a dot icon before badge text will be added if dot is true
  dot?: boolean;
  // an icon from predefined IconTypes before badge text will be added
  style?: React.CSSProperties;
  icon?: IconsType;
  iconPlacement?: "left" | "right";
  // color for dot
  dotColor?: string;
}
