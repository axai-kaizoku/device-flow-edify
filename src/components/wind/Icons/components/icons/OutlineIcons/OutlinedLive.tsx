import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedLive = ({ size, style, color, onClick }: IconProps) => {
  return (
    <SVG
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      size={size}
      style={style}
      color={color}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2.75C5.92893 2.75 4.25 4.42893 4.25 6.5C4.25 8.57107 5.92893 10.25 8 10.25C10.0711 10.25 11.75 8.57107 11.75 6.5C11.75 4.42893 10.0711 2.75 8 2.75ZM2.75 6.5C2.75 3.6005 5.1005 1.25 8 1.25C10.8995 1.25 13.25 3.6005 13.25 6.5C13.25 9.3995 10.8995 11.75 8 11.75C5.1005 11.75 2.75 9.3995 2.75 6.5Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 5.25C7.30964 5.25 6.75 5.80964 6.75 6.5C6.75 7.19036 7.30964 7.75 8 7.75C8.69036 7.75 9.25 7.19036 9.25 6.5C9.25 5.80964 8.69036 5.25 8 5.25ZM5.25 6.5C5.25 4.98122 6.48122 3.75 8 3.75C9.51878 3.75 10.75 4.98122 10.75 6.5C10.75 8.01878 9.51878 9.25 8 9.25C6.48122 9.25 5.25 8.01878 5.25 6.5Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 10.25C8.41421 10.25 8.75 10.5858 8.75 11V13C8.75 13.4142 8.41421 13.75 8 13.75C7.58579 13.75 7.25 13.4142 7.25 13V11C7.25 10.5858 7.58579 10.25 8 10.25Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 13C1.25 12.5858 1.58579 12.25 2 12.25H14C14.4142 12.25 14.75 12.5858 14.75 13C14.75 13.4142 14.4142 13.75 14 13.75H2C1.58579 13.75 1.25 13.4142 1.25 13Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
