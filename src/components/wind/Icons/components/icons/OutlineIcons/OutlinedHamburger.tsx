import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedHamburger = ({
  size,
  color,
  style,
  onClick,
}: IconProps) => {
  return (
    <SVG
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      size={size}
      style={style}
      color={color}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75 8C1.75 7.58579 2.08579 7.25 2.5 7.25H13.5C13.9142 7.25 14.25 7.58579 14.25 8C14.25 8.41421 13.9142 8.75 13.5 8.75H2.5C2.08579 8.75 1.75 8.41421 1.75 8Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75 4C1.75 3.58579 2.08579 3.25 2.5 3.25H13.5C13.9142 3.25 14.25 3.58579 14.25 4C14.25 4.41421 13.9142 4.75 13.5 4.75H2.5C2.08579 4.75 1.75 4.41421 1.75 4Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75 12C1.75 11.5858 2.08579 11.25 2.5 11.25H13.5C13.9142 11.25 14.25 11.5858 14.25 12C14.25 12.4142 13.9142 12.75 13.5 12.75H2.5C2.08579 12.75 1.75 12.4142 1.75 12Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
