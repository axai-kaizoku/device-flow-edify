import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedArrowLeft = ({
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
      xmlns="http://www.w3.org/2000/svg"
      size={size}
      color={color}
      style={style}
      onClick={onClick}
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
        d="M7.53033 2.96967C7.82322 3.26256 7.82322 3.73744 7.53033 4.03033L3.56066 8L7.53033 11.9697C7.82322 12.2626 7.82322 12.7374 7.53033 13.0303C7.23744 13.3232 6.76256 13.3232 6.46967 13.0303L1.96967 8.53033C1.67678 8.23744 1.67678 7.76256 1.96967 7.46967L6.46967 2.96967C6.76256 2.67678 7.23744 2.67678 7.53033 2.96967Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
