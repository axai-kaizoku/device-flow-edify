import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedQRCode = ({ size, color, style, onClick }: IconProps) => {
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
        d="M3.75 3.75V6.25H6.25V3.75H3.75ZM2.25 3.5C2.25 2.80964 2.80964 2.25 3.5 2.25H6.5C7.19036 2.25 7.75 2.80964 7.75 3.5V6.5C7.75 7.19036 7.19036 7.75 6.5 7.75H3.5C2.80964 7.75 2.25 7.19036 2.25 6.5V3.5Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.75 9.75V12.25H6.25V9.75H3.75ZM2.25 9.5C2.25 8.80964 2.80964 8.25 3.5 8.25H6.5C7.19036 8.25 7.75 8.80964 7.75 9.5V12.5C7.75 13.1904 7.19036 13.75 6.5 13.75H3.5C2.80964 13.75 2.25 13.1904 2.25 12.5V9.5Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.75 3.75V6.25H12.25V3.75H9.75ZM8.25 3.5C8.25 2.80964 8.80964 2.25 9.5 2.25H12.5C13.1904 2.25 13.75 2.80964 13.75 3.5V6.5C13.75 7.19036 13.1904 7.75 12.5 7.75H9.5C8.80964 7.75 8.25 7.19036 8.25 6.5V3.5Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 8.25C9.41421 8.25 9.75 8.58579 9.75 9V11C9.75 11.4142 9.41421 11.75 9 11.75C8.58579 11.75 8.25 11.4142 8.25 11V9C8.25 8.58579 8.58579 8.25 9 8.25Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 8.25C11.4142 8.25 11.75 8.58579 11.75 9V13C11.75 13.4142 11.4142 13.75 11 13.75H9C8.58579 13.75 8.25 13.4142 8.25 13C8.25 12.5858 8.58579 12.25 9 12.25H10.25V9C10.25 8.58579 10.5858 8.25 11 8.25Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.25 10C10.25 9.58579 10.5858 9.25 11 9.25H13C13.4142 9.25 13.75 9.58579 13.75 10C13.75 10.4142 13.4142 10.75 13 10.75H11C10.5858 10.75 10.25 10.4142 10.25 10Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 11.25C13.4142 11.25 13.75 11.5858 13.75 12V13C13.75 13.4142 13.4142 13.75 13 13.75C12.5858 13.75 12.25 13.4142 12.25 13V12C12.25 11.5858 12.5858 11.25 13 11.25Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
