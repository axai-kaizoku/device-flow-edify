import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedArrowDown = ({
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
        d="M8 1.75C8.41421 1.75 8.75 2.08579 8.75 2.5V13.5C8.75 13.9142 8.41421 14.25 8 14.25C7.58579 14.25 7.25 13.9142 7.25 13.5V2.5C7.25 2.08579 7.58579 1.75 8 1.75Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.96967 8.46967C3.26256 8.17678 3.73744 8.17678 4.03033 8.46967L8 12.4393L11.9697 8.46967C12.2626 8.17678 12.7374 8.17678 13.0303 8.46967C13.3232 8.76256 13.3232 9.23744 13.0303 9.53033L8.53033 14.0303C8.23744 14.3232 7.76256 14.3232 7.46967 14.0303L2.96967 9.53033C2.67678 9.23744 2.67678 8.76256 2.96967 8.46967Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
