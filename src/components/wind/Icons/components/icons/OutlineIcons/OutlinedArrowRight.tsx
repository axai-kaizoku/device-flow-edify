import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedArrowRight = ({
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
        d="M1.75 8C1.75 7.58579 2.08579 7.25 2.5 7.25H13.5C13.9142 7.25 14.25 7.58579 14.25 8C14.25 8.41421 13.9142 8.75 13.5 8.75H2.5C2.08579 8.75 1.75 8.41421 1.75 8Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.46967 2.96967C8.76256 2.67678 9.23744 2.67678 9.53033 2.96967L14.0303 7.46967C14.3232 7.76256 14.3232 8.23744 14.0303 8.53033L9.53033 13.0303C9.23744 13.3232 8.76256 13.3232 8.46967 13.0303C8.17678 12.7374 8.17678 12.2626 8.46967 11.9697L12.4393 8L8.46967 4.03033C8.17678 3.73744 8.17678 3.26256 8.46967 2.96967Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
