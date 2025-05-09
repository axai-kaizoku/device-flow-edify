import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedInfo = ({ size, color, style, onClick }: IconProps) => {
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
        d="M8 2.75C5.10051 2.75 2.75 5.10051 2.75 8C2.75 10.8995 5.10051 13.25 8 13.25C10.8995 13.25 13.25 10.8995 13.25 8C13.25 5.10051 10.8995 2.75 8 2.75ZM1.25 8C1.25 4.27208 4.27208 1.25 8 1.25C11.7279 1.25 14.75 4.27208 14.75 8C14.75 11.7279 11.7279 14.75 8 14.75C4.27208 14.75 1.25 11.7279 1.25 8Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.75 7.5C6.75 7.08579 7.08579 6.75 7.5 6.75H8C8.41421 6.75 8.75 7.08579 8.75 7.5V10.2927C9.0413 10.3956 9.25 10.6734 9.25 11C9.25 11.4142 8.91421 11.75 8.5 11.75H8C7.58579 11.75 7.25 11.4142 7.25 11V8.20732C6.9587 8.10436 6.75 7.82655 6.75 7.5Z"
        fill={color || "#3995E5"}
      />
      <path
        d="M7.875 6C8.28921 6 8.625 5.66421 8.625 5.25C8.625 4.83579 8.28921 4.5 7.875 4.5C7.46079 4.5 7.125 4.83579 7.125 5.25C7.125 5.66421 7.46079 6 7.875 6Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
