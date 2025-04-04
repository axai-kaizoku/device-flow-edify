import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedClose = ({ size, color, style, onClick }: IconProps) => {
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
        d="M13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L13.0303 11.9697C13.3232 12.2626 13.3232 12.7374 13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L2.96967 4.03033C2.67678 3.73744 2.67678 3.26256 2.96967 2.96967Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
