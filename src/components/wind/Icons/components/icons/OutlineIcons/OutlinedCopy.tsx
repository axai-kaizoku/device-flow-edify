import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedCopy = ({ size, color, style, onClick }: IconProps) => {
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
        d="M4.75 2.5C4.75 2.08579 5.08579 1.75 5.5 1.75H13.5C13.9142 1.75 14.25 2.08579 14.25 2.5V10.5C14.25 10.9142 13.9142 11.25 13.5 11.25H10.5C10.0858 11.25 9.75 10.9142 9.75 10.5C9.75 10.0858 10.0858 9.75 10.5 9.75H12.75V3.25H6.25V5.5C6.25 5.91421 5.91421 6.25 5.5 6.25C5.08579 6.25 4.75 5.91421 4.75 5.5V2.5Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75 5.5C1.75 5.08579 2.08579 4.75 2.5 4.75H10.5C10.9142 4.75 11.25 5.08579 11.25 5.5V13.5C11.25 13.9142 10.9142 14.25 10.5 14.25H2.5C2.08579 14.25 1.75 13.9142 1.75 13.5V5.5ZM3.25 6.25V12.75H9.75V6.25H3.25Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
