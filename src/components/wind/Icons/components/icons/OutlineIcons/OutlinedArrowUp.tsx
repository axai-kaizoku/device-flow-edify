import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedArrowUp = ({ size, color, style, onClick }: IconProps) => {
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
        d="M8 1.75C8.41421 1.75 8.75 2.08579 8.75 2.5V13.5C8.75 13.9142 8.41421 14.25 8 14.25C7.58579 14.25 7.25 13.9142 7.25 13.5V2.5C7.25 2.08579 7.58579 1.75 8 1.75Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.46967 1.96967C7.76256 1.67678 8.23744 1.67678 8.53033 1.96967L13.0303 6.46967C13.3232 6.76256 13.3232 7.23744 13.0303 7.53033C12.7374 7.82322 12.2626 7.82322 11.9697 7.53033L8 3.56066L4.03033 7.53033C3.73744 7.82322 3.26256 7.82322 2.96967 7.53033C2.67678 7.23744 2.67678 6.76256 2.96967 6.46967L7.46967 1.96967Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
