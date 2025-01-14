import * as React from "react";
import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";

export const OutlinedCheckCircle = ({
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
      size={size}
      style={style}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2927 5.9823C11.5786 6.282 11.5674 6.75675 11.2677 7.04266L7.59895 10.5427C7.309 10.8193 6.85281 10.8191 6.56309 10.5422L4.73184 8.79222C4.43238 8.50605 4.4216 8.0313 4.70778 7.73184C4.99395 7.43237 5.4687 7.4216 5.76817 7.70778L7.08169 8.96303L10.2323 5.95734C10.532 5.67142 11.0067 5.68259 11.2927 5.9823Z"
        fill={color || "#0A5DA6"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2.75C5.10051 2.75 2.75 5.10051 2.75 8C2.75 10.8995 5.10051 13.25 8 13.25C10.8995 13.25 13.25 10.8995 13.25 8C13.25 5.10051 10.8995 2.75 8 2.75ZM1.25 8C1.25 4.27208 4.27208 1.25 8 1.25C11.7279 1.25 14.75 4.27208 14.75 8C14.75 11.7279 11.7279 14.75 8 14.75C4.27208 14.75 1.25 11.7279 1.25 8Z"
        fill={color || "#0A5DA6"}
      />
    </SVG>
  );
};
