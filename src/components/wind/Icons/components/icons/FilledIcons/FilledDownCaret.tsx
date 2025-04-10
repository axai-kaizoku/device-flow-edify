import * as React from "react";
import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";

export const FilledDownCaret = ({ size, color, style, onClick }: IconProps) => {
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
        d="M13.4625 5.80625C13.4242 5.71525 13.3599 5.63761 13.2776 5.58311C13.1953 5.52861 13.0987 5.49969 13 5.5H2.99998C2.90126 5.49969 2.80467 5.52861 2.72236 5.58311C2.64006 5.63761 2.57573 5.71525 2.53748 5.80625C2.50145 5.89861 2.49231 5.99927 2.51112 6.09661C2.52992 6.19394 2.5759 6.28396 2.64373 6.35625L7.64373 11.3563C7.7393 11.4487 7.86704 11.5003 7.99998 11.5003C8.13292 11.5003 8.26066 11.4487 8.35623 11.3563L13.3562 6.35625C13.4241 6.28396 13.47 6.19394 13.4888 6.09661C13.5076 5.99927 13.4985 5.89861 13.4625 5.80625Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
