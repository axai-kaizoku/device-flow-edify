import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedCheck = ({ size, color, style, onClick }: IconProps) => {
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
        d="M14.0303 3.96967C14.3232 4.26256 14.3232 4.73744 14.0303 5.03033L7.03033 12.0303C6.73744 12.3232 6.26256 12.3232 5.96967 12.0303L2.46967 8.53033C2.17678 8.23744 2.17678 7.76256 2.46967 7.46967C2.76256 7.17678 3.23744 7.17678 3.53033 7.46967L6.5 10.4393L12.9697 3.96967C13.2626 3.67678 13.7374 3.67678 14.0303 3.96967Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
