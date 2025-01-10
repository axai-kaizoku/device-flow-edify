import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedPlay = ({ size, color, style, onClick }: IconProps) => {
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
        d="M6.64611 5.33874C6.88998 5.20823 7.18588 5.22253 7.41603 5.37596L10.416 7.37596C10.6247 7.51506 10.75 7.74924 10.75 8C10.75 8.25076 10.6247 8.48494 10.416 8.62404L7.41603 10.624C7.18588 10.7775 6.88998 10.7918 6.64611 10.6613C6.40224 10.5307 6.25 10.2766 6.25 10V6C6.25 5.7234 6.40224 5.46926 6.64611 5.33874ZM7.75 7.40139V8.59861L8.64792 8L7.75 7.40139Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
