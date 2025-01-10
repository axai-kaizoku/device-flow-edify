import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedLaptop = ({ size, color, style, onClick }: IconProps) => {
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
        d="M13 11.25C13.1381 11.25 13.25 11.1381 13.25 11V4C13.25 3.86193 13.1381 3.75 13 3.75H3C2.86193 3.75 2.75 3.86193 2.75 4V11C2.75 11.1381 2.86193 11.25 3 11.25H13ZM14.75 11C14.75 11.9665 13.9665 12.75 13 12.75H3C2.0335 12.75 1.25 11.9665 1.25 11V4C1.25 3.0335 2.0335 2.25 3 2.25H13C13.9665 2.25 14.75 3.0335 14.75 4V11Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.25 14C5.25 13.5858 5.58579 13.25 6 13.25H10C10.4142 13.25 10.75 13.5858 10.75 14C10.75 14.4142 10.4142 14.75 10 14.75H6C5.58579 14.75 5.25 14.4142 5.25 14Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 9.5C1.25 9.08579 1.58579 8.75 2 8.75H14C14.4142 8.75 14.75 9.08579 14.75 9.5C14.75 9.91421 14.4142 10.25 14 10.25H2C1.58579 10.25 1.25 9.91421 1.25 9.5Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 11.25C8.41421 11.25 8.75 11.5858 8.75 12V14C8.75 14.4142 8.41421 14.75 8 14.75C7.58579 14.75 7.25 14.4142 7.25 14V12C7.25 11.5858 7.58579 11.25 8 11.25Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
