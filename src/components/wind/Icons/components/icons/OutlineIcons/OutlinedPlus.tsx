import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedPlus = ({ size, color, style, onClick }: IconProps) => {
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
        d="M1.75 8C1.75 7.58579 2.08579 7.25 2.5 7.25H13.5C13.9142 7.25 14.25 7.58579 14.25 8C14.25 8.41421 13.9142 8.75 13.5 8.75H2.5C2.08579 8.75 1.75 8.41421 1.75 8Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 1.91666C8.41421 1.91666 8.75 2.25244 8.75 2.66666V13.6667C8.75 14.0809 8.41421 14.4167 8 14.4167C7.58579 14.4167 7.25 14.0809 7.25 13.6667V2.66666C7.25 2.25244 7.58579 1.91666 8 1.91666Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
