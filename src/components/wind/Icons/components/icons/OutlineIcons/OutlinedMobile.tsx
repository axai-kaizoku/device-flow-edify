import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedMobile = ({ size, color, style, onClick }: IconProps) => {
  return (
    <SVG
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      size={size}
      style={style}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 2.25C4.86193 2.25 4.75 2.36193 4.75 2.5V13.5C4.75 13.6381 4.86193 13.75 5 13.75H11C11.1381 13.75 11.25 13.6381 11.25 13.5V2.5C11.25 2.36193 11.1381 2.25 11 2.25H5ZM3.25 2.5C3.25 1.5335 4.0335 0.75 5 0.75H11C11.9665 0.75 12.75 1.5335 12.75 2.5V13.5C12.75 14.4665 11.9665 15.25 11 15.25H5C4.0335 15.25 3.25 14.4665 3.25 13.5V2.5Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.25 3.5C3.25 3.08579 3.58579 2.75 4 2.75H12C12.4142 2.75 12.75 3.08579 12.75 3.5C12.75 3.91421 12.4142 4.25 12 4.25H4C3.58579 4.25 3.25 3.91421 3.25 3.5Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.25 12.5C3.25 12.0858 3.58579 11.75 4 11.75H12C12.4142 11.75 12.75 12.0858 12.75 12.5C12.75 12.9142 12.4142 13.25 12 13.25H4C3.58579 13.25 3.25 12.9142 3.25 12.5Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
