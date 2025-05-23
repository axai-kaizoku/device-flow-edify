import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedLoader = ({ size, color, style, onClick }: IconProps) => {
  return (
    <SVG
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      size={size}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 1.25C8.41421 1.25 8.75 1.58579 8.75 2V4C8.75 4.41421 8.41421 4.75 8 4.75C7.58579 4.75 7.25 4.41421 7.25 4V2C7.25 1.58579 7.58579 1.25 8 1.25Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.25 8C11.25 7.58579 11.5858 7.25 12 7.25H14C14.4142 7.25 14.75 7.58579 14.75 8C14.75 8.41421 14.4142 8.75 14 8.75H12C11.5858 8.75 11.25 8.41421 11.25 8Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3009 10.3007C10.5938 10.0078 11.0687 10.0078 11.3616 10.3007L12.7741 11.7132C13.067 12.0061 13.067 12.481 12.7741 12.7739C12.4812 13.0668 12.0063 13.0668 11.7134 12.7739L10.3009 11.3614C10.008 11.0685 10.008 10.5936 10.3009 10.3007Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 11.25C8.41421 11.25 8.75 11.5858 8.75 12V14C8.75 14.4142 8.41421 14.75 8 14.75C7.58579 14.75 7.25 14.4142 7.25 14V12C7.25 11.5858 7.58579 11.25 8 11.25Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.69909 10.3007C5.99198 10.5936 5.99198 11.0685 5.69909 11.3614L4.28659 12.7739C3.99369 13.0668 3.51882 13.0668 3.22593 12.7739C2.93303 12.481 2.93303 12.0061 3.22593 11.7132L4.63843 10.3007C4.93132 10.0078 5.40619 10.0078 5.69909 10.3007Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 8C1.25 7.58579 1.58579 7.25 2 7.25H4C4.41421 7.25 4.75 7.58579 4.75 8C4.75 8.41421 4.41421 8.75 4 8.75H2C1.58579 8.75 1.25 8.41421 1.25 8Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.22593 3.22602C3.51882 2.93312 3.99369 2.93312 4.28659 3.22602L5.69909 4.63852C5.99198 4.93141 5.99198 5.40628 5.69909 5.69918C5.40619 5.99207 4.93132 5.99207 4.63843 5.69918L3.22593 4.28668C2.93303 3.99378 2.93303 3.51891 3.22593 3.22602Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
